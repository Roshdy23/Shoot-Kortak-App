import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Link } from "react-router-dom";
import Dropdown from "../../../components/Dropdown";

function Clubs() {
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div class="col-10"></div>
                    <Link className="btn btn-success col col-lg-2" to="/clubs/add">Add Club</Link>
                </div>
                <div className="row">
                    <h3 className="col col-lg-3">UPDATE CLUBS INFO</h3>
                </div>
                <div className="row mt-3">
                    <div className="col col-lg-10">
                        <table className="table">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Created At</th>
                                    <th scope="col">Market Value</th>
                                    <th scope="col">Trophies Count</th>
                                    <th scope="col">Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Alahly</td>
                                    <td>1907</td>
                                    <td>5</td>
                                    <td>90</td>
                                    <td><Link class="btn btn-info" to="/clubs/update">Update</Link></td>
                                </tr>
                                <tr>
                                    <td>Alahly</td>
                                    <td>1907</td>
                                    <td>5</td>
                                    <td>90</td>
                                    <td><Link class="btn btn-info" to="/clubs/update">Update</Link></td>
                                </tr>
                                <tr>
                                    <td>Alahly</td>
                                    <td>1907</td>
                                    <td>5</td>
                                    <td>90</td>
                                    <td><Link class="btn btn-info" to="/clubs/update">Update</Link></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="dropdown col col-lg-2">
                        <h5>Filter Clubs</h5>
                        <Dropdown title="Championships" vals={["chap1", "chap2", "chap3", "chap4", "chap5", "chap6"]} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Clubs;