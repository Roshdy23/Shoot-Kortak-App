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

    const [champ, setChamp] = useState([{ id: 4, name: 'tmptmp', logo: null, startingAt: '2023-11-03T00:00:00', endingAt: '2024-02-10T00:00:00' }]);
    useEffect(() => {
        fetch(`${baseUrl}/Championships/GetChamp/${champID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setChamp(data);
            })
            .catch((ex) => console.log(ex));

    }, []);
    const HandelUpdate = () => {
        let tmp = new Date();
        let strt = startDate.toLocaleDateString();
        let end = endDate.toLocaleDateString();
        if (strt == tmp.toLocaleDateString() || end == tmp.toLocaleDateString() || strt >= end) {
            setCheck(0);
        }
        else {
            let lgo = (champ[0].logo == null) ? "i_have_no_time_to_get_reaql_url" : champ[0].logo;
            fetch(`${baseUrl}/Championships/update/${champID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Id: champ[0].id,
                    Name: champ[0].name,
                    Logo: lgo,
                    StartingAt: startDate,
                    EndingAt: endDate,
                    NoMatches: champ[0].noMatches,
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
                            <input className="form-control" type="text" value={"Name: " + champ[0].name} aria-label="readonly input example" readonly />
                        </div>
                        <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                            <input className="form-control" type="text" value={`Number of Matches: ${champ[0].noMatches}`} aria-label="readonly input example" readonly />
                        </div>
                        <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                            <input className="form-control" type="text" value={`Start Date: ${champ[0].startingAt.substring(0, 10)}`} aria-label="readonly input example" readonly />
                        </div>
                        <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                            <input className="form-control" type="text" value={`End Date: ${champ[0].endingAt.substring(0, 10)}`} aria-label="readonly input example" readonly />
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