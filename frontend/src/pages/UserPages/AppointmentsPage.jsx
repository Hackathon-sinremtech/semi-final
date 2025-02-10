import { useEffect, useState } from 'react';
import { CalendarIcon, XCircleIcon, CheckBadgeIcon, ClockIcon } from '@heroicons/react/24/outline';
import supabase from '../../config/supabase';

const AppointmentsPage = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchPatientData = async () => {
        // Get the current authenticated user
        const { data: user, error: userError } = await supabase.auth.getUser();

        if (userError) {
            console.error('Error fetching user:', userError.message);
        } else if (user) {
            // Query the `patient` table where the email matches the authenticated user's email
            const { data, error } = await supabase
                .from('appointment_schedule')
                .select('*')

            if (error) {
                console.error('Error fetching patient data:', error.message);
            } else {
                setAppointments(data);
            }
        } else {
            console.error('No authenticated user found');
        }
    };

    
    fetchPatientData();
}, []);

  const cancelAppointment = (appointmentId) => {
    setAppointments(appointments.map(appt => 
      appt.id === appointmentId ? { ...appt, status: 'cancelled' } : appt
    ));
    setSelectedAppointment(null);
  };

  const upcomingAppointments = appointments.filter(a => a.appointment_status !== 'cancelled' && a.appointment_status !== 'completed');
  const pastAppointments = appointments.filter(a => a.appointment_status === 'completed' || a.appointment_status === 'cancelled');

  return (
    <div className="min-h-screen pt-30 bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Your Appointments</h1>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-gray-600" />
            <span className="text-gray-600">{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>
        <div className="grid gap-6">
          {upcomingAppointments.map(appointment => (
            <div key={appointment.id} className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center gap-4">
                <img src="/avatar.png" alt={appointment.doctor_name} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{appointment.doctor_name}</h3>
                  <p className="text-gray-600">{/* {appointment.specialty} */}</p> 
                  {appointment.appointment_reason && <p className="text-gray-500 text-sm">Reason: {appointment.appointment_reason}</p>}
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-gray-900">{new Date(appointment.appointment_date).toLocaleDateString()}</p>
                <p className="text-gray-600">{appointment.appointment_time}</p>
                <button onClick={() => setSelectedAppointment(appointment)} className="text-red-600 hover:text-red-700 flex items-center gap-1">
                  <XCircleIcon className="w-5 h-5" /><span>Cancel</span>
                </button>
              </div>
            </div>
          ))}
          {upcomingAppointments.length === 0 && <p className="text-gray-600">No upcoming appointments found.</p>}
        </div>

        {/* Past Appointments */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-12 mb-4">Appointment History</h2>
        <div className="grid gap-6">
          {pastAppointments.map(appointment => (
            <div key={appointment.id} className="bg-gray-100 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <img src={appointment.image} alt={appointment.doctor} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{appointment.appointment_doctor}</h3>
                  <p className="text-gray-600">{/* {appointment.specialty}*/}</p> 
                  {appointment.appointment_reason && <p className="text-gray-500 text-sm">Reason: {appointment.appointment_reason}</p>}
                  <span className={`text-sm ${appointment.status === 'cancelled' ? 'text-red-600' : 'text-blue-600'}`}>{appointment.appointment_status.charAt(0).toUpperCase() + appointment.appointment_status.slice(1)}</span>
                </div>
              </div>
              <p className="mt-2 text-gray-900">{new Date(appointment.appointment_date).toLocaleDateString()}</p>
            </div>
          ))}
          {pastAppointments.length === 0 && <p className="text-gray-600">No past appointments found.</p>}
        </div>

        {/* Cancellation Modal */}
        {selectedAppointment && (
          <div className="fixed inset-0 bg-gray-50/10 backdrop-blur-xs bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Cancellation</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to cancel your appointment with <span className="font-semibold">{selectedAppointment.doctor_name}</span> on {new Date(selectedAppointment.appointment_date).toLocaleDateString()} at {selectedAppointment.appointment_time}?</p>
              <div className="flex justify-end gap-4">
                <button onClick={() => setSelectedAppointment(null)} className="px-4 py-2 text-gray-600 hover:text-gray-800">Go Back</button>
                <button onClick={() => cancelAppointment(selectedAppointment.id)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Confirm Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;