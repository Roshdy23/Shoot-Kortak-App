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
    const [stadiums, setStadiums] = useState([{ id: 2, name: "Borj" }, { id: 3, name: "Elarab" }, { id: 4, name: "Borj Elarab" }]);
    const [newStadium, setNewStadium] = useState({ id: -1, name: "STADIUMS" });
    const [tickets, setTickts] = useState();
    const [matchChamp, setMatchChamp] = useState("match champonship");
    const [matchStadium, setMatchStadium] = useState("Borj Elarab");
    const [mdata, setMdata] = useState({
        id: 3,
        matchDate: "2023-span-span",
        matchWeekNo: "5",
        matchTeam1: "match team1",
        matchTeam2: "match team2",
        matchChampid: 4,
        matchStadiumid: 2,
    });
    let matchid = useParams();
    useEffect(() => {
        fetch(`${baseUrl}/Matches/GetMatch/${matchid}`)
            .then((res) => res.json())
            .then((data) => setMdata(data)).catch((ex) => console.log(ex));
        fetch(`${baseUrl}/Stadiums/Get`)
            .then((res) => res.json())
            .then((data) => setStadiums(data)).catch((ex) => console.log(ex));
        fetch(`${baseUrl}/Stadiums/Get/${mdata.matchStadiumid}`)
            .then((res) => res.json())
            .then((data) => {
                setTickts(data.capacity);
                setMatchStadium(data.name);
            }
            ).catch((ex) => console.log(ex));
        fetch(`${baseUrl}/Championships/GetChampionship/${mdata.matchChampid}`)
            .then((res) => res.json())
            .then((data) => setMatchChamp(data)).catch((ex) => console.log(ex));
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
                    <input className="form-control" type="text" value={`Championship: ${matchChamp}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Team1: ${mdata.matchTeam1}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Team2: ${mdata.matchTeam2}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Tickets Quantity: ${tickets}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Week Number: ${mdata.matchWeekNo}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Match Date: ${mdata.matchDate}`} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`Match Stadium: ${matchStadium}`} aria-label="readonly input example" readonly />
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
                <button class="btn btn-info col col-lg-1 mt-3" onClick={() => {
                    HandelUpdate();
                }}>Update</button>
            </div>
            <div className='container mt-3'>
                {check == 0 ? <h6 style={{ color: "red" }}>Please Insert Data Properly</h6> : check == 1 ? <h6 style={{ color: "green" }}>Updated Successfully</h6> : <p></p>}
            </div>
        </>
    )
}
export default UpdateMatch;