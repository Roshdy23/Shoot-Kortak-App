import DropdownLabel from "../../../components/DropdownWithLabel";
import Dropdown from "../../../components/Dropdown"
import { Link } from "react-router-dom";
function Results() {
    return (
        <>
            <div className="container">
                <div className="row mt-3">
                    <h3>ADD MATCHES RESULTS</h3>
                </div>
                <div className="row mt-5">
                    <h4 className="col-3">Choose a Championship</h4>
                    <Dropdown className="col-3" title="Championships" vals={["on1", "tw2", "thre3", "fou4"]} />
                </div>
                <div className="row mt-5">
                    <h4 className="col-3">Choose a Match</h4>
                    {/* <div className="col-1"></div> */}
                    <Dropdown className="col-3" title="Matches" vals={["on1", "tw2", "thre3", "fou4"]} />
                </div>
                <Link class="btn btn-success col col-lg-2 mt-5" to="/results/addresults">Add Result</Link>
            </div>
        </>
    )
}
export default Results;