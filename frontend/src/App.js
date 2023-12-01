import Home from "./pages/adminPages/Home";
import Navbar from "./components/Navbar";
import Matches from "./pages/adminPages/Matches";
import { Route, Routes } from "react-router-dom";
import UpdateMatch from "./pages/adminPages/UpdateMatch";
import AddMatch from "./pages/adminPages/AddMatch";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/matches/update" element={<UpdateMatch />} />
        <Route path="/matches/add" element={<AddMatch />} />
      </Routes>
    </div>
  );
}

export default App;
