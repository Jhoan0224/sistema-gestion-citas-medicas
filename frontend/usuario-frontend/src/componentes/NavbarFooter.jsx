import { userSignOutAccount } from "../application/Authentication.js"

export function Navbar({userBasicInfo}) {
    return(
    <>
    <nav className="navbar navbar-expand-md bg-body-tertiary w-100">
        <div className="container-fluid">
            <a className="navbar-brand fs-5 fs-md-4 fw-semibold" href="/user">SGCM</a>
            <p className="fs-6 fs-md-5 fw-medium m-auto ms-md-3">Hola, {userBasicInfo.nombre} {userBasicInfo.apellido}</p>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto me-0">
                <li className="nav-item dropdown">
                    <button className="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Tema
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li><button type="button" className="dropdown-item">Auto</button></li>
                        <li><button type="button" className="dropdown-item">Claro</button></li>
                        <li><button type="button" className="dropdown-item">Oscuro</button></li>
                    </ul>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Opciones
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li><a className="dropdown-item" href="user-account">Configuración</a></li>
                        <li><button onClick={() => userSignOutAccount()} type="button" className="dropdown-item">Cerrar Sessión</button></li>
                    </ul>
                </li>
            </ul>
            </div>
        </div>
    </nav>
    </>
    )
}

export function Footer() {
    return(
    <>
    <div className="row w-100 p-2 m-0">
        <div className="col">
            <p>Equipo de desarrollo:</p>
            <p>Vanessa Garcia, Sofia Velasquez y Jhoan Saldaña</p>
        </div>
        <div className="col">
            <p>&copy; Sistema de Salud — 2026</p>
        </div>
        <div className="col">
            <p>Faltaria algo mas aca</p>
        </div>
    </div>
    </>
    )
}