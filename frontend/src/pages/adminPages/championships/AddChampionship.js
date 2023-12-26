import { useEffect, useState } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import InputWithLabel from '../../../components/InputWithLabel';
import DropdownLabel from '../../../components/DropdownWithLabel';
import Dropdown from '../../../components/Dropdown';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { baseUrl } from '../../../constants/url.constants';
function AddChampionship() {
    const [check, setCheck] = useState(-1);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [name, setName] = useState("");
    const [logo, setLogo] = useState("");

    const [AddedChampID, setAddedChampID] = useState("0");
    let [show, setShow] = useState(false);
    const HandelName = (e) => {
        setName(e.target.value);
    }
    const HandelLogo = (e) => {
        setLogo(e.target.value);
    }
    const HandelAdd = () => {
        let tmp = new Date();
        let strt = startDate.toLocaleDateString();
        let end = endDate.toLocaleDateString();
        if (name == "" || logo == "" || strt == tmp.toLocaleDateString() || end == tmp.toLocaleDateString()) {
            setCheck(0);
        }
        else {
            fetch(`${baseUrl}/Championships/Add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: 1,
                    name: name,
                    logo: logo,
                    startingAt: startDate,
                    endingAt: endDate,
                    noMatches: 0,
                })
            })
                .then((res) => res) // get the added champId from response  and set AddedChampID by it 
                .catch((ex) => console.log(ex));
            setCheck(1);
            setShow(1);
        }
        setTimeout(() => {
            setCheck(-1);
        }, 1000);
    }
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className="col col-lg-7">
                        <h3 className='row mt-4'>Add New Championship To The System</h3>
                        <div className='row mt-3'>
                            <div className='col col-lg-9'>
                                <div className="row mb-3">
                                    <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Name</label>
                                    <div class="col-sm-10 col-lg-6">
                                        <input type="text" className="form-control" id="colFormLabel" placeholder="insert name" onChange={HandelName} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col col-lg-9'>
                                <div className="row mb-3">
                                    <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Logo</label>
                                    <div class="col-sm-10 col-lg-6">
                                        <input type="text" className="form-control" id="colFormLabel" placeholder="insert logo url" onChange={HandelLogo} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-2'><label >Start Date</label></div>
                            <div className='col-4'><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-2'><label >End Date</label></div>
                            <div className='col-4'><DatePicker selected={endDate} onChange={(date) => setEndDate(date)} /></div>
                        </div>
                        <button class="btn btn-success col col-lg-1 mt-4" onClick={() => {
                            HandelAdd();
                        }} >Add</button>
                    </div>
                    <AddChampClubs toshow={show} name={name} champId={AddedChampID} />
                </div>
                <div className='row mt-3'>
                    {check == 0 ? <h6 style={{ color: "red" }}>Please Insert The Data Properly</h6> : check == 1 ? <h6 style={{ color: "green" }}>Added Successfully</h6> : <p></p>}
                </div>
            </div>
        </>
    )
}
function AddChampClubs(props) {
    const [clubs, setClubs] = useState([{ id: 2, name: "ALahly", createdAt: "1907", marketValue: "5", trophiesCount: "90" },
    { id: 3, name: "Zamalek", createdAt: "1920", marketValue: "3", trophiesCount: "50" },
    { id: 4, name: "Almasry", createdAt: "1930", marketValue: "1", trophiesCount: "20" }]);
    const [club, setClub] = useState({ id: -1, name: "Choose", createdAt: "1000", marketValue: "1", trophiesCount: "1" });
    const [check, setCheck] = useState(-1);
    useEffect(() => {
        // fetch(`${baseUrl}/Clubs/Get/notInChampionship/${props.champId}`)
        fetch(`${baseUrl}/Clubs/Allclubs`)
            .then((res) => res.json())
            .then((data) => setClubs(data))
            .catch((ex) => console.log(ex))
    }, []);
    const HandelAdd = () => {
        if (club.id == -1) {
            setCheck(0);
        }
        else {
            fetch(`${baseUrl}/Championships/${props.champId}/AddClub`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(club.id)
            })
                .then((res) => res)
                .catch((ex) => console.log(ex))
            setCheck(1);
            setClub({ id: -1, name: "Choose", createdAt: "1000", marketValue: "1", trophiesCount: "1" });
        }
        setTimeout(() => {
            setCheck(-1);
        }, 1000);
    }
    if (props.toshow) return (
        <div className='col col-lg-5'>
            <div className="row mt-5">
                <div className="input-group col">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Add Clubs to {props.name} Championship</label>
                </div>
                <div className="dropdown col">
                    <button className="btn btn-black dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {club.name}
                    </button>
                    <ul className="dropdown-menu">
                        {clubs.map((cl, index) => (
                            <li><button key={index + 1} className="dropdown-item" onClick={() => {
                                setClub(cl);
                            }}>{cl.name}</button></li>
                        ))}
                    </ul>
                </div>
            </div>
            <button class="btn btn-success col col-lg-2 mt-4" onClick={() => {
                HandelAdd();
            }}>Add</button>
            <div className='row mt-3'>
                {check == 0 ? <h6 style={{ color: "red" }}>Please Select a Club</h6> : check == 1 ? <h6 style={{ color: "green" }}>Added Successfully</h6> : <p></p>}
            </div>
        </div>
    )
    else return null;
}
export default AddChampionship;