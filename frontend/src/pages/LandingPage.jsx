import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Header } from "../components/header";
import { Services } from '../components/Services';
import JsonData from "../data/data.json";
import "../App.css";
import axios from 'axios';
import DoctorCard from '../components/DoctorCard';
import HospitalCard from '../components/HospitalCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 

function Landingpage() {
  const [landingPageData, setLandingPageData] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/doctors/all`);
        setDoctors(response.data.filter(doctor => doctor.isApproved).slice(0, 10)); 
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    const fetchHospitals = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/hospitals/all-hospitals`);
        setHospitals(response.data.slice(0, 10)); 
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };

    fetchDoctors();
    fetchHospitals();
  }, []);

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  const getSliderSettings = (items) => {
    const slidesToShow = items.length < 3 ? items.length : 3;
    return {
      dots: items.length > 1,
      infinite: items.length > 1,
      speed: 500,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      centerMode: items.length <= 3,
      centerPadding: items.length <= 3 ? '0' : '20px',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: items.length < 2 ? items.length : 2,
            slidesToScroll: 1,
            centerMode: items.length <= 2,
            centerPadding: items.length <= 2 ? '0' : '10px',
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: items.length < 1 ? items.length : 1,
            slidesToScroll: 1,
            centerMode: items.length <= 1,
            centerPadding: items.length <= 1 ? '0' : '5px',
          },
        },
      ],
    };
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar showOther={true} showR={true}  />
      <Header data={landingPageData.header} />
      <Services data={landingPageData.Services} />
      <div id="services" className="py-16 bg-white">
       
      </div>
      <div className="w-full max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-docsoGreen text-center m-10 border-b border-gray-300">MEET OUR DOCTORS</h2>
          {doctors.length > 0 ? (
            <Slider {...getSliderSettings(doctors)}>
              {doctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </Slider>
          ) : (
            <p className="text-gray-600">No doctors available</p>
          )}

          <h2 className="text-4xl font-bold text-docsoGreen text-center mt-16 m-10 border-b border-gray-300">OUR REGISTERED HOSPITALS</h2>
          {hospitals.length > 0 ? (
            <Slider {...getSliderSettings(hospitals)}>
              {hospitals.map((hospital) => (
                <HospitalCard key={hospital._id} hospital={hospital} />
              ))}
            </Slider>
          ) : (
            <p className="text-gray-600">No hospitals available</p>
          )}
        </div>
      <Footer />
    </div>
  );
}

export default Landingpage;
