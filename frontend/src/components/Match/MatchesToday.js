import MiniMatch from "./MiniMatch";

export default function MatchesToday()
{
    let championships= ["Nile League","Egyptian Cup","Egyptian Super Cup"] // query championships that has matches today

    //query matches today
let matches = [{
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
},
{
    Status:"over",
    championship:"Egyptian Super Cup",
    Home:{
        name:"Zed FC",
        pic:"https://semedia.filgoal.com/photos/team/medium/1683.png"
    },
    Away:{
        name:"Somoha",
        pic:"https://semedia.filgoal.com/photos/team/medium/860.png"
    },
    score:{
        home:0,
        away:0
    },
    time:{
        h: "04",
        m:"00",
        t:"PM"
    },
    stadium:"Cairo stadium",
    referee:"Mohamed Salama",
    crntTime:0
}];
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