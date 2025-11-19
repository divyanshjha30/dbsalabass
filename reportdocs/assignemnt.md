**BIRLA INSTITUTE OF TECHNOLOGY & SCIENCE, PILANI**  
**WORK INTEGRATED LEARNING PROGRAMMES**  
**COURSE HANDSON LAB ASSIGNMENT HANDOUT**

**M.Tech**

| Course Title     | Database Systems and Applications          |
| ---------------- | ------------------------------------------ |
| **Course No(s)** | **SESAP ZC337**                            |
| **Credit Units** | **4 Credits, 24 Hours optimized delivery** |
| **Lab Session**  | **Nov-Dec 25**                             |

**Faculty:** Balachandra A, Guest Faculty, BITS Pilani (WILP) Division  
**Email:** balachandra.ananatharamaiah@wilp.bits-pilani.ac.in  
**Mob:** 9113656626 / 9480475967

---

# SOFTWARE REQUIREMENTS SPECIFICATION (SRS) DOCUMENT

## For EMPLOYEE MANAGEMENT Database System PROJECT ASSIGNMENT - DBSA

**Version:** 1.0  
**Prepared by:** Divyansh, Student ID: [Your ID]  
**Date:** November 19, 2025

---

## Contents

**1. Introduction** .......................................................................................................................................3

- 1.1 Purpose........................................................................................................................................3
- 1.2 Scope............................................................................................................................................3
- 1.3 Definitions, Acronyms, and Abbreviations ..............................................................................3
- 1.4 References ...................................................................................................................................4

**2. Overall Description** ..........................................................................................................................4

- 2.1 Product Perspective....................................................................................................................4
- 2.2 Product Functions.......................................................................................................................4
- 2.3 User Characteristics...................................................................................................................5
- 2.4 Constraints..................................................................................................................................5
- 2.5 Assumptions and Dependencies.................................................................................................5
- 2.6 Database Normalization Strategy.............................................................................................5

**3. Specific Requirements**.......................................................................................................................6

- 3.1 Functional Requirements...........................................................................................................6
- 3.2 Non-Functional Requirements ..................................................................................................8

**4. Database Design**................................................................................................................................9

- 4.1 Entity and Attribute Definitions ...............................................................................................9
- 4.2 Relational Schema (DDL) ..........................................................................................................9
- 4.3 Normalization Process................................................................................................................12
- 4.4 Advanced Joins and Analytical Views (Level 7 Optimization) ..............................................12
- 4.5 Table Definitions (Core Schema with Indexes) .....................................................................13

**5. System Features**................................................................................................................................13

- 5.1 Data Integrity..............................................................................................................................13
- 5.2 Normalization .............................................................................................................................14
- 5.3 Reporting Queries (Examples) ..................................................................................................14
- 5.4 Effective Joins (Level 7 Feature)...............................................................................................14

**6. External Interface Requirements**....................................................................................................15

**7. Validation and Verification** .............................................................................................................15

**8. Appendix** ...........................................................................................................................................16

- 8.1 Future Enhancements ................................................................................................................16
- 8.2 Document History.......................................................................................................................16

---

# 📄 SRS Document 1: Employee Management Database System

## _Formalization of Term I Prototype_

---

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification (SRS) defines the requirements for the Employee Management Database System, designed to manage employee, department, project, and dependent information with advanced normalization (up to BCNF) and optimized join operations. The document specifies all functional and non-functional requirements, database schema constraints, and user interactions. It serves as a reference for database developers and system evaluators. The system supports efficient data access, analytical queries, and integrity enforcement across interconnected entities such as employees, departments, projects, and dependents.

### 1.2 Scope

The Employee Management Database System automates data management for a company's core operations.

**Functions include:**

- Maintaining employee personal and employment details
- Tracking departmental structure and managers
- Recording projects and their associated departments
- Tracking employee participation in projects and dependents

**Database is a normalized relational system supporting:**

- Employee, department, project, and dependent management
- Recursive relationships (supervision)
- Multi-entity joins and derived reporting
- The system ensures data integrity, referential consistency, and normalization (3NF/BCNF)
- Data models optimized through BCNF to ensure minimal redundancy and fast join performance
- **Future provisions for multimodal extensions (Image/Spatial data)**

### 1.3 Definitions, Acronyms, and Abbreviations

