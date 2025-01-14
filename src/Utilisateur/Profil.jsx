import React, { useEffect, useState } from "react";
import axios from "axios";

const Profil = () => {
    const [user, setUser] = useState({
        id: "",
        nomUtilisateur: "",
        prenomUtilisateur: "",
        genre: "",
        email: "",
        role: "",
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user profile data from the backend
        axios
            .get("http://localhost:8080/api/utilisateurs/profil", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
                },
            })
            .then((response) => {
                const { data } = response;
                setUser({
                    ...user,
                    id: data.id,
                    nomUtilisateur: data.nomUtilisateur,
                    prenomUtilisateur: data.prenomUtilisateur,
                    genre: data.genre,
                    email: data.email,
                    role: data.role,
                });
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching profile:", error);
                setMessage("Erreur lors du chargement du profil.");
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();



        const updatedData = {
            nomUtilisateur: user.nomUtilisateur,
            prenomUtilisateur: user.prenomUtilisateur,
            genre: user.genre,
            email: user.email,
            role: user.role
        };

        // Update user profile via backend
        axios
            .put(`http://localhost:8080/api/utilisateurs/modifier/${user.id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setMessage("Profil mis à jour avec succès !");
                setUser((prevState) => ({
                    ...prevState
                }));
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
                setMessage("Erreur lors de la mise à jour du profil.");
            });
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="flex justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Gérer le Profil</h2>

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
                            <option value="MASCULIN">Masculin</option>
                            <option value="FEMININ">Féminin</option>
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
