import DropdownLabel from "../../../components/DropdownWithLabel";
import InputWithLabel from "../../../components/InputWithLabel";
import { Link, useParams } from "react-router-dom";

function MatchResult() {
    return (
        <>
            <div className="container">
                <h3 className="row ms-1 mt-3">ADD MATCH SCORE TO {`{TEAMS OF MATCH NAMES}`}</h3>
                <div className="row mt-3">
                    <DropdownLabel className="col" label="Winner" val={["1", "2", "3"]} />
                </div>
                <div className="row">
                    <InputWithLabel label="Winner Team Score" placeholder="inser winner team score" />
                    <InputWithLabel label="Loser Team Score" placeholder="inser loser team  score" />
                </div>
                <h6 className="row ms-1 mt-3">Click "Add Score" and proceed to add stats</h6>
                <Link class="btn btn-success col col-lg-1 mt-3" to="/results/addresults/stats/team1" > Add Score</Link>
            </div >
        </>
    )
}
export default MatchResult;
