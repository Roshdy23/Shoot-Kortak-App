import DateTimePicker from 'react-datetime-picker';
import { useState, useEffect } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import InputWithLabel from '../../../components/InputWithLabel';
import Dropdown from '../../../components/Dropdown';
import DropdownLabel from '../../../components/DropdownWithLabel';
import { Link, useParams } from 'react-router-dom';
import { baseUrl } from '../../../constants/url.constants';

function AddClubPlayer() {
    const [check, setCheck] = useState(-1);
    let { clubID } = useParams();
    const [currClub, setCurrClub] = useState([{}])
    const [frstName, setFrstName] = useState("");
    const [scndName, setScndName] = useState("");
    const [tshirt, setTshirt] = useState(-1);
    const [brthDate, setBrthDate] = useState("");
    const [national, setNational] = useState("");
    const [hei, setHei] = useState(-1);
    const [foot, setFoot] = useState("");
    const [photo, setphoto] = useState("");
    const [Mv, setMv] = useState(-1);
    const [pos, setPos] = useState("Positions");
    useEffect(() => {
        fetch(`${baseUrl}/Clubs/getOneClub/${clubID}`)
            .then((res) => res.json())
            .then((data) => setCurrClub(data))
            .catch((ex) => console.log(ex));
    }, []);
    const HandelFn = (e) => {
        setFrstName(e.target.value)
    }
    const HandelLn = (e) => {
        setScndName(e.target.value);
    }
    const HandelH = (e) => {
        setHei(e.target.value);
    }
    const HandelF = (e) => {
        setFoot(e.target.value);
    }
    const HandelMv = (e) => {
        setMv(e.target.value);
    }
    const HandelN = (e) => {
        setNational(e.target.value);
    }
    const HandelTshirtNum = (e) => {
        setTshirt(e.target.value);
    }
    const HandelP = (e) => {
        setphoto(e.target.value)
    }
    const HandelBd = (e) => {
        setBrthDate(e.target.value);
    }
    const HandelAdd = () => {
        if (pos == "Positions" || frstName == "" || scndName == "" || tshirt == -1 || brthDate == "" || national == "" || hei == -1 || foot == -1 || photo == "" || Mv == -1) {
            setCheck(0);
        }
        else {
            fetch(`${baseUrl}/Players/AddPlayerh/${clubID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: 1,
                    birthdate: brthDate,
                    Nationality: national,
                    photo: photo,
                    fname: frstName,
                    lname: scndName,
                    clubId: parseInt(clubID),
                    height: parseFloat(hei),
                    MarketValue: parseInt(Mv),
                    MainPosition: pos,
                    tShirtNumber: parseInt(tshirt),
                    foot: foot,
                })
            })
                .then((res) => res)
                .catch((ex) => console.log(ex));
            setCheck(1);
        }
        setTimeout(() => {
            setCheck(-1);
        }, 1000);
    }

    return (
        <>
            <div className="container">
                <h3 className='mt-3'>ADD NEW PLAYER TO: {currClub[0].Name}</h3>
                <div className='row '>
                    <div className='col col-lg-6'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">First Name</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert first name" onChange={HandelFn} />
                            </div>
                        </div>
                    </div>
                    <div className='col col-lg-6'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Last Name</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert last name" onChange={HandelLn} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-6'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Birth Date</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert player birth date" onChange={HandelBd} />
                            </div>
                        </div>
                    </div>
                    <div className='col col-lg-6'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Nationallity</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert player nationallity" onChange={HandelN} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-6'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Height</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert player height" onChange={HandelH} />
                            </div>
                        </div>
                    </div>
                    <div className='col col-lg-6'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Foot</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert player foot" onChange={HandelF} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-6'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Photo Url</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert player photo url" onChange={HandelP} />
                            </div>
                        </div>
                    </div>
                    <div className='col col-lg-6'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label col-lg-3">T-shirt Number</label>
                            <div class="col-sm-10 col-lg-5">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert player nickname" onChange={HandelTshirtNum} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-6'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label col-lg-3">Market Value</label>
                            <div class="col-sm-10 col-lg-5">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert player  market value" onChange={HandelMv} />
                            </div>
                        </div>
                    </div>
                    <div className="dropdown col col-lg-6">
                        <div className='row'>
                            <label for="colFormLabel" className="col-sm-2 col-form-label col-lg-3">Main Position</label>
                            <div className="dropdown col">
                                <button className="btn btn-secondary dropdown-toggle mt-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {pos}
                                </button>
                                <ul className="dropdown-menu">
                                    {["Goalkeeper", "Defender", "Midfielder", "Forward"].map((pos, index) => (
                                        <li><button key={index + 1} className="dropdown-item" onClick={() => {
                                            setPos(pos);
                                        }}>{pos}</button></li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
                <button class="btn btn-success col col-lg-1" onClick={HandelAdd} >Add</button>
                <div className='ow mt-3'>
                    {check == 0 ? <h6 style={{ color: "red" }}>Please Insert all Data Properly</h6> : check == 1 ? <h6 style={{ color: "green" }}>Added Successfully</h6> : <p></p>}
                </div>
            </div>
        </>
    )
}
export default AddClubPlayer;