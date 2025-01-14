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
import GestionCartes from "./Carte/GestionCartes";
import HistoriqueRecharge from "./Carte/HistoriqueRecharge";
import PaiementRepas from "./Repas/PaiementRepas";
import RecuPaiement from "./Repas/RecuPaiement";
import Dashboard from "./Dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import NotAuthorized from "./NotAuthorized";
import MenuList from "./Menu/MenuList";

function App() {
  return (
      <div>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<Login />} />

          {/* Role-Based Protected Routes */}
          <Route
              path="/ajouter_utilisateur"
              element={
                <ProtectedRoute allowedRoles={["ADMINISTRATEUR"]}>
                  <AjouterUtilisateur />
                </ProtectedRoute>
              }
          />
          <Route
              path="/liste_utilisateur"
              element={
                <ProtectedRoute allowedRoles={["ADMINISTRATEUR"]}>
                  <ListUtilisateur />
                </ProtectedRoute>
              }
          />
          <Route
              path="/profil"
              element={
                <ProtectedRoute allowedRoles={["ETUDIANT", "EMPLOYE", "ADMINISTRATEUR"]}>
                  <Profil />
                </ProtectedRoute>
              }
          />
          <Route
              path="/recharge_carte"
              element={
                <ProtectedRoute allowedRoles={["EMPLOYE","ETUDIANT"]}>
                  <RechargeCarte />
                </ProtectedRoute>
              }
          />
          <Route
              path="/gestion_stock_ingrediant"
              element={
                <ProtectedRoute allowedRoles={["ADMINISTRATEUR"]}>
                  <GestionStockIngredients />
                </ProtectedRoute>
              }
          />
          <Route
              path="/gestion_repas"
              element={
                <ProtectedRoute allowedRoles={["ADMINISTRATEUR"]}>
                  <GestionRepas />
                </ProtectedRoute>
              }
          />
          <Route
              path="/gestion_menu"
              element={
                <ProtectedRoute allowedRoles={["ADMINISTRATEUR"]}>
                  <PlanificationMenus />
                </ProtectedRoute>
              }
          />
          <Route
              path="/repas"
              element={
                <ProtectedRoute allowedRoles={["ETUDIANT", "EMPLOYE", "ADMINISTRATEUR"]}>
                  <AfficherRepas />
                </ProtectedRoute>
              }
          />
          <Route
              path="/gestion_cartes"
              element={
                <ProtectedRoute allowedRoles={["ADMINISTRATEUR"]}>
                  <GestionCartes />
                </ProtectedRoute>
              }
          />
          <Route
              path="/historique_recharge"
              element={
                <ProtectedRoute allowedRoles={["EMPLOYE", "ADMINISTRATEUR"]}>
                  <HistoriqueRecharge />
                </ProtectedRoute>
              }
          />
          <Route
              path="/paiement_repas"
              element={
                <ProtectedRoute allowedRoles={["ETUDIANT"]}>
                  <PaiementRepas />
                </ProtectedRoute>
              }
          />
          <Route
              path="/recu_paiement"
              element={
                <ProtectedRoute allowedRoles={["ETUDIANT"]}>
                  <RecuPaiement />
                </ProtectedRoute>
              }
          />
          <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["ADMINISTRATEUR", "EMPLOYE","ETUDIANT"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
          />
          <Route path={"/not-authorized"} element={<NotAuthorized />} />
            <Route path="/liste_menu" element={<MenuList />} />

        </Routes>
      </div>
    );

}
export default App;

