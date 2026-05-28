import { useEffect, useState } from "react";
import { AuthApp } from "../app/auth.app.js";
import { PersonalMedApp } from "../app/personal-med.app.js";
import { SystemUserProfile, CurrentSystemUserProfile } from "../components/SystemUser.jsx";
import { CreateUser, SearchUser } from "../components/UsersComponent.jsx";
import { UsuarioAccount } from "../components/UsersAccountComponent.jsx";
import { AgendarCita } from "../components/CitasComponent.jsx";

export function HomePersonalMed() {
  const [renderView, setRenderView] = useState("PANEL_MAIN");
  const [renderUserData, setRenderUserData] = useState({nombre: "", apellido: ""})

  useEffect(() => {
    let isMounted = true;
    const loadRenderUserData = async () => {
      const resp = await PersonalMedApp.currentUserProfile();
      if (isMounted && resp.success) { setRenderUserData(resp.userProfile) }
    }
    loadRenderUserData();
    return () => {isMounted = false}
  }, []);

  const RenderContent = {
    "PANEL_MAIN": <PanelMain />,
    //"CREATE_USER" : <UsuarioAccount setRenderView={setRenderView}/>,
    "CREATE_USER" : <CreateUser setRenderView={setRenderView} />,
    "AGENDAR_CITA": <AgendarCita setRenderView={setRenderView} />,
    "SEARCH_USER": <SearchUser setRenderView={setRenderView} />,
    "SYSTEM_USER_PROFILE": <CurrentSystemUserProfile setRenderView={setRenderView} />,
  };

  return(
    <>
    <div className="row w-100 vh-100 m-0">
      <div className="col-sm-2 d-flex flex-column p-0 border-end border-2 border-secondary-subtle">
        <PanelLeft setRenderView={setRenderView} />
      </div>
      <div className="col-10 d-flex flex-column h-100 p-0">
        <div className="d-flex bg-body-secondary p-2 rounded-bottom-2">
          <PanelTop renderUserData= {renderUserData} />
        </div>
         <div className="m-2 flex-grow-1 d-flex flex-column" style={{ minHeight: 0 }}>
          {          
            RenderContent[renderView]
          }
        </div>
      </div>
    </div>
    </>
  )
}

function PanelTop({renderUserData}) {
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
      <a className="fw-bold text-decoration-none" href="home">SGCM</a>
      <span className="ms-5">{renderUserData.nombre} {renderUserData.apellido}</span>
      <span className="ms-auto me-2"><b>Cambiar tema</b> {dateTime}</span>
    </>
  )
}