| **Term**    | **Meaning**                                                                                              |
| ----------- | -------------------------------------------------------------------------------------------------------- |
| **DBMS**    | Database Management System                                                                               |
| **SRS**     | Software Requirements Specification                                                                      |
| **DDL**     | Data Definition Language                                                                                 |
| **DML**     | Data Manipulation Language                                                                               |
| **PK**      | Primary Key                                                                                              |
| **FK**      | Foreign Key                                                                                              |
| **SQL**     | Structured Query Language                                                                                |
| **BCNF**    | Boyce-Codd Normal Form - Advanced database normalization eliminating all functional dependency anomalies |
| **CRUD**    | Create, Read, Update, Delete operations                                                                  |
| **SQLite3** | Lightweight relational database management system                                                        |
| **BLOB**    | Binary Large Object for storing multimodal data                                                          |

### 1.4 References

- **Term I Assignment Implementation Report** (DivyanshDBSA.pdf)
- **IEEE 830–1998, ISO/IEC/IEEE 29148:2018** - Systems and Software Engineering Requirements
- **Elmasri & Navathe, Fundamentals of Database Systems, 7th Ed.**
- **Database System Concepts** - Silberschatz, Korth, Sudarshan
- **SQLite Documentation** - Official SQLite3 Reference

---

## 2. Overall Description

### 2.1 Product Perspective

The Employee Management Database System is a relational database developed using SQL and runs under SQLite3 RDBMS, with full-stack implementation using React.js and Node.js.

It is a central data store for all company divisions and will be integrated with future applications such as payroll or project tracking tools. The system is designed with **provisions for multimodal extensions** including Image/Document storage (BLOB) and Spatial data capabilities.

### 2.2 Product Functions

- Manage employees and departments
- Assign managers to departments
- Record projects and link them to departments
- Track which employees work on which projects
- Record employee dependents
- Generate summary and analytical queries
- **Future capability:** Store and manage employee profile photos (Image Extension)
- **Future capability:** Geographic location tracking for departments and projects (Spatial Extension)

### 2.3 User Characteristics

| **User Role**              | **Description**                                                      |
| -------------------------- | -------------------------------------------------------------------- |
| **Database Administrator** | Defines database schema, manages users, backups, system maintenance  |
| **HR Manager**             | Maintains employee, department, dependent data with full CRUD access |
| **Project Manager**        | Manages project details and employee assignments                     |
| **Employee**               | Read-only access to personal data and project assignments            |

### 2.4 Constraints

- The database must be in **Boyce-Codd Normal Form (BCNF)** or higher
- All referential integrity constraints must be enforced through FKs
- Access control must restrict schema modification to the Administrator
- Must use standard SQL DDL/DML commands
- Web-based interface for cross-platform accessibility
- SQLite3 for lightweight deployment

### 2.5 Assumptions and Dependencies

- Each employee belongs to one department
- Each department has exactly one manager
- Each project belongs to one department
- The system depends on an underlying SQL RDBMS environment
- Single organizational unit deployment
- English language interface
- Standard web browser compatibility required

### 2.6 Database Normalization Strategy

The database uses progressive normalization up to **BCNF** to:

- Ensure atomic attribute dependencies
- Eliminate redundancy and update anomalies
- Improve consistency in join-based queries (especially analytical joins)
- Maintain **future extensibility** for multimodal data types (BLOB for images, Spatial for geographic data)

---

## 3. Specific Requirements

### 3.1 Functional Requirements

| **ID**   | **Requirement Description**                                                                                                                          | **Priority** |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| **FR1**  | The system shall allow creation of new Employee records, including SSN, Name, Birth Date, Address, Sex, Salary, Department No, and Supervisor SSN.   | High         |
| **FR2**  | The system shall allow retrieval and listing of all Employees with their related Department, Supervisor, and Project Assignments.                    | High         |
| **FR3**  | The system shall allow updating Employee attributes except the primary key (SSN).                                                                    | High         |
| **FR4**  | The system shall allow deletion of an Employee only if referential constraints (e.g., dependents, assignments) permit.                               | High         |
| **FR5**  | The system shall allow creation of new Departments with Department Number, Name, Manager SSN, and Start Date.                                        | High         |
| **FR6**  | The system shall allow updating Department details, including Manager assignment.                                                                    | Medium       |
| **FR7**  | The system shall allow deletion of Departments with proper restriction checks.                                                                       | Medium       |
| **FR8**  | The system shall allow creation of Project records with Project Number, Name, Location, and owning Department Number.                                | High         |
| **FR9**  | The system shall allow updating Project details and Department assignment.                                                                           | Medium       |
| **FR10** | The system shall allow deleting Projects and automatically remove related Work Assignments.                                                          | Medium       |
| **FR11** | The system shall allow assigning an Employee to a Project with recorded weekly Hours (0–80).                                                         | High         |
| **FR12** | The system shall allow updating the Hours in a Work Assignment.                                                                                      | Medium       |
| **FR13** | The system shall allow removing an Employee–Project assignment.                                                                                      | Medium       |
| **FR14** | The system shall allow creation of Dependent records linked to Employees.                                                                            | Medium       |
| **FR15** | The system shall allow updating and deleting Dependent records.                                                                                      | Medium       |
| **FR16** | The system shall enforce referential integrity between Employees–Departments, Employees–Supervisors, Projects–Departments, and Dependents–Employees. | High         |
| **FR17** | The system shall allow execution of join queries combining Employees, Departments, Projects, Supervisors, and Dependents.                            | High         |
| **FR18** | The system shall allow displaying Employee supervisory hierarchy (recursive self-join).                                                              | Medium       |
| **FR19** | The system shall allow searching/filtering across all entity categories.                                                                             | Medium       |
| **FR20** | The system shall allow consistent CRUD operations through the React front-end with backend validation.                                               | High         |

