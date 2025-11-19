const express = require('express');
const router = express.Router();
const { uploadSingle, handleUploadError, validateFileContent } = require('../middleware/upload');

function createEmployeeRoutes(db) {
  // Get all employees
  router.get('/', (req, res) => {
    const sql = `
      SELECT e.*, d.dept_name, s.name as supervisor_name 
      FROM Employee e
      LEFT JOIN Department d ON e.dept_no = d.dept_no
      LEFT JOIN Employee s ON e.supervisor_ssn = s.ssn
    `;

    db.all(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  });

  // Get employee by SSN
  router.get('/:ssn', (req, res) => {
    const sql = `
      SELECT e.*, d.dept_name, s.name as supervisor_name 
      FROM Employee e
      LEFT JOIN Department d ON e.dept_no = d.dept_no
      LEFT JOIN Employee s ON e.supervisor_ssn = s.ssn
      WHERE e.ssn = ?
    `;

    db.get(sql, [req.params.ssn], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (!row) {
        res.status(404).json({ error: 'Employee not found' });
        return;
      }
      res.json(row);
    });
  });

  // Create employee
  router.post('/', (req, res) => {
    const { ssn, name, birth_date, address, sex, salary, dept_no, supervisor_ssn } = req.body;
    const sql = 'INSERT INTO Employee (ssn, name, birth_date, address, sex, salary, dept_no, supervisor_ssn) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    db.run(sql, [ssn, name, birth_date, address, sex, salary, dept_no, supervisor_ssn], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ ssn, message: 'Employee created successfully' });
    });
  });

  // Update employee
  router.put('/:ssn', (req, res) => {
    const { name, birth_date, address, sex, salary, dept_no, supervisor_ssn } = req.body;
    const sql = 'UPDATE Employee SET name = ?, birth_date = ?, address = ?, sex = ?, salary = ?, dept_no = ?, supervisor_ssn = ? WHERE ssn = ?';

    db.run(sql, [name, birth_date, address, sex, salary, dept_no, supervisor_ssn, req.params.ssn], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Employee not found' });
        return;
      }
      res.json({ message: 'Employee updated successfully' });
    });
  });

  // Delete employee
  router.delete('/:ssn', (req, res) => {
    const sql = 'DELETE FROM Employee WHERE ssn = ?';

    db.run(sql, [req.params.ssn], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Employee not found' });
        return;
      }
      res.json({ message: 'Employee deleted successfully' });
    });
  });

  // ==================== PHOTO ENDPOINTS (SRS Document 2 Implementation) ====================

  // Get employee photo
  router.get('/:ssn/photo', (req, res) => {
    const sql = 'SELECT profile_photo, photo_mime_type FROM Employee WHERE ssn = ?';

    db.get(sql, [req.params.ssn], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      if (!row) {
        res.status(404).json({ error: 'Employee not found' });
        return;
      }

      if (!row.profile_photo) {
        // Return placeholder image or 404
        res.status(404).json({ error: 'No profile photo found' });
        return;
      }

      // Set appropriate headers for image response
      res.set({
        'Content-Type': row.photo_mime_type || 'image/jpeg',
        'Content-Length': row.profile_photo.length,
        'Cache-Control': 'public, max-age=86400', // Cache for 1 day
      });

      res.send(row.profile_photo);
    });
  });

  // Upload new profile photo
  router.post('/:ssn/photo', uploadSingle, handleUploadError, validateFileContent, (req, res) => {
    const ssn = req.params.ssn;

    // First check if employee exists
    db.get('SELECT ssn FROM Employee WHERE ssn = ?', [ssn], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      if (!row) {
        res.status(404).json({ error: 'Employee not found' });
        return;
      }

      // Update employee with photo data
      const sql = `UPDATE Employee 
                   SET profile_photo = ?, 
                       photo_upload_date = datetime('now'), 
                       photo_file_size = ?, 
                       photo_mime_type = ?
                   WHERE ssn = ?`;

      db.run(sql, [
        req.file.buffer,
        req.file.fileSize,
        req.file.actualMimeType,
        ssn
      ], function (err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }

        res.status(201).json({
          success: true,
          message: 'Photo uploaded successfully',
          fileSize: req.file.fileSize,
          mimeType: req.file.actualMimeType
        });
      });
    });
  });

  // Update existing profile photo
  router.put('/:ssn/photo', uploadSingle, handleUploadError, validateFileContent, (req, res) => {
    const ssn = req.params.ssn;

    // Check if employee exists and has existing photo
    db.get('SELECT ssn, profile_photo FROM Employee WHERE ssn = ?', [ssn], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      if (!row) {
        res.status(404).json({ error: 'Employee not found' });
        return;
      }

      // Update employee with new photo data
      const sql = `UPDATE Employee 
                   SET profile_photo = ?, 
                       photo_upload_date = datetime('now'), 
                       photo_file_size = ?, 
                       photo_mime_type = ?
                   WHERE ssn = ?`;

      db.run(sql, [
        req.file.buffer,
        req.file.fileSize,
        req.file.actualMimeType,
        ssn
      ], function (err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }

        res.status(200).json({
          success: true,
          message: 'Photo updated successfully',
          fileSize: req.file.fileSize,
          mimeType: req.file.actualMimeType
        });
      });
    });
  });

  // Delete profile photo
  router.delete('/:ssn/photo', (req, res) => {
    const ssn = req.params.ssn;

    // Check if employee exists
    db.get('SELECT ssn, profile_photo FROM Employee WHERE ssn = ?', [ssn], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      if (!row) {
        res.status(404).json({ error: 'Employee not found' });
        return;
      }

      if (!row.profile_photo) {
        res.status(404).json({ error: 'No profile photo to delete' });
        return;
      }

      // Remove photo data
      const sql = `UPDATE Employee 
                   SET profile_photo = NULL, 
                       photo_upload_date = NULL, 
                       photo_file_size = NULL, 
                       photo_mime_type = NULL
                   WHERE ssn = ?`;

      db.run(sql, [ssn], function (err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }

        res.status(200).json({
          success: true,
          message: 'Photo deleted successfully'
        });
      });
    });
  });

  return router;
}

module.exports = createEmployeeRoutes;