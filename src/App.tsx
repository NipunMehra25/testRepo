import { Routes, Route } from "react-router-dom";
import Hero from "./pages/landingPage/hero";
import SignIn from "./pages/SignIn/SignIn";
import TeamPage from "./pages/TeamPage/TeamPage";
import ContactPage from "./pages/ContactPage/ContactPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/TeamPage" element={<TeamPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}

export default App;
