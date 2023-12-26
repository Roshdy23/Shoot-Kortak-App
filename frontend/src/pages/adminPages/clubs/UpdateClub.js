import { useState, useEffect } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import InputWithLabel from '../../../components/InputWithLabel';
import Dropdown from '../../../components/Dropdown';
import DropdownLabel from '../../../components/DropdownWithLabel';
import { Link, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { baseUrl } from '../../../constants/url.constants';

function UpdateClub() {
    const [check, setCheck] = useState(-1);
    const [newName, setNewName] = useState("");
    const [newLogo, setNewLogo] = useState("");
    const [newCreatedAt, setNewCreatedAt] = useState("");
    let { clubID } = useParams();
    const [clubData, setClubData] = useState({
        id: 3,
        name: "AL Ahly",
        createdAt: "1907",
        marketValue: "5 Billions",
        trophiesCount: "90",
        logoUrl: "https://google.com/",
    });
    useEffect(() => {
        fetch(`${baseUrl}/Clubs/GetClub/${clubID}`)
            .then((res) => res.json())
            .then((data) => setClubData(data))
            .catch((ex) => console.log(ex));
    }, []);
    const HandelUpdate = () => {
        if (newName == "" && newLogo == "" && newCreatedAt == "") {
            setCheck(0);
        }
        else {
            let myname = (newName == "") ? clubData.name : newName;
            let mylogo = (newLogo == "") ? clubData.logoUrl : newLogo;
            let mycreatedat = (newCreatedAt === "") ? clubData.createdAt : newCreatedAt;
            fetch(`${baseUrl}/Clubs/UpdateClub/${clubID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: clubData.id,
                    name: myname,
                    createdAt: mycreatedat,
                    logoUrl: mylogo,
                })
            })
                .then((res) => res)
                .catch((ex) => console.log(ex))
            setCheck(1);
        }
        setTimeout(() => {
            // set a timer to hide the element after 3 seconds
            setCheck(-1);
        }, 1000);
    }
    const HandelnewName = (event) => {
        setNewName(event.target.value);
    }
    const HandelnewCreatedAt = (event) => {
        setNewCreatedAt(event.target.value);
    }
    const HandelnewLogo = (event) => {
        setNewLogo(event.target.value);
    }
    return (
        <>
            <div className="container">
                <div className='row mt-4'>
                    <h3>UPDATE CLUB INFO</h3>
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Club Name: ${clubData.name}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Created At: ${clubData.createdAt}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Market Value: ${clubData.marketValue}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Trophies Count: ${clubData.trophiesCount}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`LogoUrl: ${clubData.logoUrl}`} aria-label="readonly input example" readonly />
                </div>
                <div className='row mt-3'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Update Name</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert new club name" onChange={HandelnewName} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Update Logo Url</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert new logo url" onChange={HandelnewLogo} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Update Created At</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert new createdAt year" onChange={HandelnewCreatedAt} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-1'>
                    <button class="btn btn-info col col-lg-1" onClick={() => {
                        HandelUpdate();
                    }}>Update</button><br />
                    <div className='col col-lg-2 mt-2'>
                        {check == 0 ? <h6 style={{ color: "red" }}>Please Insert Data Properly</h6> : check == 1 ? <h6 style={{ color: "green" }}>Updated Successfully</h6> : <p></p>}
                    </div>
                </div>
                <Link class="btn btn-success col col-lg-3 mt-4" to={`/clubs/update/${clubID}/players`}>Update Club Players</Link>
                <Link class="btn btn-success col col-lg-3 mt-4 ms-5" to={`/clubs/update/${clubID}/coach`} >Update Club Coach</Link>
            </div >
        </>
    )
}
export default UpdateClub;