import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Link, useParams } from "react-router-dom";
import Dropdown from "../../../components/Dropdown";

function Stores() {
    let storeID = useParams();
    storeID = 2;
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <h3 className="col col-lg-3">UPDATE STORES</h3>
                </div>
                <div className="row mt-3">
                    <div className="col col-lg-10">
                        <table className="table">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col">Store Name</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">View</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Alahly We Elsalam Store</td>
                                    <th scope="col">Location1</th>
                                    <td><Link class="btn btn-info" to={`/stores/view/${storeID}`}>View</Link></td>
                                </tr>
                                <tr>
                                    <td>Cairo Stadium Store</td>
                                    <th scope="col">Location2</th>
                                    <td><Link class="btn btn-info" to={`/stores/view/${storeID}`}>View</Link></td>
                                </tr>
                                <tr>
                                    <td>Borj-alarab Stadium Store</td>
                                    <th scope="col">Location3</th>
                                    <td><Link class="btn btn-info" to={`/stores/view/${storeID}`}>View</Link></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="dropdown col col-lg-2">
                        <h5>Filter Stores</h5>
                        <Dropdown title="Locations" vals={["chap1", "chap2", "chap3", "chap4", "chap5", "chap6"]} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Stores;