import { Link } from "react-router-dom";
import "./match.css"

export default function MiniMatch(props)
{
const match = props.match;

return(
    (match)?
    <Link style={{color:"black",textDecoration:"none"}} to={`/match/${props.match?.id}`}>
    <div>
        <hr/>
        <div className="match-container">
            <div className="team-identifier">
                <img style={{width:"75px",height:"75px"}} src={match?.homepic} alt="home team logo"/>
                <h6>{match?.home}</h6>
            </div>
            <div className="score">
                <h1>{(match.result?.length===3)?match?.result[0]:" "}</h1>
            </div>
            <div className="info" style={{justifyContent:"center"}}>
                
                <h3 style={{textAlign:"center",alignItems:"center"}}>-</h3>
            </div>
            <div className="score">
                <h1>{(match.result?.length===3)?match?.result[2]:" "}</h1>
            </div>
            <div className="team-identifier">
            <img style={{width:"75px",height:"75px"}} src={match?.awaypic} alt="away team logo"/>
                <h6>{match?.away}</h6>
            </div>
        </div>
        <hr/>
    </div>
                </Link>:<></>
)
}