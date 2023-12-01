import DateTimePicker from 'react-datetime-picker';
import { useState } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import InputWithLabel from '../../components/InputWithLabel';
import Dropdown from '../../components/Dropdown';
import DropdownLabel from '../../components/DropdownWithLabel';
import { Link } from 'react-router-dom';

function AddClubCoach() {
    return (
        <>
            <div className="container">
                <h3 className='mt-3'>INSERT CLUB COACH INFO</h3>
                <InputWithLabel label="Coach Name" placeholder="insert coach name" />
                <Link class="btn btn-success col col-lg-1" to="/clubs/add" >Add</Link>
            </div>
        </>
    )
}
export default AddClubCoach;