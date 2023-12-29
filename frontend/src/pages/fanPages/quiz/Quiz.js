import { Link } from "react-router-dom";
import Dropdown from "../../../components/Dropdown";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../constants/url.constants";
export default function Quiz() {


    const [quizList,setQuizList] = useState();

    useEffect(()=>{
        fetch(`${baseUrl}/Quizzes/AllQuizzes`).then(res=>res.json()).then(data=>setQuizList(data));
    },[])
    
    return (
        <>
            <div className="container">
                <h3 style={{color:"red"}} className="row mt-4">Quizzes</h3>
                <div className="row mt-3">
                    <div className="col col-lg-10">
                        <table className="table">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col">Quiz Name</th>
                                    <th scope="col">Max Points</th>
                                    <th scope="col">Number of Questions</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    quizList?.map((quiz)=>{
                                        return(
                                            <tr>
                                    <td >{quiz.name}</td>
                                    <td >{quiz.maxp}</td>
                                    <td >{quiz.qno}</td>
                                    <td><Link class="btn btn-info" to={`/quiz/${quiz.id}`}>Answer</Link></td>
                                </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
