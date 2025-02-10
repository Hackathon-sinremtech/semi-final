import { useEffect, useState } from 'react';
import DoctorCard from '../../components/DoctorCard';
import supabase from '../../config/supabase';

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [doctors,setDoctors] = useState([])

  useEffect( () => {
      async function fetch() {
        const { data: doctor, error } = await supabase
        .from('doctor')
        .select('*')

      if (doctor) {
        setDoctors(doctor)
      }else {
        console.log(error)
      }
      }

      fetch();
  }, []);

  // Sample doctors data
  // const doctors = [
  //   {
  //     id: 1,
  //     name: "Dr. Sarah Johnson",
  //     specialty: "Cardiology",
  //     experience: 15,
  //     available: true,
  //     image: "/doctor1.jpg"
  //   },
  //   {
  //     id: 2,
  //     name: "Dr. Michael Chen",
  //     specialty: "Dermatology",
  //     experience: 10,
  //     available: false,
  //     image: ""
  //   },
  //   {
  //     id: 3,
  //     name: "Dr. Anish Sonar",
  //     specialty: "Neurologist",
  //     experience:5,
  //     available: true,
  //     image: "/anish.png"
  //   },
   
    
  // ];

  // Filter doctors based on search and specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.doctor_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialtyFilter === 'all' || doctor.doctor_specialization === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen pt-30 bg-gray-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filter Section */}
        <div className="mb-12 space-y-4">
          <h1 className="text-4xl font-bold text-center text-gray-900">Find Your Specialist</h1>
          <p className="text-xl text-center mb-12 text-gray-600">Connect with certified medical professionals</p>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 min-w-[250px]">
              <label htmlFor="search" className="sr-only">Search doctors</label>
              <input
                id="search"
                type="text"
                placeholder="Search doctors..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Specialty Filter */}
            <select
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
            >
              <option value="all">All Specialties</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Neurologist">Neurologist</option>
              {/* Add more specialties */}
            </select>
          </div>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No doctors found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;
