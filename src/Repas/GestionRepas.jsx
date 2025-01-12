import React, { useState } from "react";

const GestionRepas = () => {
    const [ingredientsDisponibles] = useState([
        { id: 1, nom: "Pain complet", prix: 0.7 },
        { id: 12, nom: "Beurre", prix: 1.8 },
        { id: 13, nom: "Œufs", prix: 0.2 },
        { id: 21, nom: "Tomate", prix: 1.5 },
    ]);

    const [repas, setRepas] = useState({
        nom: "",
        type: "",
        ingredients: [],
    });

    const [repasCrees, setRepasCrees] = useState([]);
    const [prixTotal, setPrixTotal] = useState(null);

    // État pour gérer le modal
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [ingredientQuantite, setIngredientQuantite] = useState("");

    const handleChangeRepas = (e) => {
        const { name, value } = e.target;
        setRepas({ ...repas, [name]: value });
    };

    const handleOpenModal = (ingredient) => {
        setSelectedIngredient(ingredient);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedIngredient(null);
        setIngredientQuantite("");
    };

    const handleAddIngredientToRepas = () => {
        if (ingredientQuantite && parseFloat(ingredientQuantite) > 0) {
            setRepas({
                ...repas,
                ingredients: [
                    ...repas.ingredients,
                    { ...selectedIngredient, quantite: parseFloat(ingredientQuantite) },
                ],
            });
            handleCloseModal();
        } else {
            alert("Veuillez saisir une quantité valide.");
        }
    };

    const handleRemoveIngredientFromRepas = (id) => {
        setRepas({
            ...repas,
            ingredients: repas.ingredients.filter((ing) => ing.id !== id),
        });
    };

    const handleCreateRepas = () => {
        if (!repas.nom || !repas.type || repas.ingredients.length === 0) {
            alert("Veuillez compléter toutes les informations pour le repas !");
            return;
        }

        const prix = repas.ingredients.reduce(
            (total, ingredient) => total + ingredient.prix * ingredient.quantite,
            0
        );

        setRepasCrees([
            ...repasCrees,
            { ...repas, prixTotal: prix, id: Date.now() },
        ]);
        setPrixTotal(prix);
        setRepas({ nom: "", type: "", ingredients: [] });
    };

    const handleDeleteRepas = (id) => {
        setRepasCrees(repasCrees.filter((repas) => repas.id !== id));
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Gestion des Repas</h2>

            {/* Formulaire de création de repas */}
            <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">Créer un Repas</h3>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="nom"
                        placeholder="Nom du repas"
                        value={repas.nom}
                        onChange={handleChangeRepas}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <select
                        name="type"
                        value={repas.type}
                        onChange={handleChangeRepas}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Type de repas</option>
                        <option value="PETIT_DEJEUNER">Petit Déjeuner</option>
                        <option value="DEJEUNER">Déjeuner</option>
                        <option value="DINER">Dîner</option>
                    </select>
                </div>
            </div>

            {/* Liste des ingrédients disponibles */}
            <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">Ingrédients Disponibles</h3>
                <ul className="list-disc list-inside">
                    {ingredientsDisponibles.map((ingredient) => (
                        <li key={ingredient.id} className="flex justify-between items-center">
                            <span>
                                {ingredient.nom} (Prix: {ingredient.prix} €)
                            </span>
                            <button
                                onClick={() => handleOpenModal(ingredient)}
                                className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600"
                            >
                                Ajouter
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Liste des ingrédients du repas */}
            {repas.ingredients.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-bold mb-2">Ingrédients du Repas</h3>
                    <ul className="list-disc list-inside">
                        {repas.ingredients.map((ingredient) => (
                            <li key={ingredient.id} className="flex justify-between items-center">
                                <span>
                                    {ingredient.nom} - Quantité: {ingredient.quantite}
                                </span>
                                <button
                                    onClick={() => handleRemoveIngredientFromRepas(ingredient.id)}
                                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                                >
                                    Retirer
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <button
                onClick={handleCreateRepas}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
                Créer le Repas
            </button>

            {/* Liste des repas créés */}
            {repasCrees.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-lg font-bold mb-2">Repas Créés</h3>
                    <ul className="list-disc list-inside">
                        {repasCrees.map((repas) => (
                            <li key={repas.id} className="flex justify-between items-center">
                                <span>
                                    {repas.nom} ({repas.type}) - Prix Total: {repas.prixTotal.toFixed(2)} €
                                </span>
                                <button
                                    onClick={() => handleDeleteRepas(repas.id)}
                                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                                >
                                    Supprimer
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Modal pour ajouter un ingrédient */}
            {modalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-lg font-bold mb-4">Ajouter un Ingrédient</h3>
                        <p>{selectedIngredient.nom} (Prix: {selectedIngredient.prix} €)</p>
                        <input
                            type="number"
                            value={ingredientQuantite}
                            onChange={(e) => setIngredientQuantite(e.target.value)}
                            placeholder="Quantité"
                            className="p-2 border rounded-md w-full mt-4"
                        />
                        <div className="mt-6 flex justify-between">
                            <button
                                onClick={handleCloseModal}
                                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleAddIngredientToRepas}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
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

export default GestionRepas;
