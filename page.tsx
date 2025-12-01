'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import KPICards from './components/KPICards';
import Charts from './components/Charts';
import DataTable from './components/DataTable';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a24]">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Header */}
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Section */}
            <div className="animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                Dashboard Analytics
              </h1>
              <p className="text-gray-400">
                Welcome back! Here's what's happening with your business today.
              </p>
            </div>

            {/* KPI Cards */}
            <KPICards />

            {/* Charts Section */}
            <Charts />

            {/* Data Table */}
            <DataTable />
          </div>
        </main>
      </div>
    </div>
  );
}
