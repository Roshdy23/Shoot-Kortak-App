import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Link, useParams } from "react-router-dom";
import Dropdown from "../../../components/Dropdown";
import { useState, useEffect } from "react";
import { baseUrl } from "../../../constants/url.constants"


function Clubs() {
    const [clubs, setClubs] = useState([{}]);

    const [championships, setChampionships] = useState([{}]);

    const [champ, setChamp] = useState({ id: -1, name: "CHAMPIONSHIPS" })

    useEffect(() => {
        fetch(`${baseUrl}/Clubs/Allclubs`)
            .then((res) => res.json())
            .then((data) => {
                setClubs(data);
            }).catch((ex) => console.log(ex));
        fetch(`${baseUrl}/Championships/Get`)
            .then((res) => res.json())
            .then((data) => {
                setChampionships(data);
            }).catch((ex) => console.log(ex));
    }, []);
    const filterHandler = (ID) => {
        if (!ID) {
            fetch(`${baseUrl}/Clubs/Allclubs`)
                .then((res) => res.json())
                .then((data) => {
                    setClubs(data);
                }).catch((ex) => console.log(ex));
        }
        else {
            fetch(`${baseUrl}/Clubs/GetInChamp/${ID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((res) => res.json()).then((data) => {
                setClubs(data)
            }).catch((ex) => console.log(ex));
        }
    };
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div class="col-10"></div>
                    <Link className="btn btn-success col col-lg-2" to="/clubs/add">Add Club</Link>
                </div>
                <div className="row">
                    <h3 className="col col-lg-4">UPDATE CLUBS INFO</h3>
                </div>
                <div className="row mt-3">
                    <div className="col col-lg-10">
                        <table className="table">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Created At</th>
                                    <th scope="col">Home Stadium</th>
                                    <th scope="col">Market Value</th>
                                    <th scope="col">Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clubs.map((club, index) => {
                                    return (
                                        <tr key={index + 1}>
                                            <td>{club.name}</td>
                                            <td>{club.createdAt}</td>
                                            <td>{club.stadiumHome}</td>
                                            <td>{club.marketValue}</td>
                                            <td><Link class="btn btn-info" to={`/clubs/update/${club.id}`}>Update</Link></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="dropdown col col-lg-2">
                        <h5>Filter Clubs</h5>
                        <div className="dropdown col col-lg-1 mt-2">
                            <button className="btn btn-secondary dropdown-toggle mt-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {champ.name}
                            </button>
                            <ul className="dropdown-menu">
                                <li><button key={0} className="dropdown-item" onClick={() => {
                                    filterHandler(0)
                                    setChamp({ id: -1, name: "CHAMPIONSHIPS" });
                                }}>ALL</button></li>
                                {championships.map((champ, index) => (
                                    <li><button key={index + 1} className="dropdown-item" onClick={() => {
                                        filterHandler(champ.id);
                                        setChamp(champ);
                                    }}>{champ.name}</button></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Clubs;