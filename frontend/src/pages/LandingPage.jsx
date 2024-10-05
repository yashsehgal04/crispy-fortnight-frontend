// src/pages/Landingpage.jsx
import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Header } from "../components/Header";
import { Services } from '../components/Services';
import JsonData from "../data/data.json";
import "../App.css";
import DoctorCard from '../components/DoctorCard';
import HospitalCard from '../components/HospitalCard';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css'; 
// import 'slick-carousel/slick/slick-theme.css'; 
import { useCategories, useDoctors, useHospitals } from '../hooks/useFetch'; 
import { useNavigate } from "react-router-dom"; 
import User  from '../components/user';


function Landingpage() {
  const [landingPageData, setLandingPageData] = useState({});
  const navigate = useNavigate();
  const [showUserComponent, setShowUserComponent] = useState(false);
  // Use React Query hooks
  const { data: categories, isLoading: loadingCategories, error: errorCategories } = useCategories();
  const { data: doctors, isLoading: loadingDoctors, error: errorDoctors } = useDoctors();
  const { data: hospitals, isLoading: loadingHospitals, error: errorHospitals } = useHospitals();

  useEffect(() => {
    // Load local JSON data
    setLandingPageData(JsonData);
  }, []);

  // const getSliderSettings = (items) => {
  //   const slidesToShow = items.length < 3 ? items.length : 3;
  //   return {
  //     dots: items.length > 1,
  //     infinite: items.length > 1,
  //     speed: 500,
  //     slidesToShow: slidesToShow,
  //     slidesToScroll: 1,
  //     centerMode: false, 
  //     centerPadding: '0',
  //     responsive: [
  //       {
  //         breakpoint: 1024,
  //         settings: {
  //           slidesToShow: items.length < 2 ? items.length : 2,
  //           slidesToScroll: 1,
  //         },
  //       },
  //       {
  //         breakpoint: 600,
  //         settings: {
  //           slidesToShow: 1,
  //           slidesToScroll: 1,
  //           arrows: false, 
  //         },
  //       },
  //     ],
  //   };
  // };

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token"); // Fetch the token from local storage
      if (!token) {
        setShowUserComponent(true);  // Show the User component if no token is found
      } else {
        setShowUserComponent(false); // Hide the User component if token exists
      }
    };

    // Run the token check every 6 seconds using setInterval
    const interval = setInterval(checkToken, 10000);

    // Initial token check on page load
    checkToken();

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval); 
    };
  }, []);


  if (errorCategories || errorDoctors || errorHospitals) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-xl">Error loading data. Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      {showUserComponent && (
          <User setShowUserComponent={setShowUserComponent}/>

      )}
    <div className="bg-gray-100 min-h-screen overflow-hidden">
      <Navbar showOther={true} showR={true} setShowUserComponent={setShowUserComponent} />
      <Header data={landingPageData.header} />
      {/* Services Section */}
      <div>
        {loadingCategories ? (
          <p className="text-center text-gray-600">Loading services...</p>
        ) : (
          <Services data={categories} />
        )}
      </div>
      
      {/* Doctor and Hospital Section */}
      <div className="w-full max-w-6xl mx-auto overflow-hidden">
        <h2 className="text-4xl sm:text-3xl text-center font-bold text-docsoGreen m-16 border-b border-gray-300">MEET OUR DOCTORS</h2>
        {/* {loadingDoctors ? (
          <p className="text-center text-gray-600">Loading doctors...</p>
        ) : doctors.length > 0 ? (
          <Slider {...getSliderSettings(doctors)}>
            {doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </Slider>
        ) : (
          <p className="text-center text-gray-600">No doctors available</p>
        )} */}

        <h2 className="text-4xl sm:text-3xl text-center font-bold text-docsoGreen mt-16 m-10 border-b border-gray-300">OUR REGISTERED HOSPITALS</h2>
        {/* {loadingHospitals ? (
          <p className="text-center text-gray-600">Loading hospitals...</p>
        ) : hospitals.length > 0 ? (
          <Slider {...getSliderSettings(hospitals)}>
            {hospitals.map((hospital) => (
              <HospitalCard key={hospital._id} hospital={hospital} />
            ))}
          </Slider>
        ) : (
          <p className="text-center text-gray-600">No hospitals available</p>
        )} */}
      </div>

      <Footer />
    </div>
    </>
  );
}
export default Landingpage;
