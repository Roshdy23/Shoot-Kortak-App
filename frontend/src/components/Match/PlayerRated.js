import Match from "./Match";
import MatchPerDay from "./MatchPerDay";
import PlayerCard from "../PlayerCard";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../constants/url.constants";
export default function PlayerRated({user}){
    const {matchId} = useParams();
    const {playerId} = useParams();
    const [player,setPlayer] = useState({});
    useEffect(()=>{
        fetch(`${baseUrl}/Players/GetPlayer/${playerId}`).then(res=>res.json()).then(data=>{console.log("haha"); console.log(data); let bl = {
            fname:data.fname,
            lname:data.lname,
            playerpic:data.photo
        }; setPlayer(bl);});

    },[])


    const [rating, setRating] = useState(0.10);
    const navigate = useNavigate();
    const navback = () => {
        navigate(`/match/${matchId}`);
    }
    const rate = () =>{
        fetch(`${baseUrl}/Players/RatePlayer/${matchId}/${playerId}/${user?.ssn}`,{
            method:"POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(rating),
    }).then(res=>res).then(data=>{console.log(data); navback()})
}
    return (<>
    <div style={{ width: "70vw", backgroundColor: "white", height: "78vh", position: "fixed", top: "15vh", left: "15vw", zIndex: "40", borderRadius: "25px", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center" }}>
                    <PlayerCard player={player} />
                    <div style={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
                        <label for="customRange3">{rating} </label>
                        <input type="range" value={rating} onChange={(e) => { setRating(e.target.value) }} class="custom-range" min="0" max="10" step="0.1" id="customRange3" />
                    </div>
                    <button type="button" style={{ margin: "10px", height: "6vh", width: "8vw" }} onClick={rate} className="btn btn-danger btn-sm ms-4">Rate Player</button>
                </div>
                <div style={{ backgroundColor: "rgb(0,0,0)", width: "100%", height: "100%", top: "0", opacity: "0.7", position: "fixed", zIndex: "30" }}></div>
                <div>
                    <div style={{ display: "flex" }}>
                        <div style={{ width: "70vw", borderRight: "solid black", height: "90vh", overflowY: "scroll" }}>
                            {/* {(matchId) ? ( */}
                                {/* // <><Match user={user?.ssn} id={matchId} /></> */}
                            {/* // ) : (<></>)} */}
                        </div>
                        <div style={{ width: "30vw" }}>
                            <MatchPerDay />
                        </div>
                    </div>
                </div>
    </>);
}