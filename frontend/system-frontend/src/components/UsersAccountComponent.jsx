import { useState, useEffect, useRef } from "react";
import { getListOcupacionesCondiciones } from "../api/api-system.js";
import { ImageCitaAgendadaSave } from "../utils/img-cita-agendada.js";
import { PersonalMedApp } from "../app/personal-med.app.js";
import { AdminApp } from "../app/Admin.app.js";
import { ToastAlert, ToastDanger, ToastSuccess } from "../components/Notifications.jsx";

export function UsuarioAccount({loadUserInfo, setLoadUserInfo}) { // El objeto setLoadUserInfo contiene: {idUsuario: "", show: false}
    const [historialStatus, setHistorialStatus] = useState({isOpen: false, show: false});
    const [historialCitas, setHistorialCitas] = useState([]);
    const [userHasCita, setUserHasCita] = useState(null);
    const [citaPendiente, setCitaPendiente] = useState({userHasCita: false, id_usuario: "", estado_cita: "", titulo: "", motivo: "", fecha_hora_atencion: "", especialidad: ""});
    const [accountConfig, setAccountConfig] = useState("");
    const [userData, setUserData] = useState({
        id_usuario: "",  nombre: '', apellido: '', fecha_nacimiento: '', dui: '', email: '',
        idOcupacion: '', idCondicion: '', zona_residencia: ''
    });

    console.log("test de loaduserinfo >> >> " + loadUserInfo.idUsuario);
    

    useEffect(() => {
        let isMounted = true;
        const loadData = async () => {
            const resp = await PersonalMedApp.userAccountData(loadUserInfo.idUsuario);            
            if (isMounted && resp.success) { setUserData(resp.usuarioAccountInfo)}
        }
        loadData();
        return () => { isMounted = false }
    }, []);

    const getAccountConfig = {
        "HISTORIAL_CITAS_INASISTIDAS": () => PersonalMedApp.historialCitasInasistidas(userData.id_usuario),
        "HISTORIAL_CITAS_CANCELADAS": () => PersonalMedApp.historialCitasInasistidas(userData.id_usuario),
        "HISTORIAL_CITAS_ASISTIDAS": () => PersonalMedApp.historialCitasInasistidas(userData.id_usuario),
        "CITA_PENDIENTE": () => PersonalMedApp.userCitaPendiente(loadUserInfo.idUsuario),
    };    

    const RenderAccountConfig = {
        "HISTORIAL_CITAS_INASISTIDAS": <HistorialCitas historialCitas={historialCitas} />,
        "HISTORIAL_CITAS_CANCELADAS": <HistorialCitas  historialCitas={historialCitas} />,
        "HISTORIAL_CITAS_ASISTIDAS": <HistorialCitas historialCitas={historialCitas} />,
        "CITA_PENDIENTE": <UserCitaPendiente userData={userData} citaPendiente={citaPendiente} />,
        "USER_INFO_CONFIG": <FormPersonalInfo userData={userData} setCancelar={setAccountConfig} />,
    };
    
    useEffect(() => {
        if (accountConfig === "") { return }

        const typeConfig = accountConfig.split("_")[0];
        if ( !["HISTORIAL", "CITA"].some(type => type == typeConfig) ) { return } ;

        // let isMounted = true;
        const loadAccountConfig = async () => {           
            const resp = await getAccountConfig[accountConfig]();
            console.log(resp);
            
            if (!resp.success) { return }
            if (typeConfig == "HISTORIAL") { setHistorialCitas(resp.historialCitas) }
            else if (typeConfig == "CITA") {
                setCitaPendiente(resp);
            }
        };
        loadAccountConfig();
        // return () => {isMounted = false}
    }, [accountConfig]);

    return(
    <>
    <div className="container">
        <div className="d-flex justify-content-between py-3">
            <h5 className="fs-5 fw-normal">Información de Usuario</h5>
            <button onClick={() => setLoadUserInfo("SEARCH_USER")} className="btn btn-outline-secondary me-2"><i className="bi bi-x-lg"></i></button>
        </div>
        <div className="border mx-2 mb-2">
            <ul className="list-group list-group-flush">
                <li className="list-group-item"><b>DUI: </b>{userData.dui}</li>
                <li className="list-group-item"><b>Nombres: </b>{userData.nombre}</li>
                <li className="list-group-item"><b>Apellidos: </b>{userData.apellido}</li>
                <li className="list-group-item"><b>Fecha de nacimiento: </b>{userData.fecha_nacimiento.split('T')[0]}</li>
                <li className="list-group-item"><b>Email: </b>{userData.email}</li>
                <li className="list-group-item"><b>Ocupacion actual:</b> {userData.ocupacion}</li>
                <li className="list-group-item"><b>Zona de residencia: </b>{userData.zona_residencia}</li>
                <li className="list-group-item"><b>Condicion medica: </b>{userData.condicion}</li>
            </ul>
        </div>
        <h5 className="fs-5 fw-normal py-2">Configuración de Cuenta</h5>
        <div className="d-flex gap-3 mb-3 mx-2">
            <button onClick={() => setAccountConfig("HISTORIAL_CITAS_CANCELADAS")} className="btn btn-outline-warning ms-0 me-2">Citas canceladas</button>
            <button onClick={() => setAccountConfig("HISTORIAL_CITAS_ASISTIDAS")} className="btn btn-outline-warning ms-0 me-2">Citas asistidas</button>
            <button onClick={() => setAccountConfig("HISTORIAL_CITAS_INASISTIDAS")} className="btn btn-outline-warning ms-0 me-2">Citas inasistidas</button>
            <button onClick={() => setAccountConfig("CITA_PENDIENTE")} className="btn btn-outline-warning ms-0 me-auto">Citas Pendiente</button>
            <button onClick={() => setAccountConfig("USER_INFO_CONFIG")} className="btn btn-outline-primary">Act. infomarción</button>
        </div>
        <div id='div-historial-citas' className="row justify-content-center p-2">
            <div className="col-md-11 border border-2 rounded-2 p-3">
            {
                RenderAccountConfig[accountConfig]
            }
            </div>
        </div>
    </div>
    </>
    )
}

