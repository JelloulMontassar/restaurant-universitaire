import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const ListUtilisateur = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      nomUtilisateur: "Dupont",
      prenomUtilisateur: "Jean",
      genre: "Masculin",
      email: "jean.dupont@example.com",
      role: "ETUDIANT",
    },
    {
      id: 2,
      nomUtilisateur: "Durand",
      prenomUtilisateur: "Marie",
      genre: "Féminin",
      email: "marie.durand@example.com",
      role: "ADMINISTRATEUR",
    },
    {
      id: 3,
      nomUtilisateur: "Martin",
      prenomUtilisateur: "Paul",
      genre: "Masculin",
      email: "paul.martin@example.com",
      role: "EMPLOYE",
    },
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    setShowDeleteModal(false);
  };

  const handleEdit = (user) => {
    const updatedUsers = users.map((u) =>
        u.id === user.id ? { ...u, ...user } : u
    );
    setUsers(updatedUsers);
    setShowEditModal(false);
  };

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const openEditModal = (user) => {
    setUserToEdit(user);
    setShowEditModal(true);
  };

  const closeModal = () => {
    setShowDeleteModal(false);
    setShowEditModal(false);
    setUserToDelete(null);
    setUserToEdit(null);
  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Liste des Utilisateurs
          </h1>
          <table className="min-w-full border border-gray-300">
            <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2 border">Nom</th>
              <th className="px-4 py-2 border">Prénom</th>
              <th className="px-4 py-2 border">Genre</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Rôle</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border text-center">
                    {user.nomUtilisateur}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {user.prenomUtilisateur}
                  </td>
                  <td className="px-4 py-2 border text-center">{user.genre}</td>
                  <td className="px-4 py-2 border text-center">{user.email}</td>
                  <td className="px-4 py-2 border text-center">{user.role}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                        onClick={() => openEditModal(user)}
                        className="text-blue-500 hover:text-blue-700 mx-2"
                    >
                      <FontAwesomeIcon icon={faEdit} className="text-xl" />
                    </button>
                    <button
                        onClick={() => openDeleteModal(user)}
                        className="text-red-500 hover:text-red-700 mx-2"
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-xl" />
                    </button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>

          {/* Modale de confirmation pour suppression */}
          {showDeleteModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                  <h2 className="text-lg font-bold mb-4 text-gray-800">
                    Êtes-vous sûr de vouloir supprimer cet utilisateur ?
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Utilisateur : <strong>{userToDelete?.nomUtilisateur}</strong>
                  </p>
                  <div className="flex justify-end">
                    <button
                        onClick={closeModal}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg mr-2"
                    >
                      Annuler
                    </button>
                    <button
                        onClick={() => handleDelete(userToDelete.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
          )}

          {/* Modale de modification */}
          {showEditModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                  <h2 className="text-lg font-bold mb-4 text-gray-800">
                    Modifier l'utilisateur
                  </h2>
                  <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleEdit(userToEdit);
                      }}
                  >
                    <div className="mb-4">
                      <label
                          htmlFor="nomUtilisateur"
                          className="block text-gray-700"
                      >
                        Nom
                      </label>
                      <input
                          type="text"
                          id="nomUtilisateur"
                          className="w-full p-2 border border-gray-300 rounded-lg"
                          value={userToEdit?.nomUtilisateur}
                          onChange={(e) =>
                              setUserToEdit({
                                ...userToEdit,
                                nomUtilisateur: e.target.value,
                              })
                          }
                      />
                    </div>

                    <div className="mb-4">
                      <label
                          htmlFor="prenomUtilisateur"
                          className="block text-gray-700"
                      >
                        Prénom
                      </label>
                      <input
                          type="text"
                          id="prenomUtilisateur"
                          className="w-full p-2 border border-gray-300 rounded-lg"
                          value={userToEdit?.prenomUtilisateur}
                          onChange={(e) =>
                              setUserToEdit({
                                ...userToEdit,
                                prenomUtilisateur: e.target.value,
                              })
                          }
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="genre" className="block text-gray-700">
                        Genre
                      </label>
                      <select
                          id="genre"
                          className="w-full p-2 border border-gray-300 rounded-lg"
                          value={userToEdit?.genre}
                          onChange={(e) =>
                              setUserToEdit({
                                ...userToEdit,
                                genre: e.target.value,
                              })
                          }
                      >
                        <option value="Masculin">Masculin</option>
                        <option value="Féminin">Féminin</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="email" className="block text-gray-700">
                        Email
                      </label>
                      <input
                          type="email"
                          id="email"
                          className="w-full p-2 border border-gray-300 rounded-lg"
                          value={userToEdit?.email}
                          onChange={(e) =>
                              setUserToEdit({
                                ...userToEdit,
                                email: e.target.value,
                              })
                          }
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="role" className="block text-gray-700">
                        Rôle
                      </label>
                      <select
                          id="role"
                          className="w-full p-2 border border-gray-300 rounded-lg"
                          value={userToEdit?.role}
                          onChange={(e) =>
                              setUserToEdit({
                                ...userToEdit,
                                role: e.target.value,
                              })
                          }
                      >
                        <option value="ETUDIANT">ETUDIANT</option>
                        <option value="EMPLOYE">EMPLOYE</option>
                        <option value="ADMINISTRATEUR">ADMINISTRATEUR</option>
                      </select>
                    </div>

                    <div className="flex justify-end">
                      <button
                          onClick={closeModal}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg mr-2"
                      >
                        Annuler
                      </button>
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
          )}
        </div>
      </div>
  );
};

export default ListUtilisateur;
