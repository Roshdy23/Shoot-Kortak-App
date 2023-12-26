import { useState, useEffect } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import InputWithLabel from '../../../components/InputWithLabel';
import DropdownLabel from '../../../components/DropdownWithLabel';
import Dropdown from '../../../components/Dropdown';
import { Link, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { baseUrl } from '../../../constants/url.constants';

function UpdateChampionship() {
    const [check, setCheck] = useState(-1);
    let { champID } = useParams();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [champ, setChamp] = useState({ id: 3, name: "EGY League", noClubs: "18", noMatches: "643", startDate: "2023-05-23", endDate: "2023-11-07" });
    useEffect(() => {
        fetch(`${baseUrl}/Championships/GetChamp/${champID}`)
            .then((res) => res.json())
            .then((data) => setChamp(data))
            .catch((ex) => console.log(ex))
    }, []);
    const HandelUpdate = () => {
        let tmp = new Date();
        let strt = startDate.toLocaleDateString();
        let end = endDate.toLocaleDateString();
        if (strt == tmp.toLocaleDateString() || end == tmp.toLocaleDateString()) {
            setCheck(0);
        }
        else {
            fetch(`${baseUrl}/Championships/Update/${champID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: champID,
                    startDate: startDate,
                    endDate: endDate
                })
            })
                .then((res) => res)
                .catch((ex) => console.log(ex));
            setCheck(1);
        }
        setTimeout(() => {
            setCheck(-1);
        }, 1000);
    }
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className="col col-lg-7">
                        <h3 className='row mt-4'>UPDATE CHAMPIONSHIP INFO</h3>
                        <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                            <input className="form-control" type="text" value={`Name: ${champ.name}`} aria-label="readonly input example" readonly />
                        </div>
                        <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                            <input className="form-control" type="text" value={`Number of clubs: ${champ.noClubs}`} aria-label="readonly input example" readonly />
                        </div>
                        <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                            <input className="form-control" type="text" value={`Number of Matches: ${champ.noMatches}`} aria-label="readonly input example" readonly />
                        </div>
                        <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                            <input className="form-control" type="text" value={`Start Date: ${champ.startDate}`} aria-label="readonly input example" readonly />
                        </div>
                        <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                            <input className="form-control" type="text" value={`End Date: ${champ.endDate}`} aria-label="readonly input example" readonly />
                        </div>
                        <div className='row mt-3'>
                            <div className='col-2'><label >Update Start Date</label></div>
                            <div className='col-4'><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-2'><label >Update End Date</label></div>
                            <div className='col-4'><DatePicker selected={endDate} onChange={(date) => setEndDate(date)} /></div>
                        </div>
                        <button class="btn btn-info col col-lg-2 mt-4" onClick={() => {
                            HandelUpdate();
                        }}>Update</button>
                    </div>
                </div>
                <div className='row mt-3'>
                    {check == 0 ? <h6 style={{ color: "red" }}>Please Insert The Data Properly</h6> : check == 1 ? <h6 style={{ color: "green" }}>Updated Successfully</h6> : <p></p>}
                </div>
            </div>
        </>
    )
}
export default UpdateChampionship;