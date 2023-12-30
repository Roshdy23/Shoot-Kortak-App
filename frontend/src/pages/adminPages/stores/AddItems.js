import DateTimePicker from 'react-datetime-picker';
import { useState, useEffect, useRef } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import InputWithLabel from '../../../components/InputWithLabel';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { useParams } from "react-router-dom";
import { baseUrl } from '../../../constants/url.constants';

function AddItems() {
    let { storeID } = useParams();
    const [check, setCheck] = useState(-1);
    const [sysItems, setSysItems] = useState([{}]);
    const [choosenItm, setChoosenItem] = useState({});
    const [qty, setQuantity] = useState("");
    const [store, setStore] = useState([{}]);

    useEffect(() => {
        fetch(`${baseUrl}/Stores/Get/${storeID}`)
            .then((res) => res.json())
            .then((data) => setStore(data))
            .catch((ex) => console.log(ex));
        fetch(`${baseUrl}/StoreItems/GetItemsNotInStore/${storeID}`)
            .then((res) => res.json())
            .then((data) => setSysItems(data))
            .catch((ex) => console.log(ex))
    }, [])
    const Handelquantity = (event) => {
        setQuantity(event.target.value);
    }
    const HandelAdd = () => {
        if (qty == "" || !choosenItm.id || (qty != "" && isNaN(qty))) setCheck(0);
        else {
            fetch(`${baseUrl}/Stores/AddItem/${storeID}/${choosenItm.id}/${qty}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({})
            })
                .then((res) => res)
                .catch((ex) => console.log(ex))
            setCheck(1);
        }
        setTimeout(() => {
            // set a timer to hide the element after 3 seconds
            setCheck(-1);
            setChoosenItem({});
        }, 1000);
    }
    return (
        <>
            <div className="container">
                <div className='row mt-4'>
                    <h3>Add New Item To {store[0]?.Name}</h3>
                </div>
                <div className='row'>
                    <div className="dropdown col col-lg-1 mt-2 mb-5">
                        <button className="btn btn-secondary dropdown-toggle mt-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            All Items
                        </button>
                        <ul className="dropdown-menu">
                            {sysItems.map((value, index) => (
                                <li><button key={index + 1} className="dropdown-item" onClick={() => {
                                    setChoosenItem(value);
                                }}>{value.name}</button></li>
                            ))}
                        </ul>
                    </div>
                    <div className="col mt-3 ms-5" style={{ maxWidth: "38%", marginLeft: "1px", color: "green" }}>
                        <input className="form-control" type="text" value={choosenItm.name} aria-label="readonly input example" readonly />
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Item Quantity</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control clr" id="colFormLabel" placeholder="insert item quantity" onChange={Handelquantity} />
                            </div>
                        </div>
                    </div>
                </div>
                <button class="btn btn-success col col-lg-1 mt-4" onClick={HandelAdd}>Add</button>
            </div>
            <div className='container mt-3'>
                {check == 0 ? <h6 style={{ color: "red" }}>Please Insert All The Data Properly</h6> : check == 1 ? <h6 style={{ color: "green" }}>Added Successfully</h6> : <p></p>}
            </div>
        </>
    )
}
export default AddItems;