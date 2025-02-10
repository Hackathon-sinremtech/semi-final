import {
  BriefcaseIcon,
  CheckBadgeIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { getInitials } from "../../functions";
import supabase from "../config/supabase";


const DoctorCard = ({ doctor }) => {
const { doctor_name, doctor_specialization, doctor_experience, doctor_available, available_slot, charges, id } = doctor;

  // State to handle image error
  const [hasImageError, setHasImageError] = useState(false);
  const [photo,setPhoto] = useState('');

  // Effect to reset image error state if the image is updated
  useEffect(() => {
    const fetchPhoto = async () => {
      const { data: doctors, error } = await supabase
        .from('doctor')
        .select('*')

      if (error) console.error(error);
      else {
        if (doctors.profile_photo) {
          // Fetch the public URL of the profile image
          const { data: publicUrlData } = supabase.storage
            .from('avatars_doctor')
            .getPublicUrl(doctors.profile_photo);

          setPhoto(publicUrlData.publicUrl);
        }
      }
    };

    fetchPhoto();
  }, [id]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-300">
      <div className="flex items-center gap-6">
        {/* Doctor Image or Initials SVG */}
        <div className="w-30 h-30 rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center">
          {hasImageError || !photo ? (
            <svg
              className="w-full h-full bg-blue-100 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
            >
              <text
                x="50%"
                y="50%"
                fontWeight="500"
                fontSize="30"
                textAnchor="middle"
                dy=".3em"
                fill="oklch(0.546 0.245 262.881)"
              >
                {getInitials(doctor_name)}
              </text>
            </svg>
          ) : (
            <img
              src={photo}
              alt={doctor_name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={() => setHasImageError(true)} // Set error state if image fails to load
            />
          )}
        </div>

        {/* Doctor Details */}
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{doctor_name}</h3>
          <p className="text-primary text-blue-600 font-medium mb-2">
            {doctor_specialization}
          </p>

          {/* Experience */}
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
            <BriefcaseIcon className="w-5 h-5 text-gray-600" />
            <span>{doctor_experience} years experience</span>
          </div>

          {/* Availability Badge */}
          <div
            className={`flex items-center gap-2 text-sm ${
              doctor_available ? "text-green-700" : "text-red-700"
            }`}
          >
            {doctor_available ? (
              <>
                <CheckBadgeIcon className="w-5 h-5" />
                <span>Available Now</span>
              </>
            ) : (
              <>
                <ClockIcon className="w-5 h-5" />
                <span>Currently Unavailable</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Link to={`book/${id}`} state={doctor}>
        <button
          className={`w-full mt-6 py-3 rounded-xl font-medium transition-colors ${
            doctor_available
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          disabled={doctor_available === 'FALSE'}
        >
          {doctor_available ? "Book Now" : "Not Available"}
        </button>
      </Link>
    </div>
  );
};

DoctorCard.propTypes = {
  doctor: PropTypes.shape({
    id: PropTypes.string.isRequired, // Change this to number
    doctor_name: PropTypes.string.isRequired,
    doctor_specialization: PropTypes.string.isRequired,
    // rating: PropTypes.number.isRequired,
    // profile_photo: PropTypes.string.isRequired,
  }).isRequired,
};


export default React.memo(DoctorCard);