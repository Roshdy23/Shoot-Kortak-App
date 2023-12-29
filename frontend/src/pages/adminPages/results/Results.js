import DropdownLabel from "../../../components/DropdownWithLabel";
import Dropdown from "../../../components/Dropdown"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { baseUrl } from "../../../constants/url.constants";
function Results() {
    const [championships, setChampionships] = useState([]);
    const [matches, setMatches] = useState([]);
    useEffect(() => {
        fetch(`${baseUrl}/Matches/GetFinishedMatches`)
            .then((res) => res.json())
            .then((data) => {
                setMatches(data);
            }).catch((ex) => console.log(ex));
        fetch(`${baseUrl}/Championships/GetCurrent`)
            .then((res) => res.json())
            .then((data) => {
                setChampionships(data);
            }).catch((ex) => console.log(ex));
    }, [])
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <h3 className="col col-lg-4">ADD MATCHES RESULTS</h3>
                </div>
                <div className="row mt-3">
                    <div className="col col-lg-10">
                        <table className="table">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col">Team1 VS Team2</th>
                                    <th scope="col">Result</th>
                                    <th scope="col">Date and Time</th>
                                    <th scope="col">Championship</th>
                                    <th scope="col">Stadium</th>
                                    <th scope="col">Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {matches.map((mtch, index) => {
                                    return (
                                        <tr key={index + 1}>
                                            <td>{mtch.club1} VS {mtch.club2}</td>
                                            <td>{mtch.result}</td>
                                            <td>{mtch.matchDate}</td>
                                            <td>{mtch.championshipid}</td>
                                            <td>{mtch.stadiumId}</td>
                                            <td><Link class="btn btn-success" to={`/results/addresults/${mtch.id}`}>Add Result</Link></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div >
                    <div className="dropdown col col-lg-2">
                        <h5>Filter Matches</h5>
                        <div className="dropdown col col-lg-1 mt-2">
                            <button className="btn btn-secondary dropdown-toggle mt-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Championships
                            </button>
                            <ul className="dropdown-menu">
                                <li><button key={0} className="dropdown-item" onClick={() => {
                                }}>ALL</button></li>
                                {championships.map((champ, index) => (
                                    <li><button key={index + 1} className="dropdown-item" onClick={() => {

                                    }}>{champ.name}</button></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}
export default Results;