### 3.2 Non-Functional Requirements

| **ID**    | **Category**    | **Requirement Description**                                                                                   | **Priority** |
| --------- | --------------- | ------------------------------------------------------------------------------------------------------------- | ------------ |
| **NFR1**  | Performance     | Query execution for up to 1,000 rows shall complete within 2 seconds.                                         | High         |
| **NFR2**  | Performance     | Joins involving up to 4 tables (Employee–Works_On–Project–Department) shall execute under 3 seconds.          | High         |
| **NFR3**  | Reliability     | The system shall enforce PK, FK, CHECK, and NOT NULL constraints to prevent invalid data insertion.           | High         |
| **NFR4**  | Reliability     | Delete operations shall follow cascade/restrict rules to ensure no orphan records.                            | High         |
| **NFR5**  | Security        | User input to the backend shall be validated to prevent SQL injection.                                        | High         |
| **NFR6**  | Security        | Only authorized backend endpoints may modify database records.                                                | High         |
| **NFR7**  | Maintainability | The schema shall be structured in BCNF to reduce anomalies and ease schema evolution.                         | Medium       |
| **NFR8**  | Scalability     | The system architecture (React + Node + SQLite) shall support migration to PostgreSQL/MySQL without redesign. | Medium       |
| **NFR9**  | Usability       | UI forms shall validate all inputs client-side before sending to backend.                                     | Medium       |
| **NFR10** | Availability    | The system shall ensure ACID-compliant commits via SQLite transaction support.                                | Medium       |

---

## 4. Database Design

### 4.1 Entity and Attribute Definitions

1. **EMPLOYEE**(SSN, Name, Birth_Date, Address, Sex, Salary, Supervisor_SSN, Dept_No)
2. **DEPARTMENT**(Dnumber, Dname, Location, Manager_SSN, Mgr_start_date)
3. **PROJECT**(Pnumber, Pname, Plocation, Dnum)
4. **WORKS_ON**(Essn, Pno, Hours)
5. **DEPENDENT**(ID, Essn, Dependent_name, Sex, Bdate, Relationship)

### 4.2 Relational Schema (DDL)

````sql
-- Department Entity (Created first due to FK dependencies)
CREATE TABLE DEPARTMENT (
    Dnumber INTEGER PRIMARY KEY,
    Dname VARCHAR(50) UNIQUE NOT NULL,
    Location VARCHAR(100),
    Manager_SSN VARCHAR(11) UNIQUE,
    Mgr_start_date DATE NOT NULL
);

-- Employee Entity
CREATE TABLE EMPLOYEE (
    SSN VARCHAR(11) PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Birth_Date DATE,
    Address VARCHAR(200),
    Sex CHAR(1) CHECK(Sex IN ('M','F')),
    Salary DECIMAL(10,2) CHECK(Salary > 0),
    Supervisor_SSN VARCHAR(11),
    Dept_No INTEGER,
    FOREIGN KEY (Supervisor_SSN) REFERENCES EMPLOYEE(SSN),
    FOREIGN KEY (Dept_No) REFERENCES DEPARTMENT(Dnumber)
);

-- Add Manager FK constraint after EMPLOYEE table exists
ALTER TABLE DEPARTMENT
ADD FOREIGN KEY (Manager_SSN) REFERENCES EMPLOYEE(SSN);

-- Project Entity
CREATE TABLE PROJECT (
    Pnumber INTEGER PRIMARY KEY,
    Pname VARCHAR(100) UNIQUE NOT NULL,
    Plocation VARCHAR(50),
    Dnum INTEGER,
    FOREIGN KEY (Dnum) REFERENCES DEPARTMENT(Dnumber)
);

