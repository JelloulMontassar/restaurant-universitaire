import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Swal from "sweetalert2";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        try {
            const response = await fetch("http://localhost:8080/api/utilisateurs/authenticate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                // Handle non-200 responses
                throw new Error("Authentication failed. Please check your credentials.");
            }

            const data = await response.json();
            console.log("Authentication successful:", data);

            // Save token to localStorage
            localStorage.setItem("token", data.token);

            // Show success alert
            Swal.fire({
                icon: "success",
                title: "Connexion réussie",
                text: "Vous êtes maintenant connecté !",
                confirmButtonColor: "#4CAF50",
            }).then(() => {
                // Redirect to Dashboard
                navigate("/Dashboard");
            });
        } catch (error) {
            console.error("Error during authentication:", error);

            // Show error alert
            Swal.fire({
                icon: "error",
                title: "Erreur",
                text: error.message || "Une erreur s'est produite lors de la connexion.",
                confirmButtonColor: "#f27474",
            });
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Connexion</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Adresse email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                            placeholder="Entrez votre email"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                            placeholder="Entrez votre mot de passe"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
                        disabled={loading}
                    >
                        {loading ? "Connexion en cours..." : "Se connecter"}
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600">
                    Pas encore inscrit ?{" "}
                    <a href="/register" className="text-indigo-600 hover:underline">
                        Créer un compte
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
