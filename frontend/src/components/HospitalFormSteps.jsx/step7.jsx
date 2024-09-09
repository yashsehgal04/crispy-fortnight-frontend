import React from 'react';
import Navbar from '../Navbar';
import ProgressBar from '../ProgressBar2'; 

const Step7 = ({ formData, handleChange, handleSubmit, handlePrev }) => (
  <div className="min-h-screen bg-lightGreen">
    <Navbar showLogin={false} showLogout={false} />
    <ProgressBar step={7} totalSteps={7} />
    <div className="max-w-4xl mx-auto p-6 mt-8 bg-white shadow-md rounded-lg">
     

      <h2 className="text-2xl font-bold text-docsoGreen mb-6">Final Step: Contact Information</h2>
      <p className="text-gray-700 mb-8">
        Please provide the contact details for the hospital. This information will be used for further communication and inquiries.
      </p>
      
      <div className="mb-8">
        <label htmlFor="contactDetails" className="block text-docsoGreen font-semibold mb-4">Phone Number</label>
        <input
          type="phone"
          id="contactDetails"
          name="contactDetails"
          placeholder="Enter phone number"
          value={formData.contactDetails}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-middleGreen"
          required
        />
      </div>

      <div className="flex justify-between mt-10">
        <button
          type="button"
          onClick={handlePrev}
          className="py-3 px-6 bg-docsoGreen text-white font-semibold rounded-lg hover:bg-middleGreen focus:outline-none focus:ring-2 focus:ring-middleGreen"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="py-3 px-6 bg-docsoGreen text-white font-semibold rounded-lg hover:bg-middleGreen focus:outline-none focus:ring-2 focus:ring-middleGreen"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
);

export default Step7;