-- Works_On/Assignment Entity
CREATE TABLE WORKS_ON (
    Essn VARCHAR(11),
    Pno INTEGER,
    Hours DECIMAL(4,1) CHECK(Hours BETWEEN 0 AND 80),
    PRIMARY KEY (Essn, Pno),
    FOREIGN KEY (Essn) REFERENCES EMPLOYEE(SSN),
    FOREIGN KEY (Pno) REFERENCES PROJECT(Pnumber)
);

-- Dependent Entity
CREATE TABLE DEPENDENT (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Essn VARCHAR(11),
    Dependent_name VARCHAR(50),
    Sex CHAR(1) CHECK(Sex IN ('M','F')),
    Bdate DATE,
    Relationship VARCHAR(20) CHECK(Relationship IN ('Spouse','Son','Daughter','Parent','Other')),
    FOREIGN KEY (Essn) REFERENCES EMPLOYEE(SSN) ON DELETE CASCADE
);
```### 4.3 Normalization Process

| **Normal Form** | **Description** | **Achieved Purpose** |
|-----------------|-----------------|---------------------|
| **1NF** | Atomic attribute values; repeating groups removed | Each column contains indivisible data |
| **2NF** | Non-key attributes depend on full PK | Partial dependencies removed |
| **3NF** | Transitive dependencies removed | No non-key attribute depends on another non-key |
| **BCNF** | Every determinant is a candidate key | Functional dependencies refined |

**Result:** Each table in Employee Management DB is in **BCNF**, allowing optimal join-based query decomposition.
The EMPLOYEE–WORKS_ON–PROJECT join is lossless, maintaining full consistency.

### 4.4 Advanced Joins and Analytical Views (Level 7 Optimization)

**Example Derived Views:**

```sql
-- Comprehensive Employee-Project View
CREATE VIEW EMP_PROJECT_VIEW AS
SELECT E.SSN, E.Name, D.Dname AS Department, P.Pname AS Project, W.Hours
FROM EMPLOYEE E
JOIN WORKS_ON W ON E.SSN = W.Essn
JOIN PROJECT P ON P.Pnumber = W.Pno
JOIN DEPARTMENT D ON D.Dnumber = E.Dept_No;

-- Management Hierarchy View
CREATE VIEW MANAGEMENT_HIERARCHY AS
SELECT E.SSN, E.Name AS Employee, S.Name AS Supervisor, D.Dname AS Department
FROM EMPLOYEE E
LEFT JOIN EMPLOYEE S ON E.Supervisor_SSN = S.SSN
JOIN DEPARTMENT D ON E.Dept_No = D.Dnumber;
````

**Example Analytical Queries:**

- Q1: List total hours each employee worked per project
- Q2: Find employees supervised by a manager working on the same project
- Q3: Aggregate average salary per department
- Q4: Identify departments managing projects at multiple locations

**Performance Optimization:**

- Create indexes on all FK columns (e.g., Essn, Pno, Dept_No)
- Use materialized views for complex analytical joins
- Employ query rewriting for automatic join optimization

### 4.5 Table Definitions (Core Schema with Indexes)

```sql
-- Performance Indexes for Join Optimization
CREATE INDEX idx_employee_dept_no ON EMPLOYEE(Dept_No);
CREATE INDEX idx_employee_supervisor ON EMPLOYEE(Supervisor_SSN);
CREATE INDEX idx_works_on_essn ON WORKS_ON(Essn);
CREATE INDEX idx_works_on_pno ON WORKS_ON(Pno);
CREATE INDEX idx_project_dnum ON PROJECT(Dnum);
CREATE INDEX idx_dependent_essn ON DEPENDENT(Essn);
```

These indexes support high-performance joins in analytical workloads and ensure optimal query execution times.

---

## 5. System Features

### 5.1 Data Integrity Features

| Feature                    | Implementation                               | Benefit                                           |
| -------------------------- | -------------------------------------------- | ------------------------------------------------- |
| **Normalization**          | BCNF schema design                           | Eliminates update anomalies and data redundancy   |
| **Constraint Enforcement** | CHECK, UNIQUE, NOT NULL constraints          | Ensures data quality and business rule compliance |
| **Referential Integrity**  | Foreign key constraints with CASCADE options | Maintains relationship consistency                |
| **Transaction Support**    | ACID-compliant operations                    | Ensures data consistency during concurrent access |

### 5.2 Reporting and Query Capabilities

#### Supported Query Types

