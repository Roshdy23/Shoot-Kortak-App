import { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import MiniMatch from "./MiniMatch";
import { baseUrl } from "../../constants/url.constants";
export default function MatchPerDay()
{
    const time = new Date();
    const [currTime,setCurrTime]= useState(time);
    const [matches,setMatches] = useState([{}]);
    const [championships,setChampionships] = useState([]);
    const [rfrsh,refresh] = useState(0);
    function getTomorrow(){
        let tom = new Date(currTime);
        tom.setDate(tom.getDate()+1);
        setCurrTime(tom);
    }
    
    function getYesterday(){
        let yest = new Date(currTime);
        yest.setDate(yest.getDate()-1);
        setCurrTime(yest);
    }
        function datify()
        {
            let date = currTime.toLocaleDateString();
            let strs = date.split('/');
            return (strs[2]+'-'+strs[0]+'-'+strs[1])
        }
    useEffect(()=>{
    fetch(`${baseUrl}/Matches/getMatchesDate?date=${datify()}`).then(res=>res.json()).then(data=>{setMatches(data); console.log(data)})
    },[currTime])
    useEffect(()=>{
        let champs = matches.map((match)=>match.championship);
    champs = champs.filter((item,index) => champs.indexOf(item) === index);
    console.log(champs);
    setChampionships(champs);
    refresh(rfrsh?0:1);
    },[matches])
    //query to get competition names at the specific date at currtime
    //query to get matches at the specific date at currTime
    
    
    return(
        <>
        <div style={{textAlign:"center",height:"20vh",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
        <button type="button" style={{height:"35px"}} class="btn btn-secondary me-2" data-bs-toggle="tooltip" data-bs-placement="top" onClick={getYesterday} title="previous day">&lt;</button>
        <DatePicker onChange={setCurrTime} value={currTime}/>
        <button type="button" style={{height:"35px"}} class="btn btn-secondary me-2" data-bs-toggle="tooltip" data-bs-placement="top" onClick={getTomorrow} title="next day">&gt;</button>
        </div>
        {(matches.length)?(
        <div style={{borderTop:"solid rgb(0,0,0,0.1) 1px",height:"70vh",overflowY:"scroll"}}>
{championships.map((championship)=>{
                return(
                    <div>
                    <h3 style={{color:"red"}}>{championship}</h3>
                    <div>
                        {
                            matches.map((match)=>{
                                if(match.championship===championship)
                                return <MiniMatch match={match} />
                                else
                                return <></>
                            })
                        }
                    </div>
                    </div>
                )
           })
           }
        </div>
        ):
        <h3>No matches at this day</h3>
}
        </>
    )

}