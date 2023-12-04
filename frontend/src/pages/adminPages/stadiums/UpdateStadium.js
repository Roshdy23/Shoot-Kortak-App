import { useState } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import InputWithLabel from '../../../components/InputWithLabel';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { Link } from 'react-router-dom';


function UpdateStadium() {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <>
            <div className="container">
                <div className='row mt-4'>
                    <h3>UPDATE STADIUM INFO</h3>
                </div>
                <InputWithLabel label="Update Name" placeholder={"existing stadium name is shown here"} />
                <InputWithLabel label="Update Locaton" placeholder={"existing stadium location is shown here"} />
                <InputWithLabel label="Update Capacity" placeholder={"existing stadium capacity is shown here"} />
                <InputWithLabel label="Update Image Url" placeholder={"existing stadium url is shown here"} />
                <InputWithLabel label="Update Length" placeholder={"existing stadium length is shown here"} />
                <InputWithLabel label="Update Width" placeholder={"existing stadium width is shown here"} />
                <div className='row mt-3'>
                    <div className='col-2'><label >Update Created At</label></div>
                    <div className='col-4'><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></div>
                </div>
                <button className="btn btn-info col col-lg-1 mt-4">Update</button>
                <Link className="btn btn-danger col col-lg-1 mt-4 ms-5" to={"/stadiums"} >Cancel</Link>
            </div>
        </>
    )
}

export default UpdateStadium;