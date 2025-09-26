import React, { useState, useEffect } from 'react';
import { Plus, CreditCard as Edit, Trash2, Search } from 'lucide-react';
import api from '../services/api';

interface Department {
  dept_no: number;
  dept_name: string;
  location: string;
  manager_ssn?: string;
  start_date: string;
  manager_name?: string;
}

interface Employee {
  ssn: string;
  name: string;
}

function Departments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    dept_no: '',
    dept_name: '',
    location: '',
    manager_ssn: '',
    start_date: ''
  });

  useEffect(() => {
    fetchDepartments();
    fetchEmployees();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await api.get('/departments');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        dept_no: parseInt(formData.dept_no),
        manager_ssn: formData.manager_ssn || null
      };

      if (editingDepartment) {
        await api.put(`/departments/${editingDepartment.dept_no}`, data);
      } else {
        await api.post('/departments', data);
      }

      fetchDepartments();
      resetForm();
    } catch (error) {
      console.error('Error saving department:', error);
    }
  };

  const handleEdit = (department: Department) => {
    setEditingDepartment(department);
    setFormData({
      dept_no: department.dept_no.toString(),
      dept_name: department.dept_name,
      location: department.location,
      manager_ssn: department.manager_ssn || '',
      start_date: department.start_date
    });
    setShowForm(true);
  };

  const handleDelete = async (dept_no: number) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await api.delete(`/departments/${dept_no}`);
        fetchDepartments();
      } catch (error) {
        console.error('Error deleting department:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      dept_no: '',
      dept_name: '',
      location: '',
      manager_ssn: '',
      start_date: ''
    });
    setEditingDepartment(null);
    setShowForm(false);
  };

  const filteredDepartments = departments.filter(dept =>
    dept.dept_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.manager_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Departments</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Department
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search departments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Department Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingDepartment ? 'Edit Department' : 'Add New Department'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Number</label>
                <input
                  type="number"
                  required
                  disabled={!!editingDepartment}
                  value={formData.dept_no}
                  onChange={(e) => setFormData({ ...formData, dept_no: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
                <input
                  type="text"
                  required
                  value={formData.dept_name}
                  onChange={(e) => setFormData({ ...formData, dept_name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Manager</label>
                <select
                  value={formData.manager_ssn}
                  onChange={(e) => setFormData({ ...formData, manager_ssn: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">No Manager</option>
                  {employees.map((emp) => (
                    <option key={emp.ssn} value={emp.ssn}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  required
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  {editingDepartment ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Department List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDepartments.map((department) => (
          <div key={department.dept_no} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{department.dept_name}</h3>
                <p className="text-sm text-gray-500">Dept #{department.dept_no}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(department)}
                  className="text-green-600 hover:text-green-800 p-1"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(department.dept_no)}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div>
                <span className="font-medium">Location:</span> {department.location}
              </div>
              <div>
                <span className="font-medium">Manager:</span> {department.manager_name || 'Not Assigned'}
              </div>
              <div>
                <span className="font-medium">Start Date:</span> {new Date(department.start_date).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDepartments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No departments found
        </div>
      )}
    </div>
  );
}

export default Departments;