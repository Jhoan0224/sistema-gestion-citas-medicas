import { userSignOutAccount } from "../application/Authentication.js"

const CENTER_HEALT_NAME = "Centro de Salud de Santa Ana";
const CENTER_HEALT_LOCATION = "6ª Avenida Sur, entre 23ª y 25ª Calle Poniente, Santa Ana, El Salvador.";
const CENTER_HEALT_PHONE_NUMBER = "Numeros de telefono: , 2255-8852";
const CENTER_HEALT_PHONE_LIST = [{ desc: "Tel. principal", tel: "2443-1225" }, { desc: "Tel. emergencias", tel: "2255-8852" }];
const CENTER_HEALT_EMAIL_LIST = [{desc: "Email", email: "sgcm.contact@sgcm.healt"}];

export function Navbar({userBasicInfo}) {
    return(
    <>
    <nav className="navbar navbar-expand-md bg-body-tertiary w-100">
        <div className="container-fluid">
            <a className="navbar-brand fs-5 fs-md-4 fw-bold" style={{color: "#000080"}} href="/user">SGCM</a>
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
};

export function Footer() {
    return(
    <>
    <div className="row w-100 p-2 m-0 bg-body-tertiary">
        <div className="col-auto d-grid gap-0 p-2 px-sm-2">
            <span className="fs-6 ms-3 m-auto">Powered by &copy; {' '}
                <a href="https://github.com/Jhoan0224/sistema-gestion-citas-medicas"
                    target="_blank" rel="noopener noreferrer"
                    className="text-decoration-none text-reset fw-bold"
                >SGCM</a> 
                {' '} — {' '} 2026
            </span>
        </div>
        <div className="col d-grid gap-1 align-items-center text-center px-sm-4">
            <span className="fs-5 fw-medium mt-auto">{CENTER_HEALT_NAME}</span>
            <span className="fs-6 fw-normal mb-auto">{CENTER_HEALT_LOCATION}</span>
        </div>
        <div className="col-auto px-sm-4 me-3">
            <span className="fs-6 fw-medium mt-auto">Contactos:</span>
            <address className="mb-auto">
                <ul className="mb-1">
                {CENTER_HEALT_PHONE_LIST.map((phone, index) => (
                    <li key={index}>
                        {phone.desc} <a href={`tel:${phone.tel}`}>{phone.tel}</a>
                    </li>
                ))}
                </ul>
                <ul>
                {CENTER_HEALT_EMAIL_LIST.map((eml, index) => (
                    <li key={index}>
                        {eml.desc} <a href={`mailto:${eml.email}`}>{eml.email}</a>
                    </li>
                ))}
                </ul>
            </address>
            {/* <span className="fs-6 fw-normal mt-auto">Contactos:</span>
            <address className="row mb-auto">
                <ul className="col-auto">
                {CENTER_HEALT_PHONE_LIST.map((phone, index) => (
                    <li key={index}>
                        {phone.desc} <a href={`tel:${phone.tel}`}>{phone.tel}</a>
                    </li>
                ))}
                </ul>
                <ul className="col-auto">
                {CENTER_HEALT_EMAIL_LIST.map((eml, index) => (
                    <li key={index}>
                        {eml.desc} <a href={`mailto:${eml.email}`}>{eml.email}</a>
                    </li>
                ))}
                </ul>
            </address> */}
        </div>
    </div>
    </>
    )
};