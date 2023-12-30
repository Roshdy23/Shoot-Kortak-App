import { useEffect, useState } from 'react';
import Dropdown from "../../../components/Dropdown";
import DropdownLabel from "../../../components/DropdownWithLabel";
import InputWithLabel from "../../../components/InputWithLabel";
import DatePicker from "react-date-picker";
import { useParams } from 'react-router-dom';
import { baseUrl } from '../../../constants/url.constants';

function UpdateMatch(props) {
    const [check, setCheck] = useState(-1);
    const [newDate, setNewDate] = useState(new Date());
    const [stadiums, setStadiums] = useState([{}]);
    const [newStadium, setNewStadium] = useState({ id: -1, name: "STADIUMS" });
    const [tickets, setTickts] = useState("");
    const [matchChamp, setMatchChamp] = useState("");
    const [matchStadium, setMatchStadium] = useState("");
    const [mdata, setMdata] = useState([{}]);
    let { updatematchID } = useParams();
    useEffect(() => {
        fetch(`${baseUrl}/Matches/GetMatch/${updatematchID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((res) => res.json())
            .then((data) => { setMdata(data) }).catch((ex) => console.log(ex));

        fetch(`${baseUrl}/Stadiums/Get`)
            .then((res) => res.json())
            .then((data) => setStadiums(data)).catch((ex) => console.log(ex));
    }, [])
    const HandelUpdate = () => {
        let comp = new Date().toLocaleDateString();
        let tmp = newDate.toLocaleDateString();
        if (newStadium.name == "STADIUMS" && tmp == comp) { setCheck(0) }
        else {
            let newSt = newStadium.id == -1 ? mdata.matchStadiumid : newStadium.id;
            fetch(`${baseUrl}/Matches/Update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: mdata.id,
                    matchNewDate: tmp,
                    matchNewStadium: newSt
                })
            })
                .then((res) => res)
                .catch((ex) => console.log(ex));
            setCheck(1);
        }
        setTimeout(() => {
            // set a timer to hide the element after 3 seconds
            setCheck(-1);
        }, 1000);
    }
    return (
        <>
            <div className="container">
                <h3 className="row mt-5">UPDATE MATCH</h3>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Championship: ${mdata[0].championshipName}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Team1: ${mdata[0].club1}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Team2: ${mdata[0].club2}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Tickets Quantity: ${tickets}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Week Number: ${mdata[0].weekno}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Match Date: ${mdata[0].matchDate}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Match Stadium: ${mdata[0].stadiumName}`} aria-label="readonly input example" readonly />
                </div>
                <div className='row mt-4'>
                    <label className='col col-lg-2'>Update The Match Date</label>
                    <DatePicker className='col col-lg-2' onChange={setNewDate} value={newDate} />
                </div>
                <div className="row mt-4">
                    <label className="col col-lg-4 mt-3">Update The Match Stadium</label>
                    <div className="dropdown col col-lg-1 mt-2">
                        <button className="btn btn-secondary dropdown-toggle mt-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {newStadium.name}
                        </button>
                        <ul className="dropdown-menu">
                            {stadiums.map((value, index) => (
                                <li><button key={index + 1} className="dropdown-item" onClick={() => {
                                    setNewStadium(value);
                                }}>{value.name}</button></li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='row mb-5'>
                    <button class="btn btn-info col col-lg-1 mt-3" onClick={() => {
                        HandelUpdate();
                    }}>Update</button>
                    <div className='col mt-3'>
                        {check == 0 ? <h6 style={{ color: "red" }}>Please Insert Data Properly</h6> : check == 1 ? <h6 style={{ color: "green" }}>Updated Successfully</h6> : <p></p>}
                    </div>
                </div>
            </div>
        </>
    )
}
export default UpdateMatch;