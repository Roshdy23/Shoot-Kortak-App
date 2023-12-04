import { useEffect, useState } from "react"
import "../stats.css"
import { Link, useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";

export default function SelectChamp(){

    const [champList,setChampList] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        setChampList([
            {
                name:"Nile League",
                id:1,
                pic:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Egyptian_Premier_League_logo_2023.png/280px-Egyptian_Premier_League_logo_2023.png"
            },
            {
                name: "Egyptian Cup",
                id:2,
                pic:"https://upload.wikimedia.org/wikipedia/ar/archive/5/5f/20231125184446%21Egyptian_Cup_%28football%29.png"
            },
            {
                name:"Super Cup",
                id:3,
                pic:"https://alahly-images.s3.us-east-2.amazonaws.com/Honor/original/4-5f202f5b86709.png"
            }

        ])
    },[])

    return(
     <div style={{display:"flex" , flexDirection:"column",width:"100vw",}}>
    <Button onClick={()=>{navigate("/Stats");}} style={{width:"20px",border:"solid back",height:"20px",margin:"10px",textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center"}}>&lt;</Button>
    <div  className="cont">
    <div style={{height:"100%",alignItems:"center",width:"100%",justifyContent:"space-around"}} className="rowcont">
    {
        champList.map((champ,ind)=>{
            return(
                <Link to={`/ChampionshipStats/${champ.id}`} className="glass" key={ind}>
                    <div>
                <img src={champ.pic} style={{height:"70px"}} alt={"champ"+ind.toString()}/>
                <h5>{champ.name}</h5>
                    </div>
            </Link>
            )
        })
    }
    </div>
    </div>
    </div>
    )

};