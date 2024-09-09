import React, { useState } from "react";
import Navbar from "../Navbar";
import ProgressBar from "../ProgressBar2";

const Step1 = ({ formData, setFormData, handleChange, handleNext }) => {
  const [errors, setErrors] = useState({});
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [isOthersSpecializationSelected, setIsOthersSpecializationSelected] = useState(false);
  const [isOthersServicesSelected, setIsOthersServicesSelected] = useState(false);
  const [otherSpecialization, setOtherSpecialization] = useState('');
  const [otherService, setOtherService] = useState('');
  const [specializationDropdownOpen, setSpecializationDropdownOpen] = useState(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
 

  const specializationsList = [
    'Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 'Pediatrics',
    'Obstetrics and Gynecology', 'Urology', 'Dermatology', 'Ophthalmology',
    'Gastroenterology', 'Pulmonology', 'Psychiatry', 'Nephrology', 'Endocrinology',
    'ENT (Ear, Nose, Throat)', 'Others'
  ];

  const categoriesList = [
    'General Hospital', 'Specialty Hospital', 'Multi-Specialty Hospital', 'Clinic', 
    'Diagnostic Center', 'Research and Teaching Hospital', 'Nursing Home', 
    'Rehabilitation Center', 'Daycare Facility', 'Mental Health Facility'
  ];

  const servicesList = [
    'Emergency Services', 'Outpatient Services', 'Inpatient Services', 'Intensive Care Unit (ICU)',
    'Diagnostic Imaging (X-ray, MRI, CT Scan)', 'Laboratory Services', 'Pharmacy', 'Surgical Services',
    'Maternity and Childcare', 'Rehabilitation and Physical Therapy', 'Blood Bank', 'Telemedicine',
    'Vaccination Services', 'Home Healthcare', 'Ambulance Services', 'Others'
  ];


  // Handle category selection
  const handleCategorySelect = (value) => {
    setFormData({ ...formData, category: value });
    setErrors({ ...errors, category: '' }); // Clear error if category selected
  };


  // Specialization Handlers
  const handleSpecializationSelect = (specialization) => {
    if (specialization === "Others") {
      setIsOthersSpecializationSelected(true);
    } else if (!selectedSpecializations.includes(specialization)) {
      const updatedSpecializations = [...selectedSpecializations, specialization];
      setSelectedSpecializations(updatedSpecializations);
      setFormData((prevData) => ({ ...prevData, specialization: updatedSpecializations }));
    }
  };
  

  const handleOtherSpecializationSubmit = () => {
    if (otherSpecialization && !selectedSpecializations.includes(otherSpecialization)) {
      const updatedSpecializations = [...selectedSpecializations, otherSpecialization];
      setSelectedSpecializations(updatedSpecializations);
      setFormData({ ...formData, specialization: updatedSpecializations });
    }
    setIsOthersSpecializationSelected(false);
    setOtherSpecialization("");
  };

  const removeSpecialization = (index) => {
    const updatedSpecializations = selectedSpecializations.filter((_, i) => i !== index);
    setSelectedSpecializations(updatedSpecializations);
    setFormData({ ...formData, specialization: updatedSpecializations });
  };

  const handleSpecializationDropdownOpen = () => {
    setSpecializationDropdownOpen(true);
  };

  // Services Handlers
  const handleServiceSelect = (service) => {
    if (service === "Others") {
      setIsOthersServicesSelected(true);
    } else if (!selectedServices.includes(service)) {
      const updatedServices = [...selectedServices, service];
      setSelectedServices(updatedServices);
      setFormData((prevData) => ({ ...prevData, services: updatedServices }));
    }
  };

  const handleOtherServiceSubmit = () => {
    if (otherService && !selectedServices.includes(otherService)) {
      const updatedServices = [...selectedServices, otherService];
      setSelectedServices(updatedServices);
      setFormData({ ...formData, services: updatedServices });
    }
    setIsOthersServicesSelected(false);
    setOtherService('');
  };

  const removeService = (index) => {
    const updatedServices = selectedServices.filter((_, i) => i !== index);
    setSelectedServices(updatedServices);
    setFormData({ ...formData, services: updatedServices });
  };

  const handleServiceDropdownOpen = () => {
    setServiceDropdownOpen(true);
  };


  // Validation and submission
  const validateForm = () => {
    const newErrors = {};
    if (!formData.hospitalName) newErrors.hospitalName = 'Hospital Name is required.';
    if (!formData.category) newErrors.category = 'Category is required.';
    if (selectedSpecializations.length === 0) newErrors.specialization = 'Please select at least one specialization.';
    if (selectedServices.length === 0) newErrors.services = 'Please select at least one service.';
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    if (validateForm()) {
      console.log("Form data before submission:", formData);  // Debugging log
      handleNext();
    }
  };

  return (
    <div>
      <Navbar showLogin={false} showLogout={false} showOther={false} />
      <ProgressBar step={1} totalSteps={7} />
      <div className="w-full min-h-screen bg-lightGreen flex items-center justify-center rounded-lg shadow-md">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-middleGreen text-left p-3">
            Hospital Registration Form
          </h3>
          <div className="space-y-4 text-left p-6">
            {/* Hospital Name */}
            <div>
              <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700 mb-2">
                Hospital Name
              </label>
              <input
                type="text"
                id="hospitalName"
                name="hospitalName"
                placeholder="Hospital Name"
                value={formData.hospitalName}
                onChange={handleChange}
                className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
                  errors.hospitalName ? "border-red-500 focus:ring-red-500" : "focus:ring-middleGreen"
                }`}
              />
              {errors.hospitalName && <p className="text-red-500 text-sm mt-1">{errors.hospitalName}</p>}
            </div>

            {/* Hospital ID */}
            {/* <div>
              <label htmlFor="hospitalId" className="block text-sm font-medium text-gray-700 mb-2">
                Hospital Unique Id
              </label>
              <input
                type="text"
                id="hospitalId"
                name="hospitalId"
                placeholder="Hospital Unique Id"
                value={formData.hospitalId}
                onChange={handleChange}
                className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
                  errors.hospitalId ? "border-red-500 focus:ring-red-500" : "focus:ring-middleGreen"
                }`}
              />
              {errors.hospitalId && <p className="text-red-500 text-sm mt-1">{errors.hospitalId}</p>}
            </div> */}

            {/* Category */}
            <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
      <div className="relative inline-block w-full mb-4">
        <select
          onChange={(e) => handleCategorySelect(e.target.value)}
          value={formData.category}
          className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
            errors.category ? "border-red-500 focus:ring-red-500" : "focus:ring-middleGreen"
          }`}
        >
          <option value="">Select Category</option>
          {categoriesList.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
      </div>
    </div>
            {/* Specializations */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specializations</label>
              <div className="relative inline-block w-full mb-4">
                <select
                  onChange={(e) => handleSpecializationSelect(e.target.value)}
                  value={formData.specialization}
                  className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
                    errors.specialization ? "border-red-500 focus:ring-red-500" : "focus:ring-middleGreen"
                  }`}
                >
                  <option value="">Select Specialization</option>
                  {specializationsList.map((specialization, index) => (
                    <option key={index} value={specialization}>
                      {specialization}
                    </option>
                  ))}
                </select>
                {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization}</p>}
              </div>

              <div className="flex flex-wrap mb-2">
                {selectedSpecializations.map((spec, index) => (
                  <div
                    key={index}
                    className="flex items-center px-3 py-1 m-1 text-sm font-semibold bg-lightGreen text-middleGreen rounded-full shadow-sm"
                  >
                    {spec}
                    <button
                      type="button"
                      onClick={() => removeSpecialization(index)}
                      className="ml-2 text-red-600 hover:text-red-900"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              {isOthersSpecializationSelected && (
                <div className="flex mt-4">
                  <input
                    type="text"
                    value={otherSpecialization}
                    onChange={(e) => setOtherSpecialization(e.target.value)}
                    placeholder="Enter Other Specialization"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-middleGreen flex-grow mr-2"
                  />
                  <button
                    type="button"
                    onClick={handleOtherSpecializationSubmit}
                    className="px-4 py-2 bg-middleGreen text-white rounded-md shadow-sm"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            {/* Services */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Services</label>
              <div className="relative inline-block w-full mb-4">
                <select
                  onChange={(e) => handleServiceSelect(e.target.value)}
                  value={formData.services}
                  className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
                    errors.services ? "border-red-500 focus:ring-red-500" : "focus:ring-middleGreen"
                  }`}
                >
                  <option value="">Select Service</option>
                  {servicesList.map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                {errors.services && <p className="text-red-500 text-sm mt-1">{errors.services}</p>}
              </div>

              <div className="flex flex-wrap mb-2">
                {selectedServices.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center px-3 py-1 m-1 text-sm font-semibold bg-lightGreen text-middleGreen rounded-full shadow-sm"
                  >
                    {service}
                    <button
                      type="button"
                      onClick={() => removeService(index)}
                      className="ml-2 text-red-600 hover:text-red-900"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              {isOthersServicesSelected && (
                <div className="flex mt-4">
                  <input
                    type="text"
                    value={otherService}
                    onChange={(e) => setOtherService(e.target.value)}
                    placeholder="Enter Other Service"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-middleGreen flex-grow mr-2"
                  />
                  <button
                    type="button"
                    onClick={handleOtherServiceSubmit}
                    className="px-4 py-2 bg-middleGreen text-white rounded-md shadow-sm"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            {/* Button */}
            <div className="flex justify-between">
              <button
                onClick={handleNextClick}
                className="px-6 py-3 bg-middleGreen text-white font-semibold rounded-md shadow-sm"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
