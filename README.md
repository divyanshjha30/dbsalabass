# Employee Management System

A full-stack Employee Management System built with React frontend and Node.js backend, using SQLite3 for local data storage.

## Features

- **Employee Management**: Add, edit, delete, and view employees with full details
- **Department Management**: Manage departments with managers and locations
- **Project Management**: Track projects assigned to departments
- **Dependent Management**: Manage employee dependents and relationships
- **Assignment Management**: Assign employees to projects with work hours
- **Search and Filter**: Search functionality across all entities
- **Responsive Design**: Clean, modern interface that works on all devices

## Technology Stack

### Backend
- Node.js with Express.js
- SQLite3 database (local file: `database.db`)
- RESTful API architecture
- CORS enabled for frontend communication

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Vite for development and building

## Database Schema

The system uses SQLite3 with the following tables:

- **Employee**: SSN, name, birth_date, address, sex, salary, dept_no, supervisor_ssn
- **Department**: dept_no, dept_name, location, manager_ssn, start_date
- **Project**: proj_no, proj_name, location, dept_no
- **Works_On**: ssn, proj_no, hours
- **Dependent**: id, ssn, dep_name, sex, birth_date, relationship

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- SQLite3 (available on macOS by default)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   
   The backend will run on http://localhost:5000

### Frontend Setup
1. In a new terminal, navigate to the project root:
   ```bash
   cd ../
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   
   The frontend will run on http://localhost:3000

## API Endpoints

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:ssn` - Get employee by SSN
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:ssn` - Update employee
- `DELETE /api/employees/:ssn` - Delete employee

### Departments
- `GET /api/departments` - Get all departments
- `GET /api/departments/:dept_no` - Get department by number
- `POST /api/departments` - Create new department
- `PUT /api/departments/:dept_no` - Update department
- `DELETE /api/departments/:dept_no` - Delete department

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:proj_no` - Get project by number
- `POST /api/projects` - Create new project
- `PUT /api/projects/:proj_no` - Update project
- `DELETE /api/projects/:proj_no` - Delete project

### Dependents
- `GET /api/dependents` - Get all dependents
- `GET /api/dependents/:id` - Get dependent by ID
- `GET /api/dependents/employee/:ssn` - Get dependents by employee SSN
- `POST /api/dependents` - Create new dependent
- `PUT /api/dependents/:id` - Update dependent
- `DELETE /api/dependents/:id` - Delete dependent

### Assignments
- `GET /api/assignments` - Get all work assignments
- `GET /api/assignments/employee/:ssn` - Get assignments by employee
- `GET /api/assignments/project/:proj_no` - Get assignments by project
- `POST /api/assignments` - Create new assignment
- `PUT /api/assignments/:ssn/:proj_no` - Update assignment
- `DELETE /api/assignments/:ssn/:proj_no` - Delete assignment

## Sample Data

The system automatically creates sample data when first started:

- 4 sample employees across 3 departments
- 3 departments (Engineering, Marketing, HR)
- 3 projects with employee assignments
- Sample dependents and work assignments

## Usage

1. Start both backend and frontend servers as described above
2. Open your browser to http://localhost:3000
3. Use the navigation tabs to switch between different management sections:
   - **Employees**: Manage employee records
   - **Departments**: Handle department information
   - **Projects**: Track project details
   - **Dependents**: Manage employee dependents
   - **Assignments**: Assign employees to projects

## Database File

The SQLite database file `database.db` will be created automatically in the backend directory when you first run the server. This file contains all your data and can be backed up or moved as needed.

## Development

To add new features or modify existing ones:

1. Backend changes: Modify files in the `backend/` directory
2. Frontend changes: Modify files in the `src/` directory
3. Database schema changes: Update `backend/database.js`

## Troubleshooting

1. **Port conflicts**: Make sure ports 3000 and 5000 are available
2. **Database issues**: Delete `database.db` to reset with fresh sample data
3. **Connection errors**: Ensure backend is running before starting frontend

## License

This project is built for educational and demonstration purposes.