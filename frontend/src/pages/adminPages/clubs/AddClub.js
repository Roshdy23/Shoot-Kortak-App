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

function AddClub() {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <>
            <div className="container">
                <div className='row mt-4'>
                    <h3>Add New Club To The System</h3>
                </div>
                <InputWithLabel label="Name" placeholder="insert club name" />
                <InputWithLabel label="Trophies Count" placeholder="insert Trophies Count" />
                <InputWithLabel label="Logo Url" placeholder="insert logo url" />
                <div className='row mt-3'>
                    <div className='col-2'><label >Created At</label></div>
                    <div className='col-4'><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></div>
                </div>
                <Link class="btn btn-success col col-lg-1 mt-4" to="/clubs/add/addplayers">Add</Link>
            </div>
        </>
    )
}
export default AddClub;