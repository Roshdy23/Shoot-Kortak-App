import Articles from "./Articles";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./article.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { baseUrl } from "../../constants/url.constants";
export default function CreateArticle({userssn}){

    const [art,setArt]=useState({title:"",img:"",description:""});
    const navigate = useNavigate();
    const navback = () =>{
        let sart = {title:art.title,img:art.img,description:art.description, journalistssn:userssn}
        fetch(`${baseUrl}/Articles/addArticle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    name:sart.title,
                    journalistssn:sart.journalistssn,
                    articleDate: "string",
                    img:sart.img,
                    title:sart.title,
                    likes:0,
                    description:sart.description,
                }
            )
        })
        navigate("/articles");
    }
    return(<div style={{height:"90vh",overflowY:"scroll"}}>
     <div style={{ width: "70vw", backgroundColor: "white", height: "78vh", position: "fixed",overflowY:"hidden", top: "15vh", left: "15vw", zIndex: "40", borderRadius: "25px", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center" }}>
                    <div className="form-group" style={{ display: "flex", flexDirection: "column", textAlign: "center",overflowY:"scroll" }}>
                        <label for="title">title</label>
                        <input type="text" id="title" onChange={(e)=>{let sart = art; sart.title = e.target.value; setArt(sart);}} />
                        <label for="pic">picture URL </label>
                        <input type="text" id="pic" onChange={(e)=>{let sart = art; sart.img = e.target.value; setArt(sart);}} />
                        <label for="body">body </label>
                        <textarea type="text"  class="custom-range" step="0.1" id="body" onChange={(e)=>{let sart = art; sart.description = e.target.value; setArt(sart);}} />
                        <button type="button" style={{ height: "5vh",margin:"30px",width: "10vw" }} onClick={navback} className="btn btn-danger btn-sm ms-4">Post</button>
                    </div>
                    </div>
     <div onClick={navback} style={{ backgroundColor: "rgb(0,0,0)", width: "100%", height: "100%", top: "0", opacity: "0.7", position: "fixed", zIndex: "30" }}></div>

     {/* <Articles/> */}
    </div>)
}

