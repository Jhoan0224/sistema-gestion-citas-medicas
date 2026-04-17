export function Navbar({userBasicInfo}) {
    return(
    <>
    <nav className="navbar navbar-expand-md bg-body-tertiary w-100">
        <div className="container-fluid">
            <a className="navbar-brand fs-4 fw-semibold" href="#">Centro Salud</a>
            {/* <p className="px-1 m-auto">Nombre del Usuario de la App</p> */}
            <p className="px-1 fs-5 fw-medium px-4 m-auto">Hola, {userBasicInfo.nombre} {userBasicInfo.apellido}</p>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav w-auto ms-auto">
                <li className="nav-item">
                    <a className="nav-link" href="#">Opcion</a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Opciones
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li><a className="dropdown-item" href="user-account">Configuración</a></li>
                        <li><a className="dropdown-item" href="#">Cerrar Sessión</a></li>
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