function PanelLeft({setRenderView}) {

  return(
  <>
    <div className="d-inline-flex flex-column mt-2 mx-auto">
      <img className="img-fluid w-75 mx-auto" src="/logo.svg" alt="Logo del sistema." />
    </div>
    <hr className="border-3 border-secondary m-2"/>

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
    <hr className="border-3 border-secondary m-2"/>

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
  const dateOptions = {year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "numeric", hour12: true};
  const [loadUserInfo, setLoadUserInfo] = useState({idUsuario: "", show: false});
  const [userListCitasMain, setUserListCitasMain] = useState([]);
  const [userListCitas, setUserListCitas] = useState([]);
  const [formSearch, setFormSearch] = useState({typeFilter: "1", textSearch: ""});
  const [nextUsers, setNextUsers] = useState({ previous: {
  dui_usuario: "",
  especialidad: "",
  fecha_hora_atencion: "",
  id_usuario: null,
  usuario: ""
}, current: {
  dui_usuario: "",
  especialidad: "",
  fecha_hora_atencion: "",
  id_usuario: null,
  usuario: ""
}, next: {
  dui_usuario: "",
  especialidad: "",
  fecha_hora_atencion: "",
  id_usuario: null,
  usuario: ""
  }});

  const updateNextUsers = () => {
      const currentTime = +new Date();
      // .toISOString().slice(0, 19).replace("T", " ").getTime();
      const previousUser = userListCitasMain.find(user => Date.parse(user.fecha_hora_atencion) < currentTime);     
      const nextsUser = userListCitasMain.find(user => Date.parse(user.fecha_hora_atencion) > currentTime);
      let currentUser = userListCitasMain.find(user => 
        Date.parse(user.fecha_hora_atencion) > Date.parse(previousUser?.fecha_hora_atencion)
        && Date.parse(user.fecha_hora_atencion) < Date.parse(nextsUser?.fecha_hora_atencion));
        
      if (currentUser == null) { currentUser = nextsUser; }

      setNextUsers({previous: previousUser, current: currentUser, next: nextsUser });
  };

  useEffect(() => {
    let isMounted = true;
    const loadUserAgendaCitaHoy = async () => {
      const resp = await PersonalMedApp.userCitaAgendaHoy();
      if (isMounted && resp.success) {
        setUserListCitas(resp.listCitas)
        setUserListCitasMain(resp.listCitas);
      }
    }
    loadUserAgendaCitaHoy();
    return () => {isMounted = false}
  },[]);

  useEffect(() => {
    updateNextUsers();
    const interval = setInterval(() => updateNextUsers(), 120000);
    return () => clearInterval(interval);
  }, [userListCitasMain]);

  const updateForm = (e) => setFormSearch(prev => ({...prev, [e.target.name]: e.target.value}));

  const clearFilter = () => setUserListCitas(userListCitasMain);

  const sendForm = (e) => {
    e.preventDefault();
    const textSearch = formSearch.textSearch.trim().toLowerCase();
    if (textSearch.length === 0) { return }
    const listFiltered = formSearch.typeFilter === "1"
      ? userListCitasMain.filter(user => user.dui_usuario.includes(textSearch))
      : userListCitasMain.filter(user => user.usuario.toLowerCase().includes(textSearch));
    setUserListCitas(listFiltered);
  };

  return(
  <>
    {
      loadUserInfo.show && <UsuarioAccount loadUserInfo={loadUserInfo} setLoadUserInfo={setLoadUserInfo} />
    }
    {
      !loadUserInfo.show &&  
    <>
      <div className="d-flex">
        <div className="d-inline-flex align-items-center p-2">
          <span className="fs-5 fw-medium ms-4">Proximos pacientes</span>
        </div>
        <div className="d-inline-flex flex-column gap-3 card shadow-sm text-center p-2 px-4 my-3 ms-5 me-auto">
          <span className="fs-6">
            { nextUsers.previous
              ? <>
                  <strong>Anterior:</strong> {nextUsers.previous?.usuario} {" — "}
                  <strong>DUI:</strong> {nextUsers.previous?.dui_usuario} {" — "}
                  {new Date(Date.parse(nextUsers.previous?.fecha_hora_atencion)).toLocaleString(undefined, dateOptions).replaceAll("/", "-")}
                </>
              : <>
                  <strong>Anterior:</strong> Sin registro previo.
                </>
            }
          </span>
          <span className="fs-5">
            { nextUsers.current
              ? <>                
                  <strong>Actual:</strong> {nextUsers.current?.usuario} {" — "}
                  <strong>DUI:</strong> {nextUsers.current?.dui_usuario} {" — "}
                  {new Date(Date.parse(nextUsers.current?.fecha_hora_atencion)).toLocaleString(undefined, dateOptions).replaceAll("/", "-")}
                </>
              : <>
                  <strong>Actual:</strong> Ningún paciente en atención.
                </>
            }
          </span>
          <span className="fs-6">
            { nextUsers.next 
              ? <>
                  <strong>Siguiente:</strong> {nextUsers.next?.usuario} {" — "}
                  <strong>DUI:</strong> {nextUsers.next?.dui_usuario} {" — "}
                  {new Date(Date.parse(nextUsers.next?.fecha_hora_atencion)).toLocaleString(undefined, dateOptions).replaceAll("/", "-")}
                </>
              : <>
                  <strong>Siguiente:</strong> No hay ningún paciente en espera.
                </>
            }            
          </span>
        </div>
      </div>
      <div className="">
        <form onSubmit={(e) => sendForm(e)} className="row align-items-end border-bottom border-top py-2 mx-2">
          <div className="col-auto p-0">
            <label htmlFor="typeFilter" className="form-label">Filtrar por:</label>
            <select onChange={updateForm} name="typeFilter" id="typeFilter" className="form-select">
              <option value="1">DUI</option>
              <option value="2">Nombres</option>
            </select>
          </div>
          <div className="col-sm-4">
            <input type="text" name="textSearch" id="textSearch" className="form-control m-auto" autoComplete="off"
              value={formSearch.textSearch} onChange={updateForm}/>
          </div>
          <div className="col-auto p-0">
            <button type="submit" className="btn btn-primary">
              <i className="bi bi-search"></i> Buscar
            </button>
          </div>
          <div className="col-sm-1 p-0 px-2">
            <button onClick={() => clearFilter()} type="button" className="btn btn-outline-success">
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </form>
      </div>
      <div className="flex-grow-1 overflow-y-auto mx-2" style={{ minHeight: '0' }}>
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
            {userListCitas.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.dui_usuario}</td>
                <td>{user.usuario}</td>
                <td>{user.especialidad}</td>
                <td>{new Date(user.fecha_hora_atencion).toLocaleString(undefined, dateOptions)}</td>
                <td>Confirmada</td>
                <td>
                  <button onClick={() => setLoadUserInfo({idUsuario: user.id, show: true}) } type="button" className="btn btn-outline-primary">Info.</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>
    }
  </>
  )
}