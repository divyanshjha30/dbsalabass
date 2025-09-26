const express = require('express');
const router = express.Router();

function createAssignmentRoutes(db) {
  // Get all work assignments
  router.get('/', (req, res) => {
    const sql = `
      SELECT w.*, e.name as employee_name, p.proj_name 
      FROM Works_On w
      LEFT JOIN Employee e ON w.ssn = e.ssn
      LEFT JOIN Project p ON w.proj_no = p.proj_no
    `;
    
    db.all(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  });

  // Get assignments by employee SSN
  router.get('/employee/:ssn', (req, res) => {
    const sql = `
      SELECT w.*, e.name as employee_name, p.proj_name 
      FROM Works_On w
      LEFT JOIN Employee e ON w.ssn = e.ssn
      LEFT JOIN Project p ON w.proj_no = p.proj_no
      WHERE w.ssn = ?
    `;
    
    db.all(sql, [req.params.ssn], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  });

  // Get assignments by project number
  router.get('/project/:proj_no', (req, res) => {
    const sql = `
      SELECT w.*, e.name as employee_name, p.proj_name 
      FROM Works_On w
      LEFT JOIN Employee e ON w.ssn = e.ssn
      LEFT JOIN Project p ON w.proj_no = p.proj_no
      WHERE w.proj_no = ?
    `;
    
    db.all(sql, [req.params.proj_no], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  });

  // Create assignment
  router.post('/', (req, res) => {
    const { ssn, proj_no, hours } = req.body;
    const sql = 'INSERT INTO Works_On (ssn, proj_no, hours) VALUES (?, ?, ?)';
    
    db.run(sql, [ssn, proj_no, hours], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Assignment created successfully' });
    });
  });

  // Update assignment
  router.put('/:ssn/:proj_no', (req, res) => {
    const { hours } = req.body;
    const sql = 'UPDATE Works_On SET hours = ? WHERE ssn = ? AND proj_no = ?';
    
    db.run(sql, [hours, req.params.ssn, req.params.proj_no], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Assignment not found' });
        return;
      }
      res.json({ message: 'Assignment updated successfully' });
    });
  });

  // Delete assignment
  router.delete('/:ssn/:proj_no', (req, res) => {
    const sql = 'DELETE FROM Works_On WHERE ssn = ? AND proj_no = ?';
    
    db.run(sql, [req.params.ssn, req.params.proj_no], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Assignment not found' });
        return;
      }
      res.json({ message: 'Assignment deleted successfully' });
    });
  });

  return router;
}

module.exports = createAssignmentRoutes;