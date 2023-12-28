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
    const [clubData, setClubData] = useState([{}]);
    const [stadiums, setStadiums] = useState([{ id: 2, name: "Borj Alarab", location: "Alex" }, { id: 3, name: "Petrosport", location: "Cairo" }, { id: 4, name: "Alahly We Alsalam", location: "Cairo" }]);

    useEffect(() => {
        fetch(`${baseUrl}/Clubs/getOneClub/${clubID}`)
            .then((res) => res.json())
            .then((data) => setClubData(data))
            .catch((ex) => console.log(ex));
        fetch(`${baseUrl}/Stadiums/Get`)
            .then((res) => res.json())
            .then((data) => {
                setStadiums(data);
            }).catch((ex) => console.log(ex));
    }, []);
    const HandelUpdate = () => {
        let yy = 1;
        for (let i = 0; i < stadiums.length; ++i) {
            if (stadiums[i].name == clubData[0].stadiumHome) { yy = stadiums[i].id; break; }
        }
        if (newName == "" && newLogo == "" && newCreatedAt == "") {
            setCheck(0);
        }
        else {
            let myname = (newName == "") ? clubData[0].Name : newName;
            let mylogo = (newLogo == "") ? clubData[0].Logo : newLogo;
            let mycreatedat = (newCreatedAt === "") ? clubData[0].CreatedAt : newCreatedAt;
            fetch(`${baseUrl}/Clubs/Update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: clubData[0].ID,
                    name: myname,
                    logo: mylogo,
                    stadiumHome: yy,
                    createdAt: mycreatedat,
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
                    <input className="form-control" type="text" value={`Club Name: ${clubData[0].Name}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Created At: ${clubData[0].CreatedAt}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Home Stadium: ${clubData[0].stadiumHome}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Market Value: ${clubData[0].marketValue}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`LogoUrl: ${clubData[0].Logo}`} aria-label="readonly input example" readonly />
                </div>
                <div className='row mt-2'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Update Name</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert new club name" onChange={HandelnewName} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Update Logo Url</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert new logo url" onChange={HandelnewLogo} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
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