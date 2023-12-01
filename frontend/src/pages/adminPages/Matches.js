import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import './Matches.css'
import { Link } from "react-router-dom";
import Dropdown from "../../components/Dropdown";

function Matches() {
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
    )
}
export default Matches;