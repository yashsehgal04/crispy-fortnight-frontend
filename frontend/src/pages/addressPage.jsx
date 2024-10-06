import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterAddress = () => {
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [type, setType] = useState('Home');
  const [defaultAddress, setDefaultAddress] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      addressLine,
      city,
      state,
      pincode,
      type,
      default: defaultAddress,
    };

    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/address/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Address successfully registered:', response.data);
      window.alert('Address registered successfully');
      navigate('/');
    } catch (error) {
      console.error('Error registering address:', error);
      setErrorMessage('Failed to register address. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-lightGreen">
      <div className="w-full max-w-md p-8 m-4 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-docsoGreen">Register Address</h2>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Address Line</label>
            <input
              type="text"
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-docsoGreen focus:border-docsoGreen"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-docsoGreen focus:border-docsoGreen"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-docsoGreen focus:border-docsoGreen"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Pincode</label>
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-docsoGreen focus:border-docsoGreen"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-docsoGreen focus:border-docsoGreen"
              required
            >
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex items-center">
            <label className="block text-sm font-medium text-gray-700">Set as Default</label>
            <input
              type="checkbox"
              checked={defaultAddress}
              onChange={(e) => setDefaultAddress(e.target.checked)}
              className="ml-2"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-docsoGreen rounded-md hover:bg-middleGreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-docsoGreen"
          >
            Register Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterAddress;
