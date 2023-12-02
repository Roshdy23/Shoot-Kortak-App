import { Link } from "react-router-dom";
function ViewQuizzes() {
    return (
        <>
            <div className="container">
                <h3 className="row mt-4">*Name of the quiz*</h3>
                <div class="row mt-5">
                    <div class="col-4" style={{ maxHeight: "150px", overflowY: "scroll" }}>
                        <div id="list-example" class="list-group">
                            <a class="list-group-item list-group-item-action" href="#list-item-1">Question 1</a>
                            <a class="list-group-item list-group-item-action" href="#list-item-2">Question 2</a>
                            <a class="list-group-item list-group-item-action" href="#list-item-3">Question 3</a>
                            <a class="list-group-item list-group-item-action" href="#list-item-4">Question 4</a>
                            <a class="list-group-item list-group-item-action" href="#list-item-5">Question 5</a>
                            <a class="list-group-item list-group-item-action" href="#list-item-6">Question 6</a>
                            <a class="list-group-item list-group-item-action" href="#list-item-7">Question 7</a>
                        </div>
                    </div>
                    <div class="col-8">
                        <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabindex="0" style={{ maxHeight: "100px", overflowY: "scroll" }}>
                            <h4 id="list-item-1">Question 1</h4>
                            <p>You are logged in to the Admin Dashboard for Shoot Kortak
                                Reservation System. Here, you can manage reservations, view statistics,
                                and perform various administrative tasks.<span style={{ color: "red", fontWeight: "bold" }}>**Answer(T or F)**</span></p>
                            <h4 id="list-item-2">Question 2</h4>
                            <p>You are logged in to the Admin Dashboard for Shoot Kortak
                                Reservation System. Here, you can manage reservations, view statistics,
                                and perform various administrative tasks.<span style={{ color: "red", fontWeight: "bold" }}>**Answer(T or F)**</span></p>
                            <h4 id="list-item-3">Question 3</h4>
                            <p>You are logged in to the Admin Dashboard for Shoot Kortak
                                Reservation System. Here, you can manage reservations, view statistics,
                                and perform various administrative tasks.<span style={{ color: "red", fontWeight: "bold" }}>**Answer(T or F)**</span></p>
                            <h4 id="list-item-4">Question 4</h4>
                            <p>You are logged in to the Admin Dashboard for Shoot Kortak
                                Reservation System. Here, you can manage reservations, view statistics,
                                and perform various administrative tasks.<span style={{ color: "red", fontWeight: "bold" }}>**Answer(T or F)**</span></p>
                            <h4 id="list-item-5">Question 5</h4>
                            <p>You are logged in to the Admin Dashboard for Shoot Kortak
                                Reservation System. Here, you can manage reservations, view statistics,
                                and perform various administrative tasks.<span style={{ color: "red", fontWeight: "bold" }}>**Answer(T or F)**</span></p>
                            <h4 id="list-item-6">Question 6</h4>
                            <p>You are logged in to the Admin Dashboard for Shoot Kortak
                                Reservation System. Here, you can manage reservations, view statistics,
                                and perform various administrative tasks.<span style={{ color: "red", fontWeight: "bold" }}>**Answer(T or F)**</span></p>
                            <h4 id="list-item-7">Question 7</h4>
                            <p>You are logged in to the Admin Dashboard for Shoot Kortak
                                Reservation System. Here, you can manage reservations, view statistics,
                                and perform various administrative tasks.<span style={{ color: "red", fontWeight: "bold" }}>**Answer(T or F)**</span></p>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <Link className="btn btn-success col col-lg-2 my-4 mx-4" to="/quizzes">Accept</Link>
                    <Link className="btn btn-danger col col-lg-2 my-4 mx-4" to="/quizzes">Refuse</Link>
                </div>
            </div>
        </>
    )
}
export default ViewQuizzes;