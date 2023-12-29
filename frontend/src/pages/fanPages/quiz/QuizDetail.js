import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./quiz.css"
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../constants/url.constants";
export default function QuizDetail() {

    const navigate = useNavigate();
    const {quizId} = useParams();
    const [quiz,setQuiz] = useState({});
    const [currQuestion,setCurrQuestion] = useState({});
    const [currInd,setCurrInd] = useState(0);
    const [answers,setAnswers] = useState([]);
    const [unfinished,setUnfinished] = useState(false);
    const [s,refresh] = useState(0);
    console.log(answers);
    console.log(currQuestion?.title);
    console.log(quiz)
    useEffect(()=>{
        fetch(`${baseUrl}/Quizzes/GetQuiz/${quizId}`).then(res=>res.json()).then(data=>{console.log(data); setQuiz(data); refresh(s?0:1)})
        //setQuiz(quizzes.find((qu)=>qu.id===parseInt(quizId)));
    },[quizId])
    
    useEffect(()=>{
            setCurrQuestion(quiz.questions?.at(0))
            let array = [];
            for(let i=0;i<quiz.questions?.length;i++)
                array.push(-1);
            setAnswers(array);
    },[quiz])

    useEffect(()=>{
        setCurrQuestion(quiz?.questions?.at(currInd));
    },[currInd])
    useEffect(()=>{
        if(s<1){refresh(s+1)}else{refresh(s-1)};
    },[currQuestion])
    const submit = () =>{
        if(!answers.includes(-1))
            navigate("/quiz");
        else{
            setUnfinished(true);
        }
    }
    return (
        <>
            <div style={{padding:"20px",display:"flex"}}>
                <div style={{width:"30vw",padding:"5px"}}>
                <h3 style={{marginLeft:"0px"}} className="row mt-4">{quiz.name}</h3>
                    <div >
                        <div id="list-example" class="list-group">
                            {  
                                quiz.questions?.map((qu,ind)=>{
                                    return <div onClick={()=>{setCurrQuestion(quiz.questions?.at(ind)); setCurrInd(ind)}} style={(currQuestion===quiz.questions?.at(ind))?{backgroundColor:"rgb(13,110,253)",color:"white"}:{}} class="list-group-item list-group-item-action" href="#list-item-1">Question {ind+1}</div>
                                })
}
                        </div>
                        <Button onClick={submit} style={{width:"8vw",marginTop:"2vh"}} className={"btn btn-success"}>Submit</Button>
                        {
                            (unfinished)?
                        <h5 style={{color:"red"}}>answers all questions first</h5>:<></>
}
                    </div>
                </div>
                    <div style={{padding:"15px",display:"flex",flexDirection:"column"}}>
                        <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabindex="0" >
                            <h2 style={{paddingBottom:"15px"}} id="list-item-1">Question {currInd+1}</h2>
                            <h6>{currQuestion?.title}</h6>
                            <div style={{display:"flex",height:"50vh",justifyContent:"space-around",flexWrap:"wrap",width:"70vw",alignItems:"center"}}>
                                { currQuestion?.choices?.map((ch)=>
                            <Button onClick={()=>{let array = answers; array[currInd]=ch; setAnswers(answers); if(s<1){refresh(s+1)}else{refresh(s-1)}}} className={(answers?.at(currInd)===ch)?("selected-option"):("qoption")}>{ch}</Button>
                            )}
                            </div>
                        <div style={{display:"flex",backgroundColor:"white"}}>
{ (currInd!==0)?
                            <Button onClick={()=>{setCurrInd(currInd-1)}} style={{width:"8vw",position:"absolute",left:"33vw",marginTop:"2vh"}} className={"btn-outline-secondary"}>Previous</Button>:<></>
}{(currInd!==answers.length-1)?
                            <Button onClick={()=>{setCurrInd(currInd+1)}} style={{width:"8vw",position:"absolute",right:"6vw",marginTop:"2vh"}} className={"btn btn-secondary"}>Next</Button>:<></>
}
                        </div>
                        </div>
                    </div>
            </div>
        </>
    )
}

const quizzes = 
[
    {
        id:1,
        name:"yalhwy yalhwy",
        questions: [{
        title:"elso2al el awwal?",
        choices:[
            12,
            13,
            60,
            69
        ]
    },
    {
        title:"elso2al eltany?",
        choices:[
            12,
            13,
            60,
            69
        ]
    },
    {
        title:"elso2al eltalet?",
        choices:[
            12,
            13,
            60,
            69
        ]
    },
    {
        title:"elso2al elrabe3?",
        choices:[
            12,
            13,
            60,
            69
        ]
    },
    {
        title:"elso2al elkhames?",
        choices:[
            12,
            13,
            60,
            69
        ]
    }]

},
    {
        id:2,
        name:"3ala eh",
        questions: [{
        title:"elso2al el awal ?",
        choices:[
            12,
            13,
            60,
            69
        ]
    },
    {
        title:"elso2al el tany?",
        choices:[
            12,
            13,
            60,
            69
        ]
    },
    {
        title:"elso2al eltalet?",
        choices:[
            12,
            13,
            60,
            69
        ]
    },
    {
        title:"elso2al elrabe3?",
        choices:[
            12,
            13,
            60,
            69
        ]
    },
    {
        title:"elso2al elkhames?",
        choices:[
            12,
            13,
            60,
            69
        ]
    },
    {
        title:"how elso2al elsades",
        choices:[
            12,
            13,
            60,
            69
        ]
    }]

},
    {
        id:3,
        name:"mlok elta7lel",
        questions: [{
        title:"elso2al elawwal?",
        choices:[
            12,
            13,
            60,
            69
        ]
    },
    {
        title:"elso2al eltany?",
        choices:[
            12,
            13,
            60,
            69
        ]
    },
    {
        title:"elso2al eltalet?",
        choices:[
            12,
            13,
            60,
            69
        ]
    },
    {
        title:"elso2al elrabe3?",
        choices:[
            12,
            13,
            60,
            69
        ]
    },
    {
        title:"elso2al el5ames?",
        choices:[
            12,
            13,
            60,
            69
        ]
    },
    {
        title:"elso2al elsades?",
        choices:[
            12,
            13,
            60,
            69
        ]
    },
    {
        title:"elso2al elsabe3?",
        choices:[
            12,
            13,
            60,
            69
        ]
    }]

},
]