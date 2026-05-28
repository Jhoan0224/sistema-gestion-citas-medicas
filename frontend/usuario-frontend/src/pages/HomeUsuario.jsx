import { use, useEffect, useState } from "react"
import App from "../application/app.js";
import { deleteCitaAgendada, getInfoUpdadeAccount } from "../api/usuario-account.api.js";
import { getCitaPendienteUsuario } from '../api/usuario-api.js'
import { ImageCitaAgendadaSave } from "../utils/img-cita-agendada.js";
import { HistorialCitas } from "../componentes/HistorialCitas.jsx"
import { UsuarioSinCita } from "../componentes/CitasForms.jsx";
import { ToastAlert, ToastDanger, ToastSuccess } from "../componentes/Notifications.jsx";

export function HomeUsuario() {
    const [listaCitas, setListaCitas] = useState([]);
    const [citasHistorialMessage, setCitasHistorialMessage] = useState("");
    const [historialStatus, setHistorialStatus] = useState({isOpen: false, show: false}); 
    const [userCita, setUseCita] = useState({});
    const [userHasAppoitment, setUserHasAppoitment] = useState(null);

    const RenderHistorialCitas = async (filtroHistorial) => {
        setHistorialStatus(prev => ({...prev, isOpen: true}));
        const resp = await App.getHistorialCitas(filtroHistorial);
        console.log(resp);        
        if (resp.success) {
            setListaCitas(resp.historialCitas);
            setCitasHistorialMessage(resp.message);
            setHistorialStatus(prev => ({...prev, show: true}));
        }        
    };

    useEffect(() => {
        let isMounted = true;
        const verifyPendingAppoitment = async () => {
            const resp = await getCitaPendienteUsuario();
            if (isMounted && resp.success && resp.userHasCita) {
                setUseCita(resp.citaInfo);
                setUserHasAppoitment(true);
            }
        }
        verifyPendingAppoitment();
        return () => {isMounted = false}
    }, []);

    
    return(
    <>
    <div className="d-flex flex-column py-3 px-4 w-100">
        <div className="d-flex flex-column flex-grow-1 p-3 border border-2 rounded-2">
            {
            userHasAppoitment === true 
                ? <UsuarioPendingAppoitment userCita={userCita} />
                : <UsuarioSinCita />
            }
            <div className="mt-auto mb-1">
                <p><b>Informacion importante:</b></p>
                <ul>
                    <li><span>La Confirmacion de la Cita es maximo 5 Horas antes o el dia previo a la Cita.</span></li>
                    <li><span>El Tiempo maximo de espero por paciente Sin Confirmacion es de 10 min.</span></li>
                    <li><span>El Tiempo maximo de espero por paciente con Cita Confirmada es de 20 min.</span></li>
                </ul>
                <p className="text-center fw-medium">Si necesitas atención médica de urgencia, por favor acude a este o al centro de salud más cercano.</p>
            </div>
        </div>
        <div className="d-flex flex-wrap gap-3 p-2 my-2">
            {   
                historialStatus.isOpen === true
                && <button onClick={() => setHistorialStatus(prev => ({...prev, isOpen: false, show: false}))} type="button" className="btn btn-danger flex-grow-1 flex-sm-grow-0">Cerrar Historial</button>
            }
            <div className="d-flex gap-2 gap-sm-3">
                <button onClick={() => RenderHistorialCitas("ASISTIDAS")} type="button" className="btn btn-primary">Citas asistidas</button>
                <button onClick={() => RenderHistorialCitas("CANCELADAS")} type="button" className="btn btn-primary">Citas canceladas</button>
                <button onClick={() => RenderHistorialCitas("PERDIDAS")} type="button" className="btn btn-primary">Citas perdidas</button>
            </div>
        </div>
        <div id='div-historial-citas'>
            {
                historialStatus.show === true
                && <HistorialCitas listaCitas={listaCitas} citaMessage={citasHistorialMessage}/>
            }
        </div>
    </div>
    </>
    )
};

function UsuarioPendingAppoitment({userCita}) {
    const [showAlert, setShowAlert] = useState({show: true, type: "", message: ""});
    const optionsDate = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true}
    const [userData, setUserData] = useState({
        id: "",  nombre: '', apellido: '', fecha_nacimiento: '', dui: '', email: '',
        idOcupacion: '', idCondicion: '', zona_residencia: ''
    });
    const [fechaHoraCita, setFechaHoraCita] = useState("");
    
    const saveImageCita = async () => {        
        const result = await ImageCitaAgendadaSave(userData, userCita);
        if (result === null) {
            // send alert to user
        }
    };
    
    useEffect(() => {
        let isMounted = true;
        const loadUser = async () => {
            const resp = await getInfoUpdadeAccount();
            if (isMounted && resp.success) {
                setUserData(resp.usuarioInfo);
            }
        }
        loadUser();
        return () => {isMounted = false}
    }, []);

    useEffect(() => {
        let isMounted = true;
        const formatDateTimeCita = () => {
            const date = new Date(userCita.fecha_hora_atencion);
            if (isMounted){
                setFechaHoraCita(date.toLocaleString(undefined, optionsDate));
            }
        }
        formatDateTimeCita();
        return () => {isMounted = false}
    }, []);

    useEffect(() => {
        if (showAlert.type !== "SUCCESS") {return}
        let isMounted = true;
        if (isMounted) {setTimeout(() => window.location.reload(), 1800);
        }
        return () => {isMounted = false}
    }, [showAlert.type]);

    const sendFormDeleteCita = async () => {
        setShowAlert({show: false, type: "", message: ""});
        const deleteCita = window.confirm("¿Estas completamente seguro de Eliminar tu Cita Agendada?");
        if (deleteCita === false) {return}
        const resp = await deleteCitaAgendada();
        resp.success
            ? setShowAlert({show: true, type: "SUCCESS", message: resp.message})
            : setShowAlert({show: true, type: "ALERT", message: resp.message}); 
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
    <div className="d-flex">
        <h5 className="fs-5">Cita Medica {userCita.estado_cita}</h5>
        {/* <div className="d-grid"> */}
            <button onClick={() => saveImageCita()} className="btn btn-outline-success ms-auto me-2">
                <i className="bi bi-file-earmark-arrow-down me-1" />Guardar
            </button>
            <button onClick={() => sendFormDeleteCita()} className="btn btn-danger ms-auto me-2">
                <i className="bi bi-trash3 me-1" />Eliminar Cita
            </button>
        {/* </div> */}
    </div>
    <div className="ps-3 mb-3">
        <p className="fs-6"><b>Cita:</b> {userCita.titulo}</p>

        <p className="mb-0"><b>Motivo:</b></p>
        <p className="mt-0 ms-3">{userCita.motivo}</p>

        <p className="mb-0"><b>Fecha y Hora de Atencion:</b></p>
        <p className="mt-0 ms-3">{fechaHoraCita}</p>

        <p className="mb-0"><b>Espcialidad medica:</b></p>
        <p className="mt-0 ms-3">{userCita.especialidad}</p>

        <p className="mb-0"><b>Centro de Atencion:</b></p>
        <p className="mt-0 ms-3">Centro Medico de Santa Ana, 25 Av. Norte --- 
            <a target="_blank" rel="noopener noreferrer" href="https://maps.app.goo.gl/3aTaLmdXXvt9Uiyr7">
            Ver Ubicacion</a>
        </p>
    </div> 
    </>
    )
};