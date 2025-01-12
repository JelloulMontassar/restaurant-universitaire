import React, { useState } from 'react';

const AjouterUtilisateur = () => {
    const [formData, setFormData] = useState({
        nomUtilisateur: "",
        prenomUtilisateur: "",
        genre: "",
        email: "",
        role: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data submitted:", formData);
        // Ajoutez ici la logique pour envoyer les données au backend
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Ajouter un Client
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="nomUtilisateur"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Nom d'utilisateur
                        </label>
                        <input
                            type="text"
                            id="nomUtilisateur"
                            name="nomUtilisateur"
                            value={formData.nomUtilisateur}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="prenomUtilisateur"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Prénom d'utilisateur
                        </label>
                        <input
                            type="text"
                            id="prenomUtilisateur"
                            name="prenomUtilisateur"
                            value={formData.prenomUtilisateur}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="genre"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Genre
                        </label>
                        <select
                            id="genre"
                            name="genre"
                            value={formData.genre}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">-- Sélectionnez --</option>
                            <option value="feminin">Féminin</option>
                            <option value="masculin">Masculin</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="role"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Rôle
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">-- Sélectionnez --</option>
                            <option value="ETUDIANT">Étudiant</option>
                            <option value="ADMINISTRATEUR">Administrateur</option>
                            <option value="EMPLOYE">Employé</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Ajouter
                    </button>
                </form>
            </div>
        </div>
    );
};



export default AjouterUtilisateur