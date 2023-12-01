import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./vote.css";
import PlayerCard from "./PlayerCard";

export default function Vote()
{
    let voted=false;
    let votedfor={
        name:"monsieur tagen",
        pic:"https://egyptianproleague.com/players/22552.png"
    }
let players = [{
    name:"samsun akinyola",
    pic:"https://egyptianproleague.com/players/234955.png",
},
{
    name:"youssef omaga",
    pic:"https://egyptianproleague.com/players/22522.png"
},
{
    name:"monsieur tagen",
    pic:"https://egyptianproleague.com/players/22552.png",
},
{
    name:"augustu mabolbolo",
    pic:"https://egyptianproleague.com/players/22672.png"
}
]

if(!voted)
return(
    <div style={{height:"35vh"}}>
        <h2 style={{textAlign:"center",marginTop:"3vh"}}>Vote Now for POTM</h2>
        <div style={{display:"flex",justifyContent:"space-between"}}>
        {players.map((player)=>{return (
            <PlayerCard  player={player} votable={true}/>
        )})
        }
        </div>
    </div>
);
else
{
return (
<div style={{height:"35vh"}}>
        <h2 style={{textAlign:"center",marginTop:"3vh"}}>You voted this month for</h2>
        <div style={{display:"flex",justifyContent:"center"}}>
            <PlayerCard player={votedfor} votable={false}/>
        </div>
    </div>
);
    }
}