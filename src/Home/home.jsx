import React from "react";

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header Section */}
            <header className="bg-blue-600 text-white py-8 shadow-lg">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold">Restaurant Universitaire</h1>
                    <p className="mt-2 text-lg">Un endroit où les saveurs rencontrent la communauté</p>
                </div>
            </header>

            {/* Welcome Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-800 text-center">Bienvenue !</h2>
                    <p className="mt-4 text-gray-600 text-center">
                        Découvrez nos repas sains, équilibrés et délicieux, préparés spécialement pour la communauté universitaire.
                    </p>
                </div>
            </section>

            {/* Operating Hours Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Horaires d'Ouverture</h2>
                    <ul className="mt-4 text-gray-600">
                        <li className="mt-2">Lundi - Vendredi : 7h00 - 21h00</li>
                        <li className="mt-2">Samedi : 8h00 - 14h00</li>
                        <li className="mt-2">Dimanche : Fermé</li>
                    </ul>
                </div>
            </section>

            {/* Menu Highlights Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">Nos Spécialités</h2>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Dish 1 */}
                        <div className="bg-gray-100 rounded-lg p-4 shadow-md">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Dish 1"
                                className="w-full h-32 object-cover rounded-md"
                            />
                            <h3 className="mt-4 text-lg font-semibold text-gray-800">Couscous Royal</h3>
                            <p className="mt-2 text-gray-600">Un plat tunisien traditionnel, riche en saveurs.</p>
                        </div>
                        {/* Dish 2 */}
                        <div className="bg-gray-100 rounded-lg p-4 shadow-md">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Dish 2"
                                className="w-full h-32 object-cover rounded-md"
                            />
                            <h3 className="mt-4 text-lg font-semibold text-gray-800">Grillades Mixtes</h3>
                            <p className="mt-2 text-gray-600">Viandes grillées et épicées, servies avec des légumes frais.</p>
                        </div>
                        {/* Dish 3 */}
                        <div className="bg-gray-100 rounded-lg p-4 shadow-md">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Dish 3"
                                className="w-full h-32 object-cover rounded-md"
                            />
                            <h3 className="mt-4 text-lg font-semibold text-gray-800">Pâtes Bolognaises</h3>
                            <p className="mt-2 text-gray-600">Des pâtes savoureuses avec une sauce bolognaise maison.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Contactez-Nous</h2>
                    <p className="mt-4 text-gray-600">
                        Si vous avez des questions ou des suggestions, n'hésitez pas à nous contacter :
                    </p>
                    <p className="mt-2 text-gray-800 font-semibold">📞 Téléphone : +216 71 234 567</p>
                    <p className="mt-2 text-gray-800 font-semibold">📧 Email : contact@restau-univ.tn</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-blue-600 text-white py-6">
                <div className="container mx-auto text-center">
                    <p>&copy; 2025 Restaurant Universitaire. Tous droits réservés.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
