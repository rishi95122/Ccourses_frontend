import React from 'react';
import AdminNavbar from './components/AdminNavbar';
import AdminData from './components/AdminData';
import './admin.css'; 

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      <div className="admin-content">
        <AdminData />
      </div>
    </div>
  );
};

export default AdminDashboard;
