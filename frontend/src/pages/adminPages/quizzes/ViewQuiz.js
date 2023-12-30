import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { baseUrl } from "../../../constants/url.constants";
function ViewQuizzes() {
    let { quizid } = useParams();
    const [questions, setQues] = useState([{}]);
    let nav = useNavigate();
    useEffect(() => {
        fetch(`${baseUrl}/Quizzes/GetQuiz/${quizid}`)
            .then((res) => res.json())
            .then((data) => {
                setQues(data);
            }).catch((ex) => console.log(ex));
    }, [])
    const HandelAcc = (e) => {
        if (e) {
            fetch(`${baseUrl}/Quizzes/AcceptOrRefuse/${quizid}/${1}`)
                .then((res) => res)
                .catch((ex) => console.log(ex));
            nav("/quizzes");
        }
        else {
            fetch(`${baseUrl}/Quizzes/deleteQuiz/${quizid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            })
                .then((res) => res)
                .catch((ex) => console.log(ex));
        }
    }
    return (
        <>
            <div className="container">
                <h3 className="row mt-4"> Quiz Name: {questions[0]?.quizname}</h3>
                <div class="row mt-5">
                    <div class="col-4" style={{ maxHeight: "150px", overflowY: "scroll" }}>
                        <div id="list-example" class="list-group">
                            {questions.map((q, ind) => {
                                return (<a class="list-group-item list-group-item-action" href={`#list-item-${ind + 1}`}>Question {ind + 1}</a>)
                            })}
                        </div>
                    </div>
                    <div class="col-8">
                        <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabindex="0" style={{ maxHeight: "100px", overflowY: "scroll" }}>
                            {questions.map((q, ind) => {
                                return (
                                    <>
                                        <h4 id={`list-item-${ind + 1}`}> Question {ind + 1}</h4 >
                                        <p>{q.question_content} {` Answer:  `}<span style={{ color: "green", fontWeight: "bold", fontSize: "larger" }}>{q.answer}</span></p>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <button className="btn btn-success col col-lg-2 my-4 mx-4" onClick={() => {
                        HandelAcc(1);
                    }}>Accept</button>
                    <button className="btn btn-danger col col-lg-2 my-4 mx-4" onClick={() => {
                        HandelAcc(0);
                    }}>Refuse</button>
                </div>
            </div >
        </>
    )
}
export default ViewQuizzes;