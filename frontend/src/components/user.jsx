import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const User = ({ setShowUserComponent }) => {
  const [phone, setPhone] = useState("");
  const [fid, setFid] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number length
    if (phone.length !== 10) {
      setErrorMessage("Phone number must be exactly 10 digits.");
      return; // Prevent form submission
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/users/auth1`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, fid }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // If user exists and phone matches
        const token = data.token;
        console.log(token);
        localStorage.setItem("token", token);
        setShowUserComponent(false); // Hide the User component immediately after login
        window.dispatchEvent(new Event("storage")); // Trigger the token change event manually
        navigate("/"); // Redirect to home page
        window.alert("Logged in successfully.");
      } else if (response.status === 404) {
        // Optionally navigate to the registration page if required
        if (window.confirm(data.message)) {
          navigate("/register-user");
        }
      } else if (response.status === 400) {
        // Phone number doesn't match
        setErrorMessage(data.message || "Phone number does not match.");
      } else {
        // Handle any other response (e.g., 500)
        setErrorMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Something went wrong.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 transition-opacity duration-300 opacity-100 backdrop-blur-sm">
      <div className="relative bg-docsoGreen text-white text-center p-8 rounded-lg text-lg shadow-2xl space-y-6 transition-transform transform scale-100 hover:scale-105">
        
        {/* Close button (cross) */}
        <button 
          className="absolute top-1 right-3 text-2xl text-white hover:text-gray-400 focus:outline-none"
          onClick={() => setShowUserComponent(false)}
        >
          x
        </button>
        
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-96 h-96 bg-white rounded-full shadow-lg flex flex-col items-center justify-center">
            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 w-full flex flex-col items-center justify-center">
              <div className="w-3/4">
                <label className="block text-sm font-medium text-black">
                  Username
                </label>
                <input
                  type="text"
                  value={fid}
                  onChange={(e) => setFid(e.target.value)}
                  className="w-full px-4 py-1 mt-1 border rounded-md focus:ring-docsoGreen focus:border-docsoGreen text-black"
                  required
                />
              </div>

              <div className="w-3/4">
                <label className="block text-sm font-medium text-black">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-1 mt-1 border rounded-md focus:ring-docsoGreen focus:border-docsoGreen text-black"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-3/4 py-1 text-white bg-docsoGreen rounded-md hover:bg-middleGreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-docsoGreen transition-transform transform hover:scale-95"
              >
                Sign In
              </button>



               {/* Small link to navigate to register-user */}
               <p className="text-base text-black">
                Not a user?{" "}
                <span
                  onClick={() => navigate("/register-user")}
                  className="text-blue-600 cursor-pointer hover:text-blue-800 hover:underline"
                >
                  Register!
                </span>
              </p>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

