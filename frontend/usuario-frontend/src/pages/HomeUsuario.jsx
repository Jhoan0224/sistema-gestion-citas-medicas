import { useState } from "react"
import { HistorialCitas } from "../componentes/HistorialCitas.jsx"
import { UsuarioSinCita } from "../componentes/CitasForms.jsx";
import App from "../application/app.js";

export function HomeUsuario() {
    const [listaCitas, setListaCitas] = useState([]);
    const [historialStatus, setHistorialStatus] = useState({isOpen: false, show: false}); 

    const RenderHistorialCitas = async (filtroHistorial) => {
        setHistorialStatus(prev => ({...prev, isOpen: true}));
        alert(historialStatus.isOpen)

        const resp = await App.getHistorialCitas(filtroHistorial);
        
        if (resp.success) {
            setListaCitas(resp.historialCitas);
            setHistorialStatus(prev => ({...prev, show: true}));
        }        
    };



    return(
    <>
    <div className="d-flex flex-column py-3 px-4 w-100">
        
        <div className="d-flex flex-column flex-grow-1 p-3 border border-2 rounded-2">
            {/* <h5 className="fs-5">Cita Medica Pendiente</h5>
            <div className="ps-3 mb-5">
                <p className="fs-6"><b>Cita:</b> Checkeo de control anual</p>

                <p className="mb-0"><b>Motivo:</b></p>
                <p className="mt-0 ms-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis recusandae repellat delectus iure at, odit officia numquam facilis ipsum nemo!</p>

                <p className="mb-0"><b>Fecha y Hora de Atencion:</b></p>
                <p className="mt-0 ms-3">Miercoles, 15 de Enero de 2025 — 10:30 AM</p>

                <p className="mb-0"><b>Centro de Atencion:</b></p>
                <p className="mt-0 ms-3">Centro Medico de Santa Ana, 25 Av. Norte --- <a href="https://maps.app.goo.gl/3aTaLmdXXvt9Uiyr7">Ver Ubicacion</a></p>
            </div> */}
        
            <UsuarioSinCita />
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
        
        <div className="d-flex gap-3 p-2 mt-auto mb-0">
            {   
                historialStatus.isOpen === true
                && <button onClick={() => setHistorialStatus(prev => ({...prev, isOpen: false, show: false}))} type="button" className="btn btn-danger">Cerrar Historial</button>
            }
            
            <button onClick={() => RenderHistorialCitas("ASISTIDAS")} type="button" className="btn btn-primary">Citas asistidas</button>
            <button onClick={() => RenderHistorialCitas("CANCELADAS")} type="button" className="btn btn-primary">Citas canceladas</button>
            <button onClick={() => RenderHistorialCitas("PERDIDAS")} type="button" className="btn btn-primary">Citas perdidas</button>
        </div>

        <div id='div-historial-citas'>
            {
                historialStatus.show === true
                && <HistorialCitas listaCitas={listaCitas} />
            }
        </div>
    </div>
    </>
    )
}