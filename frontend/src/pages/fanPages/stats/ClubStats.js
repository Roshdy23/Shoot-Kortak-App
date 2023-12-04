import { useEffect, useState } from "react"
import "../stats.css"
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function ClubStats(){

    const {clubId} = useParams();
    const navigate = useNavigate();
    const [Club,setClub] = useState({});
    useEffect(()=>{
        setClub(players.find((club)=>parseInt(clubId)===club.id))
    },[])

    return(
        <div style={{padding:"3vh"}}>
        <div style={{height:"10vh",display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <Button onClick={()=>{navigate("/TeamStats");}} style={{width:"20px",height:"20px",marginBottom:"10px",textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center"}}>&lt;</Button>
        <h2 style={{color:"red"}}>{Club.name}</h2>
        </div>
        <div>
    
        </div>
        <table className="table">
                                <thead class="table-light">
                                    <tr>
                                        <th scope="col">Club</th>
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
                                        Club.players?.map((player)=>{
                                            return(<tr>
                                                <td> {player.name}</td>
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


const players = [
    {
        id:1,
        name:"Al Ahly",
        players:[
            {
                name:"Emam Ashour",
                goals:12,
                assists:5,
                saves:0,
                cleansheets:6,
                tackles:2,
                rating:7
            },
            {
                name:"Karim Fouad",
                goals:7,
                assists:16,
                saves:0,
                cleansheets:4,
                tackles:8,
                rating:8.3
                
            },
            {
                name:"Ali maaloul",
                goals:3,
                assists:7,
                saves:0,
                cleansheets:10,
                tackles:21,
                rating:8
                
            }
        ]
    },
    {
        id:2,
        name:"Zamalek SC",
        players:[
            {
                name:"Amr ElSisi",
                goals:4,
                assists:3,
                saves:0,
                cleansheets:6,
                tackles:2,
                rating:7
            },
            {
                name:"Ahmed Sayed Zizo",
                goals:12,
                assists:5,
                saves:0,
                cleansheets:4,
                tackles:5,
                rating:7.6
                
            },
            {
                name:"Mohammed Awwad",
                goals:-1,
                assists:0,
                saves:1,
                cleansheets:0,
                tackles:1,
                rating:2.5
                
            }
        ]
    },
    {
        id:3,
        name:"Pyramids",
        players:[
            {
                name:"Mostafa Fathy",
                goals:5,
                assists:5,
                saves:0,
                cleansheets:3,
                tackles:0,
                rating:6.7
            },
            {
                name:"Ramadan Sobhy",
                goals:2,
                assists:1,
                saves:0,
                cleansheets:1,
                tackles:0,
                rating:5.555
                
            },
            {
                name:"Mohannad Lashin",
                goals:5,
                assists:2,
                saves:0,
                cleansheets:5,
                tackles:3,
                rating:7.3
                
            }
        ]
    },
]