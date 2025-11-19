const multer = require('multer');

// Configure multer for memory storage (we'll store in BLOB)
const storage = multer.memoryStorage();

// File filter for image validation
const fileFilter = (req, file, cb) => {
    // Check if file is an image
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG and PNG images are allowed.'), false);
    }
};

// Configure multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit as specified in SRS Document 2
    },
    fileFilter: fileFilter,
});

// Middleware for single file upload
const uploadSingle = upload.single('photo');

// Error handling middleware for multer
const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(413).json({
                error: 'File too large. Maximum size is 5MB.',
                code: 'FILE_TOO_LARGE'
            });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                error: 'Invalid field name. Expected "photo".',
                code: 'INVALID_FIELD'
            });
        }
    }

    if (err.message.includes('Invalid file type')) {
        return res.status(422).json({
            error: err.message,
            code: 'INVALID_FILE_TYPE'
        });
    }

    next(err);
};

// Validate file content (additional security check)
const validateFileContent = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({
            error: 'No file uploaded',
            code: 'NO_FILE'
        });
    }

    const buffer = req.file.buffer;

    // Check file signatures (magic numbers) for additional security
    const jpegSignature = buffer.slice(0, 3).toString('hex') === 'ffd8ff';
    const pngSignature = buffer.slice(0, 8).toString('hex') === '89504e470d0a1a0a';

    if (!jpegSignature && !pngSignature) {
        return res.status(422).json({
            error: 'Invalid file content. File does not match expected image format.',
            code: 'INVALID_FILE_CONTENT'
        });
    }

    // Add file metadata to request
    req.file.actualMimeType = jpegSignature ? 'image/jpeg' : 'image/png';
    req.file.fileSize = buffer.length;

    next();
};

module.exports = {
    uploadSingle,
    handleUploadError,
    validateFileContent,
};