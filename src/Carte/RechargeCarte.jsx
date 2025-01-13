import React, { useState } from "react";
import axios from "axios";

const RechargeCarte = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [cardData, setCardData] = useState(null);
    const [error, setError] = useState("");
    const [rechargeAmount, setRechargeAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8080/api/cartes-etudiants/${cardNumber}`);
            setCardData(response.data);
            setError("");
        } catch (err) {
            setCardData(null);
            setError(`La carte avec le numéro ${cardNumber} n'a pas été trouvée.`);
        } finally {
            setLoading(false);
        }
    };

    const handleRecharge = async () => {
        if (rechargeAmount && cardData) {
            try {
                setLoading(true);
                const response = await axios.post(
                    `http://localhost:8080/api/cartes-etudiants/recharger/${cardData.id}?solde=${rechargeAmount}`
                );
                const newSolde = cardData.solde + parseFloat(rechargeAmount);
                setCardData({ ...cardData, solde: newSolde });
                setRechargeAmount("");
                alert("La carte a été rechargée avec succès !");
            } catch (err) {
                alert("Erreur lors de la recharge de la carte.");
            } finally {
                setLoading(false);
            }
        }
    };

    const toggleCardStatus = async () => {
        if (cardData) {
            const newStatus = cardData.statut === "ACTIVE" ? "BLOQUEE" : "ACTIVE";
            try {
                setLoading(true);
                await axios.post(`http://localhost:8080/api/cartes-etudiants/bloquer/${cardData.id}`, { statut: newStatus });
                setCardData({ ...cardData, statut: newStatus });
                alert(`La carte est maintenant ${newStatus}.`);
            } catch (err) {
                alert("Erreur lors du changement de statut de la carte.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Recherche de Carte Étudiant</h2>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Entrez le numéro de carte"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleSearch}
                    className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    {loading ? "Chargement..." : "Rechercher"}
                </button>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Card Data */}
            {cardData && (
                <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold">Détails de la Carte</h3>
                    <p><strong>Numéro de Carte:</strong> {cardData.id}</p>
                    <p><strong>Solde:</strong> {cardData.solde.toFixed(2)} TND</p>
                    <p><strong>Statut:</strong> {cardData.statut}</p>
                    <p><strong>Étudiant:</strong> {`${cardData.etudiant.prenomUtilisateur} ${cardData.etudiant.nomUtilisateur}`}</p>
                    <p><strong>Email:</strong> {cardData.etudiant.email}</p>
                </div>
            )}

            {/* Recharge Form */}
            {cardData && (
                <div className="mt-4">
                    <h3 className="text-lg font-bold mb-2">Recharger la Carte</h3>
                    <input
                        type="number"
                        placeholder="Entrez le montant"
                        value={rechargeAmount}
                        onChange={(e) => setRechargeAmount(e.target.value)}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <button
                        onClick={handleRecharge}
                        className="mt-2 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                    >
                        {loading ? "Rechargement..." : "Recharger"}
                    </button>
                </div>
            )}

            {/* Block/Unblock Button */}
            {cardData && (
                <div className="mt-4">
                    <button
                        onClick={toggleCardStatus}
                        className={`w-full py-2 rounded-md text-white font-bold ${cardData.statut === "ACTIVE"
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                    >
                        {cardData.statut === "ACTIVE" ? "Bloquer la Carte" : "Débloquer la Carte"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default RechargeCarte;
