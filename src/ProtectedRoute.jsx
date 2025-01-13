import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        // Redirect to login if no token exists
        return <Navigate to="/login" />;
    }

    try {
        // Decode the token to get user details
        const decodedToken = jwtDecode(token);


        // Check if the token is expired
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
            localStorage.removeItem("token"); // Clear the token
            return <Navigate to="/login" />;
        }

        // Check if the user's role matches the allowed roles
        if (!allowedRoles.includes(decodedToken.role)) {
            return <Navigate to="/not-authorized" />;
        }

        // Render the protected content if everything is valid
        return children;
    } catch (error) {
        console.error("Error decoding token:", error);
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
