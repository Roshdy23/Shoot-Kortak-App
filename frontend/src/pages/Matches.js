import "bootstrap/dist/css/bootstrap.css";
import { useParams } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.js";
import { useEffect } from "react";
import './Matches.css'
import { Link } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import { Tooltip } from "bootstrap/dist/js/bootstrap.js";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import MatchPerDay from "../components/Match/MatchPerDay";
import Match from "../components/Match/Match";
import { useNavigate } from "react-router-dom";

function Matches(props) {

    const navigate = useNavigate();
    useEffect(() => {
        //init tooltip
        Array.from(document.querySelectorAll('button[data-bs-toggle="tooltip"]'))
            .forEach(tooltipNode => new Tooltip(tooltipNode))
    });
    const { matchId } = useParams();

    const navback = () => {
        navigate(`/match/${matchId}`);
    }
    let role = "admin";
    if (role === "admin")
        return (
            <>
                <div className="container mt-5">
                    <div className="row">
                        <div class="col-10"></div>
                        <Link className="btn btn-success col col-lg-2" to="/matches/add">Add Match</Link>
                    </div>
                    <div className="row">
                        <h3 className="col col-lg-3">UPDATE MATCHES</h3>
                    </div>
                    <div className="row mt-3">
                        <div className="col col-lg-10">
                            <table className="table">
                                <thead class="table-light">
                                    <tr>
                                        <th scope="col">Team1 VS Team2</th>
                                        <th scope="col">Week Number</th>
                                        <th scope="col">Date and Time</th>
                                        <th scope="col">Championship</th>
                                        <th scope="col">Update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Alahly VS Future</td>
                                        <td>5</td>
                                        <td>2023-12-15 | 8:00 PM</td>
                                        <td>Egy League</td>
                                        <td><Link class="btn btn-info" to="/matches/update">Update</Link></td>
                                    </tr>
                                    <tr>
                                        <td>Zamalek VS Massry</td>
                                        <td>5</td>
                                        <td>2023-12-15 | 4:00 PM</td>
                                        <td>Egy League</td>
                                        <td><Link class="btn btn-info" to="/matches/update">Update</Link></td>
                                    </tr>
                                    <tr>
                                        <td>Enpi VS Zed</td>
                                        <td>7</td>
                                        <td>2023-12-23 | 9:00 PM</td>
                                        <td>Egy League</td>
                                        <td><Link class="btn btn-info" to="/matches/update">Update</Link></td>
                                    </tr>
                                    <tr>
                                        <td>Zamalek VS Massry</td>
                                        <td>5</td>
                                        <td>2023-12-15 | 4:00 PM</td>
                                        <td>Egy League</td>
                                        <td><Link class="btn btn-info" to="/matches/update">Update</Link></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="dropdown col col-lg-2">
                            <h5>Filter Matches</h5>
                            <Dropdown title="Championships" vals={["chap1", "chap2", "chap3", "chap4", "chap5", "chap6"]} />
                        </div>
                    </div>
                </div>
            </>
        );
    else {
        if (props.ticket) {
            return (
                <>
                    <div style={{ width: "70vw", backgroundColor: "white", height: "78vh", position: "fixed", top: "15vh", left: "15vw", zIndex: "40", borderRadius: "25px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <button type="button" style={{ height: "10vh", width: "10vw" }} onClick={navback} className="btn btn-danger btn-sm ms-4">Reserve Tickets</button>
                        Handling the transactions should be handled later for now just press this button
                    </div>
                    <div style={{ backgroundColor: "rgb(0,0,0)", width: "100%", height: "100%", top: "0", opacity: "0.7", position: "fixed", zIndex: "30" }}></div>
                    <div>
                        <div style={{ display: "flex" }}>
                            <div style={{ width: "70vw", borderRight: "solid black", height: "90vh", overflowY: "scroll" }}>
                                {(matchId) ? (
                                    <><Match id={matchId} /></>
                                ) : (<></>)}
                            </div>
                            <div style={{ width: "30vw" }}>
                                <MatchPerDay />
                            </div>
                        </div>
                    </div>
                </>
            );
        }
        else if (window.location.pathname.includes("RatePlayer")) {

        }
        else {
            return (
                <div style={{ display: "flex" }}>
                    <div style={{ width: "70vw", borderRight: "solid rgb(0,0,0,0.1) 1px", height: "90vh", overflowY: "scroll" }}>
                        {(matchId) ? (
                            <><Match id={matchId} /></>
                        ) : (<></>)}
                    </div>
                    <div style={{ width: "30vw" }}>
                        <MatchPerDay />
                    </div>
                </div>
            );
        }
    }
}
export default Matches;