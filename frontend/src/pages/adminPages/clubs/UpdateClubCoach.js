import DateTimePicker from 'react-datetime-picker';
import { useEffect, useState } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import InputWithLabel from '../../../components/InputWithLabel';
import Dropdown from '../../../components/Dropdown';
import DropdownLabel from '../../../components/DropdownWithLabel';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from '../../../constants/url.constants';
function UpdateClubCoach() {
    let { clubID } = useParams();
    const [coach, setCoach] = useState([{}]);
    const [clubData, setClubData] = useState([{}]);
    const [frstName, setFrstName] = useState("");
    const [scndName, setScndName] = useState("");
    const [brthDate, setBrthDate] = useState("");
    const [national, setNational] = useState("");
    const [photo, setphoto] = useState("");
    const [check, setCheck] = useState(-1);

    let history = useNavigate();
    const navback = () => {
        history(`/clubs/update/${clubID}`);
    }
    const HandelP = (e) => {
        setphoto(e.target.value)
    }
    const HandelBd = (e) => {
        setBrthDate(e.target.value);
    }
    const HandelN = (e) => {
        setNational(e.target.value);
    }
    const HandelFn = (e) => {
        setFrstName(e.target.value)
    }
    const HandelLn = (e) => {
        setScndName(e.target.value);
    }
    useEffect(() => {
        fetch(`${baseUrl}/Clubs/GetClubCoach/${clubID}`)
            .then((res) => res.json())
            .then((data) => setCoach(data))
            .catch((ex) => console.log(ex));
        fetch(`${baseUrl}/Clubs/getOneClub/${clubID}`)
            .then((res) => res.json())
            .then((data) => setClubData(data))
            .catch((ex) => console.log(ex));
    }, []);
    const HandelChange = () => {
        if (frstName == "" || scndName == "" || brthDate == "" || national == "" || photo == "") {
            setCheck(0);
        }
        else if (!Date.parse(brthDate)) { setCheck(0) }
        else {
            fetch(`${baseUrl}/Coaches/DeleteCoach/${coach[0].id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            })
                .then((res) => res)
                .catch((ex) => console.log(ex));
            fetch(`${baseUrl}/Coaches/AddCoach/${clubID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: 1,
                    birthdate: brthDate,
                    nationality: national,
                    photo: photo,
                    fname: frstName,
                    lname: scndName,
                    clubId: parseInt(clubID),
                    teamManagedNo: 0,
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
            <div className="container">
                <h3 className='row mt-3'>UPDATE COACH INFO AT: {clubData[0].Name}</h3>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Current Coach: ${coach[0].Fname} ${coach[0].Lname}`} aria-label="readonly input example" readonly />
                </div>
                <div className='row mt-4'>
                    <div className='col col-lg-6'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">First Name</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert first name" onChange={HandelFn} />
                            </div>
                        </div>
                    </div>
                    <div className='col col-lg-6'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Last Name</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert last name" onChange={HandelLn} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-6'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Birth Date</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert birth date" onChange={HandelBd} />
                            </div>
                        </div>
                    </div>
                    <div className='col col-lg-6'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Nationallity</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert nationallity" onChange={HandelN} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-6'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Photo Url</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert photo url" onChange={HandelP} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <p>on clicking change the current coach will be replaced with the new Coach</p>
                    <button class="btn btn-info col col-lg-1 mt-4" onClick={() => {
                        HandelChange();
                    }}>Change</button>
                    <button class="btn btn-danger col col-lg-1 mt-4 ms-5" onClick={navback}>Cancel</button>
                </div>
            </div>
            <div className='col col-lg-2 mt-2'>
                {check == 0 ? <h6 style={{ color: "red" }}>Please Insert Data Properly</h6> : check == 1 ? <h6 style={{ color: "green" }}>Updated Successfully</h6> : <p></p>}
            </div>
        </>
    )
}
export default UpdateClubCoach;