function UserCitaPendiente({userData, citaPendiente}) {
    const optionsDate = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true}
  
    const saveImageCita = () => {
        ImageCitaAgendadaSave(userData, citaPendiente.citaInfo[0]);
    };

    return(
    <>
    {!citaPendiente.userHasCita &&
        <div className="d-flex p-2">
            <span className="fs-5 fw-medium m-auto text-secondary">El usuario no tiene Cita Agendada.</span>
        </div>
    }
    {citaPendiente.userHasCita &&
    <> 
    <div className="d-flex">
        <button onClick={() => saveImageCita()} className="btn btn-outline-primary ms-auto me-2">
            <i className="bi bi-file-earmark-arrow-down me-1" />Guardar
        </button>
    </div>
    <div>       
        <h5 className="fs-5">Cita Medica {citaPendiente.citaInfo[0]?.estado_cita}</h5>
        <div className="ps-3 mb-3">
            <p className="fs-6"><b>Cita:</b> {citaPendiente.citaInfo[0]?.titulo}</p>

            <p className="mb-0"><b>Motivo:</b></p>
            <p className="mt-0 ms-3">{citaPendiente.citaInfo[0]?.motivo}</p>

            <p className="mb-0"><b>Fecha y Hora de Atencion:</b></p>
            <p className="mt-0 ms-3">{new Date(Date.parse(citaPendiente.citaInfo[0]?.fecha_hora_atencion))?.toLocaleString(undefined, optionsDate)}</p>

            <p className="mb-0"><b>Espcialidad medica:</b></p>
            <p className="mt-0 ms-3">{citaPendiente.citaInfo[0]?.especialidad}</p>

            <p className="mb-0"><b>Centro de Atencion:</b></p>
            <p className="mt-0 ms-3">Centro Medico de Santa Ana, 25 Av. Norte --- <a href="https://maps.app.goo.gl/3aTaLmdXXvt9Uiyr7">Ver Ubicacion</a></p>
        
            <div className="mt-auto mb-1">
                <p><b>Recordar al Usuario:</b></p>
                <ul>
                    <li><span>La Confirmacion de la Cita es maximo 5 Horas antes o el dia previo a la Cita.</span></li>
                    <li><span>El Tiempo maximo de espero por paciente Sin Confirmacion es de 10 min.</span></li>
                    <li><span>El Tiempo maximo de espero por paciente con Cita Confirmada es de 20 min.</span></li>
                </ul>
                <p className="text-center fw-medium">Si necesitas atención médica de urgencia, por favor acude a este o al centro de salud más cercano.</p>
            </div>
        </div> 
    </div>
    </>
    }
    </>
    )
}

