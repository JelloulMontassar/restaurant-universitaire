import React, { useState } from "react";

// Données fictives pour le test
const rechargeHistory = [
    {
        id: 1,
        carteEtudiant: { id: 1, statut: "ACTIVE", solde: 2247.6 },
        montant: -1938.1,
        dateRecharge: "2025-01-10T15:02:29",
    },
    {
        id: 2,
        carteEtudiant: { id: 1, statut: "ACTIVE", solde: 2247.6 },
        montant: -1938.1,
        dateRecharge: "2025-01-10T16:40:19",
    },
    {
        id: 3,
        carteEtudiant: { id: 1, statut: "ACTIVE", solde: 2247.6 },
        montant: -1938.1,
        dateRecharge: "2025-01-10T18:35:24",
    },
    {
        id: 4,
        carteEtudiant: { id: 1, statut: "ACTIVE", solde: 2247.6 },
        montant: -1938.1,
        dateRecharge: "2025-01-11T18:29:39",
    },
];

const HistoriqueRecharge = () => {
    const [cardId, setCardId] = useState("");
    const [history, setHistory] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = () => {
        const filteredHistory = rechargeHistory.filter(
            (entry) => entry.carteEtudiant.id === parseInt(cardId)
        );

        if (filteredHistory.length > 0) {
            setHistory(filteredHistory);
            setError("");
        } else {
            setHistory(null);
            setError("Pas de carte trouvée avec cet ID !");
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Historique de Recharge</h2>
            {/* Search Bar */}
            <div className="mb-4">
                <label htmlFor="cardId" className="block text-lg font-semibold mb-2">
                    ID de la Carte:
                </label>
                <input
                    type="number"
                    id="cardId"
                    value={cardId}
                    onChange={(e) => setCardId(e.target.value)}
                    placeholder="Entrez l'ID de la carte"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleSearch}
                    className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Rechercher
                </button>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* History Table */}
            {history && (
                <div className="overflow-x-auto bg-gray-50 p-4 rounded-lg shadow-md">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 text-left text-lg font-semibold">ID Recharge</th>
                                <th className="py-2 px-4 text-left text-lg font-semibold">Date de Recharge</th>
                                <th className="py-2 px-4 text-left text-lg font-semibold">Montant</th>
                                <th className="py-2 px-4 text-left text-lg font-semibold">Solde</th>
                                <th className="py-2 px-4 text-left text-lg font-semibold">Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((entry) => (
                                <tr key={entry.id} className="border-t">
                                    <td className="py-2 px-4">{entry.id}</td>
                                    <td className="py-2 px-4">{new Date(entry.dateRecharge).toLocaleString()}</td>
                                    <td className="py-2 px-4">{entry.montant.toFixed(2)} €</td>
                                    <td className="py-2 px-4">{entry.carteEtudiant.solde.toFixed(2)} €</td>
                                    <td className="py-2 px-4">{entry.carteEtudiant.statut}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default HistoriqueRecharge;
