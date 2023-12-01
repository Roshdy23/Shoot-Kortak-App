import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-black">
                <div className="container-fluid">
                    <a className="navbar-brand ms-5 text-light" href="/#"><h4 className="fst-italic">SHOOT KORTAK</h4></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <a className="nav-link text-light" aria-current="page" href="/#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-light" href="/#">Matches</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-light" href="/#">Stadiums</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-light" href="/#">Stores</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-light" href="/#">Clubs</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-light" href="/#">Results</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-light" href="/#">Quizzes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-light" href="/#" >Logout</a>
                            </li>
                        </ul>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                            <label className="form-check-label text-light" for="flexSwitchCheckDefault">Dark Mode</label>
                        </div>
                        <button type="button" className="btn btn-danger btn-sm ms-4">Log out</button>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar;