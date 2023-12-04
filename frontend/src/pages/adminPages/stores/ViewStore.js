import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Dropdown from "../../../components/Dropdown";

function ViewStore() {
    let { viewstorename } = useParams();
    let storeID = useParams();
    let itemid = useParams();
    itemid = 4;
    storeID = 2;
    viewstorename = "Alahly We Elsalam Store"
    return (
        <>
            <div className="container mt-5">
                <h1>Store Name: {viewstorename}</h1>
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
                                    <th scope="col">Item Discount</th>
                                    <th scope="col">Item Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="col">T-shirt</th>
                                    <th scope="col">8000</th>
                                    <th scope="col">400</th>
                                    <th scope="col">0%</th>
                                    <td><Link class="btn btn-info" to={`/stores/view/${storeID}/update/${itemid}`}>Update</Link></td>
                                </tr>
                                <tr>
                                    <th scope="col">Flags</th>
                                    <th scope="col">4000</th>
                                    <th scope="col">100</th>
                                    <th scope="col">5%</th>
                                    <td><Link class="btn btn-info" to={`/stores/view/${storeID}/update/${itemid}`}>Update</Link></td>
                                </tr>
                                <tr>
                                    <th scope="col">Fireworks</th>
                                    <th scope="col">1000</th>
                                    <th scope="col">120</th>
                                    <th scope="col">10%</th>
                                    <td><Link class="btn btn-info" to={`/stores/view/${storeID}/update/${itemid}`}>Update</Link></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="dropdown col col-lg-2">
                        <h5>Filter Items</h5>
                        <Dropdown title="Price" vals={["Low to High", "High to Low"]} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default ViewStore;