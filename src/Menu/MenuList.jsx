import React, { useState } from "react";

const MenuList = () => {
    // Fake data définie directement dans le composant
    const fakeMenus = [
        {
            id: 1,
            type: "QUOTIDIEN",
            startDate: "2025-01-10T08:00:00",
            endDate: "2025-01-10T22:00:00",
            repas: ["Salade César", "Poulet rôti", "Mousse au chocolat"],
        },
        {
            id: 2,
            type: "HEBDOMADAIRE",
            startDate: "2025-01-08T08:00:00",
            endDate: "2025-01-14T22:00:00",
            repas: ["Lasagnes", "Pizza", "Tiramisu"],
        },
        {
            id: 3,
            type: "QUOTIDIEN",
            startDate: "2025-01-11T08:00:00",
            endDate: "2025-01-11T22:00:00",
            repas: ["Soupe de légumes", "Filet de saumon", "Crème brûlée"],
        },
    ];

    // État pour gérer le filtre
    const [filter, setFilter] = useState("ALL"); // Filtre par défaut : Tous

    // Filtrer les menus en fonction du filtre sélectionné
    const filteredMenus =
        filter === "ALL"
            ? fakeMenus
            : fakeMenus.filter((menu) => menu.type === filter);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-center mb-6">Liste des Menus</h1>

            {/* Boutons de filtre */}
            <div className="flex justify-center mb-6">
                <button
                    className={`px-4 py-2 mx-2 rounded ${filter === "ALL" ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                    onClick={() => setFilter("ALL")}
                >
                    Tous
                </button>
                <button
                    className={`px-4 py-2 mx-2 rounded ${filter === "QUOTIDIEN" ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                    onClick={() => setFilter("QUOTIDIEN")}
                >
                    Quotidien
                </button>
                <button
                    className={`px-4 py-2 mx-2 rounded ${filter === "HEBDOMADAIRE" ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                    onClick={() => setFilter("HEBDOMADAIRE")}
                >
                    Hebdomadaire
                </button>
            </div>

            {/* Liste des menus */}
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
                            <strong>Début :</strong> {new Date(menu.startDate).toLocaleString()}
                            <br />
                            <strong>Fin :</strong> {new Date(menu.endDate).toLocaleString()}
                        </p>
                        <h3 className="text-lg font-medium text-gray-700 mb-2">Repas :</h3>
                        <ul className="list-disc list-inside">
                            {menu.repas.map((repas, index) => (
                                <li key={index} className="text-gray-600">
                                    {repas}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Aucun menu trouvé */}
            {filteredMenus.length === 0 && (
                <p className="text-center text-gray-500 mt-6">Aucun menu trouvé.</p>
            )}
        </div>
    );
};

export default MenuList;