function HistorialCitas({historialCitas}) {   

    if (historialCitas || historialCitas.length === 0) {
        return ( <h1 className="fs-5 fw-normal p-2 text-center text-body-secondary">El usuario no tiene historial de citas.</h1> );
    }
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }
    const formatDate = (dateTime) => new Date(dateTime).toLocaleString(undefined, options);

    return(
    <>
    <table className="table table-striped table-hover">
        <thead>
            <tr>
                <td>Cita</td>
                <td>Motivo</td>
                <td>Especialidad</td>
                <td>Fecha</td>
                <td>Opciones</td>
            </tr>
        </thead>
        <tbody>
        {historialCitas.map((cita, index) => (
            <tr key={index}>
                <td>{cita.id}</td>
                <td>{cita.titulo}</td>
                <td>{cita.especialidad}</td>
                <td>{formatDate(cita.fecha_hora_atencion)}</td>
                <td><button className="btn btn-outline-primary">Ver detalles</button></td>
            </tr>
        ))}
        </tbody>
    </table>
    </>
    )
}

function FormPersonalInfo({userData, setCancelar}) {
    const [showAlert, setShowAlert] = useState({show: true, type: "", message: ""});
    const [formPersonalInfo, setFormPersonalInfo] = useState({
        nombre: '', apellido: '', fecha_nacimiento: '', dui: '', email: '',
        zona_residencia: '', idOcupacion: '', idCondicion: ''
    });

    const [dataUserCuenta, setDataUserCuenta] = useState({ocupaciones: [], condiciones: []});

    useEffect(() => {
        let isMounted = true;
        const idOcupacion = dataUserCuenta.ocupaciones.find(ocp => ocp.nombre == userData.ocupacion)?.id;
        const  idCondicion = dataUserCuenta.condiciones.find(cnd => cnd.nombre == userData.condicion)?.id;
        if(isMounted) {            
            setFormPersonalInfo(prev => ({...prev, idOcupacion: idOcupacion, idCondicion: idCondicion}));
        }
        return () => {isMounted = false}
    }, [dataUserCuenta]);
    
    useEffect(() => { setFormPersonalInfo(userData) }, [userData]);
    
    useEffect(() => {
        let isMounted = true;
        const loadDataAccountConfig = async () => {
            const resp = await getListOcupacionesCondiciones();
            if (isMounted && resp.success) {
                setDataUserCuenta({ocupaciones: resp.ocupacionesList, condiciones: resp.condicionesList});
            }
        }
        loadDataAccountConfig();
        return () => {isMounted = false;}
    }, []);

    const updateForm = (e) => setFormPersonalInfo(prev => ({...prev, [e.target.name]: e.target.value}));

    const changeAlertBg = (orignal, change) => {
        return { "backgroundColor": orignal == change ? "transparent" : "rgb(248, 215, 218)" };
    }
          
    useEffect(() => {
        if (showAlert.type !== "SUCCESS") {return}
        let isMounted = true;
        if (isMounted) {
            setTimeout(() => setCancelar(""), 1800);
        }
        return () => {isMounted = false}
    }, [showAlert.type]);

    const sendForm = async (event) => {
        event.preventDefault();
        setShowAlert({show: false, type: "", message: ""});       
        const resp = await PersonalMedApp.updateUserAccount(formPersonalInfo);
        resp.success
            ? setShowAlert({show: true, type: "SUCCESS", message: resp.message})
            : setShowAlert({show: true, type: "ALERT", message: resp.message}); 
    }

    return(
    <>
    { showAlert.show === true && showAlert.type == "SUCCESS"
        ? <ToastSuccess message={showAlert.message} />
        : null
    }
    { showAlert.show === true && showAlert.type == "ALERT"
        ? <ToastAlert message={showAlert.message} />
        : null
    }
    <h5 className="fs-6 fw-normal mb-2">Actualizando información de Usuario</h5>
    <form onSubmit={(e) => sendForm(e)} className="">
        <ul className="list-group list-group-flush ">
            <li className="list-group-item d-flex align-items-center gap-3" style={changeAlertBg(formPersonalInfo.nombre, userData.nombre)}>
                <span className="fw-medium ms-0 me-auto m-sm-0">Nombres:</span>
                <input type="text" name="nombre" id="nombre" className="form-control w-auto"
                    value={formPersonalInfo.nombre} onChange={updateForm} />
            </li>
            <li className="list-group-item d-flex align-items-center gap-3" style={changeAlertBg(formPersonalInfo.apellido, userData.apellido)}>
                 <span className="fw-medium ms-0 me-auto m-sm-0">Apellidos:</span>
                <input type="text" name="apellido" id="apellido" className="form-control w-auto"
                    value={formPersonalInfo.apellido} onChange={updateForm} />
            </li>
           
            <li className="list-group-item d-flex align-items-center gap-3" style={changeAlertBg(formPersonalInfo.fecha_nacimiento.split("T")[0], userData.fecha_nacimiento.split("T")[0])}>
                 <span className="fw-medium ms-0 me-auto m-sm-0">Fecha de nacimiento:</span>
                <input type="date" name="fecha_nacimiento" id="fecha_nacimiento" className="form-control w-auto"
                    value={formPersonalInfo.fecha_nacimiento.split('T')[0].split("-").join("-") || ""} onChange={updateForm} />
            </li>
  
            <li className="list-group-item d-flex flex-column flex-sm-row align-items-center justify-content-start gap-3" style={changeAlertBg(formPersonalInfo.idOcupacion, userData.idOcupacion)}>
                <span className="fw-medium ms-0 me-auto m-sm-0">Ocupacion actual:</span>
                <select name="idOcupacion" id="idOcupacion" className="form-select w-auto" onChange={updateForm} required value={formPersonalInfo.idOcupacion}>
                    {dataUserCuenta.ocupaciones.map(ocup =>                       
                        <option key={ocup.id} value={ocup.id}>{ocup.nombre}</option>
                    )}
                </select>
            </li>
            <li className="list-group-item d-flex flex-column flex-sm-row align-items-center justify-content-start gap-3" style={changeAlertBg(formPersonalInfo.idCondicion, userData.idCondicion)}>
                <span className="fw-medium ms-0 me-auto m-sm-0">Condicion medica:</span>
                <select name="idCondicion" id="idCondicion" className="form-select w-auto" onChange={updateForm} required value={formPersonalInfo.idCondicion}>
                    {dataUserCuenta.condiciones.map(cond =>                       
                        <option key={cond.id} value={cond.id}>{cond.nombre}</option>
                    )}
                </select>
            </li>
            <li className="list-group-item d-flex flex-column flex-sm-row align-items-center justify-content-start gap-3" style={changeAlertBg(formPersonalInfo.zona_residencia, userData.zona_residencia)}>
                <span className="fw-medium ms-0 me-auto m-sm-0">Zona de residencia:</span>
                <textarea type="text" name="zona_residencia" id="zona_residencia" className="form-control"
                    value={formPersonalInfo.zona_residencia || ""} onChange={updateForm} />
            </li>
        </ul>

        <div className="d-flex gap-3 flex-column-reverse flex-md-row justify-content-md-between mt-4 mb-3">
            <button type="button" onClick={() => setCancelar("")} className="btn btn-warning">Cancelar</button>
            <button type="submit" className="btn btn-primary">Guardar Cambios</button>
        </div>
    </form>
    </>
    )
}

