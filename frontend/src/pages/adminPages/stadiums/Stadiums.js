import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Link } from "react-router-dom";
import Dropdown from "../../../components/Dropdown";

function Stadiums() {
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
                                    <th scope="col">Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Alahly We Elsalam</td>
                                    <td>Cairo</td>
                                    <td><Link class="btn btn-info" to="/stadiums/update">Update</Link></td>
                                </tr>
                                <tr>
                                    <td>Cairo stadium</td>
                                    <td>Cairo</td>
                                    <td><Link class="btn btn-info" to="/stadiums/update">Update</Link></td>
                                </tr>
                                <tr>
                                    <td>Borj-Alarab</td>
                                    <td>Alex</td>
                                    <td><Link class="btn btn-info" to="/stadiums/update">Update</Link></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="dropdown col col-lg-2">
                        <h5>Filter Stadiums</h5>
                        <Dropdown title="Locations" vals={["Cairo", "Giza", "Alex", "Aswan"]} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Stadiums;