import React,{ useState, useEffect } from "react";
import supabase from "../../config/supabase";

// Data for reusable components
const servicesData = [
  {
    icon: (
      <svg
        className="w-6 h-6 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Instant Booking",
    description: "Real-time availability with instant confirmation",
  },
  {
    icon: (
      <svg
        className="w-6 h-6 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Instant Booking",
    description: "Real-time availability with instant confirmation",
  },
  {
    icon: (
      <svg
        className="w-6 h-6 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Instant Booking",
    description: "Real-time availability with instant confirmation",
  },
  // Add more service objects
];

const specialistsData = [
  {
    initials: "SJ",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    experience: "15+ years experience",
  },
  {
    initials: "DB",
    name: "Dr. Daniel Brown",
    specialty: "Dermatology",
    experience: "10+ years experience",
  },
  {
    initials: "Ed",
    name: "Dr. Emily Davis",
    specialty: "Pediatrics",
    experience: "17+ years experience",
  },
  // Add more specialist objects
];

const HomePage = () => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const checkAuthStatus = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log("you are not authorized");
        }
      };
  
      checkAuthStatus();
    }, []);


  return (
    <>
      {/* Hero Section */}
      <section className="h-screen flex items-center px-6 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full shadow-sm border border-gray-100">
              <span className="text-blue-600">🏆</span>
              <span className="text-sm font-medium text-gray-600">
                Trusted by 200+ Hospitals
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Modern Care,
              <span className="block mt-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Simplified
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-xl">
              Connect with certified specialists through our intelligent medical
              network. Quality healthcare made accessible.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-12">
              <button
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold 
                          hover:bg-blue-600 hover:text-white transition-colors duration-300"
                aria-label="Find your doctor"
              >
                Find Your Doctor
              </button>
            </div>
          </div>

          {/* Image Container */}
          <div className="hidden lg:block relative">
            <div className="relative w-full aspect-square rounded-[3rem] shadow-2xl overflow-hidden">
              <img
                src="/11116016_415.jpg"
                alt="Medical professionals discussing"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Specialists Section */}
      <section className="py-24 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Specialists
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Board-certified medical professionals across all specialties
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {specialistsData.map((specialist, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-blue-600">
                    {specialist.initials}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {specialist.name}
                </h3>
                <p className="text-blue-600 mb-4">{specialist.specialty}</p>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{specialist.experience}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              End-to-end healthcare management solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-2xl border border-gray-100 hover:border-blue-100 
                         hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;