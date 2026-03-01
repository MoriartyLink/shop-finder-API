// Request logging middleware
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip || req.connection.remoteAddress;
  const userAgent = req.get('User-Agent');

  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip} - UA: ${userAgent}`);

  // Log request body for POST/PUT requests (excluding sensitive data)
  if (['POST', 'PUT', 'PATCH'].includes(method) && req.body) {
    const sanitizedBody = { ...req.body };
    if (sanitizedBody.password) sanitizedBody.password = '[REDACTED]';
    console.log('Request body:', sanitizedBody);
  }

  // Capture response time
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;
    console.log(`[${timestamp}] ${method} ${url} - ${statusCode} - ${duration}ms`);
  });

  next();
};

module.exports = requestLogger;
