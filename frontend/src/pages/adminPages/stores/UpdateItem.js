import { useParams } from "react-router-dom";
import { useState } from "react";
import InputWithLabel from "../../../components/InputWithLabel";
import { useNavigate } from "react-router-dom";
function UpdateItem() {
    let { storeID } = useParams();
    let history = useNavigate();
    const navback = () => {
        history(`/stores/view/${storeID}`);
    }
    return (
        <>
            <div className="container">
                <div className='row mt-4'>
                    <h3>Update Item: </h3>
                </div>
                <InputWithLabel label="Name" placeholder="shows prev item name" />
                <InputWithLabel label="Quantity" placeholder="shows prev item quantity" />
                <InputWithLabel label="Price" placeholder="shows prev item price" />
                <InputWithLabel label="Discount" placeholder="shows prev item discout" />
                <button class="btn btn-info col col-lg-1 mt-4" >Update</button>
                <button class="btn btn-danger col col-lg-1 mt-4 ms-5" onClick={navback}>Cancel</button>
            </div>
        </>
    )
}
export default UpdateItem;