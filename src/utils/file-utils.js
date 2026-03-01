// File upload utilities

const path = require('path');
const fs = require('fs');

/**
 * Ensures a directory exists, creates if it doesn't
 */
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * Generates a unique filename
 */
const generateUniqueFilename = (originalName, prefix = '') => {
  const ext = path.extname(originalName);
  const timestamp = Date.now();
  const random = Math.round(Math.random() * 1E9);
  const name = path.parse(originalName).name;
  
  return `${prefix}${timestamp}-${random}-${name}${ext}`;
};

/**
 * Validates file type
 */
const isValidFileType = (file, allowedTypes = ['image/jpeg', 'image/png', 'image/gif']) => {
  return allowedTypes.includes(file.mimetype);
};

/**
 * Validates file size (in bytes)
 */
const isValidFileSize = (file, maxSize = 5 * 1024 * 1024) => {
  return file.size <= maxSize;
};

/**
 * Deletes a file from the filesystem
 */
const deleteFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err && err.code !== 'ENOENT') {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

/**
 * Gets file information
 */
const getFileInfo = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          size: stats.size,
          created: stats.birthtime,
          modified: stats.mtime,
          isFile: stats.isFile(),
          isDirectory: stats.isDirectory()
        });
      }
    });
  });
};

/**
 * Moves a file from source to destination
 */
const moveFile = (sourcePath, destinationPath) => {
  return new Promise((resolve, reject) => {
    fs.rename(sourcePath, destinationPath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

/**
 * Creates a readable stream for file download
 */
const createReadStream = (filePath, options = {}) => {
  if (!fs.existsSync(filePath)) {
    throw new Error('File not found');
  }
  
  return fs.createReadStream(filePath, options);
};

/**
 * Sanitizes filename to prevent directory traversal
 */
const sanitizeFilename = (filename) => {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^_+|_+$/g, '');
};

module.exports = {
  ensureDirectoryExists,
  generateUniqueFilename,
  isValidFileType,
  isValidFileSize,
  deleteFile,
  getFileInfo,
  moveFile,
  createReadStream,
  sanitizeFilename
};
