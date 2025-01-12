import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const GestionStockIngredients = () => {
    const [ingredients, setIngredients] = useState([
        { id: 1, nom: "Tomates", quantite: 100, seuil: 20, prix: 2.5 },
        { id: 2, nom: "Pâtes", quantite: 50, seuil: 10, prix: 1.2 },
    ]);

    const [form, setForm] = useState({ nom: "", quantite: "", seuil: "", prix: "" });
    const [editingId, setEditingId] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAddOrUpdate = () => {
        if (editingId) {
            // Mise à jour
            setIngredients(
                ingredients.map((ingredient) =>
                    ingredient.id === editingId ? { id: editingId, ...form } : ingredient
                )
            );
            setEditingId(null);
        } else {
            // Ajout
            const newId = ingredients.length ? ingredients[ingredients.length - 1].id + 1 : 1;
            setIngredients([...ingredients, { id: newId, ...form }]);
        }
        setForm({ nom: "", quantite: "", seuil: "", prix: "" });
    };

    const handleEdit = (ingredient) => {
        setEditingId(ingredient.id);
        setForm({ nom: ingredient.nom, quantite: ingredient.quantite, seuil: ingredient.seuil, prix: ingredient.prix });
    };

    const handleDelete = (id) => {
        setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
    };

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Gestion des Stocks d'Ingrédients</h2>

            {/* Formulaire d'ajout ou modification */}
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
                        placeholder="Prix"
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

            {/* Liste des ingrédients */}
            <h3 className="text-lg font-bold mb-2">Liste des Ingrédients</h3>
            {ingredients.length > 0 ? (
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">Nom</th>
                            <th className="border border-gray-300 px-4 py-2">Quantité</th>
                            <th className="border border-gray-300 px-4 py-2">Seuil</th>
                            <th className="border border-gray-300 px-4 py-2">Prix (€)</th>
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
