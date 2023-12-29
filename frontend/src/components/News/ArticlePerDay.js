import { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { Link } from "react-router-dom";
import { baseUrl } from "../../constants/url.constants";
export default function ArticlePerDay()
{
    const time = new Date();
    const [currTime,setCurrTime]= useState(time);
    const [articles,setArticles] = useState([{}]);
    const [rfrsh,refresh] = useState(0);
    useEffect(()=>{
        fetch(`${baseUrl}/Articles/Getbydate?date=${datify()}`).then(res=>res.json()).then(data=>{setArticles(data);})
    },[currTime])
    function getTomorrow(){
        let tom = new Date(currTime);
        tom.setDate(tom.getDate()+1);
        setCurrTime(tom);
    }
    function getYesterday(){
        let yest = new Date(currTime);
        yest.setDate(yest.getDate()-1);
        setCurrTime(yest);
    }
    function datify()
        {
            let date = currTime.toLocaleDateString();
            let strs = date.split('/');
            return (strs[2]+'-'+strs[0]+'-'+strs[1])
        }
    
    return(
        <>
        <div style={{textAlign:"center",height:"20vh",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
        <button type="button" style={{height:"35px"}} className="btn btn-secondary me-2" data-bs-toggle="tooltip" data-bs-placement="top" onClick={getYesterday} title="previous day">&lt;</button>
        <DatePicker onChange={setCurrTime} value={currTime}/>
        <button type="button" style={{height:"35px"}} className="btn btn-secondary me-2" data-bs-toggle="tooltip" data-bs-placement="top" onClick={getTomorrow} title="next day">&gt;</button>
        </div>
        {(articles.length)?(
        <div style={{borderTop:"solid rgb(0,0,0,0.1) 1px",height:"70vh",overflowY:"scroll"}}>
                        {
                            articles.map((article,key)=>{
                                return (<div key={key} className="card">
                                <img src={article.img} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{article.title}</h5>
                                    <Link to={`/article/${article.name}`} className="btn btn-primary">Read more</Link>
                                </div>
                            </div>)
                            })
                        }
        </div>
        ):
        <h3>No articles posted at this date</h3>
}
        </>
    )

}