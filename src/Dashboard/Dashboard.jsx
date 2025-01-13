import React from "react";
import { Link } from "react-router-dom";

const routes = [
    { path: "/ajouter_utilisateur", name: "Ajouter Utilisateur" },
    { path: "/liste_utilisateur", name: "Liste des Utilisateurs" },
    { path: "/profil", name: "Profil" },
    { path: "/recharge_carte", name: "Recharge Carte" },
    { path: "/gestion_stock_ingrediant", name: "Gestion des Ingrédients" },
    { path: "/gestion_repas", name: "Gestion des Repas" },
    { path: "/gestion_menu", name: "Gestion des Menus" },
    { path: "/repas", name: "Afficher Repas" },
    { path: "/gestion_cartes", name: "Gestion des Cartes" },
    { path: "/historique_recharge", name: "Historique Recharge" },
    { path: "/paiement_repas", name: "Paiement Repas" },
    { path: "/recu_paiement", name: "Reçu de Paiement" },
];

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {routes.map((route, index) => (
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
