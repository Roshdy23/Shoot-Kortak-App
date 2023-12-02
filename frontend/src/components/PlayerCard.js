import "./vote.css";

export default function PlayerCard({player,votable})
{

    if(!votable)
    return(
        <div className="voted">
                <div style={{backgroundColor:"rgba(53, 176, 220, 0.253)",width:"12vw",borderRadius:"15px 15px 0 0",display:"flex",justifyContent:"center"}}>
            <img src={player.pic} style={{width:"5vw",height:"100%"}} classname="card-img-top" alt="..."/>
                </div>
            <div classname="card-body">
              <p style={{fontWeight:"bold", textAlign:"center"}}>{player.name}</p>
            </div>
        </div>
);
else
{
    return(
            <div className="voteOption">
                <div style={{backgroundColor:"rgba(53, 176, 220, 0.253)",width:"12vw",borderRadius:"15px 15px 0 0",display:"flex",justifyContent:"center"}}>
            <img src={player.pic} style={{width:"5vw",height:"100%"}} classname="card-img-top" alt="..."/>
                </div>
            <div classname="card-body">
              <p style={{fontWeight:"bold", textAlign:"center"}}>{player.name}</p>
            </div>
            </div>
    )
}
}