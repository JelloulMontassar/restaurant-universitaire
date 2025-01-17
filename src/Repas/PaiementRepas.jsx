import React, { useState, useEffect } from "react";
import axios from "axios";

// Helper function to generate a range of dates from startDate to endDate
const generateDateRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate <= end) {
        dates.push(new Date(currentDate).toISOString().split("T")[0]); // Format date as YYYY-MM-DD
        currentDate.setDate(currentDate.getDate() + 1); // Increment by one day
    }

    return dates;
};

const PaiementRepas = () => {
    const [menuDate, setMenuDate] = useState(""); // Selected date for the menu
    const [repasDisponibles, setRepasDisponibles] = useState({}); // Meals available (grouped by date)
    const [selectedRepas, setSelectedRepas] = useState([]); // Selected meals
    const [typePaiement, setTypePaiement] = useState(""); // Payment type
    const [solde, setSolde] = useState(null); // Student balance
    const [message, setMessage] = useState(""); // Feedback message

    const carteId = 1; // Replace with the actual student's card ID

    // Fetch the menu for the selected date
    const fetchMenuByDate = async () => {
        if (!menuDate) {
            setMessage("Veuillez sélectionner une date.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://localhost:8080/api/menus/getMenuByDate`, {
                params: { date: menuDate }, // Sending the selected date to the backend
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const { startDate, endDate, repas } = response.data;

            // Convert startDate and endDate to Date objects
            const start = new Date(startDate);
            const end = new Date(endDate);

            // Calculate the total number of days between start and end dates
            const totalDays = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;

            // Prepare an array to store the meals by day
            const mealsPerDay = [];
            let currentIndex = 0;

            // Distribute the meals across the days (PETIT_DEJEUNER, DEJEUNER, DINER)
            while (currentIndex < repas.length) {
                for (let day = 0; day < totalDays; day++) {
                    // Create a day entry with the corresponding meal types
                    if (!mealsPerDay[day]) {
                        mealsPerDay[day] = { PETIT_DEJEUNER: [], DEJEUNER: [], DINER: [] };
                    }

                    // Assign the next PETIT_DEJEUNER, DEJEUNER, or DINER in sequence
                    if (currentIndex < repas.length) {
                        if (repas[currentIndex].type === "PETIT_DEJEUNER") {
                            mealsPerDay[day].PETIT_DEJEUNER.push(repas[currentIndex]);
                            currentIndex++;
                        }
                    }

                    if (currentIndex < repas.length) {
                        if (repas[currentIndex].type === "DEJEUNER") {
                            mealsPerDay[day].DEJEUNER.push(repas[currentIndex]);
                            currentIndex++;
                        }
                    }

                    if (currentIndex < repas.length) {
                        if (repas[currentIndex].type === "DINER") {
                            mealsPerDay[day].DINER.push(repas[currentIndex]);
                            currentIndex++;
                        }
                    }

                    // Stop if all meals have been distributed
                    if (currentIndex >= repas.length) break;
                }
            }

            // Map each day with the actual date based on startDate
            const availableDates = [];
            for (let i = 0; i < totalDays; i++) {
                const date = new Date(start);
                date.setDate(start.getDate() + i);
                availableDates.push(date.toISOString().split("T")[0]); // Format as YYYY-MM-DD
            }

            // Group meals by date and meal type
            const groupedMeals = {};
            availableDates.forEach((date, index) => {
                groupedMeals[date] = mealsPerDay[index] || { PETIT_DEJEUNER: [], DEJEUNER: [], DINER: [] };
            });

            // Set the state with the grouped meals
            setRepasDisponibles(groupedMeals);
            setMessage("");
        } catch (error) {
            setRepasDisponibles({});
            setMessage("Aucun menu trouvé pour cette date.");
        }
    };

    // Toggle selection of a meal
    const handleToggleRepas = (repasId) => {
        setSelectedRepas((prevSelected) =>
            prevSelected.includes(repasId)
                ? prevSelected.filter((id) => id !== repasId)
                : [...prevSelected, repasId]
        );
    };

    // Handle payment
    const handlePaiement = async () => {
        if (!typePaiement) {
            setMessage("Veuillez sélectionner un type de paiement.");
            return;
        }
        if (selectedRepas.length === 0) {
            setMessage("Veuillez sélectionner au moins un repas à payer.");
            return;
        }

        const payload = {
            carteId: carteId,
            repasIds: selectedRepas,
            typePaiement: typePaiement,
        };

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("http://localhost:8080/api/repas/payer", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const { message: successMessage, solde_restant, repas_payes } = response.data;

            setSolde(solde_restant); // Update the student's balance
            setMessage(successMessage);
            setSelectedRepas([]); // Clear selected meals

            // Log paid meals (optional)
            console.log("Repas payés:", repas_payes);
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.error || "Une erreur s'est produite.");
            } else {
                setMessage("Impossible de se connecter au serveur.");
            }
        }
    };

    // Fetch the initial solde (optional)
    useEffect(() => {
        const fetchInitialSolde = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `http://localhost:8080/api/cartes-etudiants/getCarteEtudiantByUtilisateur`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setSolde(response.data.solde);
            } catch (error) {
                setMessage("Impossible de récupérer le solde initial.");
            }
        };

        fetchInitialSolde();
    }, [carteId]);

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Paiement des Repas</h2>

            {/* Date selection */}
            <div className="mb-4">
                <label className="block text-lg font-bold mb-2">Sélectionnez une date :</label>
                <input
                    type="date"
                    value={menuDate}
                    onChange={(e) => setMenuDate(e.target.value)}
                    className="p-2 border rounded-md w-full"
                />
                <button
                    onClick={fetchMenuByDate}
                    className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Charger le menu
                </button>
            </div>

            {/* Liste des repas */}
            <h3 className="text-lg font-bold mb-2">Repas Disponibles</h3>
            {Object.keys(repasDisponibles).length > 0 ? (
                Object.keys(repasDisponibles).map((date) => (
                    <div key={date} className="mb-6">
                        <h4 className="text-lg font-bold">{date}</h4>
                        <ul>
                            {["PETIT_DEJEUNER", "DEJEUNER", "DINER"].map((mealType) => (
                                <li key={mealType}>
                                    <strong>{mealType}:</strong>
                                    <ul>
                                        {repasDisponibles[date][mealType].map((repas) => (
                                            <li key={repas.id} className="flex items-center justify-between mb-2">
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedRepas.includes(repas.id)}
                                                        onChange={() => handleToggleRepas(repas.id)}
                                                        className="mr-2"
                                                    />
                                                    {repas.nom} - {repas.prixTotal} TND
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>Aucun repas disponible pour cette date.</p>
            )}

            {/* Type de paiement */}
            <h3 className="text-lg font-bold mb-2">Type de Paiement</h3>
            <select
                value={typePaiement}
                onChange={(e) => setTypePaiement(e.target.value)}
                className="mb-4 p-2 border rounded-md w-full"
            >
                <option value="">-- Sélectionnez un type de paiement --</option>
                <option value="CARTE_ETUDIANT">Carte étudiant</option>
                <option value="ESPECES">Espèces</option>
            </select>

            {/* Solde de l'étudiant */}
            <p className="mb-4">Solde disponible: {solde} TND</p>

            {/* Message */}
            {message && <p className="text-red-500 mb-4">{message}</p>}

            {/* Paiement Button */}
            <button
                onClick={handlePaiement}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
                Payer
            </button>
        </div>
    );
};

export default PaiementRepas;
