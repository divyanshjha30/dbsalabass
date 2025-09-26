const express = require('express');
const router = express.Router();

function createDependentRoutes(db) {
  // Get all dependents
  router.get('/', (req, res) => {
    const sql = `
      SELECT d.*, e.name as employee_name 
      FROM Dependent d
      LEFT JOIN Employee e ON d.ssn = e.ssn
    `;
    
    db.all(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  });

  // Get dependents by employee SSN
  router.get('/employee/:ssn', (req, res) => {
    const sql = `
      SELECT d.*, e.name as employee_name 
      FROM Dependent d
      LEFT JOIN Employee e ON d.ssn = e.ssn
      WHERE d.ssn = ?
    `;
    
    db.all(sql, [req.params.ssn], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  });

  // Get dependent by ID
  router.get('/:id', (req, res) => {
    const sql = `
      SELECT d.*, e.name as employee_name 
      FROM Dependent d
      LEFT JOIN Employee e ON d.ssn = e.ssn
      WHERE d.id = ?
    `;
    
    db.get(sql, [req.params.id], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (!row) {
        res.status(404).json({ error: 'Dependent not found' });
        return;
      }
      res.json(row);
    });
  });

  // Create dependent
  router.post('/', (req, res) => {
    const { ssn, dep_name, sex, birth_date, relationship } = req.body;
    const sql = 'INSERT INTO Dependent (ssn, dep_name, sex, birth_date, relationship) VALUES (?, ?, ?, ?, ?)';
    
    db.run(sql, [ssn, dep_name, sex, birth_date, relationship], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, message: 'Dependent created successfully' });
    });
  });

  // Update dependent
  router.put('/:id', (req, res) => {
    const { ssn, dep_name, sex, birth_date, relationship } = req.body;
    const sql = 'UPDATE Dependent SET ssn = ?, dep_name = ?, sex = ?, birth_date = ?, relationship = ? WHERE id = ?';
    
    db.run(sql, [ssn, dep_name, sex, birth_date, relationship, req.params.id], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Dependent not found' });
        return;
      }
      res.json({ message: 'Dependent updated successfully' });
    });
  });

  // Delete dependent
  router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM Dependent WHERE id = ?';
    
    db.run(sql, [req.params.id], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Dependent not found' });
        return;
      }
      res.json({ message: 'Dependent deleted successfully' });
    });
  });

  return router;
}

module.exports = createDependentRoutes;