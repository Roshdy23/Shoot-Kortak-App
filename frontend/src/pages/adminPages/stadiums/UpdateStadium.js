import { useEffect, useState } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import InputWithLabel from '../../../components/InputWithLabel';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../../../constants/url.constants';


function UpdateStadium() {
    const [check, setCheck] = useState(-1);
    const [startDate, setStartDate] = useState(new Date());
    const [newName, setNewName] = useState("New Name");
    const [newImage, setNewImage] = useState("New Image URl");
    const [newCapacity, setNewCapacity] = useState("12");
    const [stadData, setStadData] = useState({
        id: 3,
        name: "Borj Alarab",
        width: "1",
        Capacity: "75000",
        length: "3",
        image: "https:/Borj+Alarab/image01",
        location: "https:/googlemaps/location123",
        createdAt: "1940"
    });
    let Stadiumid = useParams();
    useEffect(() => {
        fetch(`${baseUrl}/Stadiums/GetStadium/${Stadiumid}`)
            .then((res) => res.json())
            .then((data) => setStadData(data))
            .catch((ex) => console.log(ex));
    }, [])
    const HandelUpdate = () => {
        if (newName == "New Name" && newImage == "New Image URl") {
            setCheck(0);
        }
        else {
            let myname = (newName === "New Name") ? stadData.name : newName;
            let myimg = (newImage === "New Image") ? stadData.image : newImage;
            let mycap = (newCapacity === "12") ? stadData.Capacity : newCapacity;
            fetch(`${baseUrl}/Stadiums/UpdateStadium/${Stadiumid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: stadData.id,
                    name: myname,
                    Capacity: mycap,
                    image: myimg,
                })
            })
                .then((res) => res).catch((ex) => console.log(ex));
            setCheck(1);
        }
        setTimeout(() => {
            // set a timer to hide the element after 3 seconds
            setCheck(-1);
        }, 1000);
    }
    const Handelnewname = (event) => {
        setNewName(event.targret.value);
    }
    const Handelnewimage = (event) => {
        setNewImage(event.target.value);
    }
    const HandelnewCapacity = (event) => {
        setNewCapacity(event.target.value)
    }
    return (
        <>
            <div className="container">
                <div className='row mt-4'>
                    <h3>UPDATE STADIUM INFO</h3>
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Stadium Name: ${stadData.name}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Stadium Location: ${stadData.location}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Stadium Capacity: ${stadData.Capacity}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Stadium Width: ${stadData.width} KM`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Stadium Lenght: ${stadData.length} KM`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Stadium Image: ${stadData.image}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Stadium CreatedAt: ${stadData.createdAt}`} aria-label="readonly input example" readonly />
                </div>
                <div className='row mt-3'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Update Name</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert new stadium name" onChange={Handelnewname} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Update Image</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert new stadium image url" onChange={Handelnewimage} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Update Capacity</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert new stadium image url" onChange={HandelnewCapacity} />
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn btn-info col col-lg-1 mt-4" onClick={() => {
                    HandelUpdate();
                }}>Update</button>
                <Link className="btn btn-danger col col-lg-1 mt-4 ms-5" to={"/stadiums"} >Cancel</Link>
            </div>
            <div className='container mt-3'>
                {check == 0 ? <h6 style={{ color: "red" }}>Please Insert Data Properly</h6> : check == 1 ? <h6 style={{ color: "green" }}>Updated Successfully</h6> : <p></p>}
            </div>
        </>
    )
}

export default UpdateStadium;