const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
  constructor() {
    this.db = new sqlite3.Database('database.db', (err) => {
      if (err) {
        console.error('Error opening database:', err);
      } else {
        console.log('Connected to SQLite database');
        this.initializeTables();
      }
    });
  }

  initializeTables() {
    const tables = [
      `CREATE TABLE IF NOT EXISTS Department (
        dept_no INTEGER PRIMARY KEY,
        dept_name TEXT NOT NULL,
        location TEXT NOT NULL,
        manager_ssn TEXT,
        start_date TEXT
      )`,
      
      `CREATE TABLE IF NOT EXISTS Employee (
        ssn TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        birth_date TEXT NOT NULL,
        address TEXT NOT NULL,
        sex TEXT NOT NULL CHECK(sex IN ('M', 'F')),
        salary REAL NOT NULL,
        dept_no INTEGER,
        supervisor_ssn TEXT,
        FOREIGN KEY (dept_no) REFERENCES Department(dept_no),
        FOREIGN KEY (supervisor_ssn) REFERENCES Employee(ssn)
      )`,
      
      `CREATE TABLE IF NOT EXISTS Project (
        proj_no INTEGER PRIMARY KEY,
        proj_name TEXT NOT NULL,
        location TEXT NOT NULL,
        dept_no INTEGER,
        FOREIGN KEY (dept_no) REFERENCES Department(dept_no)
      )`,
      
      `CREATE TABLE IF NOT EXISTS Works_On (
        ssn TEXT,
        proj_no INTEGER,
        hours REAL NOT NULL,
        PRIMARY KEY (ssn, proj_no),
        FOREIGN KEY (ssn) REFERENCES Employee(ssn),
        FOREIGN KEY (proj_no) REFERENCES Project(proj_no)
      )`,
      
      `CREATE TABLE IF NOT EXISTS Dependent (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ssn TEXT,
        dep_name TEXT NOT NULL,
        sex TEXT NOT NULL CHECK(sex IN ('M', 'F')),
        birth_date TEXT NOT NULL,
        relationship TEXT NOT NULL,
        FOREIGN KEY (ssn) REFERENCES Employee(ssn)
      )`
    ];

    tables.forEach(table => {
      this.db.run(table, (err) => {
        if (err) {
          console.error('Error creating table:', err);
        }
      });
    });

    // Add foreign key constraint for Department manager
    this.db.run(`UPDATE Department SET manager_ssn = NULL WHERE manager_ssn NOT IN (SELECT ssn FROM Employee)`);
    
    this.seedData();
  }

  seedData() {
    // Check if data already exists
    this.db.get("SELECT COUNT(*) as count FROM Employee", (err, row) => {
      if (err) {
        console.error(err);
        return;
      }
      
      if (row.count === 0) {
        console.log('Seeding database with sample data...');
        
        // Insert departments
        const departments = [
          [1, 'Engineering', 'New York', null, '2020-01-01'],
          [2, 'Marketing', 'Los Angeles', null, '2020-02-01'],
          [3, 'HR', 'Chicago', null, '2020-03-01']
        ];

        departments.forEach(dept => {
          this.db.run(
            "INSERT INTO Department (dept_no, dept_name, location, manager_ssn, start_date) VALUES (?, ?, ?, ?, ?)",
            dept
          );
        });

        // Insert employees
        const employees = [
          ['123456789', 'John Smith', '1985-06-15', '123 Main St, New York', 'M', 75000, 1, null],
          ['234567890', 'Jane Doe', '1987-03-22', '456 Oak Ave, New York', 'F', 68000, 1, '123456789'],
          ['345678901', 'Mike Johnson', '1982-11-08', '789 Pine Rd, Los Angeles', 'M', 55000, 2, null],
          ['456789012', 'Sarah Wilson', '1990-09-12', '321 Elm St, Chicago', 'F', 62000, 3, null]
        ];

        employees.forEach(emp => {
          this.db.run(
            "INSERT INTO Employee (ssn, name, birth_date, address, sex, salary, dept_no, supervisor_ssn) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            emp
          );
        });

        // Update department managers
        this.db.run("UPDATE Department SET manager_ssn = '123456789' WHERE dept_no = 1");
        this.db.run("UPDATE Department SET manager_ssn = '345678901' WHERE dept_no = 2");
        this.db.run("UPDATE Department SET manager_ssn = '456789012' WHERE dept_no = 3");

        // Insert projects
        const projects = [
          [1, 'Website Redesign', 'New York', 1],
          [2, 'Marketing Campaign', 'Los Angeles', 2],
          [3, 'HR System Upgrade', 'Chicago', 3]
        ];

        projects.forEach(proj => {
          this.db.run(
            "INSERT INTO Project (proj_no, proj_name, location, dept_no) VALUES (?, ?, ?, ?)",
            proj
          );
        });

        // Insert work assignments
        const assignments = [
          ['123456789', 1, 40],
          ['234567890', 1, 30],
          ['345678901', 2, 35],
          ['456789012', 3, 25]
        ];

        assignments.forEach(assign => {
          this.db.run(
            "INSERT INTO Works_On (ssn, proj_no, hours) VALUES (?, ?, ?)",
            assign
          );
        });

        // Insert dependents
        const dependents = [
          ['123456789', 'Alice Smith', 'F', '2010-04-15', 'Daughter'],
          ['123456789', 'Bob Smith', 'M', '2012-08-22', 'Son'],
          ['345678901', 'Emma Johnson', 'F', '2015-12-03', 'Daughter']
        ];

        dependents.forEach(dep => {
          this.db.run(
            "INSERT INTO Dependent (ssn, dep_name, sex, birth_date, relationship) VALUES (?, ?, ?, ?, ?)",
            dep
          );
        });

        console.log('Sample data seeded successfully!');
      }
    });
  }

  getDb() {
    return this.db;
  }

  close() {
    this.db.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
      } else {
        console.log('Database connection closed');
      }
    });
  }
}

module.exports = Database;