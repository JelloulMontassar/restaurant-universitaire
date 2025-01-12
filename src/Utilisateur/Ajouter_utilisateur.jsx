import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2

const AjouterUtilisateur = () => {
    const [formData, setFormData] = useState({
        nomUtilisateur: "",
        prenomUtilisateur: "",
        genre: "",
        motDePasse: "",
        email: "",
        role: "",
        numeroTelephone: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data for the backend
        const utilisateurData = {
            ...formData,
            genre: formData.genre.toUpperCase(), // Enum requires uppercase
            role: formData.role.toUpperCase(),  // Enum requires uppercase
        };

        try {
            const response = await axios.post(
                "http://localhost:8080/api/utilisateurs/ajouter",
                utilisateurData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Utilisateur ajouté avec succès:", response.data);

            // Success SweetAlert
            Swal.fire({
                title: 'Succès!',
                text: 'L\'utilisateur a été ajouté avec succès.',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'utilisateur:", error.response?.data || error.message);

            // Error SweetAlert
            Swal.fire({
                title: 'Erreur!',
                text: 'Il y a eu une erreur lors de l\'ajout de l\'utilisateur.',
                icon: 'error',
                confirmButtonText: 'Réessayer',
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Ajouter un Utilisateur
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
                            <option value="FEMININ">Féminin</option>
                            <option value="MASCULIN">Masculin</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="motDePasse"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            id="motDePasse"
                            name="motDePasse"
                            value={formData.motDePasse}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
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

                    <div className="mb-4">
                        <label
                            htmlFor="numeroTelephone"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Numéro de téléphone
                        </label>
                        <input
                            type="tel"
                            id="numeroTelephone"
                            name="numeroTelephone"
                            value={formData.numeroTelephone}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
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

export default AjouterUtilisateur;
