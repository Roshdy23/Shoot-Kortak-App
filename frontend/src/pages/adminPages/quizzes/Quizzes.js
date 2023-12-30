import { Link } from "react-router-dom";
import Dropdown from "../../../components/Dropdown";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../constants/url.constants";
function Quizzes() {
    const [jous, setJous] = useState([{}]);
    const [jou, setJou] = useState([{}]);
    const [quizzes, setQuizzes] = useState([{}]);

    useEffect(() => {
        fetch(`${baseUrl}/Journalist/Get`)
            .then((res) => res.json())
            .then((data) => {
                setJous(data);
            }).catch((ex) => console.log(ex));
        fetch(`${baseUrl}/Quizzes/getPendingQuizzes`)
            .then((res) => res.json())
            .then((data) => {
                setQuizzes(data);
            }).catch((ex) => console.log(ex));
    }, [])
    const HandelFilter = (j) => {
        if (j.id != -1) {
            fetch(`${baseUrl}/Quizzes/getPendingQuizzesOfJour/${j.id}`)
                .then((res) => res.json())
                .then((data) => {
                    setQuizzes(data);
                }).catch((ex) => console.log(ex));
        }
        else {
            fetch(`${baseUrl}/Quizzes/getPendingQuizzes`)
                .then((res) => res.json())
                .then((data) => {
                    setQuizzes(data);
                }).catch((ex) => console.log(ex));
        }
    }
    return (
        <>
            <div className="container">
                <h3 className="row mt-4">Quizzes</h3>
                <div className="row mt-3">
                    <div className="col col-lg-10">
                        <table className="table">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col">Journalist</th>
                                    <th scope="col">Quiz Name</th>
                                    <th scope="col">Max Points</th>
                                    <th scope="col">Number of Questions</th>
                                    <th scope="col">State</th>
                                    <th scope="col">View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quizzes.map((jou, ind) => {
                                    return (
                                        <tr>
                                            <td>{jou.jname}</td>
                                            <td >{jou.name}</td>
                                            <td >{parseInt(jou.noQuestions) * 10}</td>
                                            <td >{jou.noQuestions}</td>
                                            <td >{jou.state}</td>
                                            <td><Link class="btn btn-info" to={`/quizzes/view/${jou.id}`}>View</Link></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="dropdown col col-lg-2">
                        <h5>Filter Quizzes</h5>
                        <div className="row">
                            <div className="dropdown col col-lg-1 mt-2">
                                <button className="btn btn-secondary dropdown-toggle mt-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Journalists
                                </button>
                                <ul className="dropdown-menu">
                                    <li><button key={0} className="dropdown-item" onClick={() => {
                                        HandelFilter({ id: -1 });
                                    }}>All Quizzes</button></li>
                                    {jous.map((j, index) => (
                                        <li><button key={index + 1} className="dropdown-item" onClick={() => {
                                            HandelFilter(j);
                                        }}>{j.fname} {j.lname}</button></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Quizzes;
