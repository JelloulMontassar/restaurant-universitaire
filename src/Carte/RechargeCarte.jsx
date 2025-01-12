import React, { useState } from "react";

const RechargeCarte = () => {
    // Fake data for testing
    const fakeData = {
        1: {
            id: 1,
            solde: 2247.6,
            statut: "ACTIVE",
            createdAt: "2025-01-03T19:54:40",
            updatedAt: "2025-01-11T18:29:39",
            version: 4,
            etudiant: {
                id: 15,
                nomUtilisateur: "test",
                prenomUtilisateur: "test",
                genre: "FEMININ",
                email: "test10@gmail.com",
                role: "ETUDIANT",
                createdAt: "2025-01-03T19:54:10",
                updatedAt: "2025-01-03T19:54:10",
            },
        },
    };

    const [cardNumber, setCardNumber] = useState("");
    const [cardData, setCardData] = useState(null);
    const [error, setError] = useState("");
    const [rechargeAmount, setRechargeAmount] = useState("");

    const handleSearch = () => {
        const card = fakeData[cardNumber];
        if (card) {
            setCardData(card);
            setError("");
        } else {
            setCardData(null);
            setError(`La carte avec le numéro ${cardNumber} n'a pas été trouvée.`);
        }
    };

    const handleRecharge = () => {
        if (rechargeAmount && cardData) {
            const newSolde = parseFloat(cardData.solde) + parseFloat(rechargeAmount);
            setCardData({ ...cardData, solde: newSolde });
            setRechargeAmount("");
            alert("La carte a été rechargée avec succès !");
        }
    };

    const toggleCardStatus = () => {
        if (cardData) {
            const newStatus = cardData.statut === "ACTIVE" ? "BLOQUEE" : "ACTIVE";
            setCardData({ ...cardData, statut: newStatus });
            alert(`La carte est maintenant ${newStatus}.`);
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
                    Rechercher
                </button>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Card Data */}
            {cardData && (
                <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold">Détails de la Carte</h3>
                    <p><strong>Numéro de Carte:</strong> {cardData.id}</p>
                    <p><strong>Solde:</strong> {cardData.solde.toFixed(2)} €</p>
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
                        Recharger
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
