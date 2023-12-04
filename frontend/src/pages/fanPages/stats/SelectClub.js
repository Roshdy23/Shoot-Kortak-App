import { useEffect, useState } from "react"
import "../stats.css"
import { Link, useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";

export default function SelectClub(){

    const [clubList,setClubList] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        setClubList([
            {
                name:"Al Ahly",
                id:1,
                goals:30,
                assists:25,
                saves:50,
                cleansheets:15,
                tackles:60
            },
            {
                name:"Zamalek SC",
                id:2,
                goals:20,
                assists:23,
                saves:52,
                cleansheets:12,
                tackles:48
                
            },
            {
                name:"Pyramids",
                id:3,
                goals:25,
                assists:30,
                saves:60,
                cleansheets:10,
                tackles:50
                
            },

        ])
    },[])

    return(
        <div style={{padding:"3vh"}}>
        <div style={{height:"10vh",display:"flex",flexDirection:"column",justifyContent:"center"}}>
        <Button onClick={()=>{navigate("/Stats");}} style={{width:"20px",height:"20px",marginBottom:"10px",textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center"}}>&lt;</Button>
        <h2 style={{color:"red"}}>Team Stats.</h2>
        </div>
        <div>
    
        </div>
        <table className="table">
                                <thead class="table-light">
                                    <tr>
                                        <th scope="col">Club</th>
                                        <th scope="col">Total Goals</th>
                                        <th scope="col">Total Assists</th>
                                        <th scope="col">Total Cleansheets</th>
                                        <th scope="col">Total Saves</th>
                                        <th scope="col">Total Tackles</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        clubList.map((club)=>{
                                            return(<tr>
                                                <td> <Link to={`/TeamStats/${club.id}`} style={{color:"red"}} >{club.name}</Link></td>
                                                <td>{club.goals}</td>
                                                <td>{club.assists}</td>
                                                <td>{club.cleansheets}</td>
                                                <td>{club.saves}</td>
                                                <td>{club.tackles}</td>
                                            </tr>)
                                        })
                                    }
                                </tbody>
                            </table>
        </div>)

};