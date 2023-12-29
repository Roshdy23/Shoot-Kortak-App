import { useEffect, useState } from "react";
import { baseUrl } from "../../constants/url.constants";
import { useParams } from "react-router-dom";

export default function Article(props){

     const [article,setArticle] = useState({});
     const [liked,setLiked] = useState(0);
     const {artId} = useParams();
    useEffect(()=>{
        fetch(`${baseUrl}/Articles/Get/${artId}`).then(
            response => response.json()
        ).then(
            data=>{setArticle(data);
                setLiked(0);}
        )
    },[props])
    const role = (props.user?.role==="Fan"||props.user?.role==="Journalist")?props.user?.role:"Fan";
    //for now
    
const like = () => {
    if(liked===0)
    {
        //handle like in backend
    setLiked(1);
    }
else
{
        //handle dislike in backend
    setLiked(0);
}
}

    return (
        <div style={{display:"flex",paddingTop:"5vh",paddingBottom:"15vh",paddingLeft:"1vw",flexDirection:"column",alignItems:"center"}}>
            <div style={{width:"100%",marginBottom:"2vh"}}>
            <h2>{article.title}</h2>
            </div>
            <img src={article.img} style={{height:"60vh",marginBottom:"3vh"}} alt="article pic"/>
            <p>{article.description}</p>
            <div style={{display:"flex"}}>

                {(props.user?.role==="Fan")?((liked===0)?(
            <button type="button" onClick={like} style={{display:"flex",justifyContent:"space-between",width:"60px",alignItems:"center",textAlign:"center"}} className="btn btn-outline-danger btn-sm ms-4"> <img src={"https://upload.wikimedia.org/wikipedia/commons/5/54/Bot%C3%B3n_Me_gusta.svg"} style={{height:"20px"}}  alt="article pic"/>
            <div style={{display:"flex",height:"100%",flexDirection:"column",justifyContent:"center"}}>{(article.likes)?.toString()}</div>
            </button>
                ):(<button type="button" onClick={like} style={{display:"flex",justifyContent:"space-between",width:"60px",alignItems:"center",textAlign:"center"}} className="btn btn-danger btn-sm ms-4">
                        <img src={"https://upload.wikimedia.org/wikipedia/commons/5/54/Bot%C3%B3n_Me_gusta.svg"} style={{height:"20px"}}  alt="article pic"/>
                        <div style={{display:"flex",height:"100%",flexDirection:"column",justifyContent:"center"}}>
                        {(article.likes+liked).toString()}
                        </div>
                    </button>)):(<div style={{display:"flex",justifyContent:"space-between",width:"60px",alignItems:"center",textAlign:"center"}}>
                        <img src={"https://upload.wikimedia.org/wikipedia/commons/5/54/Bot%C3%B3n_Me_gusta.svg"} style={{height:"20px"}}  alt="article pic"/>
                        <div style={{display:"flex",height:"100%",flexDirection:"column",justifyContent:"center"}}>
                        : {(article.likes)?.toString()}
                        </div>
                    </div>)}
            </div>
        </div>
    )
}