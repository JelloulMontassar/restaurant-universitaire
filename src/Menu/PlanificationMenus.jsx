import React, { useState } from "react";

const PlanificationMenus = () => {
    // État pour les menus hebdomadaires et quotidiens
    const [typeMenu, setTypeMenu] = useState(""); // "HEBDOMADAIRE" ou "QUOTIDIEN"
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [repasIdsHebdo, setRepasIdsHebdo] = useState([]);
    const [repasIdsQuotidien, setRepasIdsQuotidien] = useState([]);

    const [repasDisponibles] = useState([
        { id: 1, nom: "Pain complet", type: "PETIT_DEJEUNER" },
        { id: 2, nom: "Beurre", type: "DEJEUNER" },
        { id: 3, nom: "Œufs", type: "DINER" },
        { id: 4, nom: "Tomate", type: "PETIT_DEJEUNER" },
        { id: 5, nom: "Pâtes", type: "DEJEUNER" },
        { id: 6, nom: "Salade", type: "DINER" },
        { id: 7, nom: "Croissant", type: "PETIT_DEJEUNER" },
        { id: 8, nom: "Poulet", type: "DEJEUNER" },
        { id: 9, nom: "Pizza", type: "DINER" },
        { id: 10, nom: "Yaourt", type: "PETIT_DEJEUNER" },
        { id: 11, nom: "Légumes", type: "DEJEUNER" },
        { id: 12, nom: "Poisson", type: "DINER" },
        // Plus d'ingrédients ici
    ]);

    // Gérer le changement du type de menu (hebdomadaire ou quotidien)
    const handleChangeTypeMenu = (e) => {
        setTypeMenu(e.target.value);
    };

    // Gérer le changement de la date de début
    const handleChangeStartDate = (e) => {
        setStartDate(e.target.value);
    };

    // Gérer le changement de la date de fin pour le menu hebdomadaire
    const handleChangeEndDate = (e) => {
        setEndDate(e.target.value);
    };

    // Gérer le changement de la date pour le menu quotidien
    const handleChangeSelectedDate = (e) => {
        setSelectedDate(e.target.value);
    };

    // Ajouter un repas à un jour spécifique pour le menu hebdomadaire
    const handleAddRepasHebdo = (jourIndex, repasId) => {
        const updatedRepasIds = [...repasIdsHebdo];
        updatedRepasIds[jourIndex] = updatedRepasIds[jourIndex] || [];
        if (!updatedRepasIds[jourIndex].includes(repasId)) {
            updatedRepasIds[jourIndex].push(repasId);
            setRepasIdsHebdo(updatedRepasIds);
        }
    };

    // Supprimer un repas d'un jour spécifique pour le menu hebdomadaire
    const handleRemoveRepasHebdo = (jourIndex, repasId) => {
        const updatedRepasIds = [...repasIdsHebdo];
        updatedRepasIds[jourIndex] = updatedRepasIds[jourIndex].filter((id) => id !== repasId);
        setRepasIdsHebdo(updatedRepasIds);
    };

    // Ajouter un repas pour le menu quotidien
    const handleAddRepasQuotidien = (repasId) => {
        if (!repasIdsQuotidien.includes(repasId)) {
            setRepasIdsQuotidien([...repasIdsQuotidien, repasId]);
        }
    };

    // Supprimer un repas du menu quotidien
    const handleRemoveRepasQuotidien = (repasId) => {
        setRepasIdsQuotidien(repasIdsQuotidien.filter((id) => id !== repasId));
    };

    // Sauvegarder les menus
    const handleSaveMenu = () => {
        const menuData = typeMenu === "HEBDOMADAIRE"
            ? {
                startDate,
                endDate,
                repasIds: repasIdsHebdo,
                type: "HEBDOMADAIRE",
            }
            : {
                date: selectedDate,
                repasIds: repasIdsQuotidien,
            };

        console.log("Menu Sauvegardé :", menuData);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Planification des Menus</h2>

            {/* Choix du type de menu */}
            <div className="mb-6">
                <label htmlFor="typeMenu" className="block text-lg font-bold mb-2">
                    Type de Menu
                </label>
                <select
                    id="typeMenu"
                    value={typeMenu}
                    onChange={handleChangeTypeMenu}
                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">Sélectionner un type de menu</option>
                    <option value="HEBDOMADAIRE">Menu Hebdomadaire</option>
                    <option value="QUOTIDIEN">Menu Quotidien</option>
                </select>
            </div>

            {/* Interface pour le menu Hebdomadaire */}
            {typeMenu === "HEBDOMADAIRE" && (
                <div className="mb-6">
                    <label htmlFor="startDate" className="block text-lg font-bold mb-2">
                        Date de début
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={handleChangeStartDate}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <label htmlFor="endDate" className="block text-lg font-bold mb-2">
                        Date de fin
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={handleChangeEndDate}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <div className="mt-4">
                        <h3 className="text-lg font-bold mb-2">Choisir les repas pour chaque jour</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {Array.from({ length: 7 }, (_, index) => (
                                <div key={index} className="mb-4">
                                    <h4 className="font-bold">Jour {index + 1}</h4>
                                    {["PETIT_DEJEUNER", "DEJEUNER", "DINER"].map((repasType) => (
                                        <div key={repasType}>
                                            <label className="block">{repasType}</label>
                                            <select
                                                onChange={(e) => handleAddRepasHebdo(index, parseInt(e.target.value))}
                                                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
                                            >
                                                <option value="">Sélectionner un repas</option>
                                                {repasDisponibles
                                                    .filter((repas) => repas.type === repasType)
                                                    .map((repas) => (
                                                        <option key={repas.id} value={repas.id}>
                                                            {repas.nom}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Interface pour le menu Quotidien */}
            {typeMenu === "QUOTIDIEN" && (
                <div className="mb-6">
                    <label htmlFor="selectedDate" className="block text-lg font-bold mb-2">
                        Date du Menu
                    </label>
                    <input
                        type="date"
                        id="selectedDate"
                        value={selectedDate}
                        onChange={handleChangeSelectedDate}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <div className="mt-4">
                        <h3 className="text-lg font-bold mb-2">Choisir les repas pour ce jour</h3>
                        {["PETIT_DEJEUNER", "DEJEUNER", "DINER"].map((repasType) => (
                            <div key={repasType}>
                                <label className="block">{repasType}</label>
                                <select
                                    onChange={(e) => handleAddRepasQuotidien(parseInt(e.target.value))}
                                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
                                >
                                    <option value="">Sélectionner un repas</option>
                                    {repasDisponibles
                                        .filter((repas) => repas.type === repasType)
                                        .map((repas) => (
                                            <option key={repas.id} value={repas.id}>
                                                {repas.nom}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Bouton pour sauvegarder */}
            <div className="mt-6">
                <button
                    onClick={handleSaveMenu}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Sauvegarder le menu
                </button>
            </div>
        </div>
    );
};

export default PlanificationMenus;
