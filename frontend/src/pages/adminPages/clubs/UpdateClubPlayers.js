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
    const [currClub, setCurrClub] = useState([{}])
    const [players, setPlayers] = useState([{}]);
    const [player, setPlayer] = useState({});

    let history = useNavigate();
    const navback = () => {
        history(`/clubs/update/${clubID}`);
    }
    useEffect(() => {
        fetch(`${baseUrl}/Clubs/getOneClub/${clubID}`)
            .then((res) => res.json())
            .then((data) => setCurrClub(data))
            .catch((ex) => console.log(ex));
        fetch(`${baseUrl}/Clubs/getClubPlayers/${clubID}`)
            .then((res) => res.json())
            .then((data) => setPlayers(data))
            .catch((ex) => console.log(ex));
    }, []);
    const HandelDelete = () => {
        if (player == { na: "ht" }) setCheck(4);
        else {
            fetch(`${baseUrl}/Players/DeletePlayer/${player.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {}
            })
                .then((res) => res.json())
                .catch((ex) => console.log(ex));
            setCheck(3);
            setPlayer({})
        }
        setTimeout(() => {
            setCheck(-1);
        }, 1000);
    }
    return (
        <>
            <div className="container">
                <h3 className='mt-3'>UPDATE PLAYERS AT: {currClub[0].Name}</h3>
                <div className='row'>
                    <Link className="btn btn-success col col-lg-2 mt-2 ms-2" to={`/clubs/update/${clubID}/addplayer`} >Add Player</Link>
                </div>
                <div className="row mt-3">
                    <div className="input-group col">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">{currClub[0].Name} Players</label>
                    </div>
                    <div className="dropdown col">
                        <button className="btn btn-black dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            PLAYERS
                        </button>
                        <ul className="dropdown-menu">
                            {players.map((pl, index) => (
                                <li><button key={index + 1} className="dropdown-item" onClick={() => {
                                    setPlayer(pl);
                                }}>{pl.Fname} {pl.Lname}</button></li>
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
                <div className="row mt-3">
                    <button class="btn btn-danger col col-lg-1 ms-2 " onClick={() => {
                        HandelDelete();
                    }}>Delete</button>
                    <button class="btn btn-secondary col col-lg-1 ms-5" onClick={navback}>Cancel</button>
                </div>
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