export function UsuarioNormalAccount({loadUserInfo, setLoadUserInfo}) { // El objeto setLoadUserInfo contiene: {idUsuario: "", show: false}
    const [historialStatus, setHistorialStatus] = useState({isOpen: false, show: false});
    const [historialCitas, setHistorialCitas] = useState([]);
    const [userHasCita, setUserHasCita] = useState(null);
    const [citaPendiente, setCitaPendiente] = useState({id_usuario: "", estado_cita: "", titulo: "", motivo: "", fecha_hora_atencion: "", especialidad: ""});
    const [accountConfig, setAccountConfig] = useState("");
    const [userData, setUserData] = useState({
        id_usuario: "",  nombre: '', apellido: '', fecha_nacimiento: '', dui: '', email: '',
        idOcupacion: '', idCondicion: '', zona_residencia: ''
    });

    useEffect(() => {
        let isMounted = true;
        const loadData = async () => {
            const resp = await PersonalMedApp.userAccountData(loadUserInfo.idUsuario);            
            if (isMounted && resp.success) { setUserData(resp.usuarioAccountInfo) }
        };
        loadData();
        return () => { isMounted = false }
    }, []);

    const getAccountConfig = {
        "HISTORIAL_CITAS_INASISTIDAS": () => PersonalMedApp.historialCitasInasistidas(userData.id_usuario),
        "HISTORIAL_CITAS_CANCELADAS": () => PersonalMedApp.historialCitasInasistidas(userData.id_usuario),
        "HISTORIAL_CITAS_ASISTIDAS": () => PersonalMedApp.historialCitasInasistidas(userData.id_usuario),
        "CITA_PENDIENTE": () => PersonalMedApp.userCitaPendiente(userData.id_usuario),
    };

    const RenderAccountConfig = {
        "HISTORIAL_CITAS_INASISTIDAS": <HistorialCitas historialCitas={historialCitas} />,
        "HISTORIAL_CITAS_CANCELADAS": <HistorialCitas historialCitas={historialCitas} />,
        "HISTORIAL_CITAS_ASISTIDAS": <HistorialCitas historialCitas={historialCitas} />,
        "CITA_PENDIENTE": <UserCitaPendiente userHasCita={userHasCita} citaPendiente={citaPendiente} />,
        "DELETE_ACCOUNT": <FormDeleteAccount userData={userData} setCancelar={setAccountConfig} />,
        "USER_INFO_CONFIG": <FormPersonalInfo userData={userData} setCancelar={setAccountConfig} />,
    };

    useEffect(() => {
        if (accountConfig === "") { return }

        const typeConfig = accountConfig.split("_")[0];
        if ( !["HISTORIAL", "CITA"].some(type => type == typeConfig) ) { return } ;

        let isMounted = true;
        const loadAccountConfig = async () => {           
            const resp = await getAccountConfig[accountConfig]();
            if (!isMounted || !resp.success) { return }
            if (typeConfig == "HISTORIAL") { setHistorialCitas(resp.historialCitas) }
            else if (typeConfig == "CITA") {
                resp.userHasCita
                    ? () => {setCitaPendiente(resp.citaInfo); setUserHasCita(true)}
                    : setUserHasCita(false);
            }
        };
        loadAccountConfig();

        return () => {isMounted = false}
    }, [accountConfig]);

    return(
    <>
    <div className="container">
        <div className="d-flex justify-content-between py-3">
            <h5 className="fs-5 fw-normal">Información de Usuario</h5>
            <button onClick={() => setLoadUserInfo("SEARCH_USER")} className="btn btn-outline-secondary me-2"><i className="bi bi-x-lg"></i></button>
        </div>
        <div className="border mx-2 mb-2">
            <ul className="list-group list-group-flush">
                <li className="list-group-item"><b>DUI: </b>{userData.dui}</li>
                <li className="list-group-item"><b>Nombres: </b>{userData.nombre}</li>
                <li className="list-group-item"><b>Apellidos: </b>{userData.apellido}</li>
                <li className="list-group-item"><b>Fecha de nacimiento: </b>{userData.fecha_nacimiento.split('T')[0]}</li>
                <li className="list-group-item"><b>Email: </b>{userData.email}</li>
                <li className="list-group-item"><b>Ocupacion actual:</b> {userData.ocupacion}</li>
                <li className="list-group-item"><b>Zona de residencia: </b>{userData.zona_residencia}</li>
                <li className="list-group-item"><b>Condicion medica: </b>{userData.condicion}</li>
            </ul>
        </div>
        <h5 className="fs-5 fw-normal py-2">Configuración de Cuenta</h5>
        <div className="d-flex gap-3 mb-3 mx-2">
            <button onClick={() => setAccountConfig("HISTORIAL_CITAS_CANCELADAS")} className="btn btn-outline-warning ms-0 me-2">Citas canceladas</button>
            <button onClick={() => setAccountConfig("HISTORIAL_CITAS_ASISTIDAS")} className="btn btn-outline-warning ms-0 me-2">Citas asistidas</button>
            <button onClick={() => setAccountConfig("HISTORIAL_CITAS_INASISTIDAS")} className="btn btn-outline-warning ms-0 me-2">Citas inasistidas</button>
            <button onClick={() => setAccountConfig("CITA_PENDIENTE")} className="btn btn-outline-warning ms-0 me-auto">Citas Pendiente</button>
            <button onClick={() => setAccountConfig("DELETE_ACCOUNT")} className="btn btn-outline-danger ms-0 me-auto">Eliminar</button>
            <button onClick={() => setAccountConfig("USER_INFO_CONFIG")} className="btn btn-outline-primary">Act. infomarción</button>
        </div>
        <div id='div-historial-citas' className="row justify-content-center p-2">
            <div className="col-md-11 border border-2 rounded-2 p-3">
            {
                RenderAccountConfig[accountConfig]
            }
            </div>
        </div>
    </div>
    </>
    )
}

