import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  CreditCard as Edit,
  Trash2,
  Search,
  Camera,
  Upload,
  X,
} from "lucide-react";
import api from "../services/api";

interface Employee {
  ssn: string;
  name: string;
  birth_date: string;
  address: string;
  sex: string;
  salary: number;
  dept_no: number;
  supervisor_ssn?: string;
  dept_name?: string;
  supervisor_name?: string;
  profile_photo?: any; // BLOB data (not directly used in UI)
  photo_upload_date?: string;
  photo_file_size?: number;
  photo_mime_type?: string;
}

interface Department {
  dept_no: number;
  dept_name: string;
}

function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [supervisors, setSupervisors] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Photo management state
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedEmployeeForPhoto, setSelectedEmployeeForPhoto] =
    useState<Employee | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoUploadLoading, setPhotoUploadLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    ssn: "",
    name: "",
    birth_date: "",
    address: "",
    sex: "M",
    salary: "",
    dept_no: "",
    supervisor_ssn: "",
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchEmployees(), fetchDepartments()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.get<Employee[]>("/employees");
      const employeeData = Array.isArray(response) ? response : [];
      setEmployees(employeeData);
      setSupervisors(employeeData);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployees([]);
      setSupervisors([]);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await api.get<Department[]>("/departments");
      const departmentData = Array.isArray(response) ? response : [];
      setDepartments(departmentData);
    } catch (error) {
      console.error("Error fetching departments:", error);
      setDepartments([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        salary: parseFloat(formData.salary),
        dept_no: parseInt(formData.dept_no) || null,
        supervisor_ssn: formData.supervisor_ssn || null,
      };

      if (editingEmployee) {
        await api.put(`/employees/${editingEmployee.ssn}`, data);
      } else {
        await api.post("/employees", data);
      }

      fetchEmployees();
      resetForm();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData({
      ssn: employee.ssn,
      name: employee.name,
      birth_date: employee.birth_date,
      address: employee.address,
      sex: employee.sex,
      salary: employee.salary.toString(),
      dept_no: employee.dept_no?.toString() || "",
      supervisor_ssn: employee.supervisor_ssn || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (ssn: string) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await api.delete(`/employees/${ssn}`);
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      ssn: "",
      name: "",
      birth_date: "",
      address: "",
      sex: "M",
      salary: "",
      dept_no: "",
      supervisor_ssn: "",
    });
    setEditingEmployee(null);
    setShowForm(false);
  };

  // ==================== PHOTO MANAGEMENT FUNCTIONS (SRS Document 2) ====================

  const openPhotoModal = (employee: Employee) => {
    setSelectedEmployeeForPhoto(employee);
    setPhotoFile(null);
    setPhotoPreview(null);
    setShowPhotoModal(true);
  };

  const closePhotoModal = () => {
    setShowPhotoModal(false);
    setSelectedEmployeeForPhoto(null);
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type (SRS Document 2 - Security Requirements)
    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      alert("Please select a JPEG or PNG image file.");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB.");
      return;
    }

    setPhotoFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoUpload = async () => {
    if (!photoFile || !selectedEmployeeForPhoto) return;

    setPhotoUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append("photo", photoFile);

      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000"
        }/api/employees/${selectedEmployeeForPhoto.ssn}/photo`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      await fetchEmployees(); // Refresh employee list
      closePhotoModal();
      alert("Photo uploaded successfully!");
    } catch (error) {
      console.error("Error uploading photo:", error);
      alert(
        `Upload failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setPhotoUploadLoading(false);
    }
  };

  const handlePhotoDelete = async (employee: Employee) => {
    if (!employee.photo_file_size) {
      alert("This employee has no profile photo to delete.");
      return;
    }

    if (
      !window.confirm(
        "Are you sure you want to delete this employee's profile photo?"
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000"
        }/api/employees/${employee.ssn}/photo`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Delete failed");
      }

      await fetchEmployees(); // Refresh employee list
      alert("Photo deleted successfully!");
    } catch (error) {
      console.error("Error deleting photo:", error);
      alert(
        `Delete failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const getPhotoUrl = (employee: Employee): string => {
    if (!employee.photo_file_size) return "";
    return `${
      import.meta.env.VITE_API_URL || "http://localhost:5000"
    }/api/employees/${employee.ssn}/photo`;
  };

  const filteredEmployees = (employees || []).filter(
    (employee) =>
      employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.ssn?.includes(searchTerm) ||
      employee.dept_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Employees</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Employee
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Employee Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-screen overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingEmployee ? "Edit Employee" : "Add New Employee"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SSN
                </label>
                <input
                  type="text"
                  required
                  disabled={!!editingEmployee}
                  value={formData.ssn}
                  onChange={(e) =>
                    setFormData({ ...formData, ssn: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Birth Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.birth_date}
                  onChange={(e) =>
                    setFormData({ ...formData, birth_date: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sex
                </label>
                <select
                  value={formData.sex}
                  onChange={(e) =>
                    setFormData({ ...formData, sex: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salary
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  value={formData.dept_no}
                  onChange={(e) =>
                    setFormData({ ...formData, dept_no: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.dept_no} value={dept.dept_no}>
                      {dept.dept_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Supervisor
                </label>
                <select
                  value={formData.supervisor_ssn}
                  onChange={(e) =>
                    setFormData({ ...formData, supervisor_ssn: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">No Supervisor</option>
                  {(supervisors || [])
                    .filter((emp) => emp.ssn !== formData.ssn)
                    .map((emp) => (
                      <option key={emp.ssn} value={emp.ssn}>
                        {emp.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  {editingEmployee ? "Update" : "Create"}
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

      {/* Employee List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="text-center py-8">
            <div className="text-gray-500">Loading employees...</div>
          </div>
        ) : (
          <>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Photo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salary
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Supervisor
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.ssn} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {employee.photo_file_size ? (
                          <img
                            src={getPhotoUrl(employee)}
                            alt={`${employee.name}'s profile`}
                            className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src =
                                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDMTMuMSAyIDE0IDIuOSAxNCA0QzE0IDUuMSAxMy4xIDYgMTIgNkMxMC45IDYgMTAgNS4xIDEwIDRDMTAgMi45IDEwLjkgMiAxMiAyWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMjEgOVYyMkM2IDIyIDMgMTkgMyAxOVYxNkMzIDEzIDcgMTAgMTIgMTBDMTcgMTAgMjEgMTMgMjEgMTZWMjJaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo8L3N2Zz4K";
                            }}
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                            <Camera className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                        <div className="text-xs text-gray-500">
                          {employee.photo_file_size ? (
                            <div>
                              <div>
                                {(employee.photo_file_size / 1024).toFixed(1)}{" "}
                                KB
                              </div>
                              <div>
                                {new Date(
                                  employee.photo_upload_date!
                                ).toLocaleDateString()}
                              </div>
                            </div>
                          ) : (
                            <div>No photo</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {employee.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          SSN: {employee.ssn}
                        </div>
                        <div className="text-sm text-gray-500">
                          {employee.sex === "M" ? "Male" : "Female"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {employee.dept_name || "Not Assigned"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        ${employee.salary?.toLocaleString() || "0"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {employee.supervisor_name || "None"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => openPhotoModal(employee)}
                          className="text-green-600 hover:text-green-800 p-1"
                          title={
                            employee.photo_file_size
                              ? "Update photo"
                              : "Upload photo"
                          }
                        >
                          <Upload className="h-4 w-4" />
                        </button>
                        {employee.photo_file_size && (
                          <button
                            onClick={() => handlePhotoDelete(employee)}
                            className="text-orange-600 hover:text-orange-800 p-1"
                            title="Delete photo"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleEdit(employee)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Edit employee"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(employee.ssn)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete employee"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredEmployees.length === 0 && !loading && (
              <div className="text-center py-8 text-gray-500">
                No employees found
              </div>
            )}
          </>
        )}
      </div>

      {/* Photo Upload Modal (SRS Document 2 Implementation) */}
      {showPhotoModal && selectedEmployeeForPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {selectedEmployeeForPhoto.photo_file_size ? "Update" : "Upload"}{" "}
                Photo for {selectedEmployeeForPhoto.name}
              </h3>
              <button
                onClick={closePhotoModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Current Photo Display */}
              {selectedEmployeeForPhoto.photo_file_size && (
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Current Photo:</p>
                  <img
                    src={getPhotoUrl(selectedEmployeeForPhoto)}
                    alt={`${selectedEmployeeForPhoto.name}'s current photo`}
                    className="h-32 w-32 rounded-full object-cover border-2 border-gray-200 mx-auto"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Size:{" "}
                    {(selectedEmployeeForPhoto.photo_file_size / 1024).toFixed(
                      1
                    )}{" "}
                    KB | Uploaded:{" "}
                    {new Date(
                      selectedEmployeeForPhoto.photo_upload_date!
                    ).toLocaleDateString()}
                  </p>
                </div>
              )}

              {/* File Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select New Photo (JPEG/PNG, max 5MB)
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleFileSelect}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Photo Preview */}
              {photoPreview && (
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  <img
                    src={photoPreview}
                    alt="Photo preview"
                    className="h-32 w-32 rounded-full object-cover border-2 border-gray-200 mx-auto"
                  />
                  {photoFile && (
                    <p className="text-xs text-gray-500 mt-2">
                      Size: {(photoFile.size / 1024).toFixed(1)} KB | Type:{" "}
                      {photoFile.type}
                    </p>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handlePhotoUpload}
                  disabled={!photoFile || photoUploadLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  {photoUploadLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      {selectedEmployeeForPhoto.photo_file_size
                        ? "Update"
                        : "Upload"}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={closePhotoModal}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Employees;
