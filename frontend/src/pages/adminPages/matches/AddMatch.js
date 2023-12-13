import DatePicker from 'react-date-picker';
import { useEffect, useState } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import InputWithLabel from '../../../components/InputWithLabel';
import Dropdown from '../../../components/Dropdown';
import DropdownLabel from '../../../components/DropdownWithLabel';
import { Link } from 'react-router-dom';
import Dropdownx from '../../../components/Dropdownx';
import { baseUrl } from "../../../constants/url.constants";

function AddMatch() {
    const [dateValue, setDateValue] = useState(new Date());
    const [weekno, setWeekno] = useState('');
    const [champ, setChamp] = useState('Championships');
    const [champid, setChampid] = useState('1');
    const [stadiumid, setStadiumid] = useState('1');
    const [championships, setChampionships] = useState([]);
    const [clubs1, setClubs1] = useState([]);
    const [clubs2, setClubs2] = useState([]);
    const [club2, setClub2] = useState('');
    const [club1, setClub1] = useState('');
    const [stadiums, setStadiums] = useState([]);
    const [stadium, setStadium] = useState('Stadiums');
    useEffect(() => {
        fetch(`${baseUrl}/Championships/Get`)
            .then((res) => res.json())
            .then((data) => {
                setChampionships(data);
            });
        fetch(`${baseUrl}/Stadiums/Get`)
            .then((res) => res.json())
            .then((data) => {
                setStadiums(data);
            });
    }, []);
    const filterClubs = (ID) => {
        fetch(`${baseUrl}/Clubs/GetInChamp/${ID}`)
            .then((res) => res.json())
            .then((data) => {
                setClubs1(data);
                setClubs2(data);
            })
    }
    const HandelSecondClubs = (event) => {
        let cl = clubs1.filter((c, ind) => {
            return (c.name != event.target.value) ? c : null;
        });
        setClubs2(cl);
        setClub1(event.target.value);
    }
    const HandelsecondClub = (event) => {
        setClub2(event.target.value);
    }
    const handleWeekno = (event) => {
        setWeekno(event.target.value);
    }
    const HandelAdd = () => {
        let tmp = dateValue.toLocaleDateString().toString();
        console.log(tmp);
        if (club1 == "" || club2 == "" || stadium == "Stadiums" || champ == "Championships" || weekno == "") { HandelInsertion() }
        else {
            fetch(`${baseUrl}/Matches/Add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: '1',
                    matchDate: tmp,
                    weekno: weekno,
                    club1: club1,
                    club2: club2,
                    championshipid: champid,
                    stadium_id: stadiumid,
                })
            }).then((res) => res)
        }
    }
    const HandelInsertion = () => {

    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <h3 className="col col-lg-4 mt-3">Choose a Championship</h3>
                    <div className="dropdown col col-lg-1 mt-2">
                        <button className="btn btn-secondary dropdown-toggle mt-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {champ}
                        </button>
                        <ul className="dropdown-menu">
                            {championships.map((champi, index) => (
                                <li><button key={index + 1} className="dropdown-item" onClick={() => {
                                    filterClubs(champi.id);
                                    setChamp(champi.name);
                                    setChampid(champi.id);
                                }}>{champi.name}</button></li>
                            ))}
                        </ul>
                    </div>
                    {/* <Dropdownx sett1={setChamp} title={champ} vals={championships.map((ch) => { return ch.name })} /> */}
                </div>
                <div className="row mt-3">
                    <div className="col col-lg-6">
                        <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Team 1</label>
                            <select className="form-select" id="inputGroupSelect01" onChange={HandelSecondClubs}>
                                <option defaultValue>Choose...</option>
                                {clubs1.map((c, index) => (
                                    <option key={index + 1} >{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col col-lg-6">
                        <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Team 2</label>
                            <select className="form-select" id="inputGroupSelect01" onChange={HandelsecondClub}>
                                <option defaultValue>Choose...</option>
                                {clubs2.map((c, index) => (
                                    <option key={index + 1} >{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Week Number</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert week number" onChange={handleWeekno} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <label className='col col-lg-2'>Date and Time</label>
                    <DatePicker className='col col-lg-2' onChange={setDateValue} value={dateValue} />
                </div>
                <div className="row">
                    <h5 className="col col-lg-4 mt-3">Choose a Stadium</h5>
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
                <button class="btn btn-success col col-lg-1 mt-3" onClick={HandelAdd} >Add</button>
            </div>
        </>
    )
}
export default AddMatch;