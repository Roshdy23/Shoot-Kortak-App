import Articles from "./Articles";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./article.css"
import { useNavigate } from "react-router-dom";
export default function CreateArticle(){

    const navigate = useNavigate();
    const navback = () =>{
        navigate("/articles");
    }
    return(<div style={{height:"90vh",overflowY:"scroll"}}>
     <div style={{ width: "70vw", backgroundColor: "white", height: "78vh", position: "fixed",overflowY:"hidden", top: "15vh", left: "15vw", zIndex: "40", borderRadius: "25px", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center" }}>
                    <div className="form-group" style={{ display: "flex", flexDirection: "column", textAlign: "center",overflowY:"scroll" }}>
                        <label for="title">title </label>
                        <input type="text" id="title" />
                        <label for="pic">picture URL </label>
                        <input type="text" id="pic" />
                        <label for="body">body </label>
                        <textarea type="text"  class="custom-range" step="0.1" id="body" />
                        <button type="button" style={{ height: "5vh",margin:"30px",width: "10vw" }} onClick={navback} className="btn btn-danger btn-sm ms-4">Post</button>
                    </div>
                    </div>
     <div onClick={navback} style={{ backgroundColor: "rgb(0,0,0)", width: "100%", height: "100%", top: "0", opacity: "0.7", position: "fixed", zIndex: "30" }}></div>

     <Articles/>
    </div>)
}