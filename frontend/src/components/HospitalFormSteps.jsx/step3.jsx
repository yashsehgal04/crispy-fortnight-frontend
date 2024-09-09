import React, { useState } from 'react';
import Navbar from '../Navbar';
import ProgressBar from '../ProgressBar2';

const Step3 = ({ formData, handleChange, handleNext, handlePrev }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.totalBeds) {
      newErrors.totalBeds = 'Total Beds is required.';
    }
    // if (formData.juniorDoctors > formData.totalBeds) {
    //   newErrors.juniorDoctors = 'Available Beds cannot be greater than Total Beds.';
    // }
    
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
      <Navbar />
      <ProgressBar step={3} totalSteps={7} />
      <div className="max-w-2xl mx-auto p-6 mt-8 bg-white shadow-md rounded-lg">
        <div className="p-4">
          <div className="mb-6">
            <label htmlFor="totalBeds" className="block text-docsoGreen font-semibold mb-2">Total Beds</label>
            <input
              type="number"
              id="totalBeds"
              name="totalBeds"
              placeholder="Enter total beds"
              value={formData.totalBeds || ''}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.totalBeds ? 'border-red-500 focus:ring-red-500' : 'border-middleGreen focus:ring-middleGreen'
              }`}
              required
            />
            {errors.totalBeds && <p className="text-red-500 text-sm mt-1">{errors.totalBeds}</p>}
          </div>


          <div className="mb-6">
            <label htmlFor="seniorDoctors" className="block text-docsoGreen font-semibold mb-2">Total Senior Doctors</label>
            <input
              type="number"
              id="seniorDoctors"
              name="seniorDoctors"
              placeholder="Enter total senior doctors"
              value={formData.seniorDoctors || ''}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.seniorDoctors ? 'border-red-500 focus:ring-red-500' : 'border-middleGreen focus:ring-middleGreen'
              }`}
              required
            />
            {errors.seniorDoctors && <p className="text-red-500 text-sm mt-1">{errors.seniorDoctors}</p>}
          </div>


          <div className="mb-6">
            <label htmlFor="juniorDoctors" className="block text-docsoGreen font-semibold mb-2">Total Junior Doctors</label>
            <input
              type="number"
              id="juniorDoctors"
              name="juniorDoctors"
              placeholder="Enter total junior doctors"
              value={formData.juniorDoctors || ''}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.juniorDoctors ? 'border-red-500 focus:ring-red-500' : 'border-middleGreen focus:ring-middleGreen'
              }`}
              required
            />
            {errors.juniorDoctors && <p className="text-red-500 text-sm mt-1">{errors.juniorDoctors}</p>}
          </div>
        </div>

        <div className="flex items-center justify-center p-4">
          <div className="w-full flex justify-between">
            <button
              type="button"
              onClick={handlePrev}
              className="py-3 px-6 bg-docsoGreen text-white font-bold rounded-lg hover:bg-middleGreen focus:outline-none focus:ring-2 focus:ring-docsoGreen"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNextClick}
              className="py-3 px-6 bg-docsoGreen text-white font-bold rounded-lg hover:bg-middleGreen focus:outline-none focus:ring-2 focus:ring-docsoGreen"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;
