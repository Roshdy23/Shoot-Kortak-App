import { Link } from "react-router-dom";
import "./match.css"

export default function MiniMatch(props)
{
const match = props.match;

return(
    <Link style={{color:"black",textDecoration:"none"}} to="/match/5">
    <div>
        <hr/>
        <div className="match-container">
            <div className="team-identifier">
                <img style={{width:"75px",height:"75px"}} src={match.Home.pic} alt="home team logo"/>
                <h6>{match.Home.name}</h6>
            </div>
            <div className="score">
                <h1>{match.score.home}</h1>
            </div>
            <div className="info">
                {
                (match.Status==="upcoming")?
                (<h5 style={{textAlign:"center"}}>{parseInt(match.time.h)}:{match.time.m} {match.time.t}</h5>):((match.Status==="running")?(<h5 style={{textAlign:"center",color:"red"}}>{match.crntTime}'</h5>):<h5 style={{textAlign:"center"}}>Over</h5>)
                }
                <h3 style={{textAlign:"center"}}>-</h3>
            </div>
            <div className="score">
                <h1>{match.score.away}</h1>
            </div>
            <div className="team-identifier">
            <img style={{width:"75px",height:"75px"}} src={match.Away.pic} alt="away team logo"/>
                <h6>{match.Away.name}</h6>
            </div>
        </div>
        <hr/>
    </div>
                </Link>
)
}