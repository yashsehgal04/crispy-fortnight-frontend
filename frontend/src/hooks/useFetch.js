// src/hooks/useFetch.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to fetch categories
const fetchCategories = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/categories/get-six-categories`);
  return response.data;
};

// Function to fetch doctors
const fetchDoctors = async () => {
  try {
    // Make sure VITE_BASE_URL is correctly set in your .env file
    console.log('API URL:', `${import.meta.env.VITE_BASE_URL}/api/doctors/all`);
    
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/doctors/all`);
    
    // Add error handling for non-JSON responses
    if (typeof response.data === 'string') {
      console.error('Received HTML instead of JSON. Check API URL.');
      return [];
    }
    
    const doctors = Array.isArray(response.data) ? response.data : [];
    return doctors.filter(doctor => doctor.isApproved).slice(0, 10);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw new Error('Failed to fetch doctors. Please check API configuration.');
  }
};

// Function to fetch hospitals
const fetchHospitals = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/hospitals/all-hospitals`);
  return response.data.slice(0, 10);
};

// Updated custom hooks using React Query v5 syntax
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useDoctors = () => {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: fetchDoctors,
    staleTime: 5 * 60 * 1000,
  });
};

export const useHospitals = () => {
  return useQuery({
    queryKey: ['hospitals'],
    queryFn: fetchHospitals,
    staleTime: 5 * 60 * 1000,
  });
};