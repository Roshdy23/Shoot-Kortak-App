import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";



export default function ChampStats(){
    
    const {champId} = useParams();
    const [type,setType]=useState("");
    const [champ,setChamp] = useState({});
    useEffect(()=>{
        setChamp(championships.find((ch)=>ch.id===parseInt(champId)));
        setType("score")
        console.log(1)
    },[])
    return(<div style={{padding:"3vh"}}>
    <div style={{height:"10vh",display:"flex",flexDirection:"column",justifyContent:"center"}}>
    <h2 style={{color:"red"}}>{champ.name}</h2>
    </div>
    <div>
{(type==="score")?
    <button type="button"  onClick={()=>{setType("score")}} className="btn btn-danger btn-sm ms-4">Top Scorers</button>
    :
    <button type="button"  onClick={()=>{setType("score")}} className="btn btn-outline-danger btn-sm ms-4">Top Scorers</button>
}
{(type==="assist")?
    <button type="button"  onClick={()=>{setType("assist")}} className="btn btn-danger btn-sm ms-4">Top Assists</button>
    :
    <button type="button"  onClick={()=>{setType("assist")}} className="btn btn-outline-danger btn-sm ms-4">Top Assists</button>
}
{(type==="cleansheet")?
    <button type="button"  onClick={()=>{setType("cleansheet")}} className="btn btn-danger btn-sm ms-4">Top Cleansheets</button>:
    <button type="button"  onClick={()=>{setType("cleansheet")}} className="btn btn-outline-danger btn-sm ms-4">Top Cleansheets</button>
}
{(type==="save")?
    <button type="button"  onClick={()=>{setType("save")}} className="btn btn-danger btn-sm ms-4">Top Saves</button>:
    <button type="button"  onClick={()=>{setType("save")}} className="btn btn-outline-danger btn-sm ms-4">Top Saves</button>
}
{(type==="tackle")?
    <button type="button" onClick={()=>{setType("tackle")}} className="btn btn-danger btn-sm ms-4">Top Tackles</button>:
    <button type="button" onClick={()=>{setType("tackle")}} className="btn btn-outline-danger btn-sm ms-4">Top Tackles</button>
}

    </div>
    <table className="table">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col">Player</th>
                                    { 
                                    (type==="score")?
                                        <th scope="col">Goals</th>:
                                        ((type==="assist")?
                                            <th scope="col">Assists</th>:((type==="save")?<th scope="col">Saves</th>:((type==="cleansheet")?<th scope="col">Cleansheets</th>:<th scope="col">Tackles</th>)))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (type==="score")?
                                    champ.topscorers?.map((player)=>{
                                        return(<tr>
                                            <td>{player.name}</td>
                                            <td>{player.score}</td>
                                        </tr>)
                                    }):((type==="assist")?champ.topassists?.map((player)=>{
                                        return(<tr>
                                            <td>{player.name}</td>
                                            <td>{player.score}</td>
                                        </tr>)
                                    }):((type==="cleansheet")?champ.topcleansheets?.map((player)=>{
                                        return(<tr>
                                            <td>{player.name}</td>
                                            <td>{player.score}</td>
                                        </tr>)
                                    }):((type==="save")?champ.topcleansheets?.map((player)=>{
                                        return(<tr>
                                            <td>{player.name}</td>
                                            <td>{player.score}</td>
                                        </tr>)
                                    }):(champ.toptackles?.map((player)=>{
                                        return(<tr>
                                            <td>{player.name}</td>
                                            <td>{player.score}</td>
                                        </tr>)
                                    })))))
                                }
                            </tbody>
                        </table>
    </div>)
}



