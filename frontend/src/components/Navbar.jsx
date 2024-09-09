import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import Footer from './Footer';

export default function Navbar({ showAdmin, showR, showOther, showSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleRegisterClick = () => {
    navigate('/home');
  };

  const handleAdminClick = () => {
    navigate('/admin');
  };

  const scrollToFooter = (e) => {
    e.preventDefault();
    document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = (e) => {
    e.preventDefault();
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <nav className="bg-docsoGreen p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Docso Logo"
              className="h-12 w-12 rounded-full border-2 border-white"
            />
          </div>

          {showOther && (
            <ul className="flex-grow flex justify-center space-x-6 text-white">
              <li className="hover:text-lightGreen">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-lightGreen">
                <Link to="/" onClick={scrollToServices}> Services </Link>
              </li>
              <li className="hover:text-lightGreen">
               <Link to="/" onClick={scrollToFooter}> Contact </Link>
              </li>
            </ul>
          )}

          {showSearch && (
            <div className="flex items-center">
              <form onSubmit={handleSearchSubmit} className="flex">
                <input
                  type="text"
                  placeholder="Search Hospitals or Doctors..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-docsoGreen"
                />
                <button
                  type="submit"
                  className="bg-docsoGreen text-white px-4 py-2 rounded-r-md hover:bg-darkGreen transition duration-300"
                >
                  Search
                </button>
              </form>
            </div>
          )}

          <div className="hidden md:flex space-x-4">
            {showAdmin && (
              <button className="text-docsoGreen bg-white px-4 py-2 rounded-md hover:bg-docsoGreen hover:text-white transition duration-300"
              onClick={handleAdminClick}
              >
                Admin
              </button>
            )}
            {showR && (
              <button
                className="text-white border-2 border-white px-4 py-2 rounded-md hover:bg-white hover:text-docsoGreen transition duration-300"
                onClick={handleRegisterClick}
              >
                Register Yourself
              </button>
            )}
          </div>
        </div>
      </nav>
      <div className="h-5 bg-lightGreen"></div>
    </div>
  );
}
