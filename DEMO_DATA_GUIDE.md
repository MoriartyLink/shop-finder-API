# Demo Data Setup

## Quick Start

### 1. Database Setup
```bash
# Create database
createdb FindMeDB -U postgres

# Import schema
psql -d FindMeDB -U postgres -f app/findmeDB.sql

# Import demo data
psql -d FindMeDB -U postgres -f demo-final.sql
```

### 2. Test Users

| Email | Password | Role |
|--------|-----------|-------|
| admin@lbdp.com | admin123 | Super Admin |
| john@example.com | password123 | Regular User |
| jane@example.com | password123 | Regular User |
| owner1@shop.com | password123 | Shop Owner |
| owner2@shop.com | password123 | Shop Owner |

### 3. Test Shops (Mandalay, Myanmar)

| Shop Name | Location | Status |
|-----------|----------|--------|
| Mandalay Coffee House | 84th Street | Active |
| Shwe Noodle Shop | 35th Street | Pending |
| Royal Tea Garden | Pyin Oo Lwin Road | Active |
| Mandalay BBQ Palace | Mahar Aung Myay | Pending |
| Golden Pagoda Restaurant | Near Mahamuni Buddha | Active |

### 4. API Testing

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lbdp.com","password":"admin123"}'
```

#### Get Nearby Shops
```bash
curl "http://localhost:5000/api/shops?lat=21.9747&lon=96.0836&radius=5000"
```

#### Create Post
```bash
curl -X POST http://localhost:5000/api/posts/create-post \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "content=Test post" \
  -F "photos=@image.jpg"
```

### 5. Admin Dashboard

Open `admin-dashboard.html` in browser:
- URL: http://localhost:5000/admin-dashboard.html
- Login: admin@lbdp.com / admin123

### 6. Mobile App

Update API base URL in `app/mobile/src/services/api.ts`:
```typescript
const BASE_URL = 'http://YOUR_COMPUTER_IP:5000';
```

## Data Summary

- **5 Test Users** with different roles
- **5 Mandalay Shops** with real coordinates
- **5 Sample Posts** with photos and comments
- **8 User Connections** for social features
- **5 Post Comments** for engagement testing
- **45 Additional Users** for performance testing
- **95 Additional Posts** for content testing

## Coordinates Reference

All shops located in Mandalay, Myanmar:
- **City Center**: 21.9747°N, 96.0836°E
- **Radius**: 5km for nearby searches
- **Real Addresses**: Actual street names and landmarks

## Troubleshooting

### Database Issues
```bash
# Check if database exists
psql -l | grep FindMeDB

# Check table structure
psql -d FindMeDB -c "\dt"

# Check data
psql -d FindMeDB -c "SELECT COUNT(*) FROM \"user\";"
```

### API Issues
- Check server is running: `curl http://localhost:5000/api/test`
- Verify database connection in .env file
- Check CORS settings for mobile app

### Admin Dashboard Issues
- Use test endpoint if database not working
- Check browser console for JavaScript errors
- Verify API base URL matches backend
