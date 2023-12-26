import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { baseUrl } from "../../../constants/url.constants";

function Stadiums() {
    let { updatestadiumID } = useParams();
    const [stadiums, setStadiums] = useState([{ id: 2, name: "Borj Alarab", location: "Alex" }, { id: 3, name: "Petrosport", location: "Cairo" }, { id: 4, name: "Alahly We Alsalam", location: "Cairo" }]);
    useEffect(() => {
        fetch(`${baseUrl}/Stadiums/Get`)
            .then((res) => res.json())
            .then((data) => {
                setStadiums(data);
            }).catch((ex) => console.log(ex));
    }, [])
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div class="col-10"></div>
                    <Link className="btn btn-success col col-lg-2" to="/stadiums/add">Add Stadium</Link>
                </div>
                <div className="row">
                    <h3 className="col col-lg-3">UPDATE STADIUMS</h3>
                </div>
                <div className="row mt-3">
                    <div className="col col-lg-10">
                        <table className="table">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Capacity</th>
                                    <th scope="col">Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stadiums.map((stad, index) => {
                                    return (
                                        <tr>
                                            <td>{stad.name}</td>
                                            <td>{stad.location}</td>
                                            <td>{stad.capacity}</td>
                                            <td><Link class="btn btn-info" to={`/stadiums/update/${stad.id}`}>Update</Link></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        </>
    )
}
export default Stadiums;