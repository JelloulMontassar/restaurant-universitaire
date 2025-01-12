import React from "react";

const fakeData = [
    {
        id: 1,
        nom: "Petit Déjeuner Classique",
        type: "PETIT_DEJEUNER",
        createdAt: "2024-12-30T23:10:37",
        updatedAt: "2024-12-30T23:10:37",
        ingredients: ["Pain", "Beurre", "Confiture"],
        prixTotal: 8.3,
    },
    {
        id: 2,
        nom: "Déjeuner Léger",
        type: "DEJEUNER",
        createdAt: "2024-12-30T23:13:17",
        updatedAt: "2024-12-30T23:13:17",
        ingredients: ["Salade", "Poulet grillé", "Riz"],
        prixTotal: 21.0,
    },
];

const AfficherRepas = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Liste des Repas</h1>
            <ul className="space-y-6">
                {fakeData.map((repas) => (
                    <li key={repas.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold text-blue-600">{repas.nom}</h2>
                        <p className="text-gray-600">Type : {repas.type}</p>
                        <p className="text-gray-600">
                            Prix Total : <span className="font-semibold">{repas.prixTotal.toFixed(2)} €</span>
                        </p>
                        <p className="text-gray-600 font-medium">Ingrédients :</p>
                        <ul className="list-disc pl-6 space-y-2">
                            {repas.ingredients.map((ingredient, index) => (
                                <li key={index} className="text-gray-800">{ingredient}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AfficherRepas;
