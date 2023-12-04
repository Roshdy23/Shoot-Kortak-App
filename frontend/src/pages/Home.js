import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./Home.css";
import Vote from "../components/votePOTM.js";
import POTMWinner from "../components/POTMWinner.js";
import MatchesToday from "../components/Match/MatchesToday.js";
function Home() {
    let role = "admin"
    if (role === "admin")
        return (
            <section class="jumbotron text-center mt-5">
                <div class="container">
                    <h3 class="jumbotron-heading">WELCOME TO ADMIN DASHBOARD</h3>
                    <p class="lead mx-auto col-md-8 ">You are logged in to the Admin Dashboard for Shoot Kortak Reservation System. Here, you can manage reservations, view statistics, and perform various administrative tasks.</p>
                    <p>Explore The Dashboard Using The Navigation Menu on The Top.</p>
                </div>
            </section>
        )
    else {
        return (
            <div className="homeGrid">
                <TrendingArts />
                <div style={{ padding: "0 10px 0 10px" }}>
                    <Vote />
                    <POTMWinner />
                </div>
                <MatchesToday />
            </div>
        );

    }
}

function TrendingArts() {
    let articles = [{
        id: 5,
        title: "Eastern company wins the title race for first time ever!",
        pic: "https://scontent.fcai20-4.fna.fbcdn.net/v/t39.30808-6/301890292_441277618023107_9171654543944456370_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=ppbdG-IXS1AAX_MUQ5w&_nc_ht=scontent.fcai20-4.fna&oh=00_AfAUqlbghIt4sXK79mKVMsPuMGRJG2oXxIeNebKHXROsnQ&oe=656E63D0"
    },
    {
        id: 5,
        title: "Al Ahly seals Zizo from Zamalek for the third time in a row!",
        pic: "https://ar.elganna.com/wp-content/uploads/2023/08/ipiccy_image-4-4-800x500.jpg"
    }
    ]
    return (
        <div style={{ display: "flex", flexDirection: "column", overflowY: "scroll", height: "90vh" }}>
            {articles.map((article) => {
                return (
                    <>
                        <div className="card">
                            <img src={article.pic} class="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{article.title}</h5>
                                <a href={`/article/${article.id}`} className="btn btn-primary">Read more</a>
                            </div>
                        </div>
                    </>
                )
            })
            }
            {articles.map((article) => {
                return (
                    <>
                        <div class="card">
                            <img src={article.pic} class="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{article.title}</h5>
                                <a href={`/article/${article.id}`} className="btn btn-primary">Read more</a>
                            </div>
                        </div>
                    </>
                )
            })
            }
            {articles.map((article) => {
                return (
                    <>
                        <div className="card">
                            <img src={article.pic} class="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{article.title}</h5>
                                <a href={`/article/${article.id}`} className="btn btn-primary">Read more</a>
                            </div>
                        </div>
                    </>
                )
            })
            }
        </div>
    )

}
export default Home;