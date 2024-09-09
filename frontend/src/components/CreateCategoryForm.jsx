import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from "react-router-dom";

const CreateCategoryForm = () => {
  const [categoryData, setCategoryData] = useState({
    categoryIcon: '',
    categoryName: '',
    parentCategoryId: '',
    status: 'active',
    subcategories: '' // Comma-separated subcategory IDs
  });
  const navigate  = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert comma-separated subcategory IDs to an array
    const formattedSubcategories = categoryData.subcategories.split(',').map(id => id.trim()).filter(id => id);
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/categories/create-category`, {
        ...categoryData,
        subcategories: formattedSubcategories
      });
      console.log('Category created:', response.data);
      // Handle successful response (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error('Error creating category:', error);
      // Handle error response (e.g., show an error message)
    }
  };

  return (
    <>
    <Navbar />
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Create a New Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="categoryIcon" className="block text-sm font-medium text-gray-700 mb-2">
            Category Icon URL:
          </label>
          <input
            type="text"
            id="categoryIcon"
            name="categoryIcon"
            value={categoryData.categoryIcon}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-2">
            Category Name:
          </label>
          <input
            type="text"
            id="categoryName"
            name="categoryName"
            value={categoryData.categoryName}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="parentCategoryId" className="block text-sm font-medium text-gray-700 mb-2">
            Parent Category ID (optional):
          </label>
          <input
            type="text"
            id="parentCategoryId"
            name="parentCategoryId"
            value={categoryData.parentCategoryId}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Status:
          </label>
          <select
            id="status"
            name="status"
            value={categoryData.status}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
       
        <div>
          <label htmlFor="subcategories" className="block text-sm font-medium text-gray-700 mb-2">
            Subcategory IDs (comma separated):
          </label>
          <input
            type="text"
            id="subcategories"
            name="subcategories"
            value={categoryData.subcategories}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Create Category
        </button>
      </form>
    </div>
    </>
  );
};

export default CreateCategoryForm;
