import { useState, useEffect } from 'react';
import { XMarkIcon, CheckIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { demoData } from '../../data/demoData'; // Ensure this file exports an object with a "doctors" array
import supabase from '../../config/supabase';
import { useNavigate } from 'react-router';

// Modal for Adding/Editing a Doctor
const DoctorModal = ({ doctor, onClose, onSave, isEdit }) => {
  const [formData, setFormData] = useState(doctor || {
    id: Date.now(),
    name: '',
    specialty: '',
    experience: 0,
    available: true,
    image: '',
    info: '',
    unavailableDays: [],
    timeSlots: []
  });

  // Update formData when the doctor prop changes
  useEffect(() => {
    if (doctor) {
      setFormData({
        ...doctor,
        timeSlots: doctor.timeSlots || [],
        unavailableDays: doctor.unavailableDays || []
      });
    } else {
      setFormData({
        id: Date.now(),
        name: '',
        specialty: '',
        experience: 0,
        available: true,
        image: '',
        info: '',
        unavailableDays: [],
        timeSlots: []
      });
    }
  }, [doctor]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">{isEdit ? 'Edit Doctor' : 'New Doctor'}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Picture */}
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Picture URL(optional)
            </label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <PhotoIcon className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="flex-1 p-2 border rounded-lg"
                placeholder="Enter image URL"
              />
            </div>
          </div>

          {/* Name and Specialty */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
            <select
              value={formData.specialty}
              onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="">Select Specialty</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Pediatrics">Pediatrics</option>
            </select>
          </div>

          {/* Experience and Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience (years)
            </label>
            <input
              type="number"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: parseInt(e.target.value, 10) || 0 })
              }
              className="w-full p-2 border rounded-lg"
              min="0"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
            <select
              value={formData.available ? 'available' : 'unavailable'}
              onChange={(e) =>
                setFormData({ ...formData, available: e.target.value === 'available' })
              }
              className="w-full p-2 border rounded-lg"
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>

          {/* Time Slots */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Slots</label>
            <div className="grid grid-cols-2 gap-2">
              {['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'].map(time => (
                <button
                  key={time}
                  type="button"
                  onClick={() => {
                    const slots = formData.timeSlots.includes(time)
                      ? formData.timeSlots.filter(t => t !== time)
                      : [...formData.timeSlots, time];
                    setFormData({ ...formData, timeSlots: slots });
                  }}
                  className={`p-2 text-sm rounded ${
                    formData.timeSlots.includes(time)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Unavailable Days */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Unavailable Days</label>
            <div className="grid grid-cols-3 gap-2">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                <button
                  key={day}
                  type="button"
                  onClick={() => {
                    const days = formData.unavailableDays.includes(day)
                      ? formData.unavailableDays.filter(d => d !== day)
                      : [...formData.unavailableDays, day];
                    setFormData({ ...formData, unavailableDays: days });
                  }}
                  className={`p-2 text-sm rounded ${
                    formData.unavailableDays.includes(day)
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Doctor Info */}
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Info</label>
            <textarea
              value={formData.info}
              onChange={(e) => setFormData({ ...formData, info: e.target.value })}
              className="w-full p-2 border rounded-lg h-32"
            />
          </div>

          <div className="col-span-full flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <CheckIcon className="w-5 h-5" />
              Save Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Modal for Delete Confirmation
const DeleteConfirmModal = ({ doctor, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
        <p className="mb-6">Are you sure you want to delete Dr. {doctor.name}?</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(doctor.id)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Main DoctorsPage Component
const DoctorsPage = () => {
  // Initialize with demo data so some doctors are already present
  const [doctors, setDoctors] = useState(demoData.doctors);
  const [showModal, setShowModal] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  const [char,setChar] = useState('')
  const navigate = useNavigate();

  const initaial = (string) => {
    setChar(string.map(n => n[0]).join(''))
  }

  const handleSaveDoctor = (doctorData) => {
    if (currentDoctor) {
      // Edit existing doctor
      setDoctors(doctors.map(d => d.id === doctorData.id ? doctorData : d));
    } else {
      // Add new doctor
      setDoctors([...doctors, doctorData]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();

      if (error) {
        console.error('Error fetching session:', error);
        return;
      }

      if (session.user.email === "admin123@gmail.com") {
        const { data, error } = await supabase
          .from('doctor')
          .select('*')
        if (error) {
          console.error('Error fetching patient data:', error.message);
        } else {
          setDoctors(data);
        }
      }else {
        navigate('/')
        alert("You are not authorised to see this page")
      }
    };

    fetchData();
  }, []);

  async function deleteDoctor(id) {
    const { error } = await supabase.from('appointment_schedule').delete().eq('id', id);
    if (error) {
      console.error('Error deleting row:', error);
    } else {
      console.log(`Row with ID ${id} deleted successfully.`);
    }
  }

  return (
    <div>
      {/* Doctor Modal */}
      {showModal && (
        <DoctorModal
          doctor={currentDoctor}
          onClose={() => {
            setShowModal(false);
            setCurrentDoctor(null);
          }}
          onSave={handleSaveDoctor}
          isEdit={!!currentDoctor}
        />
      )}

      {/* Delete Confirm Modal */}
      {doctorToDelete && (
        <DeleteConfirmModal
          doctor={doctorToDelete}
          onCancel={() => setDoctorToDelete(null)}
          onConfirm={handleDelete}
        />
      )}

      {/* Doctor List */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Doctors</h2>
        <button
          onClick={() => {
            setCurrentDoctor(null);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add New Doctor
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Doctor</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Specialty</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Experience</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Availability</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium">
                        {/* {doctor.doctor_name.split(' ').map(n => n[0]).join('')} */}Dr.
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{doctor.doctor_name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{doctor.doctor_specialization}</td>
                <td className="px-6 py-4">{doctor.doctor_experience} years</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    doctor.doctor_available ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {doctor.doctor_available ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {/* <button
                    onClick={() => {
                      setCurrentDoctor(doctor);
                      setShowModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-700 mr-4"
                  >
                    Edit
                  </button> */}
                  <button
                    onClick={() => deleteDoctor(doctor.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorsPage;
