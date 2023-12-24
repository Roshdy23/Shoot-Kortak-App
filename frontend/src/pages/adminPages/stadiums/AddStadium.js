import { useState } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import InputWithLabel from '../../../components/InputWithLabel';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { baseUrl } from '../../../constants/url.constants';


function AddStadium() {
    const [nme, setName] = useState("");
    const [loc, setLoc] = useState("");
    const [image, setImage] = useState("");
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [cap, setCap] = useState("");
    const [check, setCheck] = useState(-1);
    const [createdAt, setCreatedAt] = useState(new Date());
    const handlecapacity = (event) => {
        setCap(event.target.value)
    }
    const Handlename = (event) => {
        setName(event.target.value)
    }
    const handleimage = (event) => {
        setImage(event.target.value)
    }
    const handlelength = (event) => {
        setLength(event.target.value)
    }
    const handlewidth = (event) => {
        setWidth(event.target.value)
    }
    const handlelocation = (event) => {
        setLoc(event.target.value)
    }
    const HandelAdd = () => {
        if (createdAt < Date.now() || nme == "" || cap == "" || loc == "" || image == "" || length == "" || width == "") {
            setCheck(0);
        }
        else {
            let tmp = createdAt.toLocaleDateString();
            fetch(`${baseUrl}/Stadiums/Add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: '1',
                    name: nme,
                    width: width,
                    Capacity: cap,
                    length: length,
                    image: image,
                    location: loc,
                    createdAt: tmp,
                })
            }).then((res) => res)
                .catch((ex) => ex);
            setCheck(1);
        }
    }
    return (
        <>
            <div className="container">
                <div className='row mt-4'>
                    <h3>Add New Stadium To The System</h3>
                </div>
                <div className='row mt-3'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Stadium Name</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert stadium name" onChange={Handlename} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Stadium Location</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert stadium Location" onChange={handlelocation} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Stadium Capacity</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert stadium Location" onChange={handlecapacity} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Stadium Image</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert stadium Location" onChange={handleimage} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Stadium Width</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert stadium Location" onChange={handlewidth} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Stadium Length</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert stadium Location" onChange={handlelength} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-2'><label >Created At</label></div>
                    <div className='col-4'><DatePicker selected={createdAt} onChange={setCreatedAt} /></div>
                </div>
                <button class="btn btn-success col col-lg-1 mt-4" onClick={() => {
                    HandelAdd();
                }} >Add</button>
            </div>
            <div className='container mt-3'>
                {check == 0 ? <h6 style={{ color: "red" }}>Please Insert All The Data Properly</h6> : check == 1 ? <h6 style={{ color: "green" }}>Added Successfully</h6> : <p></p>}
            </div>
        </>
    )
}
export default AddStadium;