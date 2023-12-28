import DropdownLabel from "../../../components/DropdownWithLabel";
import InputWithLabel from "../../../components/InputWithLabel";
import { Link, useParams } from "react-router-dom";

function MatchResult() {
    const HandelClub1 = () => {

    }
    const HandelClub2 = () => {

    }
    return (
        <>
            <div className="container">
                <h3 className="row ms-1 mt-3">ADD MATCH SCORE</h3>
                <div className='row mt-5'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">{`Club1 name`} Score</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert score" onChange={HandelClub1} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">{`Club2 name`} Score</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert score" onChange={HandelClub2} />
                            </div>
                        </div>
                    </div>
                </div>
                <h6 className="row ms-1 mt-3">Click "Add Score" and Proceed to add Players Statistics</h6>
                <Link class="btn btn-success col col-lg-2 mt-3" to="/results/addresults/stats/team1" > Add Score</Link>
            </div >
        </>
    )
}
export default MatchResult;
