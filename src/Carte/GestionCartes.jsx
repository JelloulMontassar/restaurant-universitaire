import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/cartes-etudiants";

const GestionCartes = () => {
    const [cartes, setCartes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userIdInput, setUserIdInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Fetch all cartes on component mount
    useEffect(() => {
        fetchCartes();
    }, []);

    const fetchCartes = async () => {
        try {
            const response = await axios.get(API_BASE_URL);
            setCartes(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des cartes :", error);
        }
    };

    // Ajouter une carte
    const ajouterCarte = async () => {
        try {
            const newCarte = {
                solde: 0,
                statut: "ACTIVE",
                etudiant: { id: parseInt(userIdInput, 10) },
            };
            const response = await axios.post(`${API_BASE_URL}/ajouter`, newCarte);
            setCartes([...cartes, response.data]);
            alert("Carte créée avec succès !");
            closeModal();
        } catch (error) {
            console.error("Erreur lors de l'ajout de la carte :", error);
            setErrorMessage("Impossible de créer la carte. Vérifiez l'ID utilisateur.");
        }
    };

    // Supprimer une carte
    const supprimerCarte = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/supprimer/${id}`);
            setCartes(cartes.filter((carte) => carte.id !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression de la carte :", error);
        }
    };

    // Bloquer/Débloquer une carte
    const toggleCarteStatus = async (id, currentStatus) => {
        try {
            const endpoint = `${API_BASE_URL}/bloquer/${id}`;
            const response = await axios.post(endpoint);
            setCartes(
                cartes.map((carte) =>
                    carte.id === id ? { ...carte, statut: response.data.statut } : carte
                )
            );
        } catch (error) {
            console.error("Erreur lors du changement de statut de la carte :", error);
        }
    };

    // Modal control functions
    const openModal = () => {
        setErrorMessage("");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setUserIdInput("");
        setErrorMessage("");
        setIsModalOpen(false);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Gestion des Cartes des Repas</h1>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                onClick={openModal}
            >
                Ajouter une carte
            </button>
            <ul className="space-y-4">
                {cartes.map((carte) => (
                    <li key={carte.id} className="bg-gray-100 p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-blue-600">
                            Carte Étudiant {carte.id}
                        </h2>
                        <p>ID Utilisateur : {carte.etudiant.id}</p>
                        <p>Nom Utilisateur : {carte.etudiant.nomUtilisateur}</p>
                        <p>Solde : {carte.solde.toFixed(2)} TND</p>
                        <p>Status : {carte.statut}</p>
                        <div className="flex space-x-2 mt-4">
                            <button
                                className={`px-4 py-2 rounded ${
                                    carte.statut === "ACTIVE" ? "bg-red-500" : "bg-green-500"
                                } text-white`}
                                onClick={() => toggleCarteStatus(carte.id, carte.statut)}
                            >
                                {carte.statut === "ACTIVE" ? "Bloquer" : "Débloquer"}
                            </button>
                            <button
                                className="bg-gray-700 text-white px-4 py-2 rounded"
                                onClick={() => supprimerCarte(carte.id)}
                            >
                                Supprimer
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-lg font-bold mb-4">Ajouter une Carte</h2>
                        <label className="block text-gray-700 mb-2">ID de l'Utilisateur :</label>
                        <input
                            type="number"
                            value={userIdInput}
                            onChange={(e) => setUserIdInput(e.target.value)}
                            className="border border-gray-300 p-2 rounded w-full mb-4"
                        />
                        {errorMessage && (
                            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                        )}
                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={closeModal}
                            >
                                Annuler
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={ajouterCarte}
                            >
                                Ajouter
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GestionCartes;
