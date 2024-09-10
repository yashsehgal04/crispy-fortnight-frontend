import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Modal from '../components/Model.jsx';
import axios from 'axios';

const SignUp = ({ setFormData, formData, handleChange, handleNext, handleMultiSelectChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [categories, setCategories] = useState([]);

  // // Fetch categories on component mount
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/categories/get-categories`);
  //       if (Array.isArray(response.data)) {
  //         setCategories(response.data);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching categories:', error);
  //     }
  //   };
  //   fetchCategories();
  // }, []);

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(formData.category || []);
  const [isCategoryOther, setIsCategoryOther] = useState(false);
  const [otherCategory, setOtherCategory] = useState('');
  const [errors, setErrors] = useState({});

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/categories/get-categories`);
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Handle category selection
  const handleCategorySelect = (category) => {
    if (category === "Others") {
      setIsCategoryOther(true);
    } else if (!selectedCategories.includes(category)) {
      const updatedCategories = [...selectedCategories, category];
      setSelectedCategories(updatedCategories);
      setFormData((prevData) => ({ ...prevData, category: updatedCategories }));
    }
  };

  // Handle other category submission
  const handleOtherCategorySubmit = () => {
    if (otherCategory && !selectedCategories.includes(otherCategory)) {
      const updatedCategories = [...selectedCategories, otherCategory];
      setSelectedCategories(updatedCategories);
      setFormData({ ...formData, category: updatedCategories });
    }
    setIsCategoryOther(false);
    setOtherCategory('');
  };

  // Remove category
  const removeCategory = (index) => {
    const updatedCategories = selectedCategories.filter((_, i) => i !== index);
    setSelectedCategories(updatedCategories);
    setFormData({ ...formData, category: updatedCategories });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedCategories.length) {
      newErrors.category = 'Please select at least one category.';
    }

    if (isCategoryOther && !otherCategory) {
      newErrors.otherCategory = 'Please specify the category.';
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };


  const handleSignUp = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    handleNext();
  };

  const handleFileChange = (e) => {
    handleChange(e);
  };

  return (
    <div>
      <Navbar showLogin={false} showLogout={false} showOther={false} />
      <div className="w-full min-h-screen bg-lightGreen flex items-center justify-center rounded-lg shadow-md">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-middleGreen text-center p-2">
            Doctor Sign Up
          </h3>

          <div className="space-y-4 text-left">
            {/* Doctor Name */}
            <div>
              <label htmlFor="doctorName" className="block text-sm font-medium text-gray-700 mb-2">
                Enter Name
              </label>
              <input
                type="text"
                id="doctorName"
                name="doctorName"
                placeholder="Enter Your Name as Dr. ---"
                value={formData.doctorName}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-middleGreen"
              />
            </div>

            {/* Category */}
            {/* <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}  // Make sure this is a string
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-middleGreen"
              >
                <option value="">Select Category</option>
                {Array.isArray(categories) && categories.length > 0 ? (
                  categories.map((category, index) => (
                    <option key={index} value={category.categoryName}>
                      {category.categoryName}
                    </option>
                  ))
                ) : (
                  <option disabled>No categories available</option>
                )}
              </select>
            </div> */}

<div className="space-y-4 text-left p-6">
      {/* Category Select */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          Select Your Category
        </label>
        <select
          id="category"
          name="category"
          onChange={(e) => handleCategorySelect(e.target.value)}
          className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
            errors.category ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-middleGreen'
          }`}
        >
          <option value="">Select Category</option>
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((category, index) => (
              <option key={index} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))
          ) : (
            <option disabled>No categories available</option>
          )}
          <option value="Others">Others</option>
        </select>
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}

        {/* Display selected categories */}
        <div className="flex flex-wrap mb-2 mt-2">
          {selectedCategories.map((category, index) => (
            <div
              key={index}
              className="flex items-center px-3 py-1 m-1 text-sm font-semibold bg-lightGreen text-middleGreen rounded-full shadow-sm"
            >
              {category}
              <button
                type="button"
                onClick={() => removeCategory(index)}
                className="ml-2 text-red-600 hover:text-red-900"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Input for Other Category */}
        {isCategoryOther && (
          <div className="flex mt-4">
            <input
              type="text"
              value={otherCategory}
              onChange={(e) => setOtherCategory(e.target.value)}
              placeholder="Specify Category"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-middleGreen flex-grow mr-2"
            />
            <button
              type="button"
              onClick={handleOtherCategorySubmit}
              className="px-4 py-2 bg-middleGreen text-white rounded-md shadow-sm"
            >
              Add
            </button>
          </div>
        )}
      </div>
    </div>


            {/* Other form fields */}
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
                D.O.B.
              </label>
              <input
                type="text"
                id="dob"
                name="dob"
                placeholder="DD-MM-YYYY"
                value={formData.dob}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-middleGreen"
              />
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}  // Make sure this is a string
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-middleGreen"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone No.
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Enter your Phone No"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-middleGreen"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-middleGreen"
              />
            </div>

            {/* Avatar Upload */}
            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-2">
                Profile Avatar
              </label>
              <div className="flex items-center">
                <label
                  htmlFor="avatar"
                  className="bg-docsoGreen text-white px-4 py-2 rounded-md cursor-pointer hover:bg-middleGreen transition duration-300"
                >
                  Choose File
                </label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  onChange={handleFileChange}
                  required
                  className="hidden"
                />
                <span className="ml-3 text-gray-700">
                  {formData.avatar ? formData.avatar.name : 'No file chosen'}
                </span>
              </div>
            </div>
          </div>

          {/* Sign Up Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleSignUp}
              className="bg-docsoGreen text-white px-6 py-2 rounded-md hover:bg-middleGreen transition duration-300"
            >
              Sign Up As a Doctor
            </button>
          </div>

          {/* Modal */}
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Sign Up Successful</h2>
            <p className="text-gray-700">Your sign-up was successful. You will be redirected to complete your profile.</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-docsoGreen text-white px-4 py-2 rounded-md hover:bg-middleGreen transition duration-300"
              >
                Proceed
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
