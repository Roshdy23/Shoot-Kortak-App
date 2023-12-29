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
    const [newName, setNewName] = useState("");
    const [newImage, setNewImage] = useState("");
    const [newCapacity, setNewCapacity] = useState("");
    const [stadData, setStadData] = useState([{}]);
    let { updatestadiumID } = useParams();
    useEffect(() => {
        fetch(`${baseUrl}/Stadiums/GetStad/${updatestadiumID}`)
            .then((res) => res.json())
            .then((data) => {
                setStadData(data);
            })
            .catch((ex) => console.log(ex));
    }, [])
    const HandelUpdate = () => {
        if ((newName == "" && newImage == "" && newCapacity == "") || (newCapacity != "" && isNaN(newCapacity))) {
            setCheck(0);
        }
        else {
            let myname = (newName === "") ? stadData[0].name : newName;
            let myimg = (newImage === "") ? stadData[0].image : newImage;
            let mycap = (newCapacity == "") ? stadData[0].capacity : newCapacity;
            fetch(`${baseUrl}/Stadiums/UpdateStadium/${updatestadiumID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: stadData[0].id,
                    name: myname,
                    width: stadData[0].width,
                    capacity: mycap,
                    length: stadData[0].length,
                    image: myimg,
                    location: stadData[0].location,
                    createdAt: stadData[0].createdAt,
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
        setNewName(event.target.value);
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
                    <input className="form-control" type="text" value={`Stadium Name: ${stadData[0].name}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Stadium Location: ${stadData[0].location}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Stadium Capacity: ${stadData[0].capacity}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Stadium Width: ${stadData[0].width} KM`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Stadium Lenght: ${stadData[0].length} KM`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Stadium Image: ${stadData[0].image}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Stadium CreatedAt: ${stadData[0].createdAt}`} aria-label="readonly input example" readonly />
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
                <div className='row mb-3'>
                    <button className="btn btn-info col col-lg-1 mt-4" onClick={() => {
                        HandelUpdate();
                    }}>Update</button>
                    <Link className="btn btn-danger col col-lg-1 mt-4 ms-5" to={"/stadiums"} >Cancel</Link>
                    <div className='col mt-4'>
                        {check == 0 ? <h6 style={{ color: "red" }}>Please Insert Data Properly</h6> : check == 1 ? <h6 style={{ color: "green" }}>Updated Successfully</h6> : <p></p>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateStadium;