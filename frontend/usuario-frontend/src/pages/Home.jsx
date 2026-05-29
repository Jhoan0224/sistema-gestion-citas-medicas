import { useNavigate } from "react-router-dom"

const CENTER_HEALT_NAME = "Centro de Salud de Santa Ana";
const CENTER_HEALT_LOCATION = "6ª Avenida Sur, entre 23ª y 25ª Calle Poniente, Santa Ana, El Salvador.";
const CENTER_HEALT_PHONE_NUMBER = "Numeros de telefono: , 2255-8852";
const CENTER_HEALT_PHONE_LIST = [{ desc: "Tel. principal", tel: "2443-1225" }, { desc: "Tel. emergencias", tel: "2255-8852" }];
const CENTER_HEALT_EMAIL_LIST = [{desc: "Email", email: "sgcm.contact@sgcm.healt"}];


export function Home() {
    const navigate = useNavigate();
    return(
    <>
        <NavbarHome />
<div className="container-fluid bg-light d-flex flex-grow-1">

  {/* Landing */}
  <div className="container py-5">
    <div className="row align-items-center min-vh-75">

      {/* Texto */}
      <div className="col-lg-6 mb-5 mb-lg-0">

        <span className="badge bg-primary-subtle text-primary mb-3 p-2">
          Sistema Médico
        </span>

        <h1 className="display-5 fw-bold mb-4">
          Sistema de Gestión de Citas Médicas
        </h1>

        <p className="text-secondary fs-5 mb-4">
          Administra pacientes, citas y horarios médicos
          desde una plataforma simple y organizada.
        </p>

        <div className="d-flex flex-wrap gap-3">
          <button type="button" onClick={() => navigate("/crear-cuenta")} className="btn btn-primary btn-lg px-4">
            Crear Cuenta
          </button>

          <button type="button" onClick={() => navigate("/user")} className="btn btn-outline-secondary btn-lg px-4">
            Iniciar Sesión
          </button>
        </div>

      </div>

      {/* Panel */}
      <div className="col-lg-6">
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4">

            <div className="d-flex align-items-center mb-4">
              <div
                className="bg-primary text-white rounded d-flex align-items-center justify-content-center fw-bold"
                style={{ width: "55px", height: "55px" }}
              >
                SG
              </div>

              <div className="ms-3">
                <h4 className="mb-0 fw-bold">SGCM</h4>
                <small className="text-muted">
                  Gestión Médica Inteligente
                </small>
              </div>
            </div>

            <div className="border rounded p-3 mb-3">
              <h6 className="fw-semibold text-primary">
                Gestión de Pacientes
              </h6>

              <p className="text-secondary small mb-0">
                Consulta y organiza información médica fácilmente.
              </p>
            </div>

            <div className="border rounded p-3 mb-3">
              <h6 className="fw-semibold text-success">
                Agenda Médica
              </h6>

              <p className="text-secondary small mb-0">
                Control de horarios y citas en tiempo real.
              </p>
            </div>

            <div className="border rounded p-3">
              <h6 className="fw-semibold text-danger">
                Reportes
              </h6>

              <p className="text-secondary small mb-0">
                Seguimiento y estadísticas administrativas.
              </p>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>

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
                <button type="button" onClick={() => navigate("/user")} className="btn btn-primary" type="button">SignIn</button>
                <button type="button" onClick={() => navigate("/crear-cuenta")} className="btn btn-outline-secondary" type="button">SignUp</button>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="/centro-salud">Centro de Salud</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="/guia-de-uso">Guia de uso</a>
                </li>
            </ul>
            <form className="d-flex gap-3" role="search">
                <button onClick={() => navigate("/user")} className="btn btn-primary" type="button">SignIn</button>
                <button onClick={() => navigate("/crear-cuenta")} className="btn btn-outline-secondary" type="button">SignUp</button>
            </form>
            </div>
        </div>
        </nav>
    )
};

