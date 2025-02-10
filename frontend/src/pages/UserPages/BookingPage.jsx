import { useState, useMemo, useEffect, useCallback } from 'react';
import { CheckBadgeIcon, ClockIcon, CalendarIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';
import { useParams, useNavigate } from 'react-router';
import { getInitials } from '../../../functions';
import supabase from '../../config/supabase';
import { useLocation } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createOrder, verifyPayment } from "../../Api";

const BookingPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const location = useLocation()
  const data = location.state

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    doctor_name: "",
    date: "",
    time: "",
    reason: ''
  });



  // const { data: doc , error} = aw

  // Sample doctor data
  const doctor = useMemo(() => ({
    id: 1,
    name: `${data.doctor_name}`,
    specialty: `${data.doctor_specialization}`,
    experience: 15,
    about: `${data.doctor_name} is a highly specialized cardiologist with 15+ years of experience in preventive cardiology and heart failure management. She is dedicated to providing personalized care to her patients.`,
    image: "/doctor1.jpg",
    charge: data.charges, // Changed to number for formatting
    availableSlots: [
      { date: "2024-03-10", times: [`${data.available_slot[0]}`, `${data.available_slot[1]}`, `${data.available_slot[2]}`] },
      { date: "2024-03-11", times: [`${data.available_slot[0]}`, `${data.available_slot[1]}`, `${data.available_slot[2]}`] },
    ]
  }), []);

  const [selected, setSelected] = useState({
    date: null,
    time: null,
    notify: null,
    reason: ""
  });

  // const handleBooking = useCallback((e) => {
  //   e.preventDefault();
  //   console.log('Booking details:', { 
  //     doctorId, 
  //     date: selected.date, 
  //     time: selected.time, 
  //     reason: selected.reason 
  //   });
  //   navigate('/appointments');
  // }, [doctorId, selected, navigate]);

  const handleBooking = async () => {
    // Step 1: Get the authenticated user's email
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.log('Failed to get session: ' + sessionError.message);
      return;
    }

    const userEmail = session?.user?.email;
    if (!userEmail) {
      console.log('No authenticated user.');
      return;
    }

    // Step 2: Fetch data from Table A where email matches the authenticated user
    const { data: fetchedData, error: fetchError } = await supabase
      .from('patient') // Replace 'table_a' with your source table name
      .select('*')
      .eq('patient_email', userEmail);

    if (fetchError) {
      console.log('Error fetching data: ' + fetchError.message);
      return;
    }

    // Step 3: Insert fetched data into Table B
    const { error: insertError } = await supabase
      .from('appointment_schedule') // Replace 'table_b' with your target table name
      .insert({
        doctor_name: data.doctor_name,
        patient_email: userEmail,
        patient_name: fetchedData[0].patient_name,
        patient_contact: fetchedData[0].patient_contact,
        appointment_date: selected.date,
        appointment_time: selected.time,
        notify_slot: "8:00"
      }); // Ensure columns in table_b match table_a

    if (insertError) {
      console.log('Error inserting data: ' + insertError.message);
    } else {
      toast.success("Appointment Booked successfully!");
    }
  };

  const handlePayment = async () => {
    const order = await createOrder(data.charges, "INR");

    const options = {
      key: import.meta.env.REACT_APP_RAZORPAY_KEY_ID, // Razorpay Key ID
      amount: order.amount,
      currency: order.currency,
      name: "Your App",
      description: "Test Transaction",
      order_id: order.id,
      handler: async function (response) {
        const verification = await verifyPayment(response);
        if (verification.success) {
          alert("Payment Successful!");
        } else {
          alert("Payment Failed!");
        }
      },
      prefill: {
        name: "User Name",
        email: "user@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  //id rzp_test_tfyoTlaYlNTNew
  //secret 4LZu3N33B0WJu2Lbg5ijL3n3

  const availableTimes = useMemo(() => {
    return doctor.availableSlots.find(slot => slot.date === selected.date)?.times || [];
  }, [selected.date, doctor.availableSlots]);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  // useEffect(() => {
  //   const subscribeToBookings = async () => {
  //     const subscription = supabase
  //       .from('appointment_schedule')
  //       .on('INSERT', (payload) => {
  //         const { reason, created_at } = payload.new;
  //         const formattedTime = new Date(created_at).toLocaleString();
  //         toast.success(`New Booking: ${reason} at ${formattedTime}`);
  //       })
  //       .subscribe();

  //     return () => {
  //       supabase.removeSubscription(subscription);
  //     };
  //   };

  //   subscribeToBookings();
  // }, []);



  const [hasImageError, setHasImageError] = useState(false);
  return (
    <div className="min-h-screen pt-30 py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Doctor Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-40 h-40 rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center">
              {hasImageError || !doctor.image ? (
                <svg
                  className="w-full h-full bg-blue-100 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                >
                  <text
                    x="50%"
                    y="50%"
                    fontWeight="500"
                    fontSize="40"
                    textAnchor="middle"
                    dy=".3em"
                    fill="oklch(0.546 0.245 262.881)"
                  >
                    {getInitials(doctor.name)}
                  </text>
                </svg>
              ) : (
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={() => setHasImageError(true)} // Set error state if image fails to load
                />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Book Appointment with {doctor.name}
              </h1>
              <p className="text-gray-600 text-lg mb-2">{doctor.specialty}</p>
              <p className="text-gray-600 mb-4">
                {doctor.about}
              </p>
              <div className="flex items-center gap-2">
                <CheckBadgeIcon className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-600">Available Now</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Date/Time Selection */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Select Availability
            </h2>

            {/* Date Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Choose Date
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {doctor.availableSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => setSelected(prev => ({ ...prev, date: slot.date, time: null }))}
                    className={`p-3 rounded-lg text-center transition-all duration-200 ease-in-out transform ${selected.date === slot.date
                      ? 'bg-blue-600 text-white scale-105 shadow-md'
                      : 'bg-gray-100 hover:bg-gray-200 hover:scale-105'
                      }`}
                  >
                    {new Date(slot.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            {selected.date && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Select Time Slot
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableTimes.length > 0 ? (
                    availableTimes.map((time, index) => (
                      <button
                        key={index}
                        onClick={() => setSelected(prev => ({ ...prev, time }))}
                        className={`p-3 rounded-lg text-center transition-all duration-200 ease-in-out transform ${selected.time === time
                          ? 'bg-blue-600 text-white scale-105 shadow-md'
                          : 'bg-gray-100 hover:bg-gray-200 hover:scale-105'
                          }`}
                      >
                        {time}
                      </button>
                    ))
                  ) : (
                    <div className="col-span-full text-center text-gray-500 py-4">
                      No available slots for this date
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Booking Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Appointment Details
            </h2>

            <div className="space-y-6">
              {/* Reason Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Consultation (Optional)
                </label>
                <textarea
                  value={selected.reason}
                  onChange={(e) => setSelected(prev => ({
                    ...prev,
                    reason: e.target.value
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
                  rows="3"
                  placeholder="Example: Follow-up consultation for hypertension management"
                />
              </div>

              {/* Appointment Summary */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-4 border border-gray-100">
                <div className="flex items-center gap-3 text-gray-700">
                  <CalendarIcon className="w-5 h-5 flex-shrink-0 text-blue-600" />
                  <span>Date:</span>
                  <span className="font-medium">
                    {selected.date ? formatDate(selected.date) : 'Select date'}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <ClockIcon className="w-5 h-5 flex-shrink-0 text-blue-600" />
                  <span>Time:</span>
                  <span className="font-medium">
                    {selected.time || 'Select time'}
                  </span>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="text-lg font-bold text-blue-600">
                      ₹{doctor.charge.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <button
                disabled={!selected.date || !selected.time}
                className="w-full bg-blue-600 text-white p-3.5 rounded-lg hover:bg-blue-700 
                  disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
                onClick={handleBooking}
              >
                Confirm & Book Appointment
              </button>
              <button
                disabled={!selected.date || !selected.time}
                className="w-full bg-blue-600 text-white p-3.5 rounded-lg hover:bg-blue-700 
                  disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
                onClick={handlePayment}
              >
                Apply for payment
              </button>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;