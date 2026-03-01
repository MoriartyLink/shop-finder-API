findme-backend/
├── src/
│   ├── config/
│   │   ├── db.js             # PostgreSQL Pool setup
│   │   └── multer-config.js   # File upload logic
│   ├── controllers/           # Auth, User, Shop, Post, Admin controllers
│   ├── middlewares/
│   │   └── auth-middleware.js # JWT & Admin role checks
│   ├── models/                # camelCase mapping logic
│   ├── routes/
│   │   ├── index.js          # The "Master Router" factory
│   │   └── (feature)-routes.js
│   ├── services/             # SQL Query logic
│   └── app.js                # Express & Middleware setup
├── uploads/                  # MUST EXIST (mkdir uploads)
├── .env                      # Database & JWT secrets
└── server.js                 # Entry point