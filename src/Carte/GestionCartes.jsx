import React, { useState } from "react";

// Données fictives pour les utilisateurs et les cartes
const fakeUtilisateurs = [{ id: 1, nom: "Utilisateur 1" }, { id: 2, nom: "Utilisateur 2" }];
const fakeCartes = [
    { id: 1, utilisateurId: 1, nom: "Carte Étudiant 1", solde: 50.0, status: "ACTIVE" },
    { id: 2, utilisateurId: 2, nom: "Carte Étudiant 2", solde: 20.0, status: "BLOQUEE" },
];

const GestionCartes = () => {
    const [cartes, setCartes] = useState(fakeCartes);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userIdInput, setUserIdInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Fonction pour afficher la modal
    const openModal = () => {
        setErrorMessage("");
        setIsModalOpen(true);
    };

    // Fonction pour fermer la modal
    const closeModal = () => {
        setUserIdInput("");
        setErrorMessage("");
        setIsModalOpen(false);
    };

    // Ajouter une carte
    const ajouterCarte = () => {
        const userId = parseInt(userIdInput, 10);
        const utilisateurExiste = fakeUtilisateurs.some((user) => user.id === userId);

        if (!utilisateurExiste) {
            setErrorMessage("L'utilisateur avec cet ID n'existe pas !");
            return;
        }

        const nouvelleCarte = {
            id: cartes.length + 1,
            utilisateurId: userId,
            nom: `Carte Étudiant ${cartes.length + 1}`,
            solde: 0,
            status: "ACTIVE",
        };

        setCartes([...cartes, nouvelleCarte]);
        alert(`Carte créée avec succès pour l'utilisateur ID ${userId} !`);
        closeModal();
    };

    // Supprimer une carte
    const supprimerCarte = (id) => {
        setCartes(cartes.filter((carte) => carte.id !== id));
    };

    // Bloquer/Débloquer une carte
    const toggleCarteStatus = (id) => {
        setCartes(
            cartes.map((carte) =>
                carte.id === id
                    ? { ...carte, status: carte.status === "ACTIVE" ? "BLOQUEE" : "ACTIVE" }
                    : carte
            )
        );
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
                        <h2 className="text-xl font-semibold text-blue-600">{carte.nom}</h2>
                        <p>ID Utilisateur : {carte.utilisateurId}</p>
                        <p>Solde : {carte.solde.toFixed(2)} €</p>
                        <p>Status : {carte.status}</p>
                        <div className="flex space-x-2 mt-4">
                            {/* Bouton Bloquer/Débloquer */}
                            <button
                                className={`px-4 py-2 rounded ${carte.status === "ACTIVE" ? "bg-red-500" : "bg-green-500"
                                    } text-white`}
                                onClick={() => toggleCarteStatus(carte.id)}
                            >
                                {carte.status === "ACTIVE" ? "Bloquer" : "Débloquer"}
                            </button>
                            {/* Bouton Supprimer */}
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

            {/* Modal */}
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
