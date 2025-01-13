import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const GestionStockIngredients = () => {
    const [ingredients, setIngredients] = useState([]);
    const [form, setForm] = useState({ nom: "", quantite: "", seuil: "", prix: "" });
    const [editingId, setEditingId] = useState(null);

    // Fetch ingredients from the API
    const fetchIngredients = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/ingredients");
            setIngredients(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des ingrédients:", error);
        }
    };

    useEffect(() => {
        fetchIngredients();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAddOrUpdate = async () => {
        try {
            if (editingId) {
                // Update ingredient
                await axios.put(`http://localhost:8080/api/ingredients/${editingId}`, form);
                fetchIngredients();
                setEditingId(null);
            } else {
                // Add new ingredient
                await axios.post("http://localhost:8080/api/ingredients/ajouter", form);
                fetchIngredients();
            }
            setForm({ nom: "", quantite: "", seuil: "", prix: "" });
        } catch (error) {
            console.error("Erreur lors de la sauvegarde de l'ingrédient:", error);
        }
    };

    const handleEdit = (ingredient) => {
        setEditingId(ingredient.id);
        setForm({
            nom: ingredient.nom,
            quantite: ingredient.quantite,
            seuil: ingredient.seuil,
            prix: ingredient.prix,
        });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/ingredients/${id}`);
            fetchIngredients();
        } catch (error) {
            console.error("Erreur lors de la suppression de l'ingrédient:", error);
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Gestion des Stocks d'Ingrédients</h2>

            {/* Form */}
            <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">
                    {editingId ? "Modifier l'ingrédient" : "Ajouter un Ingrédient"}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="nom"
                        placeholder="Nom de l'ingrédient"
                        value={form.nom}
                        onChange={handleInputChange}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="number"
                        name="quantite"
                        placeholder="Quantité"
                        value={form.quantite}
                        onChange={handleInputChange}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="number"
                        name="seuil"
                        placeholder="Seuil"
                        value={form.seuil}
                        onChange={handleInputChange}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="number"
                        name="prix"
                        placeholder="Prix (TND)"
                        value={form.prix}
                        onChange={handleInputChange}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <button
                    onClick={handleAddOrUpdate}
                    className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                >
                    {editingId ? "Mettre à jour" : "Ajouter"}
                </button>
            </div>

            {/* Ingredients List */}
            <h3 className="text-lg font-bold mb-2">Liste des Ingrédients</h3>
            {ingredients.length > 0 ? (
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Nom</th>
                        <th className="border border-gray-300 px-4 py-2">Quantité</th>
                        <th className="border border-gray-300 px-4 py-2">Seuil</th>
                        <th className="border border-gray-300 px-4 py-2">Prix (TND)</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ingredients.map((ingredient) => (
                        <tr key={ingredient.id} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{ingredient.nom}</td>
                            <td className="border border-gray-300 px-4 py-2">{ingredient.quantite}</td>
                            <td className="border border-gray-300 px-4 py-2">{ingredient.seuil}</td>
                            <td className="border border-gray-300 px-4 py-2">{ingredient.prix}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button
                                    onClick={() => handleEdit(ingredient)}
                                    className="mr-2 text-blue-500 hover:text-blue-700"
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button
                                    onClick={() => handleDelete(ingredient.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucun ingrédient disponible.</p>
            )}
        </div>
    );
};

export default GestionStockIngredients;
