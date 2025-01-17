import React, { useState, useEffect } from "react";
import axios from "axios";

const MenuList = () => {
    const BASE_URL = "http://localhost:8080/api/menus";

    const [menus, setMenus] = useState([]);
    const [filter, setFilter] = useState("ALL"); // Filter state
    const [error, setError] = useState(null);

    // Fetch menus on component load
    useEffect(() => {
        fetchMenus();
    }, []);

    // Function to fetch all menus
    const fetchMenus = async () => {
        try {
            const response = await axios.get(BASE_URL);
            setMenus(response.data);
        } catch (err) {
            console.error("Error fetching menus:", err);
            setError("Failed to load menus.");
        }
    };

    // Filtered menus based on the selected type
    const filteredMenus =
        filter === "ALL"
            ? menus
            : menus.filter((menu) => menu.type === filter);

    // Render menu type filter buttons
    const renderFilterButtons = () => (
        <div className="flex justify-center mb-6">
            {["ALL", "QUOTIDIEN", "HEBDOMADAIRE"].map((type) => (
                <button
                    key={type}
                    className={`px-4 py-2 mx-2 rounded ${filter === type ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => setFilter(type)}
                >
                    {type === "ALL" ? "Tous" : type}
                </button>
            ))}
        </div>
    );

    // Render the list of menus
    const renderMenus = () =>
        filteredMenus.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredMenus.map((menu) => (
                    <div
                        key={menu.id}
                        className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Menu {menu.type}
                        </h2>
                        <p className="text-sm text-gray-600 mb-4">
                            <strong>Début :</strong> {menu.startDate}
                            <br />
                            <strong>Fin :</strong> {menu.endDate}
                        </p>
                        <h3 className="text-lg font-medium text-gray-700 mb-2">
                            Repas :
                        </h3>
                        <ul className="list-disc list-inside">
                            {menu.repas.map((repas, index) => (
                                <li key={index} className="text-gray-600">
                                    {repas.nom}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-center text-gray-500 mt-6">
                Aucun menu trouvé.
            </p>
        );

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-center mb-6">
                Liste des Menus
            </h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {renderFilterButtons()}
            {renderMenus()}
        </div>
    );
};

export default MenuList;
