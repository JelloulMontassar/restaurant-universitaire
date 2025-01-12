import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ListUtilisateur = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [editForm, setEditForm] = useState({});

  const API_URL = "http://localhost:8080/api/utilisateurs";

  // Add token to Axios requests
  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(API_URL);
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`${API_URL}/supprimer/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      setShowDeleteModal(false);
    } catch (err) {
      setError("Failed to delete the user.");
    }
  };

  const handleEdit = async () => {
    try {
      const response = await axiosInstance.put(`${API_URL}/modifier/${userToEdit.id}`, editForm);
      setUsers(
          users.map((user) =>
              user.id === response.data.id ? response.data : user
          )
      );
      setShowEditModal(false);
    } catch (err) {
      setError("Failed to update the user.");
    }
  };

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const openEditModal = (user) => {
    setUserToEdit(user);
    setEditForm(user);
    setShowEditModal(true);
  };

  const closeModal = () => {
    setShowDeleteModal(false);
    setShowEditModal(false);
    setUserToDelete(null);
    setUserToEdit(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
                  <td className="px-4 py-2 border text-center">{user.nomUtilisateur}</td>
                  <td className="px-4 py-2 border text-center">{user.prenomUtilisateur}</td>
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

          {/* Delete Modal */}
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

          {/* Edit Modal */}
          {showEditModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                  <h2 className="text-lg font-bold mb-4 text-gray-800">
                    Modifier l'utilisateur
                  </h2>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">
                        Nom :
                      </label>
                      <input
                          type="text"
                          name="nomUtilisateur"
                          value={editForm.nomUtilisateur}
                          onChange={handleEditChange}
                          className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">
                        Prénom :
                      </label>
                      <input
                          type="text"
                          name="prenomUtilisateur"
                          value={editForm.prenomUtilisateur}
                          onChange={handleEditChange}
                          className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                    {/* Add other fields as needed */}
                    <div className="flex justify-end">
                      <button
                          onClick={closeModal}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg mr-2"
                      >
                        Annuler
                      </button>
                      <button
                          onClick={handleEdit}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >
                        Enregistrer
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
