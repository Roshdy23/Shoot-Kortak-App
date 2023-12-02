import DateTimePicker from 'react-datetime-picker';
import { useState } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import InputWithLabel from '../../../components/InputWithLabel';
import Dropdown from '../../../components/Dropdown';
import DropdownLabel from '../../../components/DropdownWithLabel';
import { Link } from 'react-router-dom';

function AddMatch() {
    const [value, onChange] = useState(new Date());
    return (
        <>
            <div className="container">
                <div className="row">
                    <h3 className="col col-lg-4 mt-3">Choose a Championship</h3>
                    <Dropdown title="Championships" vals={["1", "2", "3", "4", "5", "6"]} />
                </div>
                <DropdownLabel label="Team 1" val={["One", "Two", "Three"]} />
                <DropdownLabel label="Team 2" val={["One", "Two", "Three"]} />
                <InputWithLabel label="Week Number" placeholder="insert week number" />
                <div className='row mt-3'>
                    <label className='col col-lg-2'>Date and Time</label>
                    <DateTimePicker className='col col-lg-2' onChange={onChange} value={value} />
                </div>
                <div className="row">
                    <h5 className="col col-lg-4 mt-3">Choose a Stadium</h5>
                    <Dropdown title="Stadiums" vals={["stad1", "stad2", "stad3", "stad4", "stad5", "stad6"]} />
                </div>
                <InputWithLabel label="Tickets Quantity" placeholder="insert tickets quantity" />
                <button class="btn btn-success col col-lg-1" >Add</button>
            </div>
        </>
    )
}
export default AddMatch;