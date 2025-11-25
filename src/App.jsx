// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Travel from "./components/travel/Travel";
import Home from "./Home";
import AdminDashboard from "./components/travel/AdminDashboard";
import LanguagePopup from "./LanguagePopup";
import Transport from "./components/transport/Transport";
import Vgallery from "./components/gallery/Vgallery";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/where-to-stay" element={<Travel />} />
          <Route path="/transport" element={<Transport />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/gallery" element={<Vgallery />} />
        </Routes>

        <div className="footer">
          <h2 className="fo">stephanie & pedro</h2>
        </div>

        <LanguagePopup />
      </div>
    </Router>
  );
};

export default App;
