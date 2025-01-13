import React, { useState, useEffect } from "react";
import axios from "axios";

const PlanificationMenus = () => {
    // États pour les menus et les repas
    const [typeMenu, setTypeMenu] = useState(""); // "HEBDOMADAIRE" ou "QUOTIDIEN"
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [repasIdsHebdo, setRepasIdsHebdo] = useState([]);
    const [repasIdsQuotidien, setRepasIdsQuotidien] = useState([]);
    const [repasDisponibles, setRepasDisponibles] = useState([]);

    // Récupérer les repas disponibles depuis l'API
    useEffect(() => {
        axios.get("http://localhost:8080/api/repas")
            .then((response) => {
                setRepasDisponibles(response.data); // Sauvegarder les repas récupérés depuis l'API
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des repas :", error);
            });
    }, []);

    // Gérer le changement du type de menu
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
                repasIds: repasIdsHebdo.map(dayIds => dayIds.map(id => id)), // Ensure repasIdsHebdo is an array of arrays
                type: "HEBDOMADAIRE",
            }
            : {
                date: selectedDate,
                repasIds: repasIdsQuotidien,
            };

        // Send the request to the backend to save the menu
        axios.post("http://localhost:8080/api/menus/planifier-hebdomadaire", menuData)
            .then((response) => {
                console.log("Menu Sauvegardé :", response.data);
            })
            .catch((error) => {
                console.error("Erreur lors de la sauvegarde du menu :", error);
            });
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
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Sauvegarder le Menu
                </button>
            </div>
        </div>
    );
};

export default PlanificationMenus;
