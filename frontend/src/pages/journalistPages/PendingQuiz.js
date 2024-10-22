

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


export default function PendingQuizzes(){

    const [quizList,setQuizList] = useState();

    useEffect(()=>{
        setQuizList([
            {
                id:1,
                journalist:"Reda abd-elal",
                name:"yalhwyy yalhwyy",
                maxp:10,
                qno:5
            },
            {
                id:2,
                journalist:"Shobeir",
                name:"Enta Btdhk 3la eh ya shobeir",
                maxp:12,
                qno:6
            },
            {
                id:3,
                journalist:"Tamer we Ezz",
                name:"Mlook Eltahlel",
                maxp:15,
                qno:7
            }
        ])
    },[])


    return (
        <>
            <div className="container">
                <h3 style={{color:"red"}} className="row mt-4">Quizzes</h3>
                <div className="row mt-3">
                <Link class="btn btn-info" to={`/CreateQuiz`}>Create new quiz</Link>
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
                                    <td><Link class="btn btn-info" to={`/EditQuiz/${quiz.id}`}>Edit</Link></td>
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

