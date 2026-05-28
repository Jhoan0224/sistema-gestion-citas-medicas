import { useNavigate } from "react-router-dom"

export function Home() {

    return(
    <>
        <NavbarHome />
        <div className="flex-grow-1 text-center">
            <h5>At the moment I don't have any idea...</h5>
            <h4>... to put some text, imges or video, I tired :)</h4>
        </div>
        <FooterHome />
    </>
    )
}

function NavbarHome() {
    const navigate = useNavigate();

    return(
    <nav className="navbar navbar-expand-md bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">SGCM</a>
            <div className="d-flex d-md-none gap-3 ms-auto me-4">
                <button onClick={() => navigate("/user")} className="btn btn-outline-warning" type="button">SignIn</button>
                <button onClick={() => navigate("/crear-cuenta")} className="btn btn-outline-success" type="button">SignUp</button>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Centro de Salud</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Guia de uso</a>
                </li>
            </ul>
            <form className="d-flex gap-3" role="search">
                <button onClick={() => navigate("/user")} className="btn btn-outline-warning" type="button">SignIn</button>
                <button onClick={() => navigate("/crear-cuenta")} className="btn btn-outline-success" type="button">SignUp</button>
            </form>
            </div>
        </div>
        </nav>
    )
};

function FooterHome() {

    return(
    <footer className="d-flex bg-body-tertiary p-3">
        <h5 className="fs-5 m-auto">Sistema de Gestion de Citas del Centro de Salud Santa Ana, SV.</h5>

    </footer>
    )
};