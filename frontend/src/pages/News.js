import { useParams } from "react-router-dom";
import ArticlePerDay from "../components/News/ArticlePerDay";
import Article from "../components/News/Article";

export default function News()
{
    const artId = useParams();

    return (
<div style={{display:"flex"}}>
                <div style={{width:"70vw", borderRight:"solid rgb(0,0,0,0.1) 1px",height:"90vh",overflowY:"scroll"}}>
                    {(window.location.pathname.includes("article"))?(<>
                        <Article id={artId}/>
                    </>):(<></>)}
                </div>
                <div style={{width:"30vw"}}>
                    <ArticlePerDay/>
                </div>
            </div>)
}