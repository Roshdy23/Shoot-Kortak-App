import Home from "./pages/adminPages/Home";
import Navbar from "./components/AdminDashboard/Navbar";
import Matches from "./pages/adminPages/Matches";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matches" element={<Matches />} />
        {/* <Route path="/matches/update" element={<UpdateMatche />} /> */}
        {/* <Route path="/matches/add" element={<AddMatche />} /> */}
      </Routes>
    </div>
  );
}

export default App;
