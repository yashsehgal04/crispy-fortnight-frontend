import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [customMessage, setCustomMessage] = useState("");
  const [rejectedDoctorId, setRejectedDoctorId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [doctorCategoryFilter, setDoctorCategoryFilter] = useState(""); // Doctor filter by category
  const [hospitalCategoryFilter, setHospitalCategoryFilter] = useState(""); // Hospital filter by category
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
           `${import.meta.env.VITE_BASE_URL}/api/doctors/all`
        );
        setDoctors(response.data);
        setFilteredDoctors(response.data); // Initialize with full list
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    const fetchHospitals = async () => {
      try {
        const response = await axios.get(
           `${import.meta.env.VITE_BASE_URL}/api/hospitals/all-hospitals`
        );
        setHospitals(response.data);
        setFilteredHospitals(response.data); // Initialize with full list
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchDoctors();
    fetchHospitals();
  }, []);

  // Function to filter doctors based on search term and category filter
  useEffect(() => {
    const filtered = doctors.filter((doctor) => {
      const matchesNameOrCity =
        doctor.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.city.toLowerCase().includes(searchTerm.toLowerCase());

      // Adjusted category filtering to handle arrays
      const matchesCategory = doctorCategoryFilter
        ? doctor.category.includes(doctorCategoryFilter)
        : true;

      return matchesNameOrCity && matchesCategory;
    });

    setFilteredDoctors(filtered);
  }, [searchTerm, doctorCategoryFilter, doctors]);

  // Function to filter hospitals based on search term and category filter
  useEffect(() => {
    const filteredHosps = hospitals.filter((hospital) => {
      return (
        (hospital.hospitalName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
          hospital.city.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (hospitalCategoryFilter === "" ||
          hospital.category === hospitalCategoryFilter)
      );
    });
    setFilteredHospitals(filteredHosps);
  }, [searchTerm, hospitalCategoryFilter, hospitals]);

  const handleApprove = async (doctorId) => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/doctors/${doctorId}/approve`);
      setDoctors(
        doctors.map((doctor) =>
          doctor._id === doctorId ? { ...doctor, isApproved: true } : doctor
        )
      );
    } catch (error) {
      console.error("Error approving doctor:", error);
    }
  };

  const handleReject = async (doctorId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/doctors/${doctorId}/reject`,
        {
          customMessage,
        }
      );
      console.log(response.data.message); // Success message
      setCustomMessage("");
      setRejectedDoctorId(null);
    } catch (error) {
      console.error("Error rejecting doctor:", error);
    }
  };

  const handleDoctorClick = (doctorId) => {
    navigate(`/doctor/${doctorId}`);
  };

  const handleHospitalClick = (hospitalId) => {
    navigate(`/hospitals/${hospitalId}`);
  };

  return (
    <div>
      <Navbar showOther={true} />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="mb-6">
          <button
            onClick={() => navigate('/create-category')}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Create Category
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="flex mb-4 space-x-4">
          <input
            type="text"
            placeholder="Search by name or city"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-2 w-full"
          />
          <select
            value={doctorCategoryFilter}
            onChange={(e) => setDoctorCategoryFilter(e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-2"
          >
            <option value="">All Categories</option>
            <option value="Dentist">Dentist</option>
            <option value="Cardiologists">Cardiologists</option>
            <option value="Audiologists">Audiologists</option>
            <option value="ENT Specialist">ENT Specialist</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
            <option value="Paediatrician">Paediatrician</option>
            <option value="Psychiatrists">Psychiatrists</option>
            <option value="Veterinarian">Veterinarian</option>
            <option value="Radiologist">Radiologist</option>
            <option value="Pulmonologist">Pulmonologist</option>
            <option value="Endocrinologist">Endocrinologist</option>
            <option value="Oncologist">Oncologist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Cardiothoracic Surgeon">
              Cardiothoracic Surgeon
            </option>
          </select>
          <select
            value={hospitalCategoryFilter}
            onChange={(e) => setHospitalCategoryFilter(e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-2"
          >
            <option value="">All Hospital Categories</option>
            <option value="dentist">dentist</option>
            <option value="Government">Government</option>
            {/* Add more hospital categories as needed */}
          </select>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Registered Doctors</h2>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-2 px-4 border-b border-r border-gray-300">
                  Registration No
                </th>
                <th className="py-2 px-4 border-b border-r border-gray-300">
                  Name
                </th>
                <th className="py-2 px-4 border-b border-r border-gray-300">
                  City
                </th>
                <th className="py-2 px-4 border-b border-r border-gray-300">
                  Category
                </th>
                <th className="py-2 px-4 border-b border-r border-gray-300">
                  Consultancy Fees
                </th>
                <th className="py-2 px-4 border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor) => (
                <tr key={doctor._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-r border-gray-300">
                    {doctor.registrationNo}
                  </td>
                  <td className="py-2 px-4 border-b border-r border-gray-300">
                    {doctor.doctorName}
                  </td>
                  <td className="py-2 px-4 border-b border-r border-gray-300">
                    {doctor.city}
                  </td>
                  <td className="py-2 px-4 border-b border-r border-gray-300">
                    {doctor.category.join(",")}
                  </td>
                  <td className="py-2 px-4 border-b border-r border-gray-300">
                    {doctor.consultancyFees}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {!doctor.isApproved ? (
                      <button
                        onClick={() => handleApprove(doctor._id)}
                        className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                    ) : (
                      <span className="text-green-500">Approved</span>
                    )}
                    <button
                      onClick={() => handleDoctorClick(doctor._id)}
                      className="bg-yellow-500 text-white px-6 py-1 rounded hover:bg-green-600 ml-2"
                    >
                      Review
                    </button>

                    {rejectedDoctorId === doctor._id ? (
                      <div>
                        <textarea
                          placeholder="Enter custom rejection message"
                          value={customMessage}
                          onChange={(e) => setCustomMessage(e.target.value)}
                          className="border-2 border-gray-300 rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                          rows="4"
                        ></textarea>

                        <button
                          onClick={() => handleReject(doctor._id)}
                          className="bg-red-500 text-white px-6 py-1 rounded hover:bg-red-600"
                        >
                          Submit Rejection
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setRejectedDoctorId(doctor._id)}
                        className="bg-red-500 text-white px-6 py-1 rounded hover:bg-red-600 ml-2"
                      >
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Registered Hospitals</h2>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-2 px-4 border-b border-r border-gray-300">
                  Hospital ID
                </th>
                <th className="py-2 px-4 border-b border-r border-gray-300">
                  Name
                </th>
                <th className="py-2 px-4 border-b border-r border-gray-300">
                  City
                </th>
                <th className="py-2 px-4 border-b border-r border-gray-300">
                  Category
                </th>
                <th className="py-2 px-4 border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHospitals.map((hospital) => (
                <tr key={hospital._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-r border-gray-300">
                    {hospital.hospitalId}
                  </td>
                  <td className="py-2 px-4 border-b border-r border-gray-300">
                    {hospital.hospitalName}
                  </td>
                  <td className="py-2 px-4 border-b border-r border-gray-300">
                    {hospital.city}
                  </td>
                  <td className="py-2 px-4 border-b border-r border-gray-300">
                    {hospital.category}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    <button
                      onClick={() => handleHospitalClick(hospital._id)}
                      className="bg-yellow-500 text-white px-6 py-1 rounded hover:bg-green-600 ml-2"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
