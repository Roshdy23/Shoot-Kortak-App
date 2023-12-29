import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Link, useParams } from "react-router-dom";
import Dropdown from "../../../components/Dropdown";
import { baseUrl } from "../../../constants/url.constants";
import { useState } from "react";
import { useEffect } from "react";

function Stores() {
    const [stores, setStores] = useState([{}]);

    useEffect(() => {
        fetch(`${baseUrl}/Stores/Get`)
            .then((res) => res.json())
            .then((data) => {
                setStores(data);
            }).catch((ex) => ex);
    }, [])
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <h3 className="col col-lg-3">UPDATE STORES</h3>
                    <div className="row">
                        <div class="col-10"></div>
                        <Link className="btn btn-success col col-lg-2" to={`/stores/addsysitems`}>Add System Items</Link>
                    </div>
                    <div className="row mt-2">
                        <div class="col-10"></div>
                        <Link className="btn btn-info col col-lg-2" to={`/stores/updatesysitems`}>Update System Items</Link>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col col-lg-10">
                        <table className="table">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col">Store Name</th>
                                    <th scope="col">Profit</th>
                                    <th scope="col">View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stores.map((ele, ind) => {
                                    return (
                                        <tr>
                                            <td>{ele.Name} Store</td>
                                            <td>{ele.profit}</td>
                                            <td><Link class="btn btn-info" to={`/stores/view/${ele.stadium_id}`}>View</Link></td>
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
export default Stores;