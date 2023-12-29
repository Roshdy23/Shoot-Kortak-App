import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom";

import { Button } from "react-bootstrap";
import { baseUrl } from "../../../constants/url.constants";

export default function ChampStats(){
    const navigate = useNavigate();
    const {champId} = useParams();
    const [type,setType]=useState("");
    const [champ,setChamp] = useState({});
    useEffect(()=>{ 
        fetch(`${baseUrl}/Stats/Top${type}/${champId}`).then(res=>res.json()).then(data=>{console.log(data); setList(data)});
    },[type,champId]);


const [list,setList] = useState([{}]);


    useEffect(()=>{
        setType("Goals")
    },[])

    return(<div style={{padding:"3vh"}}>
    <div style={{height:"10vh",display:"flex",flexDirection:"column",justifyContent:"center"}}>
    <Button onClick={()=>{navigate("/ChampionshipStats");}} style={{width:"20px",height:"20px",marginBottom:"10px",textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center"}}>&lt;</Button>
    <h2 style={{color:"red"}}>{champ.name}</h2>
    </div>
    <div>
{(type==="Goals")?
    <button type="button"  onClick={()=>{setType("Goals")}} className="btn btn-danger btn-sm ms-4">Top Goals</button>
    :
    <button type="button"  onClick={()=>{setType("Goals")}} className="btn btn-outline-danger btn-sm ms-4">Top Goals</button>
}
{(type==="Assists")?
    <button type="button"  onClick={()=>{setType("Assists")}} className="btn btn-danger btn-sm ms-4">Top Assists</button>
    :
    <button type="button"  onClick={()=>{setType("Assists")}} className="btn btn-outline-danger btn-sm ms-4">Top Assists</button>
}
{(type==="CleanSheets")?
    <button type="button"  onClick={()=>{setType("CleanSheets")}} className="btn btn-danger btn-sm ms-4">Top Cleansheets</button>:
    <button type="button"  onClick={()=>{setType("CleanSheets")}} className="btn btn-outline-danger btn-sm ms-4">Top Cleansheets</button>
}
{(type==="Saves")?
    <button type="button"  onClick={()=>{setType("Saves")}} className="btn btn-danger btn-sm ms-4">Top Saves</button>:
    <button type="button"  onClick={()=>{setType("Saves")}} className="btn btn-outline-danger btn-sm ms-4">Top Saves</button>
}
{(type==="Tackles")?
    <button type="button" onClick={()=>{setType("Tackles")}} className="btn btn-danger btn-sm ms-4">Top Tackles</button>:
    <button type="button" onClick={()=>{setType("Tackles")}} className="btn btn-outline-danger btn-sm ms-4">Top Tackles</button>
}

    </div>
    <table className="table">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col">Player</th>
                                    { 
                                    (type==="Goals")?
                                        <th scope="col">Goals</th>:
                                        ((type==="Assists")?
                                            <th scope="col">Assists</th>:((type==="Saves")?<th scope="col">Saves</th>:((type==="CleanSheets")?<th scope="col">Cleansheets</th>:<th scope="col">Tackles</th>)))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (type==="Goals")?
                                    list?.map((player)=>{
                                        return(<tr>
                                            <td>{player.PlayerName}</td>
                                            <td>{player.Goals}</td>
                                        </tr>)
                                    }):((type==="Assists")?list?.map((player)=>{
                                        return(<tr>
                                            <td>{player.PlayerName}</td>
                                            <td>{player.Assists}</td>
                                        </tr>)
                                    }):((type==="CleanSheets")?list?.map((player)=>{
                                        return(<tr>
                                            <td>{player.PlayerName}</td>
                                            <td>{player.CleanSheets}</td>
                                        </tr>)
                                    }):((type==="Saves")?list?.map((player)=>{
                                        return(<tr>
                                            <td>{player.PlayerName}</td>
                                            <td>{player.Saves}</td>
                                        </tr>)
                                    }):(list?.map((player)=>{
                                        return(<tr>
                                            <td>{player.PlayerName}</td>
                                            <td>{player.Tackles}</td>
                                        </tr>)
                                    })))))
                                }
                            </tbody>
                        </table>
    </div>)
}