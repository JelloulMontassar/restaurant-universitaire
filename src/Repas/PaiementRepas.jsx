import React, { useState } from "react";

const PaiementRepas = () => {
    const [repasDisponibles] = useState([
        { id: 1, nom: "Petit Déjeuner", prix: 5 },
        { id: 2, nom: "Déjeuner", prix: 10 },
        { id: 3, nom: "Dîner", prix: 8 },
    ]);

    const [selectedRepas, setSelectedRepas] = useState([]);
    const [typePaiement, setTypePaiement] = useState("");
    const [solde, setSolde] = useState(50); // Solde initial de l'étudiant
    const [message, setMessage] = useState("");

    const handleToggleRepas = (repasId) => {
        setSelectedRepas((prevSelected) =>
            prevSelected.includes(repasId)
                ? prevSelected.filter((id) => id !== repasId)
                : [...prevSelected, repasId]
        );
    };

    const handlePaiement = () => {
        if (!typePaiement) {
            setMessage("Veuillez sélectionner un type de paiement.");
            return;
        }

        if (selectedRepas.length === 0) {
            setMessage("Veuillez sélectionner au moins un repas à payer.");
            return;
        }

        const totalPrix = selectedRepas.reduce((total, id) => {
            const repas = repasDisponibles.find((r) => r.id === id);
            return total + (repas ? repas.prix : 0);
        }, 0);

        if (solde < totalPrix) {
            setMessage("Solde insuffisant pour effectuer le paiement.");
        } else {
            setSolde(solde - totalPrix);
            setMessage(
                `Paiement réussi ! ${totalPrix} € ont été déduits de votre solde.`
            );
            setSelectedRepas([]); // Réinitialise la sélection après paiement
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Paiement des Repas</h2>

            {/* Liste des repas */}
            <h3 className="text-lg font-bold mb-2">Repas Disponibles</h3>
            <ul className="mb-4">
                {repasDisponibles.map((repas) => (
                    <li key={repas.id} className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={selectedRepas.includes(repas.id)}
                                onChange={() => handleToggleRepas(repas.id)}
                                className="mr-2"
                            />
                            {repas.nom} - {repas.prix} €
                        </label>
                    </li>
                ))}
            </ul>

            {/* Type de paiement */}
            <h3 className="text-lg font-bold mb-2">Type de Paiement</h3>
            <select
                value={typePaiement}
                onChange={(e) => setTypePaiement(e.target.value)}
                className="mb-4 p-2 border rounded-md w-full"
            >
                <option value="">-- Sélectionnez un type de paiement --</option>
                <option value="CARTE">Carte etudiant</option>
                <option value="ESPECES">Espèces</option>
            </select>

            {/* Solde de l'étudiant */}
            <p className="mb-4">Solde Actuel : <strong>{solde} €</strong></p>

            {/* Bouton de paiement */}
            <button
                onClick={handlePaiement}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
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
