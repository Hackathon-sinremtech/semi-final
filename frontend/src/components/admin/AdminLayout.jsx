import { Outlet } from 'react-router';
import AdminNav from './AdminNav';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <main className="ml-64 p-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;