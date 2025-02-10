import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import Layout from "./Layout";
import HomePage from "./pages/UserPages/HomePage";
import DoctorsPage from "./pages/UserPages/DoctorsPage";
import AppointmentsPage from "./pages/UserPages/AppointmentsPage";
import BookingPage from "./pages/UserPages/BookingPage";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/AdminPages/Dashboard";
import AdminAppointments from "./pages/AdminPages/Appointments";
import AdminDoctors from "./pages/AdminPages/Doctors";
import AdminSettings from "./pages/AdminPages/Settings";
import Verify from "./pages/Verify"
// Import the AuthProvider from your context
import { AuthProvider } from "./context/AuthContext";
import CompleteProfile from "./pages/CompleteProfile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="doctors" element={<DoctorsPage />} />
        <Route path="doctors/book/:doctorId" element={<BookingPage />} />
        <Route path="appointments" element={<AppointmentsPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="appointments" element={<AdminAppointments />} />
        <Route path="doctors" element={<AdminDoctors />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      <Route path="/login">
        <Route index element={<Verify />} />
        <Route path="/login/complete-profile" element={<CompleteProfile />} />
      </Route>
    </>
  )
);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
