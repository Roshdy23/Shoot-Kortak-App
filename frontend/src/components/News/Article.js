import { useEffect, useState } from "react";


export default function Article(props){

     const [article,setArticle] = useState({});
     const [liked,setLiked] = useState(0);
    // useEffect(()=>{
    //     fetch(`https://localhost/8000/getartbyId/${props.id}`).then(
    //         response => response.json()
    //     ).then(
    //         data=>setArticle(data)
    //     )
    // })

    //for now
useEffect(()=>{
        setArticle({
            id:5,
            title: "Eastern company wins the title race for first time ever!",
            pic: "https://scontent.fcai20-4.fna.fbcdn.net/v/t39.30808-6/301890292_441277618023107_9171654543944456370_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=ppbdG-IXS1AAX_MUQ5w&_nc_ht=scontent.fcai20-4.fna&oh=00_AfAUqlbghIt4sXK79mKVMsPuMGRJG2oXxIeNebKHXROsnQ&oe=656E63D0",
            likes:9,
            details:"eastern company beats their rival bany ebed in the final round giving them the lead to steal the title from the one and only ghazl el mahalla after an epic odyssey streamed only on On Sports TV"
    }
    );
    setLiked(0);
    },[])
    
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
            <img src={article.pic} style={{height:"60vh",marginBottom:"3vh"}} alt="article pic"/>
            <p>{article.details}</p>
            <div style={{display:"flex"}}>
                {(liked===0)?(
            <button type="button" onClick={like} style={{display:"flex",justifyContent:"space-between",width:"60px",alignItems:"center",textAlign:"center"}} className="btn btn-outline-danger btn-sm ms-4"> <img src={"https://upload.wikimedia.org/wikipedia/commons/5/54/Bot%C3%B3n_Me_gusta.svg"} style={{height:"20px"}}  alt="article pic"/><div style={{display:"flex",height:"100%",flexDirection:"column",justifyContent:"center"}}>{(article.likes+liked).toString()}</div></button>
                ):(<><button type="button" onClick={like} style={{display:"flex",justifyContent:"space-between",width:"60px",alignItems:"center",textAlign:"center"}} className="btn btn-danger btn-sm ms-4"> <img src={"https://upload.wikimedia.org/wikipedia/commons/5/54/Bot%C3%B3n_Me_gusta.svg"} style={{height:"20px"}}  alt="article pic"/><div style={{display:"flex",height:"100%",flexDirection:"column",justifyContent:"center"}}>{(article.likes+liked).toString()}</div></button></>)}
            </div>
        </div>
    )
}