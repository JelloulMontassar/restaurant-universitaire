import React, { useState, useEffect } from "react";
import axios from "axios";

const GestionRepas = () => {
    const [ingredientsDisponibles, setIngredientsDisponibles] = useState([]);
    const [repas, setRepas] = useState({ nom: "", type: "", ingredients: [] });
    const [repasCrees, setRepasCrees] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [ingredientQuantite, setIngredientQuantite] = useState("");
    const [filtreType, setFiltreType] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_URL = "http://localhost:8080/api";

    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            try {
                const [ingredientsRes, mealsRes] = await Promise.all([
                    axios.get(`${API_URL}/ingredients`),
                    axios.get(`${API_URL}/repas`),
                ]);
                setIngredientsDisponibles(ingredientsRes.data);
                setRepasCrees(mealsRes.data);
            } catch (err) {
                setError("Failed to fetch data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

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

    const handleCreateRepas = async () => {
        if (!repas.nom || !repas.type || repas.ingredients.length === 0) {
            alert("Veuillez compléter toutes les informations pour le repas !");
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/repas/ajouter`, repas);
            setRepasCrees([...repasCrees, response.data]);
            setRepas({ nom: "", type: "", ingredients: [] });
        } catch (err) {
            setError("Failed to create meal. Please try again.");
        }
    };

    const handleDeleteRepas = async (id) => {
        try {
            await axios.delete(`${API_URL}/repas/${id}`);
            setRepasCrees(repasCrees.filter((repas) => repas.id !== id));
        } catch (err) {
            setError("Failed to delete meal. Please try again.");
        }
    };

    const handleFiltreChange = (e) => {
        setFiltreType(e.target.value);
    };

    const filteredRepas = filtreType
        ? repasCrees.filter((repas) => repas.type === filtreType)
        : repasCrees;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

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
                                {ingredient.nom} (Prix: {ingredient.prix} TND)
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

            {/* Modal for adding ingredient */}
            {modalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-lg font-bold mb-4">Ajouter un Ingrédient</h3>
                        <p>{selectedIngredient.nom} (Prix: {selectedIngredient.prix} TND)</p>
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
            <div className="mt-4">
                <button
                    onClick={handleCreateRepas}
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                >
                    Créer le Repas
                </button>
            </div>
            {/* Filter by meal type */}
            <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">Filtrer par Type</h3>
                <select
                    value={filtreType}
                    onChange={handleFiltreChange}
                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">Tous les types</option>
                    <option value="PETIT_DEJEUNER">Petit Déjeuner</option>
                    <option value="DEJEUNER">Déjeuner</option>
                    <option value="DINER">Dîner</option>
                </select>
            </div>
            {/* Display created meals */}
            {filteredRepas.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-lg font-bold mb-2">Repas Créés</h3>
                    <ul className="list-disc list-inside">
                        {filteredRepas.map((repas) => (
                            <li key={repas.id} className="flex justify-between items-center">
                                <span>
                                    {repas.nom} ({repas.type}) - Prix Total: {repas.prixTotal?.toFixed(2)} TND
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




        </div>
    );
};

export default GestionRepas;
