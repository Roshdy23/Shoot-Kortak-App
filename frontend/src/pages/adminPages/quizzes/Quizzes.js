import { Link } from "react-router-dom";
import Dropdown from "../../../components/Dropdown";
function Quizzes() {
    return (
        <>
            <div className="container">
                <h3 className="row mt-4">Quizzes</h3>
                <div className="row mt-3">
                    <div className="col col-lg-10">
                        <table className="table">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col">Journalist</th>
                                    <th scope="col">Quiz Name</th>
                                    <th scope="col">Max Points</th>
                                    <th scope="col">Number of Questions</th>
                                    <th scope="col">View</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Reda abd-elal</td>
                                    <td >yalhwyy yalhwyy</td>
                                    <td >10</td>
                                    <td >5</td>
                                    <td><Link class="btn btn-info" to="/quizzes/view">View</Link></td>
                                </tr>
                                <tr>
                                    <td>Shobeir</td>
                                    <td>Enta Btdhk 3la eh ya shobeir</td>
                                    <td>12</td>
                                    <td>6</td>
                                    <td><Link class="btn btn-info" to="/quizzes/view">View</Link></td>
                                </tr>
                                <tr>
                                    <td>Tamer we Ezz</td>
                                    <td>Mlook Eltahlel</td>
                                    <td>15</td>
                                    <td>7</td>
                                    <td><Link class="btn btn-info" to="/quizzes/view">View</Link></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="dropdown col col-lg-2">
                        <h5>Filter Quizzes</h5>
                        <Dropdown title="Journalits" vals={["jou1", "jou2", "jou3", "jou4", "jou5", "jou6"]} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Quizzes;
