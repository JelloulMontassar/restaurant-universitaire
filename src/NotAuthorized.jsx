import React from "react";
import { useNavigate } from "react-router-dom";

const NotAuthorized = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-red-600">403</h1>
            <h2 className="mt-2 text-2xl font-semibold text-gray-700">
                Accès non autorisé
            </h2>
            <p className="mt-4 text-gray-600">
                Vous n'avez pas la permission d'accéder à cette page.
            </p>
            <button
                onClick={() => navigate("/")}
                className="px-4 py-2 mt-6 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
            >
                Retourner à l'accueil
            </button>
        </div>
    );
};

export default NotAuthorized;
