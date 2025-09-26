import React, { useState, useEffect } from 'react';
import { Plus, CreditCard as Edit, Trash2, Search } from 'lucide-react';
import api from '../services/api';

interface Dependent {
  id: number;
  ssn: string;
  dep_name: string;
  sex: string;
  birth_date: string;
  relationship: string;
  employee_name?: string;
}

interface Employee {
  ssn: string;
  name: string;
}

function Dependents() {
  const [dependents, setDependents] = useState<Dependent[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDependent, setEditingDependent] = useState<Dependent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    ssn: '',
    dep_name: '',
    sex: 'M',
    birth_date: '',
    relationship: ''
  });

  useEffect(() => {
    fetchDependents();
    fetchEmployees();
  }, []);

  const fetchDependents = async () => {
    try {
      const response = await api.get('/dependents');
      setDependents(response.data);
    } catch (error) {
      console.error('Error fetching dependents:', error);
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
      if (editingDependent) {
        await api.put(`/dependents/${editingDependent.id}`, formData);
      } else {
        await api.post('/dependents', formData);
      }

      fetchDependents();
      resetForm();
    } catch (error) {
      console.error('Error saving dependent:', error);
    }
  };

  const handleEdit = (dependent: Dependent) => {
    setEditingDependent(dependent);
    setFormData({
      ssn: dependent.ssn,
      dep_name: dependent.dep_name,
      sex: dependent.sex,
      birth_date: dependent.birth_date,
      relationship: dependent.relationship
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this dependent?')) {
      try {
        await api.delete(`/dependents/${id}`);
        fetchDependents();
      } catch (error) {
        console.error('Error deleting dependent:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      ssn: '',
      dep_name: '',
      sex: 'M',
      birth_date: '',
      relationship: ''
    });
    setEditingDependent(null);
    setShowForm(false);
  };

  const filteredDependents = dependents.filter(dependent =>
    dependent.dep_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dependent.employee_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dependent.relationship.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Dependents</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Dependent
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search dependents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        />
      </div>

      {/* Dependent Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingDependent ? 'Edit Dependent' : 'Add New Dependent'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
                <select
                  required
                  value={formData.ssn}
                  onChange={(e) => setFormData({ ...formData, ssn: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Dependent Name</label>
                <input
                  type="text"
                  required
                  value={formData.dep_name}
                  onChange={(e) => setFormData({ ...formData, dep_name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
                <select
                  value={formData.sex}
                  onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Birth Date</label>
                <input
                  type="date"
                  required
                  value={formData.birth_date}
                  onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                <select
                  required
                  value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="">Select Relationship</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Son">Son</option>
                  <option value="Daughter">Daughter</option>
                  <option value="Parent">Parent</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  {editingDependent ? 'Update' : 'Create'}
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

      {/* Dependent List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dependent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Relationship
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Birth Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDependents.map((dependent) => (
              <tr key={dependent.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{dependent.dep_name}</div>
                    <div className="text-sm text-gray-500">{dependent.sex === 'M' ? 'Male' : 'Female'}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{dependent.employee_name}</div>
                  <div className="text-sm text-gray-500">SSN: {dependent.ssn}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{dependent.relationship}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{new Date(dependent.birth_date).toLocaleDateString()}</div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleEdit(dependent)}
                      className="text-pink-600 hover:text-pink-800 p-1"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(dependent.id)}
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
        {filteredDependents.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No dependents found
          </div>
        )}
      </div>
    </div>
  );
}

export default Dependents;