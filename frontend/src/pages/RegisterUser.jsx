import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterUser = () => {
  const [phone, setPhone] = useState('');
  const [fid, setFid] = useState('');
  const [fullName, setFullName] = useState('');
  const [profileImage, setProfileImage] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStCJpmc7wNF8Ti2Tuh_hcIRZUGOc23KBTx2A&s');
  const [dob, setDob] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [gender, setGender] = useState('');
  const [abhaId, setAbhaId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploadingImage(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setProfileImage(data.url);  // Use the URL received from the image upload API
      } else {
        setErrorMessage('Image upload failed.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrorMessage('Something went wrong during image upload.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phone.length !== 10) {
      setPhoneError('Phone number must be 10 digits.');
      return;
    } else {
      setPhoneError('');
    }

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
          profileImage,  // Include the profile image URL here
          dob,
          bloodGroup,
          gender,
          abhaId,
        }),
      });

      const data = await response.json();
      if (response.status === 201) {
        localStorage.setItem('token', data.token);
        window.alert("User Registered. You are now logged in.");
        navigate('/register-address');
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
      <div className="w-full max-w-md p-8 m-4 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-docsoGreen">Register</h2>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            {uploadingImage && <p>Uploading image...</p>}
            <img src={profileImage} alt="Profile" className="mt-4 w-24 h-24 rounded-full mx-auto" />
            <label className="block text-sm font-medium text-gray-700">Profile Image</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-docsoGreen focus:border-docsoGreen"
              accept="image/*"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
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
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-docsoGreen focus:border-docsoGreen"
              required
            />
            {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
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
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-docsoGreen focus:border-docsoGreen"
              required
            >
              <option value="" disabled>Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
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
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
