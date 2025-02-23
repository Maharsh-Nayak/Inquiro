import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import GetStartedPage from "./pages/GetStartedPage";
import CommunityPage from "./pages/CommunityPage";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/get-started" element={<GetStartedPage />} />
      <Route path="/community" element={<CommunityPage/>}/> */}
      <Route path="/" element={<CommunityPage/>}/>
    </Routes>
  );
}

export default App;