export function FormDeleteAccount({userData, setCancelar}) {
    const [showAlert, setShowAlert] = useState({show: true, type: "", message: ""});
    const securityCheck = {securityWord: "Si Eliminar Cuenta", inputWord: ""}
    const [formDeleteAccount, setFormDeleteAccount] = useState({email: ''});

    useEffect(() => { setFormDeleteAccount(prev => ({...prev, email: userData.email})) }, [userData]);
   
    useEffect(() => {
        if (showAlert.type !== "SUCCESS") {return}
        let isMounted = true;
        if (isMounted) {
            setTimeout(() => setCancelar(""), 1800);
        }
        return () => {isMounted = false}
    }, [showAlert.type]);

    const sendForm = async (event) => {
        event.preventDefault();
        const securityIsChecked = securityCheck.inputWord === securityCheck.securityWord ? true : false;
        setShowAlert({show: true, type: "", message: ""});
        if (securityIsChecked) {
            const resp = await AdminApp.deleteNormalUserAccount(formDeleteAccount); 
            console.log(resp);
            resp.success
                ? setShowAlert({show: true, type: "SUCCESS", message: resp.message})
                : setShowAlert({show: true, type: "ALERT", message: resp.message});           
        }   
    };

    return(
    <>
    { showAlert.show === true && showAlert.type == "SUCCESS"
        ? <ToastSuccess message={showAlert.message} />
        : null
    }
    { showAlert.show === true && showAlert.type == "ALERT"
        ? <ToastAlert message={showAlert.message} />
        : null
    }
    <div className="d-flex flex-column px-3 py-2">
        <h5 className="fs-6">Eliminación de Cuenta</h5>
        <p className="text-center">Al Elimnar tú cuenta se desactivara durante 15 días, durante este periodo de tiempo aún puedes volver Activar tu cuenta.
            Pasado ese periodo de tiempo, tu cuenta y los datos relacionados no se podran recuperar.
        </p>
        <p className="text-center">La Frase de seguridad es: <i className="fw-medium">{securityCheck.securityWord}</i></p>
        <form onSubmit={(e) => sendForm(e)} className="border border-danger rounded-2 px-4 py-2 mx-auto">
            <div className="form-floating my-3">
                <input type="text" name="check1" id="check1" className="form-control fw-medium" placeholder="Frase de seguridad"
                    onChange={(e) => {securityCheck.inputWord = e.target.value}}   />
                <label htmlFor="check1">Frase de seguridad</label>
            </div>

            <div className="d-flex gap-2 flex-column-reverse flex-md-row justify-content-md-between mt-4 mb-3">
                <button type="button" onClick={() => setCancelar("")} className="btn btn-primary">Cancelar</button>
                <button type="submit" className="btn btn-danger">Eliminar Cuenta</button>
            </div>
        </form>
    </div>
    </>
    )
}