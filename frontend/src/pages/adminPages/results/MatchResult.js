import { useEffect, useState } from "react";
import DropdownLabel from "../../../components/DropdownWithLabel";
import InputWithLabel from "../../../components/InputWithLabel";
import { Link, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../../constants/url.constants";
function MatchResult() {
    let { matchId } = useParams();
    const [mat, setmat] = useState([{}]);
    const [c1, setC1] = useState("");
    const [c2, setC2] = useState("");
    const [check, setCheck] = useState(-1);
    let nav = useNavigate();
    useEffect(() => {
        fetch(`${baseUrl}/Matches/GetMatch/${matchId}`)
            .then((res) => res.json())
            .then((data) => {
                setmat(data);
                console.log(data);
            }).catch((ex) => console.log(ex));
    }, [])
    const HandelClub1 = (e) => {
        setC1(e.target.value);
    }
    const HandelClub2 = (e) => {
        setC2(e.target.value);
    }
    const HandelAdd = () => {
        if (c1 == "" || c2 == "") {
            setCheck(0);
        }
        else if (isNaN(c1) || isNaN(c2)) { setCheck(0) }
        else {
            let uu = c1 + '-' + c2;
            fetch(`${baseUrl}/Matches/addResultTofinishedMatch/${matchId}/${uu}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify()
            }).then((res) => res)
                .catch((ex) => console.log(ex));
            setCheck(1);
            nav(`/results/addresults/stats/team1/${matchId}`);
        }
    }
    return (
        <>
            <div className="container">
                <h3 className="row ms-1 mt-3">ADD MATCH SCORE</h3>
                <div className='row mt-5'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">{mat[0].club1} Score</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert score" onChange={HandelClub1} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-5">{mat[0].club2}  Score</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert score" onChange={HandelClub2} />
                            </div>
                        </div>
                    </div>
                </div>
                <h6 className="row ms-1 mt-3">Click "Add Score" and Proceed to add Players Statistics</h6>
                <button class="btn btn-success col col-lg-2 mt-3" onClick={() => {
                    HandelAdd();
                }} > Add Score</button>
            </div >
            <div className='container mt-3'>
                {check == 0 ? <h6 style={{ color: "red" }}>Please Insert All The Data Properly</h6> : check == 1 ? <h6 style={{ color: "green" }}>Added Successfully</h6> : <p></p>}
            </div>
        </>
    )
}
export default MatchResult;
