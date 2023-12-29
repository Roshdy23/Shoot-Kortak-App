import DropdownLabel from "../../../components/DropdownWithLabel";
import InputWithLabel from "../../../components/InputWithLabel";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { baseUrl } from "../../../constants/url.constants";
function AddStats(props) {
    let { matchId } = useParams();
    const [mat, setmat] = useState([{}]);
    const [players, setPlayers] = useState([{}]);
    const [players2, setPlayers2] = useState([{}]);

    const [player, setPlayer] = useState({});
    const [goals, setGoals] = useState("");

    const [ass, setAss] = useState("");
    const [saves, setSaves] = useState("");

    const [tackle, setTackle] = useState("");

    const [clean, setClean] = useState("");
    const [check, setCheck] = useState(-1);
    const [club2id, setClub2Id] = useState([{}]);

    const HandelGoals = (e) => {
        setGoals(e.target.value);
    }
    const HandelAss = (e) => {
        setAss(e.target.value);
    }
    const HandelSaves = (e) => {
        setSaves(e.target.value);
    }
    const HandelTackle = (e) => {
        setTackle(e.target.value);
    }
    const HandelClean = (e) => {
        setClean(e.target.value);
    }
    useEffect(() => {
        fetch(`${baseUrl}/Matches/GetMatch/${matchId}`)
            .then((res) => res.json())
            .then((data) => {
                setmat(data);
            }).catch((ex) => console.log(ex));
        fetch(`${baseUrl}/Matches/GetClubPlayersFromMatId/${matchId}/${1}`)
            .then((res) => res.json())
            .then((data) => {
                setPlayers(data);
            }).catch((ex) => console.log(ex));
        fetch(`${baseUrl}/Matches/GetClubPlayersFromMatId/${matchId}/${0}`)
            .then((res) => res.json())
            .then((data) => {
                setPlayers2(data);
            }).catch((ex) => console.log(ex));
        fetch(`${baseUrl}/Matches/GetSecondClubId/${matchId}`)
            .then((res) => res.json())
            .then((data) => {
                setClub2Id(data);
            }).catch((ex) => console.log(ex));
    }, [])
    const handelAdd = () => {
        if (goals == "" || saves == "" || tackle == "" || clean == "" || ass == "") {
            setCheck(0);
        }
        else if (isNaN(goals) || isNaN(ass) || isNaN(clean) || isNaN(tackle) || isNaN(saves)) { setCheck(0) }
        else {
            fetch(`${baseUrl}/Stats/Add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    championshipId: mat[0].championshipid,
                    playerId: player.id,
                    saves: saves,
                    assists: ass,
                    goals: goals,
                    tackles: tackle,
                    cleanSheets: clean
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    setPlayers(data);
                }).catch((ex) => console.log(ex));
            setCheck(1);
        }
        setTimeout(() => {
            setCheck(-1);
        }, 1000);
    }
    if (props.nxt == "1") {
        return (
            <>
                <div className="container">
                    <h3 className="row mt-3">ADD PLAYERS STATISTICS: {mat[0].club1} VS {mat[0].club2}</h3>
                    <div className="row mt-3">
                        <div className="input-group col">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">{mat[0].club1} Players</label>
                        </div>
                        <div className="dropdown col">
                            <button className="btn btn-black dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                PLAYERS
                            </button>
                            <ul className="dropdown-menu">
                                {players.map((pl, index) => (
                                    <li><button key={index + 1} className="dropdown-item" onClick={() => {
                                        setPlayer(pl);
                                    }}>{pl?.Name}</button></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                        <input className="form-control" type="text" value={`player name: ${player?.Name}`} aria-label="readonly input example" readonly />
                    </div>
                    <div className='row mt-2'>
                        <div className='col col-lg-9'>
                            <div className="row mb-3">
                                <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Goals</label>
                                <div class="col-sm-10 col-lg-6">
                                    <input type="text" className="form-control" id="colFormLabel" placeholder="insert number of goals" onChange={HandelGoals} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col col-lg-9'>
                            <div className="row mb-3">
                                <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Assists</label>
                                <div class="col-sm-10 col-lg-6">
                                    <input type="text" className="form-control" id="colFormLabel" placeholder="insert number of assists" onChange={HandelAss} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col col-lg-9'>
                            <div className="row mb-3">
                                <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Saves</label>
                                <div class="col-sm-10 col-lg-6">
                                    <input type="text" className="form-control" id="colFormLabel" placeholder="insert number of saves" onChange={HandelSaves} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col col-lg-9'>
                            <div className="row mb-3">
                                <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Tackels</label>
                                <div class="col-sm-10 col-lg-6">
                                    <input type="text" className="form-control" id="colFormLabel" placeholder="insert number of tackels" onChange={HandelTackle} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col col-lg-9'>
                            <div className="row mb-3">
                                <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Clean Sheets</label>
                                <div class="col-sm-10 col-lg-6">
                                    <input type="text" className="form-control" id="colFormLabel" placeholder="insert number of clean sheets" onChange={HandelClean} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-success col col-lg-1 mt-3" onClick={() => {
                        handelAdd();
                    }}>Add</button>
                    <div className='container mt-3'>
                        {check == 0 ? <h6 style={{ color: "red" }}>Please Insert All The Data Properly</h6> : check == 1 ? <h6 style={{ color: "green" }}>Added Successfully</h6> : <p></p>}
                    </div>
                    <h6 className="mt-3">Click "Finish" and proceed to other team's players</h6>
                    <Link class="btn btn-danger col col-lg-2 mt-3" to={`/results/addresults/stats/team2/${club2id[0].id}`}>Finish</Link>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="container">
                <h3 className="row mt-3">ADD PLAYERS STATISTICS: {mat[0].club1} VS {mat[0].club2}</h3>
                <div className="row mt-3">
                    <div className="input-group col">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">{mat[0].club2} Players</label>
                    </div>
                    <div className="dropdown col">
                        <button className="btn btn-black dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            PLAYERS
                        </button>
                        <ul className="dropdown-menu">
                            {players2.map((pl, index) => (
                                <li><button key={index + 1} className="dropdown-item" onClick={() => {
                                    setPlayer(pl);
                                }}>{pl?.Name}</button></li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="row mt-3" style={{ maxWidth: "49%", marginLeft: "1px" }}>
                    <input className="form-control" type="text" value={`player name: ${player?.Name}`} aria-label="readonly input example" readonly />
                </div>
                <div className='row mt-2'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Goals</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert number of goals" onChange={HandelGoals} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Assists</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert number of assists" onChange={HandelAss} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Saves</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert number of saves" onChange={HandelSaves} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Tackels</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert number of tackels" onChange={HandelTackle} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className='col col-lg-9'>
                        <div className="row mb-3">
                            <label for="colFormLabel" className="col-sm-2 col-form-label clo-lg-3">Clean Sheets</label>
                            <div class="col-sm-10 col-lg-6">
                                <input type="text" className="form-control" id="colFormLabel" placeholder="insert number of clean sheets" onChange={HandelClean} />
                            </div>
                        </div>
                    </div>
                </div>
                <button class="btn btn-success col col-lg-1 mt-3" onClick={() => {
                    handelAdd();
                }}>Add</button>
                <div className='container mt-2'>
                    {check == 0 ? <h6 style={{ color: "red" }}>Please Insert All The Data Properly</h6> : check == 1 ? <h6 style={{ color: "green" }}>Added Successfully</h6> : <p></p>}
                </div>
            </div>
        </>
    )
}
export default AddStats;