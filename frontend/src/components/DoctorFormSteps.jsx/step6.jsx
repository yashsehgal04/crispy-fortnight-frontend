import React from 'react';
import Navbar from '../Navbar';
import ProgressBar from '../ProgressBar';

const Step6 = ({ handleChange, handleNext, handlePrev }) => (
  <div className="min-h-screen flex flex-col bg-lightGreen">
    <Navbar showLogin={false} showLogout={false} showOther={false} />
    <div className="flex-1 flex flex-col items-center">
      <ProgressBar step={6} totalSteps={8} />

      <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-lg mt-8">
        <h3 className="text-2xl font-semibold text-middleGreen mb-6 text-center">
          Establishment Proof
        </h3>

        <p className="text-gray-700 mb-4 text-center">
          Please upload your establishment proof to verify the legitimacy of your practice and ensure trust with your patients.
        </p>

        <p className="text-gray-700 mb-6">
          Acceptable documents:
          <ul className="list-disc list-inside mt-2">
            <li>Clinic Registration Certificate</li>
            <li>Hospital Establishment License</li>
            <li>Any other official establishment proof</li>
          </ul>
        </p>

        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <label
              htmlFor="establishmentProof"
              className="block text-lg font-semibold text-docsoGreen mb-2"
            >
              Upload Establishment Proof
            </label>
            <input
              type="file"
              id="establishmentProof"
              name="establishmentProof"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-middleGreen"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-between w-full max-w-md mx-auto">
          <button
            type="button"
            onClick={handlePrev}
            className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition duration-300"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="bg-docsoGreen text-white px-6 py-2 rounded-md hover:bg-middleGreen transition duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Step6;
