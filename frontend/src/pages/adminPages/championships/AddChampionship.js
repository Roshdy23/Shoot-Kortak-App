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

function AddChampionship() {
    const [startDate, setStartDate] = useState(new Date());
    let [show, setShow] = useState(false);
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className="col col-lg-7">
                        <h3 className='row mt-4'>Add New Championship To The System</h3>
                        <InputWithLabel label="Name" placeholder="insert championship name" />
                        <InputWithLabel label="Clubs" placeholder="insert number of clubs" />
                        <InputWithLabel label="Matches" placeholder="insert number of matches" />
                        <InputWithLabel label="Logo Url" placeholder="insert logo url" />
                        <div className='row mt-3'>
                            <div className='col-2'><label >Start Date</label></div>
                            <div className='col-4'><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-2'><label >End Date</label></div>
                            <div className='col-4'><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></div>
                        </div>
                        <button class="btn btn-success col col-lg-1 mt-4" onClick={() => {
                            setShow(true);
                        }} >Add</button>
                    </div>
                    <AddChampClubs toshow={show} />
                </div>
            </div>
        </>
    )
}
function AddChampClubs(props) {
    if (props.toshow) return (
        <div className='col col-lg-5'>
            <h3 className='row mt-4'>Adding Clubs To The Championship</h3>
            <DropdownLabel label="Clubs" val={["One", "Two", "Three"]} />
            <button class="btn btn-success col col-lg-2 mt-4" >Add</button>
        </div>
    )
    else return null;
}
export default AddChampionship;