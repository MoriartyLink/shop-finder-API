const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Format: 172654321-my-image.jpg
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Add a specific storage for payment slips
const slipStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads/slips'),
  filename: (req, file, cb) => {
    const uniqueSuffix = 'SLIP-' + Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  }
});

const uploadSlip = multer({ storage: slipStorage });
module.exports = { upload, uploadSlip };