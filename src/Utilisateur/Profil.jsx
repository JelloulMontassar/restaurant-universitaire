import React, { useState } from "react";

const Profil = () => {
    const [user, setUser] = useState({
        nomUtilisateur: "Dupont",
        prenomUtilisateur: "Jean",
        genre: "Masculin",
        email: "jean.dupont@example.com",
        ancienMotDePasse: "",
        nouveauMotDePasse: "",
        role: "ETUDIANT", // Le rôle est visible mais désactivé
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Si les champs de mot de passe sont remplis, vérifier qu'ils ne sont pas vides
        if (
            (user.ancienMotDePasse && user.nouveauMotDePasse) &&
            (user.ancienMotDePasse === "" || user.nouveauMotDePasse === "")
        ) {
            setMessage("Veuillez entrer l'ancien mot de passe et le nouveau mot de passe.");
            return;
        }

        // Si les deux champs de mot de passe sont remplis, simuler la mise à jour
        if (user.ancienMotDePasse && user.nouveauMotDePasse) {
            // Logique pour la modification du mot de passe ici
        }

        // Ici, on pourrait envoyer les informations au backend via une API pour la mise à jour
        setMessage("Profil mis à jour avec succès !");
    };

    return (
        <div className="flex justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Gérer le Profil</h2>

                {/* Message de succès ou d'erreur */}
                {message && (
                    <div
                        className={`mb-4 p-3 rounded-md ${
                            message.includes("succès") ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                        }`}
                    >
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="nomUtilisateur">
                            Nom
                        </label>
                        <input
                            type="text"
                            id="nomUtilisateur"
                            name="nomUtilisateur"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={user.nomUtilisateur}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="prenomUtilisateur">
                            Prénom
                        </label>
                        <input
                            type="text"
                            id="prenomUtilisateur"
                            name="prenomUtilisateur"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={user.prenomUtilisateur}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="genre">
                            Genre
                        </label>
                        <select
                            id="genre"
                            name="genre"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={user.genre}
                            onChange={handleChange}
                        >
                            <option value="Masculin">Masculin</option>
                            <option value="Féminin">Féminin</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Champs de modification du mot de passe */}
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="ancienMotDePasse">
                            Ancien Mot de Passe
                        </label>
                        <input
                            type="password"
                            id="ancienMotDePasse"
                            name="ancienMotDePasse"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={user.ancienMotDePasse}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="nouveauMotDePasse">
                            Nouveau Mot de Passe
                        </label>
                        <input
                            type="password"
                            id="nouveauMotDePasse"
                            name="nouveauMotDePasse"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={user.nouveauMotDePasse}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Champ désactivé pour le rôle */}
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="role">
                            Rôle
                        </label>
                        <input
                            type="text"
                            id="role"
                            name="role"
                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
                            value={user.role}
                            disabled
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            Sauvegarder
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profil;
