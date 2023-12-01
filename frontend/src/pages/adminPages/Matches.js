import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import './Matches.css'

function Matches() {
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div class="col-10"></div>
                    <button type="button" className="btn btn-success col col-lg-2">Add Match</button>
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
                                    <th scope="col">Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Alahly VS Future</td>
                                    <td>5</td>
                                    <td>2023-12-15 | 8:00 PM</td>
                                    <td><button type="button" class="btn btn-info">Update</button></td>
                                </tr>
                                <tr>
                                    <td>Zamalek VS Massry</td>
                                    <td>5</td>
                                    <td>2023-12-15 | 4:00 PM</td>
                                    <td><button type="button" class="btn btn-info">Update</button></td>
                                </tr>
                                <tr>
                                    <td>Enpi VS Zed</td>
                                    <td>7</td>
                                    <td>2023-12-23 | 9:00 PM</td>
                                    <td><button type="button" class="btn btn-info">Update</button></td>
                                </tr>
                                <tr>
                                    <td>Zamalek VS Massry</td>
                                    <td>5</td>
                                    <td>2023-12-15 | 4:00 PM</td>
                                    <td><button type="button" class="btn btn-info">Update</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="dropdown col col-lg-2">
                        <h5>Filter Matches</h5>
                        <button className="btn btn-secondary dropdown-toggle mt-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Championships
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="/#">championship1</a></li>
                            <li><a className="dropdown-item" href="/#">championship2</a></li>
                            <li><a className="dropdown-item" href="/#">championship3</a></li>
                            <li><a className="dropdown-item" href="/#">championship4</a></li>
                            <li><a className="dropdown-item" href="/#">championship5</a></li>
                            <li><a className="dropdown-item" href="/#">championship6</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Matches;