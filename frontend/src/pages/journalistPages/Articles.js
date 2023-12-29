import { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { Link } from "react-router-dom";
import { baseUrl } from "../../constants/url.constants";
export default function Articles({user})
{
    const [articles,setArticles] = useState();
    useEffect(()=>{
        fetch(`${baseUrl}/Articles/GetArtsBySSN/${user?.ssn}`).then(res=>res.json()).then(data=>setArticles(data));
    },[user])
    //  let articles = 
    // [{
    //     name:5,
    //     title: "Eastern company wins the title race for first time ever!",
    //     img: "https://scontent.fcai20-4.fna.fbcdn.net/v/t39.30808-6/301890292_441277618023107_9171654543944456370_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=ppbdG-IXS1AAX_MUQ5w&_nc_ht=scontent.fcai20-4.fna&oh=00_AfAUqlbghIt4sXK79mKVMsPuMGRJG2oXxIeNebKHXROsnQ&oe=656E63D0"
    // },
    // {
    //     name:5,
    //     title: "Al Ahly seals Zizo from Zamalek for the third time in a row!",
    //     img: "https://ar.elganna.com/wp-content/uploads/2023/08/ipiccy_image-4-4-800x500.jpg"
    // }
    // ]
    
    return(
        <div  style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around"}}>
        <div style={{width:"60vw",margin:"5vh"}} className="card">
                                <div  className="card-body">
                                    <h5 className="card-title">Post new article</h5>
                                    <Link to={`/articles/create`} className="btn btn-primary">Create</Link>
                                </div>
                            </div>
                            <h3>Your Articles</h3>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around"}}>
        {(articles?.length)?(
            <div style={{width:"60vw",borderTop:"solid rgb(0,0,0,0.1) 1px"}}>
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
        </div>
        </div>
    )

}