function FooterHome() {

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

export function GuiaUso() {

    return(
    <>
<div className="container py-4">

  <div className="card border-0 shadow-sm rounded-4">

    <div className="card-body p-4">

      <h2 className="fw-bold text-primary mb-4">
        Guía Rápida de Uso - SGCM
      </h2>

      {/* Inicio de Sesión */}
      <div className="mb-4">
        <h5 className="fw-bold">
          🔐 Inicio de Sesión
        </h5>

        <ul className="text-secondary">
          <li>Ingrese su usuario y contraseña.</li>
          <li>Presione <strong>Iniciar Sesión</strong>.</li>
          <li>Acceda al panel principal del sistema.</li>
        </ul>
      </div>

      {/* Gestión de Pacientes */}
      <div className="mb-4">
        <h5 className="fw-bold">
          👨‍⚕️ Gestión de Pacientes
        </h5>

        <ul className="text-secondary">
          <li>Registrar nuevos pacientes.</li>
          <li>Consultar información médica.</li>
          <li>Actualizar datos personales.</li>
        </ul>
      </div>

      {/* Gestión de Citas */}
      <div className="mb-4">
        <h5 className="fw-bold">
          📅 Gestión de Citas
        </h5>

        <ul className="text-secondary">
          <li>Programar nuevas citas.</li>
          <li>Reprogramar citas existentes.</li>
          <li>Cancelar citas cuando sea necesario.</li>
        </ul>
      </div>

      {/* Horarios */}
      <div className="mb-4">
        <h5 className="fw-bold">
          🕒 Horarios Médicos
        </h5>

        <ul className="text-secondary">
          <li>Administrar horarios de atención.</li>
          <li>Consultar disponibilidad médica.</li>
          <li>Visualizar agenda diaria.</li>
        </ul>
      </div>

      {/* Reportes */}
      <div>
        <h5 className="fw-bold">
          📊 Reportes
        </h5>

        <ul className="text-secondary mb-0">
          <li>Consultar estadísticas.</li>
          <li>Ver historial de citas.</li>
          <li>Generar reportes administrativos.</li>
        </ul>
      </div>

    </div>

  </div>

</div>
    </>
    )
};


export function CentroSalud() {

    return(
    <>
<div
  className="container-fluid bg-light d-flex align-items-center justify-content-center overflow-hidden"
  style={{ height: "100vh" }}
>
  <div className="container h-100 d-flex align-items-center justify-content-center py-3">

    <div className="row justify-content-center w-100">

      <div className="col-12 col-md-10 col-lg-8">

        <div
          className="card border-0 shadow-sm rounded-4 overflow-hidden"
          style={{ maxHeight: "95vh" }}
        >

          {/* Header */}
          <div className="bg-primary text-white text-center p-4">

<a
  href="/"
  className="btn text-decoration-none d-inline-block text-center p-3"
  style={{
    // Esta regla detecta el hover en el botón padre e invierte los colores del div hijo
    "--circle-bg": "var(--bs-white)",
    "--circle-color": "var(--bs-primary)",
  }}
  // Inyección rápida de estilos para simular un "group-hover" nativo
  onMouseEnter={(e) => {
    e.currentTarget.style.setProperty("--circle-bg", "var(--bs-primary)");
    e.currentTarget.style.setProperty("--circle-color", "var(--bs-white)");
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.setProperty("--circle-bg", "var(--bs-white)");
    e.currentTarget.style.setProperty("--circle-color", "var(--bs-primary)");
  }}
>
  <div
    className="fw-bold rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 shadow-sm border border-light pe-none"
    style={{
      width: "70px",
      height: "70px",
      fontSize: "24px",
      transition: "background-color 0.3s, color 0.3s",
      backgroundColor: "var(--circle-bg)",
      color: "var(--circle-color)"
    }}
  >
    CS
  </div>
  <span className="text-primary fw-semibold">Texto del Botón</span>
</a>


            <h1 className="fw-bold fs-3 mb-2">
              Centro de Salud de Santa Ana
            </h1>

            <p className="mb-0 opacity-75 small">
              Atención médica accesible y organizada.
            </p>

          </div>

          {/* Body */}
          <div
            className="card-body p-4 overflow-auto"
            style={{ maxHeight: "60vh" }}
          >

            {/* Ubicación */}
            <div className="mb-4">
              <h5 className="fw-bold text-primary mb-3">
                📍 Ubicación
              </h5>

              <p
                className="text-secondary mb-0"
                style={{ wordBreak: "break-word" }}
              >
                6ª Avenida Sur, entre 23ª y 25ª Calle Poniente,
                Santa Ana, El Salvador.
              </p>
            </div>

            {/* Teléfonos */}
            <div className="mb-4">
              <h5 className="fw-bold text-primary mb-3">
                📞 Teléfonos
              </h5>

              <div className="mb-3">
                <strong>Tel. principal:</strong>
                <div className="text-secondary">
                  2443-1225
                </div>
              </div>

              <div>
                <strong>Tel. emergencias:</strong>
                <div className="text-secondary">
                  2255-8852
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <h5 className="fw-bold text-primary mb-3">
                ✉️ Correo Electrónico
              </h5>

              <p
                className="text-secondary mb-0"
                style={{ wordBreak: "break-word" }}
              >
                sgcm.contact@sgcm.healt
              </p>
            </div>

            {/* Información */}
            <div className="bg-light border rounded-3 p-3">
              <p className="text-secondary mb-0 text-center small">
                Nuestro compromiso es brindar atención médica eficiente,
                organizada y accesible para todos los pacientes.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</div>
    </>
    )
};
