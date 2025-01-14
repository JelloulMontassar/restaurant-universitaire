import React, { useState, useEffect } from "react";
import axios from "axios";

const PaiementRepas = () => {
    const [menuDate, setMenuDate] = useState(""); // Selected date for the menu
    const [repasDisponibles, setRepasDisponibles] = useState([]); // Meals available
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
                params: { date: menuDate },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRepasDisponibles(response.data.repas);
            setMessage("");
        } catch (error) {
            setRepasDisponibles([]);
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
            {repasDisponibles.length > 0 ? (
                <ul className="mb-4">
                    {repasDisponibles.map((repas) => (
                        <li key={repas.id} className="flex items-center justify-between mb-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedRepas.includes(repas.id)}
                                    onChange={() => handleToggleRepas(repas.id)}
                                    className="mr-2"
                                />
                                {repas.nom} - {repas.prixTotal} €
                            </label>
                        </li>
                    ))}
                </ul>
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
            <p className="mb-4">Solde Actuel : <strong>{solde !== null ? `${solde} €` : "Chargement..."}</strong></p>

            {/* Bouton de paiement */}
            <button
                onClick={handlePaiement}
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
            >
                Payer les Repas
            </button>

            {/* Message de validation ou d'erreur */}
            {message && (
                <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-md">
                    {message}
                </div>
            )}
        </div>
    );
};

export default PaiementRepas;
