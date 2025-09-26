import React, { useState, useEffect } from "react";
import { Plus, CreditCard as Edit, Trash2, Search } from "lucide-react";
import api from "../services/api";

interface Project {
  proj_no: number;
  proj_name: string;
  location: string;
  dept_no: number;
  dept_name?: string;
}

interface Department {
  dept_no: number;
  dept_name: string;
}

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    proj_no: "",
    proj_name: "",
    location: "",
    dept_no: "",
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchProjects(), fetchDepartments()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get<Project[]>("/projects");
      const projectData = Array.isArray(response) ? response : [];
      setProjects(projectData);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
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
        proj_no: parseInt(formData.proj_no),
        dept_no: parseInt(formData.dept_no),
      };

      if (editingProject) {
        await api.put(`/projects/${editingProject.proj_no}`, data);
      } else {
        await api.post("/projects", data);
      }

      fetchProjects();
      resetForm();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      proj_no: project.proj_no.toString(),
      proj_name: project.proj_name,
      location: project.location,
      dept_no: project.dept_no.toString(),
    });
    setShowForm(true);
  };

  const handleDelete = async (proj_no: number) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await api.delete(`/projects/${proj_no}`);
        fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      proj_no: "",
      proj_name: "",
      location: "",
      dept_no: "",
    });
    setEditingProject(null);
    setShowForm(false);
  };

  const filteredProjects = (projects || []).filter(
    (project) =>
      project.proj_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.dept_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Projects</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Project
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Project Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingProject ? "Edit Project" : "Add New Project"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Number
                </label>
                <input
                  type="number"
                  required
                  disabled={!!editingProject}
                  value={formData.proj_no}
                  onChange={(e) =>
                    setFormData({ ...formData, proj_no: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.proj_name}
                  onChange={(e) =>
                    setFormData({ ...formData, proj_name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  required
                  value={formData.dept_no}
                  onChange={(e) =>
                    setFormData({ ...formData, dept_no: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select Department</option>
                  {(departments || []).map((dept) => (
                    <option key={dept.dept_no} value={dept.dept_no}>
                      {dept.dept_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  {editingProject ? "Update" : "Create"}
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

      {/* Project List */}
      {loading ? (
        <div className="text-center py-8">
          <div className="text-gray-500">Loading projects...</div>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <div
                key={project.proj_no}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {project.proj_name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Project #{project.proj_no}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="text-purple-600 hover:text-purple-800 p-1"
                      title="Edit project"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project.proj_no)}
                      className="text-red-600 hover:text-red-800 p-1"
                      title="Delete project"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Location:</span>{" "}
                    {project.location}
                  </div>
                  <div>
                    <span className="font-medium">Department:</span>{" "}
                    {project.dept_name}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-500">
              No projects found
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Projects;
