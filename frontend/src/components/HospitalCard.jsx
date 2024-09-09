import React from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalCard = ({ hospital }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/hospitals/${hospital._id}`);
  };

  // const baseURL = "http://localhost:5000/uploads/hospitalImage/"; // Adjust based on your server configuration
  // const isFullURL = hospital.hospitalImage.startsWith('http');
  // const hospitalUrl = isFullURL ? hospital.hospitalImage : `${baseURL}${hospital.hospitalImage}`;

  return (
    <div
      className="bg-lightGreen p-6 m-4 border border-gray-300 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-95 transition-all duration-300 ease-in-out cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex items-center mb-4">
        {/* <img
          src={hospitalUrl}
          alt={hospital.hospitalName}
          className="w-20 h-20 rounded-full object-cover mr-4"
        /> */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{hospital.hospitalName}</h3>
          <p className="text-gray-700 text-sm mb-1"><span className="font-semibold">Category:</span> {hospital.category}</p>
          <p className="text-gray-700 text-sm mb-1"><span className="font-semibold">City:</span> {hospital.city}</p>
          <p className="text-gray-700 text-sm mb-4"><span className="font-semibold">Contact Details:</span> {hospital.contactDetails}</p>
        </div>
      </div>

      {/* <div className="bg-gray-100 p-3 mb-4">
        <p className="text-gray-800 font-semibold text-sm mb-1">Services:</p>
        <p className="text-gray-600 text-sm">
          {hospital.services}
        </p>
      </div> */}

      {/* <div className="bg-gray-100 p-3 ">
        <p className="text-gray-800 font-semibold text-sm mb-1">Doctors:</p>
        <ul className="list-disc list-inside text-gray-600 text-sm">
          {hospital.doctors && hospital.doctors.length > 0 ? (
            hospital.doctors.map((doctor, index) => (
              <li key={index}>{doctor.doctorName}</li>
            ))
          ) : (
            <li>No doctors listed</li>
          )}
        </ul>
      </div> */}
    </div>
  );
};

export default HospitalCard;
