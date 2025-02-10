import { demoData } from '../../data/demoData';
import supabase from "../../config/supabase";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";

const AdminAppointments = () => {

  // Status styling
  const statusStyles = {
    confirmed: 'bg-green-100 text-green-600',
    pending: 'bg-yellow-100 text-yellow-600',
    cancelled: 'bg-red-100 text-red-600',
    completed: 'bg-blue-100 text-blue-600'
  };

  // Payment status styling
  const paymentStyles = {
    paid: 'text-green-600',
    unpaid: 'text-red-600',
    partial: 'text-yellow-600'
  };

  const [appointments, setAppointments] = useState([]);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmail = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();

      if (error) {
        console.error('Error fetching session:', error);
        return;
      }

      if (session && session.user) {
        console.log(session.user.email)
        setEmail(session.user.email); // Get the authenticated user's email
      }

      if (session.user.email === "admin123@gmail.com") {
        const { data, error } = await supabase
          .from('appointment_schedule')
          .select('*')
        if (error) {
          console.error('Error fetching patient data:', error.message);
        } else {
          setAppointments(data);
        }
      }else {
        navigate('/')
        alert("You are not authorised to see this page")
      }
    };

    fetchEmail();
  }, []);

  // useEffect(() => {
  //   const fetchPatientData = async () => {
  //     // Get the current authenticated user
  //     const { data: user, error: userError } = await supabase.auth.getUser();

  //     if (userError) {
  //       console.error('Error fetching user:', userError.message);
  //     } else if (user) {
  //       console.log(user.email)
  //       // Query the `patient` table where the email matches the authenticated user's email
  //       const { data, error } = await supabase
  //         .from('appointment_schedule')
  //         .select('*')

  //       if (error) {
  //         console.error('Error fetching patient data:', error.message);
  //       } else {
  //         setAppointments(data);
  //       }
  //     } else {
  //       console.error('No authenticated user found');
  //     }
  //   };


  //   fetchPatientData();
  // }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Appointments</h2>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date/Time</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Doctor</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Patient</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Details</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Payment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-6 py-4">
                  <div className="text-gray-900">{appointment.appointment_date}</div>
                  <div className="text-sm text-gray-500">{appointment.appointment_time}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium">{appointment.doctor_name}</div>
                  <div className="text-sm text-gray-500">{appointment.location}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium">{appointment.patient_name}</div>
                  <div className="text-sm text-gray-500">{appointment.patient_contact}</div>
                </td>
                {/* <td className="px-6 py-4">
                  <div className="text-gray-900">{appointment.reason}</div>
                  <div className="text-sm text-gray-500">{appointment.duration} mins</div>
                </td> */}
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${statusStyles[appointment.appointment_status]}`}>
                    {appointment.appointment_status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`font-medium ${paymentStyles[appointment.payment_status]}`}>
                    {appointment.payment_status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAppointments;