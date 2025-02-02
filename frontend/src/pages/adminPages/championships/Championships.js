import { Link, useParams } from "react-router-dom";
import Dropdown from "../../../components/Dropdown";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../constants/url.constants";

function Championships() {
    const [championships, setChampionships] = useState([{ id: 2, name: "tmptmp", noClubs: "18", noMatches: "643", startingAt: "2023-05-23", endDate: "2023-11-07" },
    { id: 6, name: "EGY tmptmp", noClubs: "18", noMatches: "643", startingAt: "2023-05-23", endDate: "2023-11-07" },
    { id: 5, name: "tmptmp Cup", noClubs: "18", noMatches: "643", startingAt: "2023-05-23", endDate: "2023-11-07" }]);
    useEffect(() => {
        fetch(`${baseUrl}/Championships/GetCurrent`)
            .then((res) => res.json())
            .then((data) => setChampionships(data))
            .catch((ex) => console.log(ex))
    }, [])
    const HandelFinished = (f) => {
        if (f) {
            fetch(`${baseUrl}/Championships/GetCurrent`)
                .then((res) => res.json())
                .then((data) => setChampionships(data))
                .catch((ex) => console.log(ex))
        }
        else {
            fetch(`${baseUrl}/Championships/GetFinished`)
                .then((res) => res.json())
                .then((data) => setChampionships(data))
                .catch((ex) => console.log(ex))
        }
    }
    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div class="col col-lg-10"></div>
                    <Link className="btn btn-success col col-lg-2" to="/championships/add">Add Championship</Link>
                </div>
                <h3 className="row mt-4">Championships</h3>
                <div className="row mt-2">
                    <button class="btn btn-secondary col col-lg-2 " onClick={() => {
                        HandelFinished(1);
                    }}>Current</button>
                    <button class="btn btn-secondary col col-lg-2 ms-3" onClick={() => {
                        HandelFinished(0);
                    }}>Finished</button>
                </div>
                <div className="row mt-3">
                    <div className="col col-lg-10">
                        <table className="table">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Number of Matches</th>
                                    <th scope="col">Start Date</th>
                                    <th scope="col">End Date</th>
                                    <th scope="col">Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {championships.map((champ, ind) => {
                                    return (
                                        <tr>
                                            <td>{champ.name}</td>
                                            <td>{champ.noMatches}</td>
                                            <td>{champ.startingAt}</td>
                                            <td>{champ.endingAt}</td>
                                            <td><Link class="btn btn-info" to={`/championships/update/${champ.id}`}>Update</Link></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Championships;