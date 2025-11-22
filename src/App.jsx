// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Travel from "./components/travel/Travel";
import Home from "./Home";
import AdminDashboard from "./components/travel/AdminDashboard";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/where-to-stay" element={<Travel />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>

        <div className="footer">
          <h2 className="fo">stephanie & pedro</h2>
        </div>
      </div>
    </Router>
  );
};

export default App;
