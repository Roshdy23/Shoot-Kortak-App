import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../fanPages/quiz/quiz.css"
import { useNavigate } from "react-router-dom";
export default function CreateQuiz() {
    const navigate = useNavigate();
    const {quizId} = useParams();
    const [quiz,setQuiz] = useState({});
    const [currQuestion,setCurrQuestion] = useState({});
    const [currInd,setCurrInd] = useState(0);
    const initAnswers = () =>{
        let array = [];
            for(let i=0;i<quiz.questions?.length;i++)
                array.push(-1);
            return array;
    }
    const [answers,setAnswers] = useState(initAnswers());
    const [unfinished,setUnfinished] = useState(false);
    const [s,refresh] = useState(0);
    console.log(answers);
    console.log(currQuestion?.title);
    console.log(quiz)
    useEffect(()=>{
        setQuiz({
            name:"",
            id:Math.abs(Math.random())+1,
            questions:[
                
                {title:"",
                choices:[],
                answer:""
            }
            ]
        });
    },[quizId])
    
    useEffect(()=>{
            setCurrQuestion(quiz.questions?.at(currInd))
    },[quiz,currInd])

    useEffect(()=>{
        if(s<1){refresh(s+1)}else{refresh(s-1)};
    },[currQuestion])

    const submit = () =>{
        if(!answers.includes(-1))
            navigate("/PendingQuizzes");
        else{
            setUnfinished(true);
        }
    }

    return (
        <>
            <div style={{padding:"20px",display:"flex"}}>
                <div style={{width:"30vw",padding:"5px"}}>
                    <label for="quizName">Quiz Name</label>
                <input id="quizName" onChange={(e)=>{const tempq = quiz; tempq.name=e.target.value; setQuiz(tempq); if(s<1){refresh(s+1)}else{refresh(s-1)}}} style={{margin:"15px"}} className="row mt-4"/>
                    <div >
                        <div id="list-example" class="list-group">
                            {  
                                quiz.questions?.map((qu,ind)=>{
                                    return <div onClick={()=>{setCurrQuestion(quiz.questions?.at(ind)); setCurrInd(ind)}} style={(currQuestion===quiz.questions?.at(ind))?{backgroundColor:"rgb(13,110,253)",color:"white"}:{}} class="list-group-item list-group-item-action" href="#list-item-1">Question {ind+1}</div>
                                })
}
                        </div>
                        <div style={{display:"flex",flexDirection:"column"}}>
                            <div style={{display:"flex", width:"100%",justifyContent:"space-between"}}>

                        <Button onClick={()=>{const tempq = quiz; tempq.questions?.push({title:"",choices:[],answer:""}); setQuiz(tempq); setCurrInd(currInd+1);}} style={{width:"1vw",marginTop:"2vh"}} className={"btn btn-success"}>+</Button>

                        { (currInd!==0)?<Button onClick={()=>{const tempq = quiz; tempq.questions?.splice(currInd,1); setQuiz(tempq); setCurrInd(currInd-1);}} style={{width:"1vw",marginTop:"2vh"}} className={"btn btn-danger"}>-</Button>:<></>}
                            </div>
                        <Button onClick={submit} style={{width:"8vw",marginTop:"2vh"}} className={"btn btn-success"}>Submit</Button>
                        </div>
                    </div>
                </div>
                    <div style={{padding:"15px",display:"flex",flexDirection:"column"}}>
                        <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabindex="0" >
                            <h2 style={{paddingBottom:"15px"}} id="list-item-1">Question {currInd+1}</h2>
                            <input value={quiz.questions?.at(currInd).title} id="quesTitle"placeholder="Enter question"  onChange={(e)=>{const tempq = quiz; tempq.questions[currInd].title=e.target.value; setQuiz(tempq); if(s<1){refresh(s+1)}else{refresh(s-1)}}} style={{margin:"15px"}} className="row mt-4"/>
                            <input value={quiz.questions?.at(currInd).answer} id="quesTitle"placeholder="Enter answer"  onChange={(e)=>{const tempq = quiz; tempq.questions[currInd].answer=e.target.value; setQuiz(tempq); if(s<1){refresh(s+1)}else{refresh(s-1)}}} style={{margin:"15px"}} className="row mt-4"/>
                            <Button onClick={()=>{const tempq = quiz; tempq.questions?.at(currInd)?.choices?.push(""); setQuiz(tempq); if(s<1){refresh(s+1)}else{refresh(s-1)}}} style={{width:"1vw",marginTop:"2vh"}} className={"btn btn-success"}>+</Button>
                            <div style={{display:"flex",height:"50vh",justifyContent:"space-around",flexWrap:"wrap",width:"70vw",alignItems:"center"}}>
                                { currQuestion?.choices?.map((ch,ind)=>
                                <div className="option">
                            <input value={ch} id="quesTitle"placeholder="Enter answer"  onChange={(e)=>{const tempq = quiz; tempq.questions[currInd].choices?(tempq.questions[currInd].choices[ind]=e.target.value):((s<1)?(refresh(s+1)):(refresh(s-1))); setQuiz(tempq); if(s<1){refresh(s+1)}else{refresh(s-1)}}} style={{margin:"15px",zIndex:"9"}} className="row mt-4"/>
                                <Button onClick={()=>{const tempq = quiz; tempq.questions?.at(currInd)?.choices?.splice(ind,1); setQuiz(tempq); if(s<1){refresh(s+1)}else{refresh(s-1)}}} className="btn btn-danger"> -
                                </Button>
                                </div>
                            )}
                            </div>
                        <div style={{display:"flex",backgroundColor:"white"}}>
{ (currInd!==0)?
                            <Button onClick={()=>{setCurrInd(currInd-1)}} style={{width:"8vw",position:"absolute",left:"33vw",marginTop:"2vh"}} className={"btn-outline-secondary"}>Previous</Button>:<></>
}{(currInd!==quiz.questions?.length-1)?
                            <Button onClick={()=>{setCurrInd(currInd+1)}} style={{width:"8vw",position:"absolute",right:"6vw",marginTop:"2vh"}} className={"btn btn-secondary"}>Next</Button>:<></>
}
                        </div>
                        </div>
                    </div>
            </div>
        </>
    )
}