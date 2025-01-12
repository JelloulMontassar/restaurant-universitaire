import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Auth/login";
import AjouterUtilisateur from "./Utilisateur/Ajouter_utilisateur";
import ListUtilisateur from "./Utilisateur/List_utilisateur";
import Profil from "./Utilisateur/Profil";
import RechargeCarte from "./Carte/RechargeCarte";
import HomePage from "./Home/home";
import GestionStockIngredients from "./Ingredients/GestionStockIngredients";
import GestionRepas from "./Repas/GestionRepas";
import PlanificationMenus from "./Menu/PlanificationMenus";
import AfficherRepas from "./Repas/AfficherRepas";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="/ajouter_utilisateur" element={<AjouterUtilisateur />} />
        <Route path="/liste_utilisateur" element={<ListUtilisateur />} />
        <Route path="profil" element={<Profil />} />
        <Route path="/recharge_carte" element={<RechargeCarte />} />
        <Route
          path="/gestion_stock_ingrediant"
          element={<GestionStockIngredients />}
        />
        <Route path="/gestion_repas" element={<GestionRepas />} />
        <Route path="/gestion_menu" element={<PlanificationMenus />} />
        <Route path="/repas" elemment={<AfficherRepas />} />
      </Routes>
    </div>
  );
}

export default App;
