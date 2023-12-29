import { useEffect, useState } from "react";
import MiniMatch from "./MiniMatch";
import { baseUrl } from "../../constants/url.constants";

export default function MatchesToday()
{
    const [matches,setMatches] = useState([{}]);
    const [championships,setChampionships] = useState([]);
    const [rfrsh,refresh] = useState(0);
    useEffect(()=>{
        fetch(`${baseUrl}/Matches/getMatchesToday`).then(res=>res.json()).then(data=>{setMatches(data);})
    },[])
    //let championships= ["Nile League","Egyptian Cup","Egyptian Super Cup"] // query championships that has matches today
useEffect(()=>{
    let champs = matches.map((match)=>match.championship);
    champs = champs.filter((item,index) => champs.indexOf(item) === index);
    console.log(champs);
    setChampionships(champs);
    refresh(rfrsh?0:1);
},[matches])
    //query matches today

if(matches.length)
{
    return(<div style={{display:"flex",flexDirection:"column",borderLeft:"solid rgb(0,0,0,0.1) 1px",borderBottom:"solid",height:"90vh",alignContent:"center",overflowY:"scroll"}}>
           {championships.map((championship)=>{
                return(
                    <div>
                    <h3 style={{color:"red"}}>{championship}</h3>
                    <div>
                        {
                            matches.map((match)=>{
                                if(match.championship===championship)
                                {
                                    console.log(match)
                                    return <MiniMatch match={match} />
                                }
                                else
                                return <></>
                            })
                        }
                    </div>
                    </div>
                )
           })
           }
    </div>)
}
else
{
    return(
        <div style={{display:"flex",flexDirection:"column",borderLeft:"solid rgb(0,0,0,0.1) 1px",justifyContent:"center"}}>
            <h2 style={{textAlign:"center"}}>There's no matches today</h2>
    </div>
    )
}
}
//here we will need to get all championships first then query for each championship the matches it has that is going to occur today!