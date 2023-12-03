import { useState } from "react";
import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { Link } from "react-router-dom";
export default function ArticlePerDay()
{
    const time = new Date();
    const [currTime,setCurrTime]= useState(time);
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
     let articles = 
    [{
        id:5,
        title: "Eastern company wins the title race for first time ever!",
        pic: "https://scontent.fcai20-4.fna.fbcdn.net/v/t39.30808-6/301890292_441277618023107_9171654543944456370_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=ppbdG-IXS1AAX_MUQ5w&_nc_ht=scontent.fcai20-4.fna&oh=00_AfAUqlbghIt4sXK79mKVMsPuMGRJG2oXxIeNebKHXROsnQ&oe=656E63D0"
    },
    {
        id:5,
        title: "Al Ahly seals Zizo from Zamalek for the third time in a row!",
        pic: "https://ar.elganna.com/wp-content/uploads/2023/08/ipiccy_image-4-4-800x500.jpg"
    }
    ]
    
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
                                <img src={article.pic} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{article.title}</h5>
                                    <Link to={`/article/${article.id}`} className="btn btn-primary">Read more</Link>
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