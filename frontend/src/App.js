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
import Championships from "./pages/adminPages/championships/Championships";
import AddChampionship from "./pages/adminPages/championships/AddChampionship";
import UpdateChampionship from "./pages/adminPages/championships/UpdateChampionship";
import News from "./pages/News";
import Stats from "./pages/fanPages/Stats";
import SelectChamp from "./pages/fanPages/stats/SelectChamp";
import ChampStats from "./pages/fanPages/stats/ChampStats";
import SelectClub from "./pages/fanPages/stats/SelectClub";
import ClubStats from "./pages/fanPages/stats/ClubStats";
import UpdateClubPlayers from "./pages/adminPages/clubs/UpdateClubPlayers";
import UpdateClubCoach from "./pages/adminPages/clubs/UpdateClubCoach";
import Quiz from "./pages/fanPages/quiz/Quiz";
import QuizDetail from "./pages/fanPages/quiz/QuizDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Articles from "./pages/journalistPages/Articles";
import CreateArticle from "./pages/journalistPages/CreateArticle";
import PendingQuizzes from "./pages/journalistPages/PendingQuiz";
import CreateQuiz from "./pages/journalistPages/CreateQuiz";
import EditQuiz from "./pages/journalistPages/EditQuiz";
import AddClubPlayer from "./pages/adminPages/clubs/AddClubPlayer";
import { useState } from "react";
import UpdateSysItem from "./pages/adminPages/stores/UpdateSysItems";
import AddSysItems from "./pages/adminPages/stores/AddSysItems";
function App() {
  const [user, setUser] = useState({});
  const [rfsh, setRfsh] = useState(0);
  return (
    <div className="App">
      <Navbar rfshr={rfsh} user={user} setUser={setUser} />
      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
        <Route path="/" element={<Home user={user} />} />
        <Route path="/matches" element={<Matches user={user} ticket={false} />} />
        <Route path="/match/:matchId" element={<Matches ticket={false} />} />
        <Route path="/reservematch/:matchId" element={<Matches ticket={true} />} />
        <Route path="/matches/update/:updatematchID" element={<UpdateMatch />} />
        <Route path="/matches/add" element={<AddMatch />} />
        <Route path="/stadiums" element={<Stadiums />} />
        <Route path="/RatePlayers/:matchId/:playerId" element={<Matches />} />
        <Route path="/stadiums/update/:updatestadiumID" element={<UpdateStadium />} />
        <Route path="/stadiums/add" element={<AddStadium />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/news" element={<News user={user} />} />
        <Route path="/article/:artId" element={<News user={user} />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/ChampionshipStats" element={<SelectChamp />} />
        <Route path="/TeamStats" element={<SelectClub />} />
        <Route path="/TeamStats/:clubId" element={<ClubStats />} />
        <Route path="/ChampionshipStats/:champId" element={<ChampStats />} />
        <Route path="/stores/view/:storeID" element={<ViewStore />} />
        <Route path="/stores/view/:storeID/additem" element={<AddItems />} />
        <Route path="/stores/view/:storeID/update/:itemid" element={<UpdateItem />} />
        <Route path="/stores/updatesysitems" element={<UpdateSysItem />} />
        <Route path="/stores/addsysitems" element={<AddSysItems />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/create" element={<CreateArticle />} />
        <Route path="/clubs/add" element={<AddClub />} />
        <Route path="/clubs/add/:clubID/addplayers" element={<AddClubPlayers />} />
        <Route path="/clubs/add/:clubID/addcoach" element={<AddClubCoach />} />
        <Route path="/clubs/update/:clubID" element={<UpdateClub />} />
        <Route path="/clubs/update/:clubID/players" element={<UpdateClubPlayers />} />
        <Route path="/clubs/update/:clubID/coach" element={<UpdateClubCoach />} />
        <Route path="/clubs/update/:clubID/addplayer" element={<AddClubPlayer />} />
        <Route path="/login" element={<Login refresh={rfsh} setRefresh={setRfsh} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/results" element={<Results />} />
        <Route path="/results/addresults/:matchId" element={<MatchResult />} />
        <Route path="/results/addresults/stats/team1/:matchId" element={<AddStats nxt="1" />} />
        <Route path="/results/addresults/stats/team2/:matchId" element={<AddStats nxt="0" />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/quiz" element={(user?.role === "Fan") ? <Quiz /> : <Login refresh={rfsh} setRefresh={setRfsh} />} />
        <Route path="/EditQuiz/:quizId" element={<EditQuiz />} />
        <Route path="/CreateQuiz" element={<CreateQuiz />} />
        <Route path="/PendingQuizzes" element={<PendingQuizzes />} />
        <Route path="/quiz/:quizId" element={<QuizDetail />} />
        <Route path="/quizzes/view/:quizid" element={<ViewQuizzes />} />
        <Route path="/championships" element={<Championships />} />
        <Route path="championships/add" element={<AddChampionship />} />
        <Route path="/championships/update/:champID" element={<UpdateChampionship />} />
      </Routes>
    </div>
  );
}

export default App;
