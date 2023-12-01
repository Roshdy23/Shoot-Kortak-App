import DateTimePicker from 'react-datetime-picker';
import { useState } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import InputWithLabel from '../../../components/InputWithLabel';
import Dropdown from '../../../components/Dropdown';
import DropdownLabel from '../../../components/DropdownWithLabel';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function AddStadium() {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <>
            <div className="container">
                <div className='row mt-4'>
                    <h3>Add New Stadium To The System</h3>
                </div>
                <InputWithLabel label="Name" placeholder="insert stadium name" />
                <InputWithLabel label="Locaton" placeholder="insert stadium location" />
                <InputWithLabel label="Capacity" placeholder="insert stadium capacity" />
                <InputWithLabel label="Image Url" placeholder="insert img url" />
                <InputWithLabel label="Length" placeholder="insert stadium length" />
                <InputWithLabel label="Width" placeholder="insert stadium width" />
                <div className='row mt-3'>
                    <div className='col-2'><label >Created At</label></div>
                    <div className='col-4'><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></div>
                </div>
                <button class="btn btn-success col col-lg-1 mt-4" >Add</button>
            </div>
        </>
    )
}
export default AddStadium;