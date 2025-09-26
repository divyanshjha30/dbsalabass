import React, { useState, useEffect } from 'react';
import { Plus, CreditCard as Edit, Trash2, Search } from 'lucide-react';
import api from '../services/api';

interface Assignment {
  ssn: string;
  proj_no: number;
  hours: number;
  employee_name?: string;
  proj_name?: string;
}

interface Employee {
  ssn: string;
  name: string;
}

interface Project {
  proj_no: number;
  proj_name: string;
}

function Assignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    ssn: '',
    proj_no: '',
    hours: ''
  });

  useEffect(() => {
    fetchAssignments();
    fetchEmployees();
    fetchProjects();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await api.get('/assignments');
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
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

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        proj_no: parseInt(formData.proj_no),
        hours: parseFloat(formData.hours)
      };

      if (editingAssignment) {
        await api.put(`/assignments/${editingAssignment.ssn}/${editingAssignment.proj_no}`, data);
      } else {
        await api.post('/assignments', data);
      }

      fetchAssignments();
      resetForm();
    } catch (error) {
      console.error('Error saving assignment:', error);
    }
  };

  const handleEdit = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setFormData({
      ssn: assignment.ssn,
      proj_no: assignment.proj_no.toString(),
      hours: assignment.hours.toString()
    });
    setShowForm(true);
  };

  const handleDelete = async (ssn: string, proj_no: number) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      try {
        await api.delete(`/assignments/${ssn}/${proj_no}`);
        fetchAssignments();
      } catch (error) {
        console.error('Error deleting assignment:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      ssn: '',
      proj_no: '',
      hours: ''
    });
    setEditingAssignment(null);
    setShowForm(false);
  };

  const filteredAssignments = assignments.filter(assignment =>
    assignment.employee_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.proj_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Project Assignments</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Assignment
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search assignments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      {/* Assignment Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingAssignment ? 'Edit Assignment' : 'Add New Assignment'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
                <select
                  required
                  disabled={!!editingAssignment}
                  value={formData.ssn}
                  onChange={(e) => setFormData({ ...formData, ssn: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100"
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp.ssn} value={emp.ssn}>
                      {emp.name} ({emp.ssn})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                <select
                  required
                  disabled={!!editingAssignment}
                  value={formData.proj_no}
                  onChange={(e) => setFormData({ ...formData, proj_no: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100"
                >
                  <option value="">Select Project</option>
                  {projects.map((project) => (
                    <option key={project.proj_no} value={project.proj_no}>
                      {project.proj_name} (#{project.proj_no})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hours per Week</label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="80"
                  required
                  value={formData.hours}
                  onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  {editingAssignment ? 'Update' : 'Create'}
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

      {/* Assignment List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hours/Week
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAssignments.map((assignment) => (
              <tr key={`${assignment.ssn}-${assignment.proj_no}`} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{assignment.employee_name}</div>
                    <div className="text-sm text-gray-500">SSN: {assignment.ssn}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{assignment.proj_name}</div>
                    <div className="text-sm text-gray-500">Project #{assignment.proj_no}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{assignment.hours} hours</div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleEdit(assignment)}
                      className="text-orange-600 hover:text-orange-800 p-1"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(assignment.ssn, assignment.proj_no)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredAssignments.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No assignments found
          </div>
        )}
      </div>
    </div>
  );
}

export default Assignments;