const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

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

    // Create tables sequentially
    let tablesCreated = 0;
    tables.forEach((table, index) => {
      this.db.run(table, (err) => {
        if (err) {
          console.error('Error creating table:', err);
        } else {
          tablesCreated++;
          if (tablesCreated === tables.length) {
            // All tables created, now add photo columns and seed data
            setTimeout(() => {
              this.addProfilePhotoColumns();
              this.seedData();
            }, 100);
          }
        }
      });
    });
  }

  addProfilePhotoColumns() {
    // Check if profile_photo column exists, if not add it
    this.db.all("PRAGMA table_info(Employee)", (err, rows) => {
      if (err) {
        console.error('Error checking table structure:', err);
        return;
      }

      const hasProfilePhoto = rows.some(row => row.name === 'profile_photo');
      const hasPhotoUploadDate = rows.some(row => row.name === 'photo_upload_date');
      const hasPhotoFileSize = rows.some(row => row.name === 'photo_file_size');
      const hasPhotoMimeType = rows.some(row => row.name === 'photo_mime_type');

      if (!hasProfilePhoto) {
        this.db.run("ALTER TABLE Employee ADD COLUMN profile_photo BLOB", (err) => {
          if (err) console.error('Error adding profile_photo column:', err);
          else console.log('Added profile_photo BLOB column to Employee table');
        });
      }

      if (!hasPhotoUploadDate) {
        this.db.run("ALTER TABLE Employee ADD COLUMN photo_upload_date TEXT", (err) => {
          if (err) console.error('Error adding photo_upload_date column:', err);
          else console.log('Added photo_upload_date column to Employee table');
        });
      }

      if (!hasPhotoFileSize) {
        this.db.run("ALTER TABLE Employee ADD COLUMN photo_file_size INTEGER", (err) => {
          if (err) console.error('Error adding photo_file_size column:', err);
          else console.log('Added photo_file_size column to Employee table');
        });
      }

      if (!hasPhotoMimeType) {
        this.db.run("ALTER TABLE Employee ADD COLUMN photo_mime_type TEXT", (err) => {
          if (err) console.error('Error adding photo_mime_type column:', err);
          else console.log('Added photo_mime_type column to Employee table');
        });
      }
    });
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
          ['234567890', 'Jane Doe', '1987-03-22', '456 Oak Ave, New York', 'F', 68000, 1, '007'],
          ['345678901', 'Mike Johnson', '1982-11-08', '789 Pine Rd, Los Angeles', 'M', 55000, 2, null],
          ['456789012', 'Sarah Wilson', '1990-09-12', '321 Elm St, Chicago', 'F', 62000, 3, null],
          ['007', 'Divyansh Jha', '2003-07-30', 'Delhi', 'M', 80000, 1, null]
        ];

        let employeesInserted = 0;
        const totalEmployees = employees.length;

        employees.forEach(emp => {
          this.db.run(
            "INSERT INTO Employee (ssn, name, birth_date, address, sex, salary, dept_no, supervisor_ssn) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            emp,
            function (err) {
              if (err) {
                console.error('Error inserting employee:', err);
                return;
              }

              employeesInserted++;
              if (employeesInserted === totalEmployees) {
                // All employees inserted, now add photos
                setTimeout(() => {
                  this.seedPhotos();
                  this.seedRemainingSampleData();
                }, 100);
              }
            }.bind(this)
          );
        });
      }
    });
  }

  seedRemainingSampleData() {
    // Update department managers
    this.db.run("UPDATE Department SET manager_ssn = '007' WHERE dept_no = 1");
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
      ['456789012', 3, 25],
      ['007', 1, 45]
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

  seedPhotos() {
    console.log('Seeding employee photos...');

    // Photo mappings: [SSN, filename]
    const photoMappings = [
      ['123456789', 'john.jpeg'],
      ['234567890', 'jane.jpeg'],
      ['345678901', 'mike.jpeg'],
      ['456789012', 'sarah.jpeg'],
      ['007', 'divyansh.jpeg']
    ];

    photoMappings.forEach(([ssn, filename]) => {
      const photoPath = path.join(__dirname, 'photos', filename);

      try {
        if (fs.existsSync(photoPath)) {
          const photoData = fs.readFileSync(photoPath);
          const stats = fs.statSync(photoPath);

          // Determine MIME type based on file extension
          const ext = path.extname(filename).toLowerCase();
          let mimeType = 'image/jpeg';
          if (ext === '.png') mimeType = 'image/png';

          const sql = `UPDATE Employee 
                       SET profile_photo = ?, 
                           photo_upload_date = datetime('now'), 
                           photo_file_size = ?, 
                           photo_mime_type = ?
                       WHERE ssn = ?`;

          this.db.run(sql, [photoData, stats.size, mimeType, ssn], function (err) {
            if (err) {
              console.error(`Error adding photo for SSN ${ssn}:`, err);
            } else {
              console.log(`✅ Photo added for ${filename} (SSN: ${ssn}) - ${(stats.size / 1024).toFixed(1)}KB`);
            }
          });
        } else {
          console.warn(`⚠️  Photo file not found: ${photoPath}`);
        }
      } catch (error) {
        console.error(`Error loading photo ${filename}:`, error);
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