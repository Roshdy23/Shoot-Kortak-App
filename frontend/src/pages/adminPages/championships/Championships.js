import { Link, useParams } from "react-router-dom";
import Dropdown from "../../../components/Dropdown";

function Championships() {
    let championshiID = useParams();
    championshiID = 9;
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
                                <tr>
                                    <td>Egy League</td>
                                    <td>16</td>
                                    <td>64</td>
                                    <td>2022-03-12</td>
                                    <td>2022-10-03</td>
                                    <td><Link class="btn btn-info" to={`/championships/update/${championshiID}`}>Update</Link></td>
                                </tr>
                                <tr>
                                    <td>Egy League</td>
                                    <td>16</td>
                                    <td>64</td>
                                    <td>2022-03-12</td>
                                    <td>2022-10-03</td>
                                    <td><Link class="btn btn-info" to={`/championships/update/${championshiID}`}>Update</Link></td>
                                </tr>
                                <tr>
                                    <td>Egy League</td>
                                    <td>16</td>
                                    <td>64</td>
                                    <td>2022-03-12</td>
                                    <td>2022-10-03</td>
                                    <td><Link class="btn btn-info" to={`/championships/update/${championshiID}`}>Update</Link></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="dropdown col col-lg-2">
                        <h5>Filter Matches</h5>
                        <Dropdown title="Championships" vals={["All", "Finished", "Current", "Not Started"]} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Championships;