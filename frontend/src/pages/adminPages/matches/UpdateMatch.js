import { useState } from 'react';
import Dropdown from "../../../components/Dropdown";
import DropdownLabel from "../../../components/DropdownWithLabel";
import InputWithLabel from "../../../components/InputWithLabel";
import DateTimePicker from "react-datetime-picker";

function UpdateMatch(props) {
    const [value, onChange] = useState(new Date());
    return (
        <>
            <div className="container">
                <h3 className="row mt-5">UPDATE MATCH</h3>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={"Championship: Match.championnship"} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={"Team1: Match.team1"} aria-label="readonly input example" readonly />
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={"Team2: Match.team2"} aria-label="readonly input example" readonly />
                </div>
                <InputWithLabel label="Update Week#" placeholder="insert new week number" />
                <div className='row mt-3'>
                    <label className='col col-lg-2'>Update The Date and Time</label>
                    <DateTimePicker className='col col-lg-2' onChange={onChange} value={value} />
                </div>
                <div className="row">
                    <label className="col col-lg-4 mt-3">Update The Stadium</label>
                    <Dropdown title="Stadiums" vals={["stad1", "stad2", "stad3", "stad4", "stad5", "stad6"]} />
                </div>
                <InputWithLabel label="Update Tickets Quantity" placeholder="insert new tickets quantity" />
                <button class="btn btn-info col col-lg-1" >Update</button>
            </div>
        </>
    )
}
export default UpdateMatch;