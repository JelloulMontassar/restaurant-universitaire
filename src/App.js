import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from "./Auth/login";
import AjouterUtilisateur from "./Utilisateur/Ajouter_utilisateur";
import ListUtilisateur from "./Utilisateur/List_utilisateur";
import Profil from "./Utilisateur/Profil";

function App() {
  return (
    <div>
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/ajouter_utilisateur" element={<AjouterUtilisateur />} />
            <Route path="/liste_utilisateur" element={<ListUtilisateur />} />
            <Route path="profil" element={<Profil />} />
        </Routes>


    </div>
  );
}

export default App;
