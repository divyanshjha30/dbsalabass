import React, { useState } from 'react';
import { Users, Building, Briefcase, Heart, UserPlus } from 'lucide-react';
import Employees from './components/Employees';
import Departments from './components/Departments';
import Projects from './components/Projects';
import Dependents from './components/Dependents';
import Assignments from './components/Assignments';

type TabType = 'employees' | 'departments' | 'projects' | 'dependents' | 'assignments';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('employees');

  const tabs = [
    { id: 'employees', label: 'Employees', icon: Users, color: 'blue' },
    { id: 'departments', label: 'Departments', icon: Building, color: 'green' },
    { id: 'projects', label: 'Projects', icon: Briefcase, color: 'purple' },
    { id: 'dependents', label: 'Dependents', icon: Heart, color: 'pink' },
    { id: 'assignments', label: 'Assignments', icon: UserPlus, color: 'orange' },
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'employees':
        return <Employees />;
      case 'departments':
        return <Departments />;
      case 'projects':
        return <Projects />;
      case 'dependents':
        return <Dependents />;
      case 'assignments':
        return <Assignments />;
      default:
        return <Employees />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Employee Management System</h1>
            </div>
            <div className="text-sm text-gray-500">
              Local SQLite Database
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                    isActive
                      ? `border-${tab.color}-500 text-${tab.color}-600`
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveComponent()}
      </main>
    </div>
  );
}

export default App;