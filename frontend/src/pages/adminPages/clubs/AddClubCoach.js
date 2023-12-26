import DateTimePicker from 'react-datetime-picker';
import { useState } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import InputWithLabel from '../../../components/InputWithLabel';
import Dropdown from '../../../components/Dropdown';
import DropdownLabel from '../../../components/DropdownWithLabel';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../../../constants/url.constants';
function AddClubCoach() {
    const [name, setName] = useState("");
    const nav = useNavigate();
    let { clubID } = useParams();
    const [check, setCheck] = useState(-1);
    const HandelName = (e) => {
        setName(e.target.value)
    }
    const HandelAdd = () => {
        if (name == "") {
            setCheck(0);
        }
        else {
            fetch(`${baseUrl}/Clubs/Update/${clubID}/AddCoach`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: '1',
                    name: name,
                })
            }).then((res) => res)
                .catch((ex) => console.log(ex));
            setCheck(1);
            nav(`/clubs`);
        }
        setTimeout(() => {
            setCheck(-1);
        }, 1000);
    }
    return (
        <>
            <div className="container">
                <h3 className='mt-3'>INSERT CLUB COACH INFO</h3>
                <div className='row mt-3'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Coach Name</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert coach name" onChange={HandelName} />
                            </div>
                        </div>
                    </div>
                </div>
                <button class="btn btn-success col col-lg-1" onClick={() => {
                    HandelAdd();
                }} >Add</button>
                <div className='row mt-3'>
                    {check == 0 ? <h6 style={{ color: "red" }}>Please Insert All Data</h6> : check == 1 ? <h6 style={{ color: "green" }}>Added Successfully</h6> : <p></p>}
                </div>
            </div>
        </>
    )
}
export default AddClubCoach;