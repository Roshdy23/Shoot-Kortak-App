import { useEffect, useState } from "react"
import "../stats.css"
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../constants/url.constants";
export default function ClubStats(){

    const {clubId} = useParams();
    const navigate = useNavigate();
    const [players,setPlayers] = useState([{}]);
    useEffect(()=>{
        fetch(`${baseUrl}/Stats/GetStatPlayers/${clubId}`).then(res=>res.json()).then(data=>setPlayers(data));
    },[clubId])

    return(
        <div style={{padding:"3vh"}}>
        <div style={{height:"10vh",display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <Button onClick={()=>{navigate("/TeamStats");}} style={{width:"20px",height:"20px",marginBottom:"10px",textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center"}}>&lt;</Button>
        <h2 style={{color:"red"}}>{players[0].name}</h2>
        </div>
        <div>
    
        </div>
        <table className="table">
                                <thead class="table-light">
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Goals</th>
                                        <th scope="col">Assists</th>
                                        <th scope="col">Cleansheets</th>
                                        <th scope="col">Saves</th>
                                        <th scope="col">Tackles</th>
                                        <th scope="col">Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        players?.map((player)=>{
                                            return(<tr>
                                                <td> {player.fname} {player.lname}</td>
                                                <td>{player.goals}</td>
                                                <td>{player.assists}</td>
                                                <td>{player.cleansheets}</td>
                                                <td>{player.saves}</td>
                                                <td>{player.tackles}</td>
                                                <td>{player.rating}</td>
                                            </tr>)
                                        })
                                    }
                                </tbody>
                            </table>
        </div>)

};


