import { Link } from "react-router-dom"
import "./stats.css"

export default function Stats() {

    return(
    <div className="cont">
        <div className="rowcont">
        <Link  className="glass"> Team stats </Link>
        <Link to={"/ChampionshipStats"} className="glass">Championship Stats</Link>
        </div>
    </div>)
}