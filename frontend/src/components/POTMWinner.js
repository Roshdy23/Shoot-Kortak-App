import PlayerCard from "./PlayerCard";

export default function POTMWinner(){

    let Winner={
        name:"bassem morsy",
        pic:"https://egyptianproleague.com/players/20135.png"
    }

    return(
        <div style={{height:"35vh",marginTop:"-20px"}}>
        <h2 style={{textAlign:"center",marginTop:"3vh"}}>POTM for last month!</h2>
        <div style={{display:"flex",justifyContent:"center"}}>
            <PlayerCard player={Winner} votable={false}/>
        </div>
    </div>
    )
}