import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HospitalCard from "../components/HospitalCard"; // Create this component to display individual hospital data

const CategoryHospitals = () => {
  const { categoryName } = useParams(); // Get the category name from the URL
  const [hospitals, setHospitals] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        // Fetch parent category and subcategories data
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/categories/search?categoryName=${categoryName}`);
        const categoryData = response.data;

        // Extract hospital IDs and fetch each hospital's details
        const hospitalPromises = categoryData.parentCategory.hospitals.map((id) =>
          axios.get(`${import.meta.env.VITE_BASE_URL}/api/hospitals/${id}`)
        );

        const hospitalResponses = await Promise.all(hospitalPromises);
        setHospitals(hospitalResponses.map((res) => res.data));

        // Set subcategories
        setSubcategories(categoryData.subcategories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching category data:", error);
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [categoryName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-10">
      <h2 className="text-4xl font-bold mb-5">{categoryName} Hospitals</h2>
      
      {/* Display Hospitals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {hospitals.length > 0 ? (
          hospitals.map((hospital) => <HospitalCard key={hospital._id} hospital={hospital} />)
        ) : (
          <p>No hospitals found for this category.</p>
        )}
      </div>

      {/* Display Subcategories */}
      {subcategories.length > 0 && (
        <>
          <h3 className="text-2xl font-bold mt-10">Subcategories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
            {subcategories.map((subcategory, index) => (
              <div key={subcategory._id} className="subcategory-card p-6 rounded-lg shadow-lg">
                <img src={subcategory.categoryIcon} alt={subcategory.categoryName} className="w-16 h-16 mb-4 mx-auto" />
                <h4 className="text-lg font-semibold">{subcategory.categoryName}</h4>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryHospitals;
