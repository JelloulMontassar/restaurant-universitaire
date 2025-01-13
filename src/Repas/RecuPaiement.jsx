import React, { useState } from "react";

const RecuPaiement = () => {
    // Fake data
    const fakePaiements = [
        {
            id: 1,
            utilisateurId: 123,
            datePaiement: "2025-01-12T10:30:00",
            montant: 20,
            type: "Carte Bancaire",
        },
        {
            id: 2,
            utilisateurId: 123,
            datePaiement: "2025-01-12T14:15:00",
            montant: 15,
            type: "Espèces",
        },
    ];

    const [userId, setUserId] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [recu, setRecu] = useState("");
    const [message, setMessage] = useState("");

    const handleGenererRecu = () => {
        // Validation
        if (!userId || !selectedDate) {
            setMessage("Veuillez remplir l'ID utilisateur et sélectionner une date.");
            setRecu("");
            return;
        }

        // Convertir la date en début et fin de journée
        const startOfDay = new Date(selectedDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(selectedDate);
        endOfDay.setHours(23, 59, 59, 999);

        // Filtrer les paiements correspondants
        const paiementsTrouves = fakePaiements.filter(
            (paiement) =>
                paiement.utilisateurId.toString() === userId &&
                new Date(paiement.datePaiement) >= startOfDay &&
                new Date(paiement.datePaiement) <= endOfDay
        );

        if (paiementsTrouves.length === 0) {
            setMessage("Aucun paiement trouvé pour cet utilisateur à cette date.");
            setRecu("");
            return;
        }

        // Générer le reçu
        let total = 0;
        let recuString = "=== Reçu de Paiement ===\n";
        recuString += `ID Utilisateur : ${userId}\n`;
        recuString += `Date : ${selectedDate}\n`;
        recuString += "========================\n";

        paiementsTrouves.forEach((paiement) => {
            recuString += `ID Paiement : ${paiement.id}\n`;
            recuString += `Montant : ${paiement.montant} €\n`;
            recuString += `Type : ${paiement.type}\n`;
            recuString += "------------------------\n";
            total += paiement.montant;
        });

        recuString += `Total Payé : ${total} €\n`;
        recuString += "========================";

        setRecu(recuString);
        setMessage("");
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
