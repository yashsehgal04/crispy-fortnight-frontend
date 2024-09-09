import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const HospitalInfo = () => {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/hospitals/${id}`
        );
        setHospital(response.data);
      } catch (error) {
        console.error("Error fetching hospital:", error);
      }
    };

    fetchHospital();
  }, [id]);

  const handleDoctorClick = (doctorId) => {
    navigate(`/doctor/${doctorId}`);
  };

  const baseURL = `${import.meta.env.VITE_BASE_URL}/uploads/avatar/`; // Adjust based on your server

  if (!hospital) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  return (
    <>
    <Navbar showSearch={true} showOther={true} />
    <div className="min-h-screen bg-lightGreen p-6">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-docsoGreen mb-6 text-center">
          {hospital.hospitalName}
        </h2>
        <div className="space-y-4">
          <p className="text-lg text-gray-800">
            <strong>Location:</strong> {hospital.city}, {hospital.locality}
          </p>
          <p className="text-lg text-gray-800">
            <strong>Total Beds:</strong> {hospital.totalBeds}
          </p>
          <p className="text-lg text-gray-800">
            <strong>Available Beds:</strong> {hospital.availableBeds}
          </p>
          <p className="text-lg text-gray-800">
            <strong>Category:</strong> {hospital.category}
          </p>
          <p className="text-lg text-gray-800">
            <strong>Specialization:</strong> {hospital.specialization}
          </p>
          <p className="text-lg text-gray-800">
            <strong>Description:</strong> {hospital.description}
          </p>
          <p className="text-lg text-gray-800">
            <strong>Contact:</strong> {hospital.contactDetails}
          </p>
          <p className="text-lg text-gray-800">
            <strong>Insurance Claim:</strong>{" "}
            {hospital.insuranceClaim ? "Yes" : "No"}
          </p>
          <p className="text-lg text-gray-800">
            <strong>Timings of Hospital:</strong>
          </p>
          <ul className="list-disc pl-5 text-gray-600">
            {hospital.timings && Array.isArray(hospital.timings) ? (
              hospital.timings.map((slot, index) => (
                <li key={index}>
                  {slot.day}: {slot.startTime} - {slot.endTime}
                </li>
              ))
            ) : (
              <p className="text-gray-600">No timings available.</p>
            )}
          </ul>
        </div>

        <h3 className="text-3xl font-semibold text-docsoGreen mt-8 mb-4">
          Doctors at this Hospital:
        </h3>
        <ul className="space-y-6">
          {hospital.doctors && Array.isArray(hospital.doctors) && hospital.doctors.length > 0 ? (
            hospital.doctors.map((doctor) => {
              const avatarUrl = doctor.avatar
                ? doctor.avatar.startsWith("http")
                  ? doctor.avatar
                  : `${baseURL}${doctor.avatar}`
                : `${baseURL}default-avatar.png`; 

              return (
                <li
                  key={doctor._id}
                  className="p-6 border border-gray-200 rounded-lg shadow-md bg-white hover:bg-green-300 transition duration-300 cursor-pointer"
                  onClick={() => handleDoctorClick(doctor._id)}
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={avatarUrl}
                      alt={doctor.doctorName}
                      className="w-20 h-20 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="text-2xl font-semibold text-gray-800">
                        {doctor.doctorName}
                      </h4>
                      <p className="text-lg text-gray-600 mb-2">
                        <strong>Category:</strong> {doctor.category}
                      </p>
                      <p className="text-lg text-gray-600 mb-2">
                        <strong>Consultancy Fees:</strong> {doctor.consultancyFees}
                      </p>
                      <p className="text-lg text-gray-600 mb-2">
                        <strong>Timing Slots:</strong>
                      </p>
                      <ul className="list-disc list-inside text-gray-600 text-md">
                        {doctor.timingSlots && doctor.timingSlots.length > 0 ? (
                          doctor.timingSlots.map((slot, index) => (
                            <li key={index}>
                              {Array.isArray(slot.days) && slot.days.length > 0
                                ? slot.days.join(", ")
                                : "No days specified"} (Morning): 
                              {slot.morningStart && slot.morningEnd
                                ? `${slot.morningStart} - ${slot.morningEnd}`
                                : "No morning timings"}
                              {slot.afternoonStart && slot.afternoonEnd && (
                                <>
                                  <br />
                                  {Array.isArray(slot.days) && slot.days.length > 0
                                    ? slot.days.join(", ")
                                    : "No days specified"} (Afternoon): {slot.afternoonStart} - {slot.afternoonEnd}
                                </>
                              )}
                            </li>
                          ))
                        ) : (
                          <p className="text-gray-600">No timing slots available</p>
                        )}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <p className="text-gray-600">No doctors available.</p>
          )}
        </ul>
      </div>
    </div>
    </>
  );
};

export default HospitalInfo;
