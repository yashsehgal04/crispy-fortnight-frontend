import React, { useState } from 'react';
import ProgressBar from '../ProgressBar2'; 
import Navbar from '../Navbar';

const Step4 = ({ formData, handleChange, handleNext, handlePrev }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.totalDoctorStaff && formData.totalDoctorStaff !== 0) {
      newErrors.totalDoctorStaff = 'Total Doctor Staff is required.';
    }
    if (!formData.nursingStaff && formData.nursingStaff !== 0) {
      newErrors.nursingStaff = 'Nursing Staff is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    if (validateForm()) {
      handleNext();
    }
  };

  return (
    <div className="min-h-screen bg-lightGreen">
      <Navbar showLogin={false} showLogout={false} />
      <ProgressBar step={4} totalSteps={7} />
      <div className="max-w-2xl mx-auto p-6 mt-8 bg-white shadow-md rounded-lg">
        
        <div>
          <div className="m-6">
            <label htmlFor="totalDoctorStaff" className="block text-docsoGreen font-semibold mb-2">Total Doctors </label>
            <input
              type="number"
              id="totalDoctorStaff"
              name="totalDoctorStaff"
              placeholder="Enter total doctors"
              value={formData.totalDoctorStaff}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.totalDoctorStaff ? 'border-red-500 focus:ring-red-500' : 'border-middleGreen focus:ring-middleGreen'
              }`}
              required
            />
            {errors.totalDoctorStaff && <p className="text-red-500 text-sm mt-1">{errors.totalDoctorStaff}</p>}
          </div>

          <div className="m-6">
            <label htmlFor="nursingStaff" className="block text-docsoGreen font-semibold mb-2">Total Nurses </label>
            <input
              type="number"
              id="nursingStaff"
              name="nursingStaff"
              placeholder="Enter total Nurses "
              value={formData.nursingStaff}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.nursingStaff ? 'border-red-500 focus:ring-red-500' : 'border-middleGreen focus:ring-middleGreen'
              }`}
              required
            />
            {errors.nursingStaff && <p className="text-red-500 text-sm mt-1">{errors.nursingStaff}</p>}
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handlePrev}
            className="py-3 px-6 bg-docsoGreen text-white font-semibold rounded-lg hover:bg-middleGreen focus:outline-none focus:ring-2 focus:ring-middleGreen"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNextClick}
            className="py-3 px-6 bg-docsoGreen text-white font-semibold rounded-lg hover:bg-middleGreen focus:outline-none focus:ring-2 focus:ring-middleGreen"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4;
