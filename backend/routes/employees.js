const express = require('express');
const router = express.Router();

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
    
    db.run(sql, [ssn, name, birth_date, address, sex, salary, dept_no, supervisor_ssn], function(err) {
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
    
    db.run(sql, [name, birth_date, address, sex, salary, dept_no, supervisor_ssn, req.params.ssn], function(err) {
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
    
    db.run(sql, [req.params.ssn], function(err) {
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

  return router;
}

module.exports = createEmployeeRoutes;