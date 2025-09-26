# 🏢 Employee Management System

<div align="center">

![Employee Management System](https://img.shields.io/badge/Employee-Management%20System-blue?style=for-the-badge&logo=office&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A comprehensive, full-stack Employee Management System with modern web technologies**

_Built with ❤️ for seamless HR operations and workforce management_

</div>

---

## 🌟 **Overview**

Welcome to the **Employee Management System** - a cutting-edge, full-stack web application designed to revolutionize how organizations manage their workforce. This system combines the power of React with TypeScript on the frontend and Node.js with Express on the backend, all backed by a robust SQLite3 database.

Our system provides a **complete ecosystem** for managing employees, departments, projects, dependents, and work assignments through an intuitive, responsive web interface that works seamlessly across all devices.

---

## ✨ **Core Features & Capabilities**

### 👥 **Employee Management**

- ➕ **Create New Employees**: Add comprehensive employee profiles with SSN, personal details, salary information
- ✏️ **Edit Employee Records**: Update any employee information including personal data, salary, department assignments
- 🗑️ **Delete Employees**: Remove employee records with confirmation dialogs for data safety
- 👀 **View Employee Details**: Display complete employee information including department and supervisor relationships
- 🔍 **Advanced Search**: Search employees by name, SSN, or department with real-time filtering
- 💰 **Salary Management**: Track and update employee compensation with formatted currency display
- 👨‍💼 **Supervisor Relationships**: Establish and manage hierarchical reporting structures
- 🏢 **Department Assignment**: Link employees to specific departments with automatic relationship updates

### 🏬 **Department Management**

- 🆕 **Create Departments**: Establish new organizational units with unique identifiers
- 📝 **Edit Department Info**: Update department names, locations, and management assignments
- 🗂️ **Department Details**: View comprehensive department information including manager details
- 📍 **Location Tracking**: Manage physical locations and office assignments
- 👨‍💼 **Manager Assignment**: Assign and update department managers from employee roster
- 📅 **Start Date Tracking**: Record when departments were established or managers assigned
- 🔄 **Department Transfers**: Support employee movement between departments
- 📊 **Department Analytics**: View department-specific employee counts and statistics

### 🎯 **Project Management**

- 🚀 **Create Projects**: Launch new projects with unique identifiers and descriptions
- 📋 **Project Details**: Maintain comprehensive project information and specifications
- 🏢 **Department Assignment**: Link projects to responsible departments
- 📍 **Location Management**: Track where projects are being executed
- ✏️ **Update Projects**: Modify project details, locations, and department assignments
- 🗑️ **Project Deletion**: Remove completed or cancelled projects safely
- 🔍 **Project Search**: Find projects by name, location, or department
- 📈 **Project Tracking**: Monitor project assignments and resource allocation

### 👨‍👩‍👧‍👦 **Dependent Management**

- 👶 **Add Dependents**: Register employee family members and dependents
- 📝 **Dependent Details**: Maintain comprehensive dependent information including relationships
- 🎂 **Age Tracking**: Record and display dependent birth dates with automatic age calculation
- 👫 **Relationship Types**: Support various relationship types (Spouse, Son, Daughter, Parent, Other)
- ⚧️ **Gender Information**: Track dependent gender information for HR records
- 🔄 **Update Dependent Info**: Modify dependent details as family situations change
- 🗑️ **Remove Dependents**: Delete dependent records when no longer applicable
- 🔍 **Dependent Search**: Search dependents by name, employee, or relationship type

### 📊 **Assignment Management**

- 🎯 **Create Assignments**: Assign employees to specific projects with hour allocations
- ⏰ **Hour Tracking**: Monitor weekly work hour commitments per project
- 📋 **Assignment Details**: View comprehensive assignment information
- 🔄 **Update Assignments**: Modify work hour allocations and project assignments
- 🗑️ **Remove Assignments**: End project assignments when work is completed
- 👥 **Employee Workload**: Track total work hours across all employee assignments
- 🎯 **Project Staffing**: View all employees assigned to specific projects
- ⚖️ **Workload Balance**: Ensure proper distribution of work hours (max 80 hours/week)

### 🔍 **Advanced Search & Filtering**

- 🎯 **Real-time Search**: Instant search results as you type across all entities
- 🏷️ **Multi-field Search**: Search across names, IDs, departments, and other relevant fields
- 📱 **Responsive Search**: Optimized search experience on all device sizes
- 🔄 **Dynamic Filtering**: Live filtering of results without page refreshes
- 📊 **Search Highlighting**: Visual highlighting of search terms in results
- 🚀 **Fast Performance**: Optimized search algorithms for quick results

### 🎨 **User Interface & Experience**

- 📱 **Fully Responsive**: Seamless experience across desktop, tablet, and mobile devices
- 🎨 **Modern Design**: Clean, intuitive interface with Tailwind CSS styling
- 🌈 **Color-coded Sections**: Different color themes for each management section
- 🖼️ **Beautiful Icons**: Lucide React icons for enhanced visual appeal
- ⚡ **Fast Loading**: Optimized performance with loading states and smooth transitions
- 🔄 **Real-time Updates**: Instant UI updates after data operations
- 📋 **Form Validation**: Client-side validation with helpful error messages
- 🎯 **Intuitive Navigation**: Easy-to-use navigation between different sections

---

## 🛠️ **Technology Stack**

<div align="center">

### 🎨 **Frontend Technologies**

| Technology                                                                                            | Version | Purpose      | Features                          |
| ----------------------------------------------------------------------------------------------------- | ------- | ------------ | --------------------------------- |
| ![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)               | 18.2.0  | UI Framework | Hooks, Context, Components        |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-3178C6?style=flat-square&logo=typescript) | 5.0.2   | Type Safety  | Interfaces, Generics, Type Guards |
| ![Tailwind](https://img.shields.io/badge/Tailwind-3.3.0-38B2AC?style=flat-square&logo=tailwind-css)   | 3.3.0   | Styling      | Responsive, Utility-first         |
| ![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF?style=flat-square&logo=vite)                   | 4.4.5   | Build Tool   | Fast HMR, Optimized Builds        |
| ![Lucide](https://img.shields.io/badge/Lucide-0.263.1-FF6B6B?style=flat-square)                       | 0.263.1 | Icons        | Modern, Consistent Icons          |

### ⚙️ **Backend Technologies**

| Technology                                                                                     | Version | Purpose       | Features                       |
| ---------------------------------------------------------------------------------------------- | ------- | ------------- | ------------------------------ |
| ![Node.js](https://img.shields.io/badge/Node.js-18.17.0-339933?style=flat-square&logo=node.js) | 18.17.0 | Runtime       | Event-driven, Non-blocking I/O |
| ![Express](https://img.shields.io/badge/Express-4.18.2-000000?style=flat-square&logo=express)  | 4.18.2  | Web Framework | RESTful APIs, Middleware       |
| ![SQLite3](https://img.shields.io/badge/SQLite3-5.1.6-003B57?style=flat-square&logo=sqlite)    | 5.1.6   | Database      | Local, Serverless, ACID        |
| ![CORS](https://img.shields.io/badge/CORS-2.8.5-FF6B35?style=flat-square)                      | 2.8.5   | Cross-Origin  | Secure API Access              |

</div>

---

## 🗄️ **Database Architecture**

<div align="center">

### 📊 **SQLite3 Database Schema**

_Robust, ACID-compliant local database with optimized relationships_

</div>

Our system utilizes a comprehensive SQLite3 database with carefully designed relationships and constraints:

### 📋 **Table Structures**

#### 👥 **Employee Table**

```sql
CREATE TABLE Employee (
    ssn TEXT PRIMARY KEY,           -- Social Security Number (Unique Identifier)
    name TEXT NOT NULL,             -- Full Employee Name
    birth_date DATE NOT NULL,       -- Date of Birth
    address TEXT NOT NULL,          -- Physical Address
    sex CHAR(1) CHECK(sex IN ('M', 'F')), -- Gender (M/F)
    salary DECIMAL(10,2) NOT NULL,  -- Annual Salary
    dept_no INTEGER,                -- Department Number (Foreign Key)
    supervisor_ssn TEXT,            -- Supervisor SSN (Self Reference)
    FOREIGN KEY (dept_no) REFERENCES Department(dept_no),
    FOREIGN KEY (supervisor_ssn) REFERENCES Employee(ssn)
);
```

#### 🏢 **Department Table**

```sql
CREATE TABLE Department (
    dept_no INTEGER PRIMARY KEY,    -- Department Number
    dept_name TEXT UNIQUE NOT NULL, -- Department Name
    location TEXT NOT NULL,         -- Department Location
    manager_ssn TEXT,               -- Manager SSN (Foreign Key)
    start_date DATE NOT NULL,       -- Department Start Date
    FOREIGN KEY (manager_ssn) REFERENCES Employee(ssn)
);
```

#### 🎯 **Project Table**

```sql
CREATE TABLE Project (
    proj_no INTEGER PRIMARY KEY,    -- Project Number
    proj_name TEXT NOT NULL,        -- Project Name
    location TEXT NOT NULL,         -- Project Location
    dept_no INTEGER NOT NULL,       -- Controlling Department
    FOREIGN KEY (dept_no) REFERENCES Department(dept_no)
);
```

#### 📊 **Works_On Table** (Assignment Junction)

```sql
CREATE TABLE Works_On (
    ssn TEXT,                       -- Employee SSN
    proj_no INTEGER,                -- Project Number
    hours DECIMAL(3,1) NOT NULL CHECK(hours >= 0 AND hours <= 80), -- Weekly Hours
    PRIMARY KEY (ssn, proj_no),
    FOREIGN KEY (ssn) REFERENCES Employee(ssn) ON DELETE CASCADE,
    FOREIGN KEY (proj_no) REFERENCES Project(proj_no) ON DELETE CASCADE
);
```

#### 👨‍👩‍👧‍👦 **Dependent Table**

```sql
CREATE TABLE Dependent (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- Unique Dependent ID
    ssn TEXT NOT NULL,                     -- Employee SSN
    dep_name TEXT NOT NULL,                -- Dependent Name
    sex CHAR(1) CHECK(sex IN ('M', 'F')),  -- Gender
    birth_date DATE NOT NULL,              -- Birth Date
    relationship TEXT NOT NULL,            -- Relationship Type
    FOREIGN KEY (ssn) REFERENCES Employee(ssn) ON DELETE CASCADE
);
```

### 🔗 **Database Relationships**

- **Employee → Department**: Many-to-One (employees belong to departments)
- **Employee → Employee**: One-to-Many (supervisor relationships)
- **Department → Employee**: One-to-One (department managers)
- **Project → Department**: Many-to-One (projects belong to departments)
- **Employee ↔ Project**: Many-to-Many (through Works_On table)
- **Employee → Dependent**: One-to-Many (employees have dependents)

### 📈 **Database Features**

- 🔒 **ACID Compliance**: Ensures data integrity and consistency
- 🚀 **Optimized Queries**: Indexed fields for fast search operations
- 🔄 **CASCADE Operations**: Automatic cleanup of related records
- ✅ **Data Validation**: CHECK constraints for data quality
- 🔑 **Primary/Foreign Keys**: Maintains referential integrity
- 📊 **Join Optimizations**: Efficient table relationships

---

## 🚀 **Installation & Setup Guide**

<div align="center">

### ⚡ **Quick Start in 5 Minutes**

_Get up and running with our comprehensive setup guide_

</div>

### 📋 **Prerequisites**

Before starting, ensure you have the following installed:

- 🟢 **Node.js** (v16.0.0 or higher) - [Download Here](https://nodejs.org/)
- 📦 **npm** (comes with Node.js) or **yarn**
- 🗄️ **SQLite3** (pre-installed on macOS/Linux, Windows users need to install)
- 💻 **Git** (for cloning the repository)
- 🌐 **Modern Web Browser** (Chrome, Firefox, Safari, Edge)

### 🔧 **Backend Setup**

#### Step 1: Navigate to Backend Directory

```bash
cd backend/
```

#### Step 2: Install Dependencies

```bash
npm install
```

**Dependencies Installed:**

- `express` - Web framework
- `sqlite3` - Database driver
- `cors` - Cross-origin resource sharing
- `nodemon` - Development auto-restart

#### Step 3: Initialize Database

```bash
# Database will be created automatically on first run
# Sample data will be populated automatically
```

#### Step 4: Start Backend Server

```bash
npm start
# or for development with auto-restart:
npm run dev
```

✅ **Backend Ready!** Server running at `http://localhost:5000`

### 🎨 **Frontend Setup**

#### Step 1: Navigate to Project Root

```bash
cd ../ # from backend directory
```

#### Step 2: Install Dependencies

```bash
npm install
```

**Dependencies Installed:**

- `react` - UI library
- `typescript` - Type safety
- `tailwindcss` - Styling framework
- `lucide-react` - Icon library
- `vite` - Build tool and dev server

#### Step 3: Start Development Server

```bash
npm run dev
```

✅ **Frontend Ready!** Application running at `http://localhost:5173`

### 🐳 **Alternative: Docker Setup** (Optional)

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or run individual containers
docker build -t emp-backend ./backend
docker build -t emp-frontend .
docker run -p 5000:5000 emp-backend
docker run -p 5173:5173 emp-frontend
```

### 🔍 **Verification Steps**

1. ✅ Backend health check: `curl http://localhost:5000/api/employees`
2. ✅ Frontend accessibility: Open `http://localhost:5173` in browser
3. ✅ Database creation: Check for `backend/database.db` file
4. ✅ Sample data: Verify employees appear in the UI

### 🛠️ **Development Environment**

#### Recommended VS Code Extensions:

- ES7+ React/Redux/React-Native snippets
- TypeScript Importer
- Tailwind CSS IntelliSense
- SQLite Viewer
- Thunder Client (for API testing)

---

## 🌐 **RESTful API Documentation**

<div align="center">

### 📡 **Comprehensive API Reference**

_Complete REST API with full CRUD operations and advanced querying_

**Base URL:** `http://localhost:5000/api`

</div>

### 👥 **Employee Endpoints**

| Method      | Endpoint          | Description                                              | Request Body    | Response                  |
| ----------- | ----------------- | -------------------------------------------------------- | --------------- | ------------------------- |
| 🟢 `GET`    | `/employees`      | Retrieve all employees with department & supervisor info | None            | Array of employee objects |
| 🟢 `GET`    | `/employees/:ssn` | Get specific employee by SSN                             | None            | Single employee object    |
| 🟡 `POST`   | `/employees`      | Create new employee record                               | Employee object | Created employee with ID  |
| 🔵 `PUT`    | `/employees/:ssn` | Update existing employee                                 | Updated fields  | Updated employee object   |
| 🔴 `DELETE` | `/employees/:ssn` | Remove employee record                                   | None            | Success confirmation      |

**Employee Object Structure:**

```json
{
  "ssn": "123456789",
  "name": "John Smith",
  "birth_date": "1985-06-15",
  "address": "123 Main St, New York",
  "sex": "M",
  "salary": 75000,
  "dept_no": 1,
  "supervisor_ssn": "987654321",
  "dept_name": "Engineering",
  "supervisor_name": "Jane Manager"
}
```

### 🏢 **Department Endpoints**

| Method      | Endpoint                | Description                           | Request Body      | Response                    |
| ----------- | ----------------------- | ------------------------------------- | ----------------- | --------------------------- |
| 🟢 `GET`    | `/departments`          | Get all departments with manager info | None              | Array of department objects |
| 🟢 `GET`    | `/departments/:dept_no` | Get specific department               | None              | Single department object    |
| 🟡 `POST`   | `/departments`          | Create new department                 | Department object | Created department          |
| 🔵 `PUT`    | `/departments/:dept_no` | Update department details             | Updated fields    | Updated department          |
| 🔴 `DELETE` | `/departments/:dept_no` | Remove department                     | None              | Success confirmation        |

**Department Object Structure:**

```json
{
  "dept_no": 1,
  "dept_name": "Engineering",
  "location": "Building A, Floor 3",
  "manager_ssn": "123456789",
  "start_date": "2020-01-15",
  "manager_name": "John Smith"
}
```

### 🎯 **Project Endpoints**

| Method      | Endpoint             | Description                           | Request Body   | Response                 |
| ----------- | -------------------- | ------------------------------------- | -------------- | ------------------------ |
| 🟢 `GET`    | `/projects`          | Get all projects with department info | None           | Array of project objects |
| 🟢 `GET`    | `/projects/:proj_no` | Get specific project                  | None           | Single project object    |
| 🟡 `POST`   | `/projects`          | Create new project                    | Project object | Created project          |
| 🔵 `PUT`    | `/projects/:proj_no` | Update project details                | Updated fields | Updated project          |
| 🔴 `DELETE` | `/projects/:proj_no` | Remove project                        | None           | Success confirmation     |

**Project Object Structure:**

```json
{
  "proj_no": 101,
  "proj_name": "Mobile App Development",
  "location": "Remote/Hybrid",
  "dept_no": 1,
  "dept_name": "Engineering"
}
```

### 👨‍👩‍👧‍👦 **Dependent Endpoints**

| Method      | Endpoint                    | Description                           | Request Body     | Response                   |
| ----------- | --------------------------- | ------------------------------------- | ---------------- | -------------------------- |
| 🟢 `GET`    | `/dependents`               | Get all dependents with employee info | None             | Array of dependent objects |
| 🟢 `GET`    | `/dependents/:id`           | Get specific dependent                | None             | Single dependent object    |
| 🟢 `GET`    | `/dependents/employee/:ssn` | Get dependents by employee            | None             | Array of dependents        |
| 🟡 `POST`   | `/dependents`               | Add new dependent                     | Dependent object | Created dependent          |
| 🔵 `PUT`    | `/dependents/:id`           | Update dependent info                 | Updated fields   | Updated dependent          |
| 🔴 `DELETE` | `/dependents/:id`           | Remove dependent                      | None             | Success confirmation       |

**Dependent Object Structure:**

```json
{
  "id": 1,
  "ssn": "123456789",
  "dep_name": "Alice Smith",
  "sex": "F",
  "birth_date": "2010-03-15",
  "relationship": "Daughter",
  "employee_name": "John Smith"
}
```

### 📊 **Assignment Endpoints** (Works_On)

| Method      | Endpoint                        | Description                | Request Body      | Response                    |
| ----------- | ------------------------------- | -------------------------- | ----------------- | --------------------------- |
| 🟢 `GET`    | `/assignments`                  | Get all work assignments   | None              | Array of assignment objects |
| 🟢 `GET`    | `/assignments/employee/:ssn`    | Get employee's assignments | None              | Array of assignments        |
| 🟢 `GET`    | `/assignments/project/:proj_no` | Get project's assignments  | None              | Array of assignments        |
| 🟡 `POST`   | `/assignments`                  | Create work assignment     | Assignment object | Created assignment          |
| 🔵 `PUT`    | `/assignments/:ssn/:proj_no`    | Update assignment hours    | Updated fields    | Updated assignment          |
| 🔴 `DELETE` | `/assignments/:ssn/:proj_no`    | Remove assignment          | None              | Success confirmation        |

**Assignment Object Structure:**

```json
{
  "ssn": "123456789",
  "proj_no": 101,
  "hours": 20.5,
  "employee_name": "John Smith",
  "proj_name": "Mobile App Development"
}
```

### 🔧 **API Features**

- ✅ **Error Handling**: Comprehensive error responses with status codes
- 🔒 **Data Validation**: Input validation on all endpoints
- 🚀 **Performance**: Optimized queries with joins for related data
- 📊 **Relationships**: Automatic population of related entity names
- 🔄 **CORS Enabled**: Cross-origin requests supported
- 📝 **JSON Format**: All requests/responses in JSON format
- ⚡ **Fast Response**: Optimized database queries for speed

### 📋 **HTTP Status Codes**

| Code | Meaning      | Usage                          |
| ---- | ------------ | ------------------------------ |
| 200  | OK           | Successful GET, PUT operations |
| 201  | Created      | Successful POST operations     |
| 400  | Bad Request  | Invalid request data           |
| 404  | Not Found    | Resource doesn't exist         |
| 500  | Server Error | Database or server issues      |

---

## 📊 **Sample Data & Demo Content**

<div align="center">

### 🎲 **Rich Demo Dataset**

_Pre-loaded with realistic data for immediate exploration_

</div>

The system automatically populates with comprehensive sample data on first startup:

### 👥 **Sample Employees** (5 Records)

| SSN         | Name         | Department  | Role              | Salary  |
| ----------- | ------------ | ----------- | ----------------- | ------- |
| `123456789` | John Smith   | Engineering | Senior Developer  | $75,000 |
| `234567890` | Jane Doe     | Engineering | Software Engineer | $68,000 |
| `345678901` | Mike Johnson | Marketing   | Marketing Manager | $55,000 |
| `456789012` | Sarah Wilson | HR          | HR Specialist     | $62,000 |
| `1000`      | Divyansh     | Engineering | Junior Developer  | $30,000 |

### 🏢 **Sample Departments** (3 Records)

| Dept# | Name        | Location            | Manager      | Start Date |
| ----- | ----------- | ------------------- | ------------ | ---------- |
| `1`   | Engineering | Building A, Floor 3 | John Smith   | 2020-01-15 |
| `2`   | Marketing   | Building B, Floor 2 | Mike Johnson | 2020-03-01 |
| `3`   | HR          | Building A, Floor 1 | Sarah Wilson | 2020-02-10 |

### 🎯 **Sample Projects** (3 Records)

| Proj# | Name                       | Location      | Department  |
| ----- | -------------------------- | ------------- | ----------- |
| `101` | Mobile App Development     | Remote/Hybrid | Engineering |
| `102` | Brand Redesign             | Building B    | Marketing   |
| `103` | Employee Onboarding System | Building A    | HR          |

### 👨‍👩‍👧‍👦 **Sample Dependents** (Multiple Records)

- Family members across different relationship types
- Age ranges from children to elderly parents
- Realistic demographic distribution

### 📊 **Sample Assignments** (Active Projects)

- Work hour distributions from 10-40 hours per week
- Multiple employees on shared projects
- Realistic workload balancing

---

## 🎮 **User Guide & Navigation**

<div align="center">

### 🧭 **Complete Usage Instructions**

_Master all features with our comprehensive guide_

</div>

### 🚀 **Getting Started**

1. **Launch Application**

   ```bash
   # Terminal 1: Start Backend
   cd backend && npm start

   # Terminal 2: Start Frontend
   cd .. && npm run dev
   ```

2. **Access Application**

   - Open browser to `http://localhost:5173`
   - System loads with sample data automatically

3. **Navigation Overview**
   - 🏠 **Dashboard**: Quick overview and statistics
   - 👥 **Employees**: Complete workforce management
   - 🏢 **Departments**: Organizational structure
   - 🎯 **Projects**: Project tracking and management
   - 👨‍👩‍👧‍👦 **Dependents**: Family member records
   - 📊 **Assignments**: Work allocation and scheduling

### 🔄 **Core Workflows**

#### 👤 **Employee Management Workflow**

1. **Add New Employee**:

   - Click "Add Employee" button
   - Fill required fields (SSN, Name, Birth Date, Address, etc.)
   - Select department and supervisor
   - Set salary information
   - Submit to create record

2. **Edit Employee**:

   - Locate employee in list or use search
   - Click edit icon (pencil)
   - Modify any field except SSN
   - Save changes

3. **Search & Filter**:
   - Use search bar for real-time filtering
   - Search by name, SSN, or department
   - Results update instantly

#### 🏢 **Department Operations**

1. **Create Department**:

   - Specify unique department number
   - Add department name and location
   - Assign manager from employee list
   - Set establishment date

2. **Manage Departments**:
   - View in card layout with key information
   - Edit details including manager assignments
   - Track department start dates

#### 🎯 **Project Management**

1. **Project Creation**:

   - Assign unique project number
   - Define project name and location
   - Link to controlling department
   - Track project status

2. **Employee Assignment**:
   - Navigate to Assignments section
   - Create new work assignments
   - Specify weekly hour commitments
   - Monitor total workload per employee

### 🔍 **Advanced Features**

#### 📊 **Data Relationships**

- **Automatic Population**: Related data (names, departments) automatically populated
- **Referential Integrity**: System prevents orphaned records
- **Cascade Operations**: Dependent records handled appropriately

#### 🚀 **Performance Features**

- **Loading States**: Visual feedback during data operations
- **Error Handling**: Graceful error recovery and user messaging
- **Optimistic Updates**: UI updates immediately with server confirmation
- **Search Optimization**: Debounced search for better performance

#### 🎨 **UI/UX Features**

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Color Coding**: Each section has distinct color theme
- **Icon Integration**: Consistent iconography throughout
- **Form Validation**: Real-time validation with helpful messages

---

## 🗄️ **Database Management**

<div align="center">

### 💾 **Local SQLite Database**

_Serverless, zero-configuration database management_

</div>

### 📁 **Database File Location**

- **File**: `backend/database.db`
- **Format**: SQLite3 binary format
- **Size**: Approximately 50KB with sample data
- **Backup**: Simply copy the file to backup all data

### 🔧 **Database Operations**

#### 🔄 **Reset Database**

```bash
# Stop the backend server
# Delete the database file
rm backend/database.db

# Restart server - fresh database with sample data will be created
npm start
```

#### 📊 **View Database Contents**

```bash
# Install SQLite command line tool (if not installed)
brew install sqlite3  # macOS
sudo apt install sqlite3  # Ubuntu

# Open database
sqlite3 backend/database.db

# View tables
.tables

# Query data
SELECT * FROM Employee;
.quit
```

#### 💾 **Backup & Restore**

```bash
# Backup database
cp backend/database.db backup_$(date +%Y%m%d).db

# Restore from backup
cp backup_20241226.db backend/database.db
```

---

## 🛠️ **Development & Customization**

<div align="center">

### ⚙️ **Developer Resources**

_Extend and customize the system for your needs_

</div>

### 📁 **Project Structure**

```
employee-management-system/
├── 📁 backend/                 # Node.js API Server
│   ├── 📄 server.js           # Express server setup
│   ├── 📄 database.js         # Database initialization
│   ├── 📄 package.json        # Backend dependencies
│   ├── 📁 routes/             # API endpoint definitions
│   │   ├── 📄 employees.js    # Employee CRUD operations
│   │   ├── 📄 departments.js  # Department operations
│   │   ├── 📄 projects.js     # Project operations
│   │   ├── 📄 dependents.js   # Dependent operations
│   │   └── 📄 assignments.js  # Assignment operations
│   └── 🗄️ database.db        # SQLite database file
├── 📁 src/                    # React Frontend
│   ├── 📄 App.tsx             # Main application component
│   ├── 📄 main.tsx            # Application entry point
│   ├── 📁 components/         # React components
│   │   ├── 📄 Employees.tsx   # Employee management UI
│   │   ├── 📄 Departments.tsx # Department management UI
│   │   ├── 📄 Projects.tsx    # Project management UI
│   │   ├── 📄 Dependents.tsx  # Dependent management UI
│   │   └── 📄 Assignments.tsx # Assignment management UI
│   └── 📁 services/           # API communication
│       └── 📄 api.ts          # HTTP client configuration
├── 📄 package.json            # Frontend dependencies
├── 📄 tailwind.config.js      # Tailwind CSS configuration
├── 📄 vite.config.ts          # Vite build configuration
└── 📄 README.md              # This documentation
```

### 🔧 **Adding New Features**

#### 1. **New Database Table**

```sql
-- Add to backend/database.js
CREATE TABLE NewTable (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    created_date DATE DEFAULT CURRENT_DATE
);
```

#### 2. **New API Endpoints**

```javascript
// Create backend/routes/newtable.js
router.get("/", (req, res) => {
  // Implementation
});
```

#### 3. **New React Component**

```typescript
// Create src/components/NewTable.tsx
import React, { useState, useEffect } from "react";
import api from "../services/api";

function NewTable() {
  // Component implementation
}
```

### 🎨 **Customization Options**

#### **Color Themes**

- Modify Tailwind classes in components
- Update color schemes per section
- Add dark mode support

#### **Database Schema**

- Add new fields to existing tables
- Create relationships between entities
- Implement data validation rules

#### **API Extensions**

- Add filtering and sorting endpoints
- Implement pagination for large datasets
- Add data export functionality

---

## 🚨 **Troubleshooting Guide**

<div align="center">

### 🔧 **Common Issues & Solutions**

_Quick fixes for typical problems_

</div>

### ⚠️ **Common Issues**

#### 🔌 **Port Conflicts**

**Problem**: `Error: listen EADDRINUSE: address already in use`

**Solutions**:

```bash
# Find process using port 5000
lsof -ti:5000
kill -9 <PID>

# Or use different ports
# Backend: Change PORT in backend/server.js
# Frontend: Vite will auto-select available port
```

#### 🗄️ **Database Connection Issues**

**Problem**: `Error: SQLITE_CANTOPEN: unable to open database file`

**Solutions**:

```bash
# Check file permissions
ls -la backend/database.db

# Recreate database
rm backend/database.db
npm start  # Will recreate with sample data
```

#### 🌐 **CORS Errors**

**Problem**: `Access to fetch blocked by CORS policy`

**Solutions**:

- Ensure backend is running on port 5000
- Check CORS configuration in `backend/server.js`
- Verify frontend is making requests to correct URL

#### 📦 **Dependency Issues**

**Problem**: Module installation failures

**Solutions**:

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Use yarn as alternative
yarn install
```

### 🔍 **Debugging Tools**

#### **Backend Debugging**

```bash
# Enable debug mode
DEBUG=* npm start

# View API logs in console
# Use Thunder Client or Postman for API testing
```

#### **Frontend Debugging**

```javascript
// Add to components for debugging
console.log("Component state:", state);
console.log("API response:", response);

// Use React Developer Tools browser extension
```

### 📊 **Performance Monitoring**

- Monitor database file size growth
- Track API response times
- Watch for memory leaks in React components
- Use browser dev tools for performance analysis

---

## 📚 **Additional Resources**

<div align="center">

### 🎓 **Learning & References**

_Expand your knowledge with these resources_

</div>

### 📖 **Documentation Links**

- 📘 [React Documentation](https://reactjs.org/docs)
- 📙 [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- 📗 [Express.js Guide](https://expressjs.com/en/guide/)
- 📕 [SQLite Documentation](https://www.sqlite.org/docs.html)
- 📔 [Tailwind CSS Docs](https://tailwindcss.com/docs)

### 🛠️ **Development Tools**

- 🔧 **VS Code Extensions**: React snippets, TypeScript support
- 🧪 **Testing**: Jest, React Testing Library (not implemented yet)
- 📊 **Database Tools**: SQLite Browser, DBeaver
- 🌐 **API Testing**: Thunder Client, Postman, Insomnia

### 🚀 **Future Enhancements**

Potential improvements for the system:

- 🔐 **Authentication & Authorization**: User login and role-based access
- 📊 **Advanced Analytics**: Charts, reports, and dashboards
- 📤 **Data Export**: PDF reports, CSV exports, Excel integration
- 🔄 **Real-time Updates**: WebSocket integration for live updates
- 📱 **Mobile App**: React Native mobile version
- 🌙 **Dark Mode**: Theme switching capability
- 📧 **Notifications**: Email alerts for important events
- 🔍 **Advanced Search**: Full-text search, filters, sorting options

---

## 📄 **License & Credits**

<div align="center">

### 📝 **Project Information**

**Employee Management System v1.0.0**

_Built for educational and demonstration purposes_

**Technologies**: React • TypeScript • Node.js • Express • SQLite3 • Tailwind CSS

**Created with**: ❤️ and ☕

---

⭐ **Star this project if you found it helpful!**

🐛 **Found a bug?** Please create an issue on GitHub

💡 **Have suggestions?** We'd love to hear your ideas

</div>
