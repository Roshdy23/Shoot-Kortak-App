import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Dropdown from "../../../components/Dropdown";
import { useEffect } from "react";
import { baseUrl } from "../../../constants/url.constants";
import { useState } from "react";

function ViewStore() {
    let { storeID } = useParams();
    const [items, setItems] = useState([{}]);
    const [store, setStore] = useState([{}]);
    useEffect(() => {
        fetch(`${baseUrl}/StoreItems/AllItemsinStore/${storeID}`)
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
            }).catch((ex) => ex);
        fetch(`${baseUrl}/Stores/Get/${storeID}`)
            .then((res) => res.json())
            .then((data) => setStore(data))
            .catch((ex) => console.log(ex));
    }, [])
    return (
        <>
            <div className="container mt-5">
                <h3>Store Name: {store[0]?.Name} Store</h3>
                <div className="row">
                    <div class="col-10"></div>
                    <Link className="btn btn-success col col-lg-2" to={`/stores/view/${storeID}/additem`}>Add Store Items</Link>
                </div>
                <div className="row">
                    <h4 className="col col-lg-3">UPDATE ITEMS</h4>
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
                                            <td>{ele.ItemName}</td>
                                            <td>{ele.Quantity}</td>
                                            <td>{ele.ItemPrice}</td>
                                            <td>{ele.ItemImage?.substring(0, 50)}</td>
                                            <td><Link class="btn btn-info" to={`/stores/view/${storeID}/update/${ele.Id}`}>Update</Link></td>
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