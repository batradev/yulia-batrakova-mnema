import "./App.scss";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import LanguageSelectionPage from "./pages/LanguageSelectionPage/LanguageSelectionPage";
import NativeLanguageSelectionPage from "./pages/NativeLanguageSelectionPage/NativeLanguageSelectionPage";
import InterestsSelectionPage from "./pages/InterestsSelectionPage/InterestsSelectionPage";
import ProfessionSelectionPage from "./pages/ProfessionSelectionPage/ProfessionSelectionPage";
import AddWordsPage from "./pages/AddWordsPage/AddWordsPage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import VisualsPage from "./pages/VisualsPage/VisualsPage";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        {/* <Header /> */}
        <main className="app__main-content">
          <Routes>
          <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/user-profile" element={<UserProfilePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/language-selection" element={<LanguageSelectionPage />} />
            <Route path="/native-language-selection" element={<NativeLanguageSelectionPage />} />
            <Route path="/interests-selection" element={<InterestsSelectionPage />} />
            <Route path="/profession-selection" element={<ProfessionSelectionPage />} />
            <Route path="/add-words" element={<AddWordsPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/visuals" element={<VisualsPage />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
