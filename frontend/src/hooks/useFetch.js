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
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/doctors/all`);
  // Assuming response.data is an array
  return response.data.filter(doctor => doctor.isApproved).slice(0, 10);
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