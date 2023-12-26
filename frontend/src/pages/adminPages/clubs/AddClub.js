import DateTimePicker from 'react-datetime-picker';
import { useState, useEffect } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import InputWithLabel from '../../../components/InputWithLabel';
import Dropdown from '../../../components/Dropdown';
import DropdownLabel from '../../../components/DropdownWithLabel';
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { baseUrl } from '../../../constants/url.constants';
function AddClub() {
    const nav = useNavigate();
    const [check, setCheck] = useState(-1);
    const [createdAt, setCreatedAt] = useState("");
    const [clubName, setClubName] = useState("");
    const [trophies, setTrophiesCount] = useState("");
    const [logo, setLogo] = useState("");
    const [stadiums, setStadiums] = useState([]);
    const [stadium, setStadium] = useState('Stadiums');
    const [stadiumid, setStadiumid] = useState("");


    useEffect(() => {
        fetch(`${baseUrl}/Stadiums/Get`)
            .then((res) => res.json())
            .then((data) => {
                setStadiums(data);
            }).catch((ex) => console.log(ex));
    }, []);
    const HandelCreatedAt = (e) => {
        setCreatedAt(e.target.value)
    }
    const HandelName = (e) => {
        setClubName(e.target.value)
    }
    const Handellogo = (e) => {
        setLogo(e.target.value);
    }
    const HandelTrophies = (e) => {
        setTrophiesCount(e.target.value);
    }
    const HandelAdd = () => {
        if (clubName == "" || logo == "" || createdAt == "" || stadiumid == "") {
            setCheck(0);
        }
        else {
            fetch(`${baseUrl}/Clubs/Add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: '1',
                    name: clubName,
                    logo: logo,
                    stadiumHome: stadiumid,
                    createdAt: createdAt
                })
            }).then((res) => res)
                .catch((ex) => console.log(ex));
            setCheck(1);
            // get it from response :clubID <<<<<===========================
            let clubID = 1;
            nav(`/clubs/add/${clubID}/addplayers`);
        }
        setTimeout(() => {
            setCheck(-1);
        }, 1000);
    }
    return (
        <>
            <div className="container">
                <div className='row mt-4'>
                    <h3>Add New Club To The System</h3>
                </div>
                <div className='row mt-3'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Club Name</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert club name" onChange={HandelName} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Club Logo Url</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert logo url" onChange={Handellogo} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Club Created At Year</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert createdAt" onChange={HandelCreatedAt} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <h5 className="col col-lg-4 mt-3">Choose Home Stadium</h5>
                    <div className="dropdown col col-lg-1 mt-2">
                        <button className="btn btn-secondary dropdown-toggle mt-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {stadium}
                        </button>
                        <ul className="dropdown-menu">
                            {stadiums.map((stad, index) => (
                                <li><button key={index + 1} className="dropdown-item" onClick={() => {
                                    setStadium(stad.name);
                                    setStadiumid(stad.id);
                                }}>{stad.name}</button></li>
                            ))}
                        </ul>
                    </div>
                </div>
                <button class="btn btn-success col col-lg-1 mt-4" onClick={() => {
                    HandelAdd();
                }}>Add</button>
                <div className='row mt-3'>
                    {check == 0 ? <h6 style={{ color: "red" }}>Please Insert All Data</h6> : check == 1 ? <h6 style={{ color: "green" }}>Added Successfully</h6> : <p></p>}
                </div>
            </div>
        </>
    )
}
export default AddClub;