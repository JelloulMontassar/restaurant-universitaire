import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PlanificationMenus = () => {
    const [typeMenu, setTypeMenu] = useState(""); // "HEBDOMADAIRE" or "QUOTIDIEN"
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [repasIdsHebdo, setRepasIdsHebdo] = useState([]);
    const [repasIdsQuotidien, setRepasIdsQuotidien] = useState([]);
    const [repasDisponibles, setRepasDisponibles] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const authHeaders = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    // Fetch available meals
    useEffect(() => {
        axios
            .get("http://localhost:8080/api/repas", authHeaders)
            .then((response) => {
                setRepasDisponibles(response.data);
            })
            .catch((error) => {
                Swal.fire("Erreur", "Impossible de récupérer les repas disponibles.", "error");
                console.error("Error fetching meals:", error);
            });
    }, []);

    const handleChangeTypeMenu = (e) => {
        setTypeMenu(e.target.value);
    };

    const handleChangeStartDate = (e) => {
        setStartDate(e.target.value);
    };

    const handleChangeEndDate = (e) => {
        setEndDate(e.target.value);
    };

    const handleChangeSelectedDate = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleAddRepasHebdo = (jourIndex, repasId) => {
        const updatedRepasIds = [...repasIdsHebdo];

        if (!updatedRepasIds[jourIndex]) {
            updatedRepasIds[jourIndex] = [];
        }

        updatedRepasIds[jourIndex].push(repasId); // Add the repasId for the specific day

        setRepasIdsHebdo(updatedRepasIds);
    };

    const handleAddRepasQuotidien = (repasId) => {
        const updatedRepasIds = [...repasIdsQuotidien];

        updatedRepasIds.push(repasId); // Add the repasId

        setRepasIdsQuotidien(updatedRepasIds);
    };

    const handleSaveMenu = () => {
        if (typeMenu === "HEBDOMADAIRE") {
            const menuData = {
                startDate,
                endDate,
                repasIds: repasIdsHebdo.map((jour) => jour), // Send only repasIds for each day
                type: "HEBDOMADAIRE",
            };

            axios
                .post("http://localhost:8080/api/menus/planifier-hebdomadaire", menuData, authHeaders)
                .then((response) => {
                    Swal.fire("Succès", "Le menu hebdomadaire a été sauvegardé avec succès.", "success");
                    navigate("/liste_menu");
                })
                .catch((error) => {
                    Swal.fire("Erreur", "Échec de la sauvegarde du menu hebdomadaire.", "error");
                    console.error("Error saving weekly menu:", error);
                });
        } else if (typeMenu === "QUOTIDIEN") {
            const menuData = {
                date: selectedDate,
                repasIds: repasIdsQuotidien, // Send only repasIds for the daily menu
                type: "QUOTIDIEN",
            };

            axios
                .post("http://localhost:8080/api/menus/quotidien", menuData, authHeaders)
                .then((response) => {
                    Swal.fire("Succès", "Le menu quotidien a été sauvegardé avec succès.", "success");
                    navigate("/liste_menu");
                })
                .catch((error) => {
                    Swal.fire("Erreur", "Échec de la sauvegarde du menu quotidien.", "error");
                    console.error("Error saving daily menu:", error);
                });
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Planification des Menus</h2>

            {/* Menu type selection */}
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

            {/* Weekly menu interface */}
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

            {/* Daily menu interface */}
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

            {/* Save button */}
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