- **Employee-Department Joins**: Manager and departmental reporting
- **Project-Assignment Analysis**: Resource allocation and workload distribution
- **Hierarchical Queries**: Supervisory relationship traversal
- **Aggregate Reporting**: Salary statistics, project hours summation
- **Cross-Entity Analytics**: Multi-table complex reporting

### 5.3 Advanced Features

- **Recursive Relationships**: Employee supervisory hierarchy management
- **Composite Keys**: Multi-attribute primary keys for dependent and assignment entities
- **Temporal Data**: Manager start dates and dependent birthdates
- **Gender Constraints**: Validated enumeration values

---

## 6. External Interface Requirements

| **Interface Type** | **Description**                                                                                             |
| ------------------ | ----------------------------------------------------------------------------------------------------------- |
| **User Interface** | React.js web application with responsive design; SQL console/DBMS GUI compatibility                         |
| **Hardware**       | Standard server/workstation: 4GB RAM, Dual-core 2.0 GHz, 500MB storage, Broadband network                   |
| **Software**       | SQLite3 RDBMS, Node.js runtime (16.x+), Modern web browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+) |
| **Communication**  | RESTful APIs for client-server communication; Local DB connection (JDBC/ODBC compatible)                    |

**Integration Capability:**  
Supports integration with data analytics tools (e.g., Power BI, Tableau, or SQL-based dashboards) for join-based queries and reporting.

---

## 7. Validation and Verification

### 7.1 Test Cases

| **Test ID** | **Test Category**     | **Test Description**                       | **Input**                            | **Expected Result**                               | **Priority** |
| ----------- | --------------------- | ------------------------------------------ | ------------------------------------ | ------------------------------------------------- | ------------ |
| **T1**      | Referential Integrity | Insert Employee with valid Department      | Dept_No exists in DEPARTMENT         | Insert successful                                 | High         |
| **T2**      | Referential Integrity | Insert Employee with invalid Dept_No       | Dept_No = 999 (non-existent)         | FK violation error                                | High         |
| **T3**      | Data Integrity        | Insert Employee with negative salary       | Salary = -100                        | CHECK constraint violation                        | High         |
| **T4**      | Business Logic        | Assign Employee to Project with >80 hours  | Hours = 120                          | CHECK constraint failure (Hours BETWEEN 0 AND 80) | High         |
| **T5**      | Cascade Operations    | Delete Employee who has Dependents         | Employee SSN referenced in DEPENDENT | Dependent records cascade deleted                 | High         |
| **T6**      | Complex Queries       | Execute 4-table join query                 | Employee–Works_On–Project–Department | Correct combined dataset within 3 seconds         | Medium       |
| **T7**      | Primary Key           | Insert Employee with duplicate SSN         | Existing SSN value                   | PK violation error                                | High         |
| **T8**      | Referential Integrity | Insert Dependent for non-existent Employee | SSN not found in EMPLOYEE            | FK violation error                                | Medium       |
| **T9**      | Supervisory Hierarchy | Display Employee supervisory chain         | Recursive self-join query            | Correct hierarchical display                      | Medium       |
| **T10**     | Unique Constraints    | Insert Department with duplicate name      | Existing Department name             | UNIQUE constraint violation                       | Medium       |

### 7.2 Verification Methods

| Verification Type       | Method                                      | Coverage                        |
| ----------------------- | ------------------------------------------- | ------------------------------- |
| **Schema Validation**   | DDL script execution and constraint testing | Database structure integrity    |
| **Functional Testing**  | CRUD operation validation for all entities  | Complete functionality coverage |
| **Performance Testing** | Query execution time measurement            | System performance requirements |
| **Integration Testing** | End-to-end workflow validation              | System component interaction    |

---

## 8. Appendix

### 8.1 Future Enhancements

- **Add Image Storage (BLOB)** for employee profile photos - **[IMPLEMENTED IN SRS DOCUMENT 2]**
- Add spatial attributes (e.g., project site geometry)
- Implement temporal tables for salary history tracking
- Advanced analytics and business intelligence dashboards
- Mobile application development
- Real-time data synchronization capabilities

### 8.2 Document History

| **Version** | **Date**     | **Description**                                                           |
| ----------- | ------------ | ------------------------------------------------------------------------- |
| **1.0**     | **Nov 2025** | Initial draft for normalized Employee Management DB with BCNF achievement |

---

**Compliance:**  
This enhanced SRS complies with **IEEE 830 and ISO/IEC/IEEE 29148**, including:

- Structured requirement hierarchy
- Full traceability of normalization design
- Testability of join and view operations
- Integration readiness for analytical tools

---

**Page 1 of 2**

---

---

