import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import InputWithLabel from "../../../components/InputWithLabel";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../constants/url.constants";
function UpdateItem() {
    const [check, setCheck] = useState(-1);
    let { storeID } = useParams();
    let { itemID } = useParams();
    let history = useNavigate();
    const [pr, setPr] = useState("");
    const [nme, setNme] = useState("");
    const [qtty, setQtty] = useState("");
    const [mge, setMge] = useState("");
    const navback = () => {
        history(`/stores/view/${storeID}`);
    }
    const [item, setItem] = useState({ itemid: 1, price: 100, quantity: 2000, name: "ITEM NAME PLACEHOLDER", imag: "https://image.info.url" });
    useEffect(() => {
        fetch(`${baseUrl}/Stores/GetItem/${storeID}/${itemID}`)
            .then((res) => res.json())
            .then((data) => setItem(data))
            .catch((ex) => ex)
    }, [])
    const Handelname = (e) => {
        setNme(e.target.value);
    }
    const Handelqty = (e) => {
        setQtty(e.target.value);
    }
    const Handelprice = (e) => {
        setPr(e.target.value);
    }
    const Handelimage = (e) => {
        setMge(e.target.value);
    }
    const HandelUpdate = () => {
        if (pr != "" || nme != "" || qtty != "" || mge != "") {
            let p = pr == "" ? item.price : pr;
            let n = nme == "" ? item.name : nme;
            let q = qtty == "" ? item.quantity : qtty;
            let m = mge == "" ? item.imag : mge;
            fetch(`${baseUrl}/Stores/Update/${storeID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    id: itemID,
                    price: p,
                    quantity: q,
                    name: n,
                    image: m,
                }
            }).then((res) => res)
                .catch((ex) => ex);
            setCheck(1);
        }
        else {
            setCheck(0);
        }
        setTimeout(() => {
            // set a timer to hide the element after 3 seconds
            setCheck(-1);
        }, 2000);
    }
    return (
        <>
            <div className="container">
                <div className='row mt-4'>
                    <h3>Update Item: </h3>
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Item Name: ${item.name}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Item Quantity: ${item.quantity}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Item Price: ${item.price}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Item Image URL: ${item.imag}`} aria-label="readonly input example" readonly />
                </div>
                <div className='row mt-3'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Update Name</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert new item name" onChange={Handelname} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Update Quantity</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert new stadium name" onChange={Handelqty} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Update Price</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert new stadium name" onChange={Handelprice} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Update Image URL</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert new stadium name" onChange={Handelimage} />
                            </div>
                        </div>
                    </div>
                </div>
                <button class="btn btn-info col col-lg-1 mt-4" onClick={HandelUpdate}>Update</button>
                <button class="btn btn-danger col col-lg-1 mt-4 ms-5" onClick={navback}>Cancel</button>
            </div>
            <div className='container mt-3'>
                {check == 0 ? <h6 style={{ color: "red" }}>Please Insert All The Data Properly</h6> : check == 1 ? <h6 style={{ color: "green" }}>Item has been Updated Successfully</h6> : <p></p>}
            </div>
        </>
    )
}
export default UpdateItem;