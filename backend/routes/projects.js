const express = require('express');
const router = express.Router();

function createProjectRoutes(db) {
  // Get all projects
  router.get('/', (req, res) => {
    const sql = `
      SELECT p.*, d.dept_name 
      FROM Project p
      LEFT JOIN Department d ON p.dept_no = d.dept_no
    `;
    
    db.all(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  });

  // Get project by number
  router.get('/:proj_no', (req, res) => {
    const sql = `
      SELECT p.*, d.dept_name 
      FROM Project p
      LEFT JOIN Department d ON p.dept_no = d.dept_no
      WHERE p.proj_no = ?
    `;
    
    db.get(sql, [req.params.proj_no], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (!row) {
        res.status(404).json({ error: 'Project not found' });
        return;
      }
      res.json(row);
    });
  });

  // Create project
  router.post('/', (req, res) => {
    const { proj_no, proj_name, location, dept_no } = req.body;
    const sql = 'INSERT INTO Project (proj_no, proj_name, location, dept_no) VALUES (?, ?, ?, ?)';
    
    db.run(sql, [proj_no, proj_name, location, dept_no], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ proj_no, message: 'Project created successfully' });
    });
  });

  // Update project
  router.put('/:proj_no', (req, res) => {
    const { proj_name, location, dept_no } = req.body;
    const sql = 'UPDATE Project SET proj_name = ?, location = ?, dept_no = ? WHERE proj_no = ?';
    
    db.run(sql, [proj_name, location, dept_no, req.params.proj_no], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Project not found' });
        return;
      }
      res.json({ message: 'Project updated successfully' });
    });
  });

  // Delete project
  router.delete('/:proj_no', (req, res) => {
    const sql = 'DELETE FROM Project WHERE proj_no = ?';
    
    db.run(sql, [req.params.proj_no], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Project not found' });
        return;
      }
      res.json({ message: 'Project deleted successfully' });
    });
  });

  return router;
}

module.exports = createProjectRoutes;