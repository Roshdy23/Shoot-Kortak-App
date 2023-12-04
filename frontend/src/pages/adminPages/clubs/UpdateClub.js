import { useState } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import InputWithLabel from '../../../components/InputWithLabel';
import Dropdown from '../../../components/Dropdown';
import DropdownLabel from '../../../components/DropdownWithLabel';
import { Link, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function UpdateClub() {
    const [startDate, setStartDate] = useState(new Date());
    let clubID = useParams();
    clubID = 7;
    return (
        <>
            <div className="container">
                <div className='row mt-4'>
                    <h3>UPDATE CLUB INFO</h3>
                </div>
                <InputWithLabel label="Update Name" placeholder="insert new club name" />
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={"Club Trophies Count: Club.Tcount"} aria-label="readonly input example" readonly />
                </div>
                <InputWithLabel label="Update Logo Url" placeholder="insert new logo url" />
                <div className='row mt-3'>
                    <div className='col-2'><label >Update Created At</label></div>
                    <div className='col-4'><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></div>
                </div>
                <button class="btn btn-info col col-lg-1 mt-4" >Update</button><br />
                <Link class="btn btn-success col col-lg-3 mt-4" to={`/clubs/update/${clubID}/players`}>Update Club Players</Link>
                <Link class="btn btn-success col col-lg-3 mt-4 ms-5" to={`/clubs/update/${clubID}/coach`} >Update Club Coach</Link>
            </div >
        </>
    )
}
export default UpdateClub;