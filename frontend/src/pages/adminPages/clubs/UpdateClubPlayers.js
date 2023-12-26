import DateTimePicker from 'react-datetime-picker';
import { useState, useEffect } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import InputWithLabel from '../../../components/InputWithLabel';
import Dropdown from '../../../components/Dropdown';
import DropdownLabel from '../../../components/DropdownWithLabel';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../../../constants/url.constants';

function UpdateClubPlayers() {
    const [check, setCheck] = useState(-1);
    let { clubID } = useParams();
    const [currClub, setCurrClub] = useState({ id: 2, name: "AL Ahly" })
    const [players, setPlayers] = useState([{ id: 2, Fullname: "Kabonga SHa7batshino", nickName: "KabShab", bdate: "1999-12-25", nationallity: "EGY", height: "1.9", foot: "42" },
    { id: 3, Fullname: "Ali Madkour", nickName: "Ali", bdate: "1999-12-25", nationallity: "EGY", height: "1.9", foot: "42" },
    { id: 4, Fullname: "Karim Bambo", nickName: "Karim", bdate: "1999-12-25", nationallity: "EGY", height: "1.9", foot: "42" }]);
    const [player, setPlayer] = useState({ id: -1, Fullname: "", nickName: "", bdate: "", nationallity: "", height: "", foot: "", photoUrl: "", marketValue: "" });
    const [newNickname, setNewnickname] = useState("");
    const [newPhoto, setNewPhoto] = useState("");
    const [newMarketValue, setNewMarketValue] = useState("");
    let history = useNavigate();
    const navback = () => {
        history(`/clubs/update/${clubID}`);
    }
    useEffect(() => {
        fetch(`${baseUrl}/Clubs/GetClub/${clubID}`)
            .then((res) => res.json())
            .then((data) => setCurrClub(data))
            .catch((ex) => console.log(ex));
        fetch(`${baseUrl}/Players/Get/${clubID}`)
            .then((res) => res.json())
            .then((data) => setPlayers(data))
            .catch((ex) => console.log(ex));
    }, []);
    const HandelNickname = (e) => {
        setNewnickname(e.target.value);
    }
    const HandelPhoto = (e) => {
        setNewPhoto(e.target.value);
    }
    const HandelMarketvalue = (e) => {
        setNewMarketValue(e.target.value);
    }
    const HandelUpdate = () => {
        if (newNickname == "" && newMarketValue == "" && newPhoto == "") {
            setCheck(0);
        }
        else {
            let mynickname = (newNickname === "New Name") ? player.nickName : newNickname;
            let myPhoto = (newPhoto === "") ? player.photoUrl : newPhoto;
            let myMarkVal = (newMarketValue === "") ? player.marketValue : newMarketValue;
            fetch(`${baseUrl}/Clubs/Players/Update/${player.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: player.id,
                    nickName: mynickname,
                    photoUrl: myPhoto,
                    marketValue: myMarkVal,
                })
            })
                .then((res) => res).catch((ex) => console.log(ex));
            setCheck(1);
        }
        setTimeout(() => {
            setCheck(-1);
        }, 1000);
    };
    const HandelDelete = () => {
        if (player.id == -1) setCheck(4);
        else {
            fetch(`${baseUrl}/Clubs/Players/Delete/${player.id}`)
                .then((res) => res.json())
                .catch((ex) => console.log(ex));
            setCheck(3);
            setPlayer({ id: -1, Fullname: "", nickName: "", bdate: "", nationallity: "", height: "", foot: "", photoUrl: "", marketValue: "" })
        }
        setTimeout(() => {
            setCheck(-1);
        }, 1000);
    }
    return (
        <>
            <div className="container">
                <h3 className='mt-3'>UPDATE PLAYERS AT: {currClub.name}</h3>
                <div className='row'>
                    <Link className="btn btn-success col col-lg-2 mt-2 ms-2" to={`/clubs/update/${clubID}/addplayer`} >Add Player</Link>
                </div>
                <div className="row mt-3">
                    <div className="input-group col">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">{currClub.name} Players</label>
                    </div>
                    <div className="dropdown col">
                        <button className="btn btn-black dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            PLAYERS
                        </button>
                        <ul className="dropdown-menu">
                            {players.map((pl, index) => (
                                <li><button key={index + 1} className="dropdown-item" onClick={() => {
                                    setPlayer(pl);
                                }}>{pl.Fullname}</button></li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Player first name: ${player.Fullname}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Player nickname: ${player.nickName}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Player birth date: ${player.bdate}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Player nationallity: ${player.nationallity}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Player Height: ${player.height}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Player Foot: ${player.foot}`} aria-label="readonly input example" readonly />
                </div>
                <div className='row mt-3'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Update Nick Name</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert new club name" onChange={HandelNickname} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-1'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Update Player Photo Url</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert new player photo url" onChange={HandelPhoto} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Update Player Market Value</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert new player market value" onChange={HandelMarketvalue} />
                            </div>
                        </div>
                    </div>
                </div>
                <button class="btn btn-info col col-lg-1 " onClick={() => {
                    HandelUpdate();
                }}>Update</button>
                <button class="btn btn-danger col col-lg-1 ms-5 " onClick={() => {
                    HandelDelete();
                }}>Delete</button>
                <button class="btn btn-secondary col col-lg-1 ms-5" onClick={navback}>Cancel</button>
                <div className='row mt-2'>
                    {check == 0 ? <h6 style={{ color: "red" }}>Please Insert Data Properly</h6>
                        : check == 1 ? <h6 style={{ color: "green" }}>Updated Successfully</h6>
                            : check == 3 ? <h6 style={{ color: "green" }}>Deleted Successfully</h6>
                                : check == 4 ? <h6 style={{ color: "red" }}>Deletion Failed!</h6>
                                    : <p></p>}
                </div>
            </div>
        </>
    )
}
export default UpdateClubPlayers;