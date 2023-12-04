import { useState } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import InputWithLabel from '../../../components/InputWithLabel';
import DropdownLabel from '../../../components/DropdownWithLabel';
import Dropdown from '../../../components/Dropdown';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function UpdateChampionship() {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className="col col-lg-7">
                        <h3 className='row mt-4'>UPDATE CHAMPIONSHIP INFO</h3>
                        <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                            <input className="form-control" type="text" value={"Name: championnship.name"} aria-label="readonly input example" readonly />
                        </div>
                        <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                            <input className="form-control" type="text" value={"No. of Clubs: championnship.clubs"} aria-label="readonly input example" readonly />
                        </div>
                        <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                            <input className="form-control" type="text" value={"No. of matches: championnship.matches"} aria-label="readonly input example" readonly />
                        </div>
                        <InputWithLabel label="Update Logo Url" placeholder="insert new logo url" />
                        <div className='row mt-3'>
                            <div className='col-2'><label >Update Start Date</label></div>
                            <div className='col-4'><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-2'><label >Update End Date</label></div>
                            <div className='col-4'><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></div>
                        </div>
                        <button class="btn btn-info col col-lg-2 mt-4">Update</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UpdateChampionship;