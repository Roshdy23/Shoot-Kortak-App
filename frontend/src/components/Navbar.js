import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../constants/url.constants";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
function Navbar({rfshr,user,setUser}) {
    const navigate = useNavigate();
    const [status,setStatus] = useState("loggedout");
    
    useEffect(()=>{
            let enc = Cookies.get("jwt")
            if(enc)
            {
                const dec = jwtDecode(enc);
                console.log(dec.id);
                setStatus("loggedin");
                fetch(`${baseUrl}/User/Get/${dec.id}`).then(res=>res.json()).then(data=>{setUser(data[0]);;
                }).catch(ex=>console.log(ex));
            }
    }
            ,[rfshr]);
        useEffect(()=>{
            console.log(user.role);
            if(Cookies.get("jwt"))
            {
                setStatus("loggedin");
            }
            else
            setStatus("loggedout");
        },[user])
            let role = "Fan";
    if (user?.role==='Admin')
        return (
            <nav className="navbar navbar-expand-lg bg-black">
                <div className="container-fluid">
                    <a className="navbar-brand ms-5 text-light" href="/#"><h4 className="fst-italic">SHOOT KORTAK</h4></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <Link className="nav-link text-light" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/matches">Matches</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/stadiums">Stadiums</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/stores">Stores</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/clubs">Clubs</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/results">Results</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/quizzes">Quizzes</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/championships">Championships</Link>
                            </li>
                        </ul>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                            <label className="form-check-label text-light" for="flexSwitchCheckDefault">Dark Mode</label>
                        </div>
                        <button type="button" onClick={()=>{
                                    Cookies.remove("jwt");
                                    setStatus("loggedout");
                                    setUser({});
                                    navigate("/login/");
                                }} className="btn btn-danger btn-sm ms-4">Log out</button>
                    </div>
                </div>
            </nav>
        )
    else if ((!(user?.role))||user.role==="Fan") {
        
        return (
            <nav style={{ color: "white", position: "sticky", height: "10vh", top: "0", zIndex: "5" }} className="navbar navbar-expand-lg bg-black">
                <div className="container-fluid">
                    <a className="navbar-brand ms-5 text-light" href="/#"><h4 className="fst-italic">SHOOT KORTAK</h4></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" style={{ backgroundColor: "black", width: "100%" }} id="navbarNav">
                        <ul className="navbar-nav mx-auto" >
                            <li className="nav-item">
                                <Link className="nav-link text-light" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/Matches">Matches</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/news">News</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/stats">Stats</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/quiz">Earn Points!</Link>
                            </li>
                        </ul>
                        {(status === "loggedin") ?
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "40%" }}>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label text-light" htmlFor="flexSwitchCheckDefault">Dark Mode</label>
                                </div>
                                <div>
                                    <p className="h5">Hello, {user.userName}</p>
                                    <p className="h6">You have {user.points} pts!</p>
                                </div>
                                <div type="button" onClick={()=>{
                                    Cookies.remove("jwt");
                                    setStatus("loggedout");
                                    setUser({});
                                    navigate("/login/");
                                }} style={{ color: "white" }} className="btn btn-danger btn-sm ms-4">Log out</div>
                            </div>
                            :
                            <>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label text-light" for="flexSwitchCheckDefault">Dark Mode</label>
                                </div>
                                <button type="button" onClick={()=>{
                                    navigate("/login/");
                                }} className="btn btn-outline-light btn-sm ms-4">Log in</button>
                                <button type="button" onClick={()=>{navigate("/register/");}} className="btn btn-light btn-sm ms-4">Sign up</button>
                            </>
                        }

                    </div>
                </div>
            </nav>
        )
    }
    else {
        return (
            <nav style={{ color: "white", position: "sticky", height: "10vh", top: "0", zIndex: "5" }} className="navbar navbar-expand-lg bg-black">
                <div className="container-fluid">
                    <a className="navbar-brand ms-5 text-light" href="/#"><h4 className="fst-italic">SHOOT KORTAK</h4></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" style={{ backgroundColor: "black", width: "100%" }} id="navbarNav">
                        <ul className="navbar-nav mx-auto" >
                            <li className="nav-item">
                                <Link className="nav-link text-light" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/articles">Articles</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/PendingQuizzes">Quizzes</Link>
                            </li>
                        </ul>
                        {(status === "loggedin") ?
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "40%" }}>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label text-light" htmlFor="flexSwitchCheckDefault">Dark Mode</label>
                                </div>
                                <div>
                                    <p className="h5">Hello, {user.userName}</p>
                                </div>
                                <button type="button" onClick={()=>{
                                    Cookies.remove("jwt");
                                    setStatus("loggedout");
                                    setUser({});
                                    navigate("/login/");
                                }} style={{ color: "white" }} className="btn btn-danger btn-sm ms-4">Log out</button>
                            </div>
                            :
                            <>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label text-light" for="flexSwitchCheckDefault">Dark Mode</label>
                                </div>
                                <button type="button" className="btn btn-outline-light btn-sm ms-4">Log in</button>
                                <button type="button" className="btn btn-light btn-sm ms-4">Sign up</button>
                            </>
                        }

                    </div>
                </div>
            </nav>);
    }
}
export default Navbar;