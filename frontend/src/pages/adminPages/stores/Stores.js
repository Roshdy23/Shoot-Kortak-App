import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Link, useParams } from "react-router-dom";
import Dropdown from "../../../components/Dropdown";
import { baseUrl } from "../../../constants/url.constants";
import { useState } from "react";
import { useEffect } from "react";

function Stores() {
    const [stores, setStores] = useState([{ stadiumid: 2, name: "Borj Alarab Store", profit: 25000, itmCount: 12 },
    { stadiumid: 3, name: "Alex Stadium Store", profit: 14000, itmCount: 20 },
    { stadiumid: 4, name: "Petrosport Store", profit: 10000, itmCount: 18 }]);
    const [stadiums, setStadiums] = useState([{ id: 2, name: "Borj Alarab", location: "Alex" }, { id: 3, name: "Petrosport", location: "Cairo" }, { id: 4, name: "Alahly We Alsalam", location: "Cairo" }]);

    useEffect(() => {
        fetch(`${baseUrl}/Stadiums/Get`)
            .then((res) => res.json())
            .then((data) => {
                setStadiums(data);
            }).catch((ex) => console.log(ex));
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
                </div>
                <div className="row mt-3">
                    <div className="col col-lg-10">
                        <table className="table">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col">Store Name</th>
                                    <th scope="col">Profit</th>
                                    <th scope="col">Item Count</th>
                                    <th scope="col">View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stores.map((ele, ind) => {
                                    return (
                                        <tr>
                                            <td>{ele.name}</td>
                                            <td>{ele.profit}</td>
                                            <td>{ele.itmCount}</td>
                                            <td><Link class="btn btn-info" to={`/stores/view/${ele.stadiumid}`}>View</Link></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    {/* <div className="dropdown col col-lg-2">
                        <h5>Filter Stores</h5>
                        <Dropdown title="Locations" vals={["chap1", "chap2", "chap3", "chap4", "chap5", "chap6"]} />
                    </div> */}
                </div>
            </div>
        </>
    )
}
export default Stores;