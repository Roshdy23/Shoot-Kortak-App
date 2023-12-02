import DropdownLabel from "../../../components/DropdownWithLabel";
import InputWithLabel from "../../../components/InputWithLabel";
import { Link } from "react-router-dom";

function AddStats(props) {
    if (props.nxt === "1") {
        return (
            <>
                <div className="container">
                    <h3 className="row mt-3">ADD PLAYERS STATISTICS</h3>
                    <DropdownLabel label="{team 1 name}" val={["one", "two", "three"]} />
                    <InputWithLabel label="Goals" placeholder="insert number of goals" />
                    <InputWithLabel label="Assists" placeholder="insert number of assists" />
                    <InputWithLabel label="Saves" placeholder="insert number of saves" />
                    <InputWithLabel label="Tackels" placeholder="insert number of tackels" />
                    <InputWithLabel label="Clean Sheets" placeholder="insert number of clean sheets" />
                    <button class="btn btn-success col col-lg-1 mt-3">Add</button>
                    <h6 className="mt-3">Click "Finish" and proceed to other team's players</h6>
                    <Link class="btn btn-danger col col-lg-2 mt-3" to="/results/addresults/stats/team2">Finish</Link>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="container">
                <h3 className="row mt-3">ADD PLAYERS STATISTICS</h3>
                <DropdownLabel label="{team 2 name}" val={["one", "two", "three"]} />
                <InputWithLabel label="Goals" placeholder="insert number of goals" />
                <InputWithLabel label="Assists" placeholder="insert number of assists" />
                <InputWithLabel label="Saves" placeholder="insert number of saves" />
                <InputWithLabel label="Tackels" placeholder="insert number of tackels" />
                <InputWithLabel label="Clean Sheets" placeholder="insert number of clean sheets" />
                <button class="btn btn-success col col-lg-1 mt-3">Add</button>
            </div>
        </>
    )
}
export default AddStats;