import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Matches from "./pages/adminPages/Matches";
import { Route, Routes } from "react-router-dom";
import UpdateMatch from "./pages/adminPages/UpdateMatch";
import AddMatch from "./pages/adminPages/AddMatch";
import Stadiums from "./pages/adminPages/Stadiums";
import AddStadium from "./pages/adminPages/AddStadium";
import UpdateStadium from "./pages/adminPages/UpdateStadium";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/matches/:updatematchID" element={<UpdateMatch />} />
        <Route path="/matches/add" element={<AddMatch />} />
        <Route path="/stadiums" element={<Stadiums />} />
        <Route path="/stadiums/:updatestadiumID" element={<UpdateStadium />} />
        <Route path="/stadiums/add" element={<AddStadium />} />
      </Routes>
    </div>
  );
}

export default App;
