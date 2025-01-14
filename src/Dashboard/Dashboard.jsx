import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const routes = [
    { path: "/ajouter_utilisateur", name: "Ajouter Utilisateur", roles: ["ADMINISTRATEUR"] },
    { path: "/liste_utilisateur", name: "Liste des Utilisateurs", roles: ["ADMINISTRATEUR"] },
    { path: "/profil", name: "Profil", roles: ["ADMINISTRATEUR", "ETUDIANT", "EMPLOYE"] },
    { path: "/recharge_carte", name: "Recharge Carte", roles: ["EMPLOYE","ETUDIANT"] },
    { path: "/gestion_stock_ingrediant", name: "Gestion des Ingrédients", roles: ["ADMINISTRATEUR"] },
    { path: "/gestion_repas", name: "Gestion des Repas", roles: ["ADMINISTRATEUR"] },
    { path: "/gestion_menu", name: "Gestion des Menus", roles: ["ADMINISTRATEUR"] },
    { path: "/repas", name: "Afficher Repas", roles: ["ETUDIANT", "EMPLOYE","ADMINISTRATEUR"] },
    { path: "/gestion_cartes", name: "Gestion des Cartes", roles: ["ADMINISTRATEUR"] },
    { path: "/historique_recharge", name: "Historique Recharge", roles: ["ADMINISTRATEUR", "EMPLOYE"] },
    { path: "/paiement_repas", name: "Paiement Repas", roles: ["ETUDIANT"] },
    { path: "/recu_paiement", name: "Reçu de Paiement", roles: ["ETUDIANT"] },
];

const Dashboard = () => {
    const navigate = useNavigate();

    // Decode the token to get the user's role
    const token = localStorage.getItem("token");
    let userRole = null;

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            userRole = decodedToken.role; // Extract the role from the token
        } catch (error) {
            console.error("Invalid token:", error);
        }
    }

    // Filter the routes based on the user's role
    const accessibleRoutes = routes.filter((route) => route.roles.includes(userRole));

    const handleLogout = () => {
        localStorage.removeItem("token"); // Clear the token
        navigate("/login"); // Redirect to login page
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none"
                >
                    Logout
                </button>
            </div>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {accessibleRoutes.map((route, index) => (
                    <Link
                        to={route.path}
                        key={index}
                        className="bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow p-6 text-center"
                    >
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mb-4">
                                <span className="text-xl font-bold">{route.name.charAt(0)}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700">
                                {route.name}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
