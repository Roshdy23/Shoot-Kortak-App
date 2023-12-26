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
    const [storeName, setStoreName] = useState("Borj Alarab");
    const [sysItems, setSysItems] = useState([{ id: 1, price: 100, name: "T-shirt11", imag: "https://image.info.url" },
    { id: 1, price: 100, name: "T-shirt22", imag: "https://image.info.url" },
    { id: 1, price: 100, name: "T-shirt33", imag: "https://image.info.url" },
    { id: 1, price: 100, name: "T-shirt44", imag: "https://image.info.url" }]);
    const [choosenItm, setChoosenItem] = useState({ id: -11, price: -1, name: "ALL ITEMS", imag: "/#" });
    const [qty, setQuantity] = useState("");
    useEffect(() => {
        fetch(`${baseUrl}/Stores/AddItem/${storeID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: choosenItm.id,
                quantity: qty,
            })
        }).then((res) => res)
            .catch((ex) => ex);
        fetch(`${baseUrl}/Stores/GetSysItems`)
            .then((res) => res.json())
            .then((data) => setSysItems(data))
            .catch((ex) => ex)
        fetch(`${baseUrl}/Stadiums/GetStadium/${storeID}`)
            .then((res) => res.json())
            .then((data) => setStoreName(data[0].name))
            .catch((ex) => ex)
    }, [])
    const Handelquantity = (event) => {
        setQuantity(event.target.value);
    }
    const HandelAdd = () => {
        if (qty == "" || choosenItm.name == "ALL ITEMS") setCheck(0);
        else {
            fetch(`${baseUrl}/Stores/Items/${storeID}/Add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    stadiumid: storeID,
                    itemid: choosenItm.id,
                    qty: qty,

                })
            })
                .then((res) => res)
                .catch((ex) => ex)
            setCheck(1);
        }
        setTimeout(() => {
            // set a timer to hide the element after 3 seconds
            setCheck(-1);
            setChoosenItem({ id: -11, price: -1, name: "ALL ITEMS", imag: "/#" });
        }, 1000);
    }
    return (
        <>
            <div className="container">
                <div className='row mt-4'>
                    <h3>Add New Item To {storeName}</h3>
                </div>
                <div className="dropdown col col-lg-1 mt-2">
                    <button className="btn btn-secondary dropdown-toggle mt-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {choosenItm.name}
                    </button>
                    <ul className="dropdown-menu">
                        {sysItems.map((value, index) => (
                            <li><button key={index + 1} className="dropdown-item" onClick={() => {
                                setChoosenItem(value);
                            }}>{value.name}</button></li>
                        ))}
                    </ul>
                </div>
                <div className='row mt-3'>
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