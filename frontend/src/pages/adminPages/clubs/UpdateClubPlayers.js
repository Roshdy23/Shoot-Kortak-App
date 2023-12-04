import DateTimePicker from 'react-datetime-picker';
import { useState } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import InputWithLabel from '../../../components/InputWithLabel';
import Dropdown from '../../../components/Dropdown';
import DropdownLabel from '../../../components/DropdownWithLabel';
import { Link, useNavigate, useParams } from 'react-router-dom';

function UpdateClubPlayers() {
    let { clubID } = useParams();
    let history = useNavigate();
    const navback = () => {
        history(`/clubs/update/${clubID}`);
    }
    return (
        <>
            <div className="container">
                <h3 className='mt-3'>UPDATE PLAYERS INFO</h3>
                <div className='row'></div>
                <DropdownLabel label="Players" val={["player1", "player2", "player3"]} />
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={"player first name: player.Fname"} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={"player second name: player.Lname"} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={"player nickname: player.nickname"} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={"player birth date: player.bdate"} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={"player nationallity: player.national"} aria-label="readonly input example" readonly />
                </div>
                <InputWithLabel label="Update Player Photo Url" placeholder="insert new player photo url" />
                <InputWithLabel label="Update Player Height" placeholder="insert new player height" />
                <InputWithLabel label="Update Player Foot" placeholder="insert new player foot" />
                <InputWithLabel label="Update Player Market Value" placeholder="insert new player market value" />
                <button class="btn btn-info col col-lg-1 mt-4" >Update</button>
                <button class="btn btn-danger col col-lg-1 mt-4 ms-5" onClick={navback}>Cancel</button>
                <div className='mt-5'></div>
            </div>
        </>
    )
}
export default UpdateClubPlayers;