import { useState } from "react";
import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import MiniMatch from "./MiniMatch";
export default function MatchPerDay()
{
    const time = new Date();
    const [currTime,setCurrTime]= useState(time);
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
    //query to get competition names at the specific date at currtime
    //query to get matches at the specific date at currTime
    let championships = ["Nile League","Egyptian Cup"];
    let matches = [{
        matchId:5,
        Status:"upcoming",
        championship:"Nile League",
        Home:{
            name:"Al Ahly",
            pic:"https://semedia.filgoal.com/photos/team/medium/1.png"
        },
        Away:{
            name:"Zamalek",
            pic:"https://semedia.filgoal.com/photos/team/medium/2.png"
        },
        score:{
            home:0,
            away:0
        },
        time:{
            h: "09",
            m:"00",
            t:"PM"
        },
        stadium:"Borg al arab",
        referee:"mahmoud nasef"
    },
    {
        matchId:6,
        Status:"running",
        championship:"Egyptian Cup",
        Home:{
            name:"Ismaily",
            pic:"https://semedia.filgoal.com/photos/team/medium/5.png"
        },
        Away:{
            name:"Ittihad sc",
            pic:"https://semedia.filgoal.com/photos/team/medium/13.png"
        },
        score:{
            home:"0",
            away:"0"
        },
        time:{
            h: "08",
            m:"00",
            t:"PM"
        },
        stadium:"Cairo stadium",
        referee:"Gehad Gresha",
        crntTime:"13"
    }];
    
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