import "./App.scss";
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import InterestsSelectionPage from "./pages/InterestsSelectionPage/InterestsSelectionPage";
import ProfessionSelectionPage from "./pages/ProfessionSelectionPage/ProfessionSelectionPage";
import DeckAdditionPage from "./pages/DeckAdditionPage/DeckAdditionPage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import VisualsPage from "./pages/VisualsPage/VisualsPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import WordsAdditionPage from "./pages/WordsAdditionPage/WordsAdditionPage";
import Footer from "./components/Footer/Footer";

function App() {
  const location = useLocation();
  const shouldShowHeader = !["/", "/login"].includes(location.pathname);

  return (
    <div className="app">
      {shouldShowHeader && <Header />}
      <main className="app__main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route
            path="/interests-selection"
            element={<InterestsSelectionPage />}
          />
          <Route
            path="/profession-selection"
            element={<ProfessionSelectionPage />}
          />
          <Route path="/deck-addition" element={<DeckAdditionPage />} />
          <Route
            path="/decks/:deckId/words-addition"
            element={<WordsAdditionPage />}
          />
          <Route path="/decks/:deckId/results" element={<ResultsPage />} />
          <Route path="/visuals/:deckId" element={<VisualsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
export default AppWrapper;


