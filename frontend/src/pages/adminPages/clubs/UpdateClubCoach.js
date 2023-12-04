import DateTimePicker from 'react-datetime-picker';
import { useState } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import InputWithLabel from '../../../components/InputWithLabel';
import Dropdown from '../../../components/Dropdown';
import DropdownLabel from '../../../components/DropdownWithLabel';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";

function UpdateClubCoach() {
    let { clubID } = useParams();
    let history = useNavigate();
    const navback = () => {
        history(`/clubs/update/${clubID}`);
    }
    return (
        <>
            <div className="container">
                <h3 className='row mt-3'>UPDATE CLUB COACH INFO</h3>
                <InputWithLabel label="Update Coach Name" placeholder="Current coach name: coach.name" />
                <div className='row'>
                    <button class="btn btn-info col col-lg-1 mt-4">Update</button>
                    <button class="btn btn-danger col col-lg-1 mt-4 ms-5" onClick={navback}>Cancel</button>
                </div>
            </div>
        </>
    )
}
export default UpdateClubCoach;