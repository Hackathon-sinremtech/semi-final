import { Link, useLocation } from 'react-router';
import {
  ChartBarIcon,
  CalendarIcon,
  UserGroupIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const AdminNav = () => {
  const location = useLocation();
  
const navigation = [
    { name: 'Dashboard', href: '/admin', icon: ChartBarIcon },
    { name: 'Appointments', href: '/admin/appointments', icon: CalendarIcon },
    { name: 'Doctors', href: '/admin/doctors', icon: UserGroupIcon },
    { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon },
  ];

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">
           DocSphere Admin
        </h1>
        
        <nav className="mt-8">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`flex items-center p-3 rounded-lg ${
                    location.pathname === item.href
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-blue-50"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default AdminNav;