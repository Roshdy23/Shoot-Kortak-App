import { Link, useParams } from "react-router-dom";
import Dropdown from "../../../components/Dropdown";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../constants/url.constants";

function Championships() {
    const [championships, setChampionships] = useState([{ id: 2, name: "Nile Cup", noClubs: "18", noMatches: "643", startDate: "2023-05-23", endDate: "2023-11-07" },
    { id: 3, name: "EGY League", noClubs: "18", noMatches: "643", startDate: "2023-05-23", endDate: "2023-11-07" },
    { id: 4, name: "National Cup", noClubs: "18", noMatches: "643", startDate: "2023-05-23", endDate: "2023-11-07" }]);
    useEffect(() => {
        fetch(`${baseUrl}/Championships/Get`)
            .then((res) => res.json())
            .then((data) => setChampionships(data))
            .catch((ex) => console.log(ex))
    }, [])
    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div class="col col-lg-10"></div>
                    <Link className="btn btn-success col col-lg-2" to="/championships/add">Add Championship</Link>
                </div>
                <h3 className="row mt-4">Championships</h3>
                <div className="row mt-3">
                    <div className="col col-lg-10">
                        <table className="table">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Number of Clubs</th>
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
                                            <td>{champ.noClubs}</td>
                                            <td>{champ.noMatches}</td>
                                            <td>{champ.startDate}</td>
                                            <td>{champ.endDate}</td>
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