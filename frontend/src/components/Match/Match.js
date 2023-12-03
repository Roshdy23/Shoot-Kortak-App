import './match.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PlayerCard from '../PlayerCard';
export default function Match(props)
{
const {matchId} = useParams();
// query get match by id but for now we will pretend that the id we get everytime is 5
const navigate = useNavigate();
const navup = () => {
    navigate(`/reservematch/${matchId}`,{replace:true});
}
const match = {
    matchId:5,
    Status:"over",
    championship:"Egyptian Super Cup",
    Home:{
        name:"Zed FC",
        pic:"https://upload.wikimedia.org/wikipedia/commons/6/6a/%D8%B4%D8%B9%D8%A7%D8%B1_%D9%86%D8%A7%D8%AF%D9%8A_%D8%B2%D8%AF.png",
        players:{
            goalkeeper:{
                name:"Ali Lotfy",
                pic:"https://egyptianproleague.com/players/9908.png", rating:5,
            },
            defenders:[
            {
                name:"Mohamed Samir",
                pic:"https://egyptianproleague.com/players/2785.png", rating:-1
            },
            {
                name:"Nader Ramadan",
                pic:"https://egyptianproleague.com/players/113172.png", rating:-1
            },
            {
                name:"Fahd abo elfotouh",
                pic:"https://egyptianproleague.com/players/133844.png", rating:-1
            },
            {
                name:"Ali Gamal",
                pic:"https://egyptianproleague.com/players/198625.png", rating:-1
            }],
            midfielders:[
            {
                name:"Mostafa Zico",
                pic:"https://egyptianproleague.com/players/136189.png", rating:-1
            },
            {
                name:"Mahmoud Saber",
                pic:"https://egyptianproleague.com/players/133843.png", rating:-1
            },
            {
                name:"Mostafa Ali Okasha",
                pic:"https://egyptianproleague.com/players/238127.png", rating:-1
            },
            {
                name:"Peter Zilo motomosi",
                pic:"https://egyptianproleague.com/players/235961.png", rating:-1
            }],
            attackers:[
            {
                name:"Shady Hussien",
                pic:"https://egyptianproleague.com/players/136652.png", rating:-1
            },
            {
                name:"Delson Cumony",
                pic:"https://egyptianproleague.com/players/136652.png", rating:-1
            }]
        }
    },
    Away:{
        name:"Somoha",
        pic:"https://upload.wikimedia.org/wikipedia/ar/2/2e/Smouha-Club.png?20170908114531"
        ,players: {
            goalkeeper:{
                name:"Elhany Soliman",
                pic:"https://egyptianproleague.com/players/3418.png", rating:-1
            },
            defenders:[
            {
                name:"Sherif Reda",
                pic:"https://egyptianproleague.com/players/8683.png", rating:-1
            },
            {
                name:"Ahmed Gamal",
                pic:"https://egyptianproleague.com/players/8754.png", rating:-1
            },
            {
                name:"Mahmoud Wahid",
                pic:"https://egyptianproleague.com/players/22562.png", rating:-1
            },
            {
                name:"Barakat Haggag",
                pic:"https://egyptianproleague.com/players/136264.png", rating:-1
            }],
            midfielders:[
            {
                name:"Islam Gaber",
                pic:"https://egyptianproleague.com/players/102808.png", rating:-1
            },
            {
                name:"Mostafa Elbadry",
                pic:"https://egyptianproleague.com/players/113844.png", rating:-1
            },
            {
                name:"Abdellatif ben qusso",
                pic:"https://egyptianproleague.com/players/237107.png", rating:-1
            },
            {
                name:"Ibrahim Jumbo",
                pic:"https://egyptianproleague.com/players/238070.png", rating:-1
            }],
            attackers:[
            {
                name:"Hossam Hassan",
                pic:"https://egyptianproleague.com/players/20419.png", rating:-1
            },
            {
                name:"Emmanuel Ihizo",
                pic:"https://egyptianproleague.com/players/238023.png", rating:-1
            }]
        }
    },
    score:{
        home:2,
        away:1
    },
    time:{
        h: "04",
        m:"00",
        t:"PM"
    },
    date : "5 Nov 2023",
    stadium:"Cairo stadium",
    referee:"Mohamed Salama",
    crntTime:0
}
//rating for each player is added after we get the data from backend to see the rating the user gave to each player if he didnt rate him the rating is 0
//query to see if reserved or not
const isreserved = false;
return (
    <>
    <h2 style={{color:"red"}}>{match.championship}</h2>
    <div className="big-match-container">
            <div className="team-identifier">
                <img style={{width:"125px",height:"125px"}} src={match.Home.pic} alt="home team logo"/>
                <h6>{match.Home.name}</h6>
            </div>
            <div className="big-score">
                <h1>{match.score.home}</h1>
            </div>
            <div className="big-info">
                {
                (match.Status==="upcoming")?
                (<h5 style={{textAlign:"center"}}>{parseInt(match.time.h)}:{match.time.m} {match.time.t}</h5>):((match.Status==="running")?(<h5 style={{textAlign:"center",color:"red"}}>{match.crntTime}'</h5>):<h5 style={{textAlign:"center"}}>Over</h5>)
                }
                <h3 style={{textAlign:"center"}}>-</h3>
            </div>
            <div className="big-score">
                <h1>{match.score.away}</h1>
            </div>
            <div className="team-identifier">
            <img style={{width:"125px",height:"125px"}} src={match.Away.pic} alt="away team logo"/>
                <h6>{match.Away.name}</h6>
            </div>
    </div>
    <div style={{marginTop:"2vh",width:"100%",display:"flex",justifyContent:"center"}}>
    {(!isreserved)?(
        <button type="button" onClick={navup} className="btn btn-danger btn-sm ms-4">Reserve Tickets</button>
        ):(<h5>Ticket reserved</h5>)
    }
    </div>
<div style={{width:"100%",display:"flex",flexDirection:"column",alignContent:"center",textAlign:"center"}}>
    <h3>Goalkeeper</h3>
    <div style={{display:"flex",justifyContent:"space-between"}}>
    <div>
<div style={{display:"flex",margin:"5px",alignItems:"center"}}>
                <PlayerCard player={match.Home.players.goalkeeper} votable={false}/>
                { (match.Home.players.goalkeeper.rating===-1)?(
                <button type="button" style={{height:"6vh",marginRight:"2vw"}} className="btn btn-danger btn-sm ms-4">Rate player</button>
                ):(<h4 style={{marginLeft:"2vw"}}>rating: {match.Home.players.goalkeeper.rating}</h4>)
}
            </div>
    </div>
    <div>
            <div style={{display:"flex",margin:"5px",flexDirection:"row-reverse",alignItems:"center",justifyContent:"space-around"}}>
                <PlayerCard player={match.Away.players.goalkeeper} votable={false}/>
                { (match.Away.players.goalkeeper.rating===-1)?(
                <button type="button" style={{height:"6vh",marginRight:"2vw"}} className="btn btn-danger btn-sm ms-4">Rate player</button>
                ):(<h4>rating: {match.Away.players.goalkeeper.rating}</h4>)
}
            </div>

    </div>
</div>
<hr></hr>
<h3>Defenders</h3>
<div style={{display:"flex",justifyContent:"space-between"}}>
    <div>
        {match.Home.players.defenders.map((player)=>{
            return(<div style={{display:"flex",margin:"5px",alignItems:"center"}}>
                <PlayerCard player={player} votable={false}/>
{ (player.rating===-1) ?(
    <button type="button" style={{height:"6vh"}} className="btn btn-danger btn-sm ms-4">Rate player</button>
    ):(<h4>rating: {player.rating}</h4>)           }
            </div>
                )
            })}
    </div>
    <div>
        {match.Away.players.defenders.map((player)=>{
            return(<div style={{display:"flex",margin:"5px",flexDirection:"row-reverse",alignItems:"center",justifyContent:"space-around"}}>
                <PlayerCard player={player} votable={false}/>
                { (player.rating===-1) ?(
                    <button type="button" style={{height:"6vh",marginRight:"2vw"}} className="btn btn-danger btn-sm ms-4">Rate player</button>
    ):(<h4>rating: {player.rating}</h4>)           }
            </div>
                )
        })}

    </div>
</div>
<hr/>
<h3>Midfielders</h3>
<div style={{display:"flex",justifyContent:"space-between"}}>
    <div>
        {match.Home.players.midfielders.map((player)=>{
            return(<div style={{display:"flex",margin:"5px",alignItems:"center"}}>
                <PlayerCard player={player} votable={false}/>
                { (player.rating===-1) ?(
                    <button type="button" style={{height:"6vh"}} className="btn btn-danger btn-sm ms-4">Rate player</button>
    ):(<h4>rating: {player.rating}</h4>)           }
            </div>
                )
            })}
    </div>
    <div>
        {match.Away.players.midfielders.map((player)=>{
            return(<div style={{display:"flex",margin:"5px",flexDirection:"row-reverse",alignItems:"center",justifyContent:"space-around"}}>
                <PlayerCard player={player} votable={false}/>
                { (player.rating===-1) ?(
                    <button type="button" style={{height:"6vh",marginRight:"2vw"}} className="btn btn-danger btn-sm ms-4">Rate player</button>
    ):(<h4>rating: {player.rating}</h4>)           }
            </div>
                )
        })}

    </div>
</div>
<hr/>
<h3>Attackers</h3>
<div style={{display:"flex",justifyContent:"space-between"}}>
    <div>
        {match.Home.players.attackers.map((player)=>{
            return(<div style={{display:"flex",margin:"5px",alignItems:"center"}}>
                <PlayerCard player={player} votable={false}/>
                { (player.rating===-1) ?(
                    <button type="button" style={{height:"6vh"}} className="btn btn-danger btn-sm ms-4">Rate player</button>
    ):(<h4>rating: {player.rating}</h4>)           }
            </div>
                )
            })}
    </div>
    <div>
        {match.Away.players.attackers.map((player)=>{
            return(<div style={{display:"flex",margin:"5px",flexDirection:"row-reverse",alignItems:"center",justifyContent:"space-around"}}>
                <PlayerCard player={player} votable={false}/>
                { (player.rating===-1) ?(
                    <button type="button" style={{height:"6vh",marginRight:"2vw"}} className="btn btn-danger btn-sm ms-4">Rate player</button>
    ):(<h4>rating: {player.rating}</h4>)           }
            </div>
                )
        })}

    </div>
</div>
</div>
    </>
)



}