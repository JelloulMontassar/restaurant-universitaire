import React, { useState } from "react";

const RecuPaiement = () => {
    const [userId, setUserId] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [recu, setRecu] = useState("");
    const [message, setMessage] = useState("");

    const handleGenererRecu = async () => {
        if (!userId || !selectedDate) {
            setMessage("Veuillez remplir l'ID utilisateur et sélectionner une date.");
            setRecu("");
            return;
        }

        try {
            const requestBody = {
                utilisateurId: parseInt(userId),
                datePaiement: selectedDate,
            };

            const response = await fetch("http://localhost:8080/api/cartes-etudiants/recu-paiement", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const data = await response.text(); // The backend returns a plain text receipt
                setRecu(data);
                setMessage("");
            } else {
                const errorText = await response.text();
                setMessage(`Erreur : ${errorText}`);
                setRecu("");
            }
        } catch (error) {
            setMessage(`Erreur lors de la connexion au serveur : ${error.message}`);
            setRecu("");
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Générer un Reçu de Paiement</h2>

            {/* Champ pour l'ID utilisateur */}
            <div className="mb-4">
                <label htmlFor="userId" className="block font-bold mb-1">
                    ID Utilisateur :
                </label>
                <input
                    type="text"
                    id="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="Entrez l'ID utilisateur"
                />
            </div>

            {/* Sélecteur de date */}
            <div className="mb-4">
                <label htmlFor="date" className="block font-bold mb-1">
                    Date :
                </label>
                <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
            </div>

            {/* Bouton pour générer le reçu */}
            <button
                onClick={handleGenererRecu}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
                Générer le Reçu
            </button>

            {/* Message d'erreur ou reçu */}
            {message && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-md">
                    {message}
                </div>
            )}

            {recu && (
                <pre className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-md whitespace-pre-wrap">
                    {recu}
                </pre>
            )}
        </div>
    );
};

export default RecuPaiement;
