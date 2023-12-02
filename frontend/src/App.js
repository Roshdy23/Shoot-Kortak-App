import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Matches from "./pages/Matches";
import { Route, Routes } from "react-router-dom";
import UpdateMatch from "./pages/adminPages/matches/UpdateMatch";
import AddMatch from "./pages/adminPages/matches/AddMatch";
import Stadiums from "./pages/adminPages/stadiums/Stadiums";
import AddStadium from "./pages/adminPages/stadiums/AddStadium";
import UpdateStadium from "./pages/adminPages/stadiums/UpdateStadium";
import Stores from "./pages/adminPages/stores/Stores";
import ViewStore from "./pages/adminPages/stores/ViewStore";
import AddItems from "./pages/adminPages/stores/AddItems";
import UpdateItem from "./pages/adminPages/stores/UpdateItem";
import Clubs from "./pages/adminPages/clubs/Clubs";
import AddClub from "./pages/adminPages/clubs/AddClub";
import AddClubPlayers from "./pages/adminPages/clubs/AddClubPlayers";
import AddClubCoach from "./pages/adminPages/clubs/AddClubCoach";
import UpdateClub from "./pages/adminPages/clubs/UpdateClub";
import Results from "./pages/adminPages/results/Results";
import MatchResult from "./pages/adminPages/results/MatchResult";
import AddStats from "./pages/adminPages/results/AddStats";
import Quizzes from "./pages/adminPages/quizzes/Quizzes";
import ViewQuizzes from "./pages/adminPages/quizzes/ViewQuiz";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matches" element={<Matches ticket={false}/>} />
        <Route path="/match/:matchId" element={<Matches ticket={false}/>} />
        <Route path="/reservematch/:matchId" element={<Matches ticket={true}/>} />
        <Route path="/matches/:updatematchID" element={<UpdateMatch />} />
        <Route path="/matches/add" element={<AddMatch />} />
        <Route path="/stadiums" element={<Stadiums />} />
        <Route path="/RatePlayers/:id" element={<Matches/>}/>
        <Route path="/stadiums/:updatestadiumID" element={<UpdateStadium />} />
        <Route path="/stadiums/add" element={<AddStadium />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/stores/view" element={<ViewStore />} />
        <Route path="/stores/:viewstorename/additem" element={<AddItems />} />
        <Route path="/stores/:viewstorename/update" element={<UpdateItem />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/clubs/add" element={<AddClub />} />
        <Route path="/clubs/update" element={<UpdateClub />} />
        <Route path="/clubs/add/addplayers" element={<AddClubPlayers />} />
        <Route path="/clubs/add/coach" element={<AddClubCoach />} />
        <Route path="/results" element={<Results />} />
        <Route path="/results/addresults" element={<MatchResult />} />
        <Route path="/results/addresults/stats/team1" element={<AddStats nxt="1" />} />
        <Route path="/results/addresults/stats/team2" element={<AddStats nxt="0" />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/quizzes/view" element={<ViewQuizzes />} />
      </Routes>
    </div>
  );
}

export default App;
