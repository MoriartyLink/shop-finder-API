// Database utility functions

/**
 * Executes a database transaction with automatic rollback on error
 */
const transaction = async (pool, callback) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Builds a WHERE clause from filters object
 */
const buildWhereClause = (filters, startIndex = 1) => {
  const conditions = [];
  const values = [];
  let paramIndex = startIndex;

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        const placeholders = value.map(() => `$${paramIndex++}`).join(', ');
        conditions.push(`${key} IN (${placeholders})`);
        values.push(...value);
      } else {
        conditions.push(`${key} = $${paramIndex++}`);
        values.push(value);
      }
    }
  });

  return {
    whereClause: conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '',
    values,
    nextParamIndex: paramIndex
  };
};

/**
 * Adds pagination to a query
 */
const addPagination = (query, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  return `${query} LIMIT ${limit} OFFSET ${offset}`;
};

/**
 * Counts total records for pagination
 */
const countRecords = async (pool, table, filters = {}) => {
  const { whereClause, values } = buildWhereClause(filters);
  const query = `SELECT COUNT(*) FROM ${table} ${whereClause}`;
  const result = await pool.query(query, values);
  return parseInt(result.rows[0].count);
};

/**
 * Finds nearby locations using PostGIS
 */
const findNearby = async (pool, lat, lon, radiusMeters = 5000, table = 'shop_service') => {
  const query = `
    SELECT *, 
           ST_Distance(
             ST_MakePoint(lon, lat)::geography,
             ST_MakePoint($1, $2)::geography
           ) as distance
    FROM ${table}
    WHERE ST_DWithin(
      ST_MakePoint(lon, lat)::geography,
      ST_MakePoint($1, $2)::geography,
      $3
    )
    ORDER BY distance ASC
  `;
  
  const result = await pool.query(query, [lon, lat, radiusMeters]);
  return result.rows;
};

/**
 * Checks if a record exists
 */
const recordExists = async (pool, table, field, value) => {
  const query = `SELECT 1 FROM ${table} WHERE ${field} = $1 LIMIT 1`;
  const result = await pool.query(query, [value]);
  return result.rows.length > 0;
};

/**
 * Soft delete implementation
 */
const softDelete = async (pool, table, id, userId = null) => {
  const deletedAt = new Date().toISOString();
  const query = `
    UPDATE ${table} 
    SET deleted_at = $1, deleted_by = $2 
    WHERE id = $3 AND deleted_at IS NULL
    RETURNING *
  `;
  
  const result = await pool.query(query, [deletedAt, userId, id]);
  return result.rows[0];
};

module.exports = {
  transaction,
  buildWhereClause,
  addPagination,
  countRecords,
  findNearby,
  recordExists,
  softDelete
};
