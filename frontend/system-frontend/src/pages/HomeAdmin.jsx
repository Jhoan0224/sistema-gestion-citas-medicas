import { useState, useEffect } from "react";
import { AuthApp } from "../app/auth.app.js";
import { AdminApp } from "../app/Admin.app.js";
import { SystemDataBase, SystemVariables } from "../components/SystemConfig.jsx";
import { CreateSystemUser, CurrentSystemUserProfile, NormalUserProfile, SystemUserProfile } from "../components/SystemUser.jsx";

export function HomeAdmin() {
    const [renderView, setRenderView] = useState("PANEL_MAIN");
    const [renderUserData, setRenderUserData] = useState({nombre: "", apellido: ""})

    const RenderContent = {
        "CURRECT_SYSTEM_USER_PROFILE": <CurrentSystemUserProfile />,
        "SYSTEM_VARIABLES": <SystemVariables />,
        "SYSTEM_DATABASE": <SystemDataBase />,
        "CREATE_SYSTEM_USER": <CreateSystemUser setRenderView={setRenderView} />,
        "SYSTEM_USERS" : <SystemUserProfile setRenderView={setRenderView} />,
        "NORMAL_USERS" : <NormalUserProfile setRenderView={setRenderView} />,
    };

    useEffect(() => {
        let isMounted = true;
        const loadRenderUserData = async () => {
        const resp = await AdminApp.currentUserProfile();
        if (isMounted && resp.success) { setRenderUserData(resp.userProfile) }
        }
        loadRenderUserData();
        return () => {isMounted = false}
    }, []);

    return(
    <>
    <div className="row w-100 vh-100 m-0">
        <div className="col-sm-2 d-flex flex-column h-100 p-0">
           <PanelLeft setRenderView={setRenderView} />
        </div>
        <div className="col-sm-10 d-flex flex-column p-0 h-100">
            <div className="d-flex bg-body-secondary p-2">
                <PanelTop renderUserData={renderUserData} />
            </div>
            <div className="m-2 flex-grow-1 d-flex flex-column h-100" style={{ minHeight: 0 }}>
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
        <img src="/image1.webp" alt="Logo del sistema." />
        <span className="mx-auto">SGCM</span>
    </div>

    <hr className="border-2 border-secondary m-2"/>
    <div className="d-inline-flex flex-column gap-2 align-items-start mt-5 m-auto">
        <button onClick={() => setRenderView("SYSTEM_VARIABLES")} type="button" className="btn btn-outline-primary border-0">
            <i className="bi bi-gear" /> Variables del Sistema
        </button>
        <button type="button" onClick={() => setRenderView("SYSTEM_USERS")} className="btn btn-outline-primary border-0">
            <i className="bi bi-person-vcard" /> Usuarios del Sistema
        </button>
        <button onClick={() => setRenderView("SYSTEM_DATABASE")} type="button" className="btn btn-outline-primary border-0">
            <i className="bi bi-database" /> DataBase del Sistema
        </button>
        <button onClick={() => setRenderView("NORMAL_USERS")} type="button" className="btn btn-outline-primary border-0">
            <i className="bi bi-people" /> Usuarios
        </button>
    </div>
    <hr className="border-2 border-secondary m-2"/>

    <div className="d-inline-flex flex-column gap-2 mb-2 mx-auto">
        <button onClick={() => setRenderView("CURRECT_SYSTEM_USER_PROFILE")} type="button" className="btn btn-outline-primary border-0">
            <i className="bi bi-person-circle me-1" />Mi perfil</button>
        <button onClick={() => AuthApp.handleSignOut() } type="button" className="btn btn-outline-warning border-0">
            <i className="bi bi-box-arrow-right" /> Cerrar Sesión
        </button>
    </div>
    </>
    )
}