const topScorers = {
    league:[
        {
            name:"Cristovao Mabololo",score:6
        },
        {
            name:"Ahmed Belhaj",score:6
        },
        {
            name:"Ahmed Kandousi",score:5
        },
        {
            name:"Mustafa Zico",score:5
        },
        {
            name:"Hossam Ashraf",score:5
        }
    ],
    Cup:[
        {
            name:"Mahmoud Kahraba",score:4
        },
        {
            name:"Seif Al-Din Al-Jezery",score:3
        },
        {
            name:"Nasser Mansy",score:2
        },
        {
            name:"Walid Al-Carty",score:2
        },
        {
            name:"Mohannad lashein",score:2
        }
    ],
    Super:[
        {
            name:"Salah Mohsen",score:2
        },
        {
            name:"Percy tao",score:1
        }
    ]
}

const topAssists = {
    league:[
        {
            name:"Emam Ashour",score:3
        },
        {
            name:"Karim El-Deeb",score:3
        },
        {
            name:"S. Ougola",score:3
        },
        {
            name:"Omar El-Wahsh",score:2
        },
        {
            name:"Mohamed Hamdy",score:2
        }
    ],
    Cup:[
        {
            name:"Amr El-Sisi",score:12
        },
        {
            name:"Ahmed Sayed Zizo",score:5
        },
        {
            name:"Mohamed Ashraf Roqa",score:5
        },
        {
            name:"Youssef Omaga",score:4
        },
        {
            name:"Omar Gaber",score:2
        }
    ],
    Super:[
        {
            name:"Tagen Mohamed Tagen",score:3
        }
    ]
}
const topCleanSheets = {
    league:[
        {
            name:"Sherif Ekramy",score:4
        },
        {
            name:"Mohamed El-Shenawy",score:3
        },
        {
            name:"Mohamed Awwad",score:3
        },
        {
            name:"Mohamed Fawzy",score:2
        },
        {
            name:"Mahdi Suliman",score:1
        }
    ],
    Cup:[
        {
            name:"Mohamed El-Shennawy",score:3
        },
        {
            name:"Mostafa Shobeir",score:2
        },
        {
            name:"Mohammed Awwad",score:2
        },
        {
            name:"Gennesh",score:1
        },
        {
            name:"Abo Gabal",score:1
        }
    ],
    Super:[
        {
            name:"Mohamed El-Shennawy",score:1
        }
    ]
}
const topTackles = {
    league:[
        {
            name:"Mahmoud Shebana",score:8
        },
        {
            name:"Mohamed Ammar",score:6
        },
        {
            name:"Mohamed Zany",score:6
        },
        {
            name:"Mahmoud elwensh",score:6
        },
        {
            name:"Ali Gabr",score:5
        }
    ],
    Cup:[
        {
            name:"Hamdi EL-Naqqaz",score:7
        },
        {
            name:"Ramy Rabea'a",score:6
        },
        {
            name:"Yasser Ibrahim",score:5
        },
        {
            name:"Mohamed Abdelmoneam",score:4
        },
        {
            name:"Marwan Atteyya",score:3
        }
    ],
    Super:[
        {
            name:"Ali Maaloul",score:1
        }
    ]
}
const championships = [
    {
        id:1,
        name:"Nile League",
        pic:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Egyptian_Premier_League_logo_2023.png/280px-Egyptian_Premier_League_logo_2023.png",
        topscorers:topScorers.league,
        topassists:topAssists.league,
        topcleansheets:topCleanSheets.league,
        toptackles:topTackles.league,
        topSaves:topCleanSheets.league
    },
    {
        id:2,
        name:"Egyptian Cup",
        pic:"https://upload.wikimedia.org/wikipedia/ar/archive/5/5f/20231125184446%21Egyptian_Cup_%28football%29.png"
        ,topscorers:topScorers.Cup,
        topassists:topAssists.Cup,
        topcleansheets:topCleanSheets.Cup,
        toptackles:topTackles.Cup,
        topSaves:topCleanSheets.Cup
    },
    {
        id:3,
        name:"Super Cup",
        pic:"https://alahly-images.s3.us-east-2.amazonaws.com/Honor/original/4-5f202f5b86709.png"
        ,topscorers:topScorers.Super,
        topassists:topAssists.Super,
        topcleansheets:topCleanSheets.Super,
        toptackles:topTackles.Super,
        topSaves:topCleanSheets.Super
    },

]