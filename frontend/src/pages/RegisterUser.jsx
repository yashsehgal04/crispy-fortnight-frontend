import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterUser = () => {
  const [phone, setPhone] = useState('');
  const [fid, setFid] = useState('');
  const [fullName, setFullName] = useState('');
  const [profileImage, setProfileImage] = useState('https://cdn-icons-png.flaticon.com/512/6833/6833605.png');
  const [dob, setDob] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [gender, setGender] = useState('');
  const [abhaId, setAbhaId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/users/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone,
          fid,
          fullName,
          profileImage,
          dob,
          bloodGroup,
          gender,
          abhaId,
        }),
      });

      const data = await response.json();
      if (response.status===201) {
        // Save the token to local storage
        localStorage.setItem('token', data.token);

        // Navigate to the home page
        navigate('/');
      } else {
        setErrorMessage(data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Something went wrong.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-lightGreen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-docsoGreen">Register</h2>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-docsoGreen focus:border-docsoGreen"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">FID</label>
            <input
              type="text"
              value={fid}
              onChange={(e) => setFid(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-docsoGreen focus:border-docsoGreen"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-docsoGreen focus:border-docsoGreen"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-docsoGreen focus:border-docsoGreen"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Blood Group</label>
            <input
              type="text"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-docsoGreen focus:border-docsoGreen"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-docsoGreen focus:border-docsoGreen"
              required
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">ABHA ID</label>
            <input
              type="text"
              value={abhaId}
              onChange={(e) => setAbhaId(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-docsoGreen focus:border-docsoGreen"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-docsoGreen rounded-md hover:bg-middleGreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-docsoGreen"
          >
            Complete Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
