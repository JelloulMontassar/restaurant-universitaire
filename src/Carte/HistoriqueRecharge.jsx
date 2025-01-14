import React, { useState } from "react";

const HistoriqueRecharge = () => {
    const [cardId, setCardId] = useState("");
    const [history, setHistory] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Retrieve the token from localStorage or sessionStorage
    const token = localStorage.getItem("token"); // Replace with actual token retrieval method

    const handleSearch = async () => {
        if (!cardId) {
            setError("Veuillez entrer un ID de carte valide.");
            setHistory(null);
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`http://localhost:8080/api/cartes-etudiants/historique-recharge/${cardId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,  // Add the token here
                    "Content-Type": "application/json",  // Make sure to set the content type
                },
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des données.");
            }

            const data = await response.json();
            if (data.length > 0) {
                setHistory(data);
                setError("");
            } else {
                setHistory(null);
                setError("Aucun historique trouvé pour cet ID de carte.");
            }
        } catch (err) {
            setError(err.message || "Une erreur s'est produite.");
            setHistory(null);
        } finally {
            setLoading(false);
        }
    };

    const openModal = () => {
        setError("");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setCardId("");
        setError("");
        setIsModalOpen(false);
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

            {/* Loading Indicator */}
            {loading && <p className="text-blue-500 mb-4">Chargement...</p>}

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
                                <td className="py-2 px-4">{entry.montant.toFixed(2)} TND</td>
                                <td className="py-2 px-4">{entry.carteEtudiant.solde.toFixed(2)} TND</td>
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
