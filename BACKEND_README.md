# LBDP Backend Documentation

## Overview
Location-based business directory platform backend with Node.js and PostgreSQL.

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 13+
- npm

### Installation
```bash
cd app/shop-backend
npm install
```

### Environment Setup
Create `.env` file:
```env
PORT=5000
DATABASE_URL=postgres://postgres:Postgre@123@localhost:5432/FindMeDB
JWT_SECRET=YourSuperSecretKey
```

### Database Setup
```bash
# Create database
createdb FindMeDB -U postgres

# Import schema
psql -d FindMeDB -U postgres -f ../findmeDB.sql

# Import demo data
psql -d FindMeDB -U postgres -f ../demo-final.sql
```

### Start Server
```bash
npm start
# or
node server.js
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Shops
- `GET /api/shops` - Get all shops
- `GET /api/shops?lat=21.9747&lon=96.0836&radius=5000` - Get nearby shops
- `POST /api/shops` - Create shop (protected)
- `PUT /api/shops/:id` - Update shop (protected)
- `DELETE /api/shops/:id` - Delete shop (protected)

### Posts
- `GET /api/posts/post-details` - Get all posts
- `POST /api/posts/create-post` - Create post with photos (protected)

### Admin
- `GET /api/admin/dashboard-stats` - Get platform statistics
- `PATCH /api/admin/approve-shop/:shopId` - Approve shop payment
- `DELETE /api/admin/moderate-post/:postId` - Delete post

## Project Structure
```
src/
├── config/
│   ├── db.js           # Database connection
│   └── multer-config.js # File upload config
├── controllers/         # Request handlers
├── services/           # Business logic
├── routes/             # API routes
├── middlewares/         # Custom middleware
├── validators/          # Input validation
├── utils/              # Helper functions
└── app.js              # Express app setup
```

## Features
- JWT authentication
- File upload with Multer
- Input validation with Joi
- Rate limiting
- Error handling
- PostgreSQL with PostGIS
- CORS enabled
- Request logging

## Testing
```bash
# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lbdp.com","password":"admin123"}'

# Test nearby shops
curl "http://localhost:5000/api/shops?lat=21.9747&lon=96.0836&radius=5000"
```

## Environment Variables
| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| DATABASE_URL | PostgreSQL connection | - |
| JWT_SECRET | JWT signing secret | - |

## Dependencies
See `requirements.txt` for complete list.

## Troubleshooting
- **Database connection**: Check DATABASE_URL in .env
- **CORS errors**: Verify frontend URL allowed
- **File uploads**: Check uploads directory permissions
- **Rate limiting**: Check IP limits in middleware
