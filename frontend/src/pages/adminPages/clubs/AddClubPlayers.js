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

function AddClubPlayers() {
    const [check, setCheck] = useState(-1);
    const { clubID } = useParams();
    const [currClub, setCurrClub] = useState({ id: 2, name: "AL Ahly" })
    const [frstName, setFrstName] = useState("");
    const [scndName, setScndName] = useState("");
    const [nickname, setNickname] = useState("");
    const [brthDate, setBrthDate] = useState("");
    const [national, setNational] = useState("");
    const [hei, setHei] = useState("");
    const [foot, setFoot] = useState("");
    const [photo, setphoto] = useState("");
    const [Mv, setMv] = useState("");
    useEffect(() => {
        fetch(`${baseUrl}/Clubs/GetClub/${clubID}`)
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
    const HandelNk = (e) => {
        setNickname(e.target.value);
    }
    const HandelP = (e) => {
        setphoto(e.target.value)
    }
    const HandelBd = (e) => {
        setBrthDate(e.target.value);
    }
    const HandelAdd = () => {
        if (frstName == "" || scndName == "" || nickname == "" || brthDate == "" || national == "" || hei == "" || foot == "" || photo == "" || Mv == "") {
            setCheck(0);
        }
        else if (!Date.parse(brthDate) || isNaN(hei) || isNaN(Mv)) { setCheck(0) }
        else {
            fetch(`${baseUrl}/Clubs/Update/${clubID}/AddPlayer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    id: "1",
                    Fname: frstName,
                    Lname: scndName,
                    nickname: nickname,
                    birthDate: brthDate,
                    Nationallity: national,
                    PhotoUrl: photo,
                    Height: hei,
                    Foot: foot,
                    MarketValue: Mv,
                }
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
                <h3 className='mt-3'>ADD PLAYERS TO: {currClub.name}</h3>
                <div className='row'></div>
                <div className='row mt-3'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Player First Name</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert first player name" onChange={HandelFn} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Player Secomd Name</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert second player name" onChange={HandelLn} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Player Nickname</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert player nickname" onChange={HandelNk} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Player Birth Date</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert player birth date" onChange={HandelBd} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Player Nationallity</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert player nationallity" onChange={HandelN} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Player Photo Url</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert player photo url" onChange={HandelP} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Player Height</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert player height" onChange={HandelH} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Player Foot</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert player foot" onChange={HandelF} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Player Market Value</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert player  market value" onChange={HandelMv} />
                            </div>
                        </div>
                    </div>
                </div>
                <button class="btn btn-success col col-lg-1" onClick={HandelAdd} >Add</button>
                <Link class="btn btn-danger ms-4 col col-lg-3" to={`/clubs/add/${clubID}/addcoach`}>Finish and Proceed to Add Club's Coach</Link>
                <div className='ow mt-3'>
                    {check == 0 ? <h6 style={{ color: "red" }}>Please Insert all Data Properly</h6> : check == 1 ? <h6 style={{ color: "green" }}>Added Successfully</h6> : <p></p>}
                </div>
            </div>
        </>
    )
}
export default AddClubPlayers;