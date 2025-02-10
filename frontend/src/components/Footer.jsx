import React from 'react'
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 ">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold">DocSphere</h3>
            <p className="text-sm">
              Redefining healthcare accessibility through technology
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-white text-lg font-semibold">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Appointments</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Telemedicine</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Health Tracking</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white text-lg font-semibold">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><Link to="admin" className="hover:text-white transition-colors">Admin</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white text-lg font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} DocSphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer