import { useEffect, useState } from "react";
import { CreateUser, SearchUser } from "../components/UsersComponent.jsx";
import { AgendarCita } from "../components/CitasComponent.jsx";
import { SystemUserProfile, CurrentSystemUserProfile } from "../components/SystemUser.jsx";
import { AuthApp } from "../app/auth.app.js";


const data =  [   {
        "DUI": "60981519-9",
        "Paciente": "Ana González",
        "Edad": 11,
        "Especialidad": "Oftalmología",
        "Horario de atencion": "08:00 AM - 12:00 PM",
        "Detalles": "Consulta de seguimiento para oftalmología."
    },
    {
        "DUI": "214-4",
        "Paciente": "Carmen Hernández",
        "Edad": 79,
        "Especialidad": "Odontología",
        "Horario de atencion": "01:00 PM - 05:00 PM",
        "Detalles": "Consulta de seguimiento para odontología."
    },
    {
        "DUI": "503221214142-4",
        "Paciente": "Carmen Hernández",
        "Edad": 79,
        "Especialidad": "Odontología",
        "Horario de atencion": "01:00 PM - 05:00 PM",
        "Detalles": "Consulta de seguimiento para odontología."
    },
    {
        "DUI": "212121-4",
        "Paciente": "Carmen Hernández",
        "Edad": 79,
        "Especialidad": "Odontología",
        "Horario de atencion": "01:00 PM - 05:00 PM",
        "Detalles": "Consulta de seguimiento para odontología."
    },
    {
        "DUI": "44-4",
        "Paciente": "Carmen Hernández",
        "Edad": 79,
        "Especialidad": "Odontología",
        "Horario de atencion": "01:00 PM - 05:00 PM",
        "Detalles": "Consulta de seguimiento para odontología."
    },
    {
        "DUI": "61391405-1",
        "Paciente": "Diego Hernández",
        "Edad": 28,
        "Especialidad": "Dermatología",
        "Horario de atencion": "02:00 PM - 06:00 PM",
        "Detalles": "Consulta de seguimiento para dermatología."
    },
    {
        "DUI": "27020218-9",
        "Paciente": "Luis Hernández",
        "Edad": 40,
        "Especialidad": "Ginecología",
        "Horario de atencion": "07:00 AM - 11:00 AM",
        "Detalles": "Consulta de seguimiento para ginecología."
    },
    {
        "DUI": "23500723-0",
        "Paciente": "Elena Hernández",
        "Edad": 31,
        "Especialidad": "Cardiología",
        "Horario de atencion": "07:00 AM - 11:00 AM",
        "Detalles": "Consulta de seguimiento para cardiología."
    },
    {
        "DUI": "29170320-8",
        "Paciente": "Elena Hernández",
        "Edad": 81,
        "Especialidad": "Odontología",
        "Horario de atencion": "08:00 AM - 12:00 PM",
        "Detalles": "Consulta de seguimiento para odontología."
    }
  ];

export function HomePersonalMed() {
  const [renderView, setRenderView] = useState("PANEL_MAIN");


  const RenderContent = {
    "PANEL_MAIN": <PanelMain />,
    "CREATE_USER" : <CreateUser setRenderView={setRenderView} />,
    "AGENDAR_CITA": <AgendarCita setRenderView={setRenderView} />,
    "SEARCH_USER": <SearchUser setRenderView={setRenderView} />,
    "SYSTEM_USER_PROFILE": <SystemUserProfile setRenderView={setRenderView} />,
  };

  return(
    <>
    <div className="row w-100 m-0">
      <div className="col-sm-2 d-flex flex-column p-0">
        <PanelLeft setRenderView={setRenderView} />
      </div>

      <div className="col-10 d-flex flex-column h-100 p-0">
        <div className="d-flex bg-body-secondary p-2">
          <PanelTop />
        </div>
        
        {
          RenderContent[renderView]
        }
        
      </div>
    </div>
    </>
  )
}

