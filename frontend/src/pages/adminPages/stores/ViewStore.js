import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Dropdown from "../../../components/Dropdown";
import { useEffect } from "react";
import { baseUrl } from "../../../constants/url.constants";
import { useState } from "react";

function ViewStore() {
    let { storeID } = useParams();
    const [items, setItems] = useState([{ id: 1, name: "T-shirt", quantity: 2000, price: 300, image: "https://image.item.url" },
    { id: 2, name: "Flag", quantity: 100, price: 100, image: "https://image.item.url" },
    { id: 3, name: "FireWorks", quantity: 100, price: 400, image: "https://image.item.url" },
    { id: 4, name: "Laser", quantity: 1000, price: 100, image: "https://image.item.url" }]);
    const [storeName, setStoreName] = useState("Borj Alarab");
    useEffect(() => {
        fetch(`${baseUrl}/Stores/Items/${storeID}`)
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
            }).catch((ex) => ex);
        fetch(`${baseUrl}/Stadiums/GetStadium/${storeID}`)
            .then((res) => res.json())
            .then((data) => setStoreName(data[0].name)).catch((ex) => ex);
    }, [])
    return (
        <>
            <div className="container mt-5">
                <h1>Store Name: {storeName}</h1>
                <div className="row">
                    <div class="col-10"></div>
                    <Link className="btn btn-success col col-lg-2" to={`/stores/view/${storeID}/additem`}>Add Items</Link>
                </div>
                <div className="row">
                    <h3 className="col col-lg-3">UPDATE ITEMS</h3>
                </div>
                <div className="row mt-3">
                    <div className="col col-lg-10">
                        <table className="table">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col">Item Name</th>
                                    <th scope="col">Item Quantity</th>
                                    <th scope="col">Item Price</th>
                                    <th scope="col">Item Image</th>
                                    <th scope="col">Item Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((ele, ind) => {
                                    return (
                                        <tr>
                                            <td>{ele.name}</td>
                                            <td>{ele.quantity}</td>
                                            <td>{ele.price}</td>
                                            <td>{ele.image}</td>
                                            <td><Link class="btn btn-info" to={`/stores/view/${storeID}/update/${ele.id}`}>Update</Link></td>
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
export default ViewStore;