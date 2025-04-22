import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <div className="md:w-64 bg-white shadow-lg flex-shrink-0">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
          <nav className="mt-8">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  Traffic Overview
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/time-slots"
                  className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  Manage Time Slots
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/notifications"
                  className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  Send Notifications
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}