function PanelTop() {
  const dtOptions = {weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true};
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setDateTime(date.toLocaleDateString(undefined, dtOptions));
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      <span className="fw-bold">SGCM</span>
      <span className="ms-5">Jhoan Alberto</span>
      <span className="ms-auto me-2"><b>Cambiar tema</b> {dateTime}</span>
    </>
  )
}

function PanelLeft({setRenderView}) {

  return(
  <>
    <div className="d-inline-flex flex-column mt-2 mx-auto">
      <img className="img-fluid w-auto" src="/image1.webp" alt="Logo del sistema." />
      <span className="mx-auto">SGCM</span>
    </div>
    <hr className="border-2 border-secondary m-2"/>

    <div className="d-inline-flex flex-column gap-2 align-items-start mt-5 m-auto">
      <button onClick={() => setRenderView("AGENDAR_CITA")} type="button" className="btn btn-outline-primary border-0">
        <i className="bi bi-card-checklist"></i> Agendar Cita 
      </button>
      <button onClick={() => setRenderView("CREATE_USER")} type="button" className="btn btn-outline-primary border-0">
        <i className="bi bi-calendar-week"></i> Agenda del dia
      </button>
      <button onClick={() => setRenderView("SEARCH_USER")} type="button" className="btn btn-outline-primary border-0">
        <i className="bi bi-people-fill"></i> Usuarios
      </button>
      <button onClick={() => setRenderView("CREATE_USER")} type="button" className="btn btn-outline-primary border-0">
        <i className="bi bi-person-add"></i> Crear usuario
      </button>
    </div>        
    <hr className="border-2 border-secondary m-2"/>

    <div className="d-inline-flex flex-column mb-2 mx-auto">
      <button onClick={() => setRenderView("SYSTEM_USER_PROFILE")} type="button" className="btn btn-outline-primary border-0">
        <i className="bi bi-person-circle me-1" /> Mi perfil
      </button>
      <button onClick={() => AuthApp.handleSignOut() } type="button" className="btn btn-outline-warning border-0">
        <i className="bi bi-box-arrow-right" /> Cerrar Sesión
      </button>
    </div>
  </>
  )
}

function PanelMain() {

  return(
  <>
    <div className="d-inline-flex flex-column gap-1 card shadow-sm text-center p-2 my-3 mx-auto">
      <span className="fs-6">Paciente Anterior hora </span>
      <span className="fs-5">Paciente Actual hora</span>
      <span className="fs-6">Paciente Proximo hora</span>
    </div>

    <div>
      <form className="row align-items-end border-bottom border-top py-2 mx-2">
        <div className="col-sm-1 p-0">
          <label htmlFor="typeSearch" className="form-label">Filtrar por:</label>
          <select name="typeSearch" id="typeSearch" className="form-select">
            <option value="dui">DUI</option>
            <option value="names">Nombres</option>
          </select>
        </div>
        <div className="col-sm-4">
          <input type="text" className="form-control m-auto" />
        </div>
        <div className="col-sm-1 p-0">
          <button className="btn btn-primary">
            <i className="bi bi-search"></i> Buscar
          </button>
        </div>
      </form>
    </div>

    <div className="flex-grow-1 overflow-y-auto mb-2 mx-1">
      <table className="table table-striped table-hover">
        <thead className="sticky-top">
          <tr>  
            <th>#</th>
            <th>DUI</th>
            <th>Paciente</th>
            <th>Especialidad</th>
            <th>Horario de atencion</th>
            <th>Estado</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={user.DUI}>
              <td>{index + 1}</td>
              <td>{user.DUI}</td>
              <td>{user.Paciente}</td>
              <td>{user.Especialidad}</td>
              <td>{user["Horario de atencion"]}</td>
              <td>Confirmada</td>
              <td><button className="btn btn-outline-primary">Info.</button></td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  </>
  )
}