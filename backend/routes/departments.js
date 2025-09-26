const express = require('express');
const router = express.Router();

function createDepartmentRoutes(db) {
  // Get all departments
  router.get('/', (req, res) => {
    const sql = `
      SELECT d.*, e.name as manager_name 
      FROM Department d
      LEFT JOIN Employee e ON d.manager_ssn = e.ssn
    `;
    
    db.all(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  });

  // Get department by number
  router.get('/:dept_no', (req, res) => {
    const sql = `
      SELECT d.*, e.name as manager_name 
      FROM Department d
      LEFT JOIN Employee e ON d.manager_ssn = e.ssn
      WHERE d.dept_no = ?
    `;
    
    db.get(sql, [req.params.dept_no], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (!row) {
        res.status(404).json({ error: 'Department not found' });
        return;
      }
      res.json(row);
    });
  });

  // Create department
  router.post('/', (req, res) => {
    const { dept_no, dept_name, location, manager_ssn, start_date } = req.body;
    const sql = 'INSERT INTO Department (dept_no, dept_name, location, manager_ssn, start_date) VALUES (?, ?, ?, ?, ?)';
    
    db.run(sql, [dept_no, dept_name, location, manager_ssn, start_date], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ dept_no, message: 'Department created successfully' });
    });
  });

  // Update department
  router.put('/:dept_no', (req, res) => {
    const { dept_name, location, manager_ssn, start_date } = req.body;
    const sql = 'UPDATE Department SET dept_name = ?, location = ?, manager_ssn = ?, start_date = ? WHERE dept_no = ?';
    
    db.run(sql, [dept_name, location, manager_ssn, start_date, req.params.dept_no], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Department not found' });
        return;
      }
      res.json({ message: 'Department updated successfully' });
    });
  });

  // Delete department
  router.delete('/:dept_no', (req, res) => {
    const sql = 'DELETE FROM Department WHERE dept_no = ?';
    
    db.run(sql, [req.params.dept_no], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Department not found' });
        return;
      }
      res.json({ message: 'Department deleted successfully' });
    });
  });

  return router;
}

module.exports = createDepartmentRoutes;