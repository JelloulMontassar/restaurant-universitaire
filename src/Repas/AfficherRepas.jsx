import React, { useEffect, useState } from "react";
import axios from "axios";

const AfficherRepas = () => {
    const [repasData, setRepasData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from the backend API
        const fetchRepas = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/repas");
                setRepasData(response.data);
            } catch (err) {
                console.error("Erreur lors de la récupération des repas :", err);
                setError("Impossible de charger les repas. Veuillez réessayer.");
            }
        };

        fetchRepas();
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Liste des Repas</h1>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <ul className="space-y-6">
                    {repasData.map((repas) => (
                        <li key={repas.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                            <h2 className="text-xl font-semibold text-blue-600">{repas.nom}</h2>
                            <p className="text-gray-600">Type : {repas.type}</p>
                            <p className="text-gray-600">
                                Prix Total : <span className="font-semibold">{repas.prixTotal.toFixed(2)} TND</span>
                            </p>
                            <p className="text-gray-600 font-medium">Ingrédients :</p>
                            <ul className="list-disc pl-6 space-y-2">
                                {repas.ingredients.map((ingredient, index) => (
                                    <li key={index} className="text-gray-800">
                                        {ingredient.nom} - Quantité : {ingredient.quantite}, Prix : {ingredient.prix.toFixed(2)} TND
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AfficherRepas;
