import { useEffect, useState } from "react"

const optionsDateTime = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: '2-digit',
    minute: '2-digit',

}

export function PersonalOfficeCs() {
    const [panelLeftShow, setPanelLeftShow] = useState(true);
    const [dateTime, setDateTime] = useState('miércoles, 1 de abril de 2026, 04:10 p. m.');
    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            setDateTime(date.toLocaleString('es-SV', optionsDateTime));
        }, 1000);
        return () => clearInterval(interval);

    }, []);

    return(
    <div className="d-flex w-100">
        {   
            panelLeftShow && <PanelLeft setPanelShow={setPanelLeftShow}/>
        }
        <div className="d-flex flex-column w-100">

            <div className="d-flex align-items-center personal-cs-section-top">
                {
                    !panelLeftShow && 
                    <button onClick={() => setPanelLeftShow(true)} className="btn btn-outline-secondary m-auto mx-2"><i className="bi bi-list"></i></button>
                }
                <div className="d-flex justify-content-between p-2 w-100">
                    <h5 className="fs-5 fw-medium">Nombre Persona Actual</h5>
                    <h5 className="fw-normal">{dateTime}</h5>
                </div>
            </div>

            <div className="text-center m-3">
                <h5 className="fs-5 text-start">Citas de este día</h5>
                <h5 className="fs-5">Paciente Anterior 3:30 PM - 4:00 PM</h5>
                <h5 className="fs-4">Paciente Actual 3:30 PM - 4:00 PM</h5>
                <h5 className="fs-5">Paciente Proximo 3:30 PM - 4:00 PM</h5>
            </div>

            <div className="d-flex justify-content-between mx-2 my-2">
                <div className="d-flex gap-2">
                    <button className="btn btn-outline-primary">Citas de hoy</button>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn btn-outline-primary">Agregar Usuario</button>
                    <button className="btn btn-outline-primary">Agendar Cita</button>
                    <button className="btn btn-outline-primary">Cancelar Cita</button>
                </div>
            </div>

            <div>


            </div>
        </div>
    </div>    
    )
};


function PanelLeft({setPanelShow}) {

    return(
    <div className="d-flex flex-column personal-cs-section-left">
        <button onClick={() => setPanelShow(false)} className="btn btn-outline-secondary mt-1 ms-auto me-2"><i className="bi bi-x-lg m-0"></i></button>
        <div className="text-center mt-0 mb-4">
            <i className="bi bi-person-circle fs-2"></i>
            <h5 className="fs-6">Cargo actual</h5>
        </div>

        <div className="d-flex flex-column gap-3 mx-auto my-2">
            <button className="btn btn-primary">Citas</button>
            <button className="btn btn-primary">Usuarios</button>
            <button className="btn btn-primary">Personal Med.</button>
        </div>

        <div className="d-flex flex-column mx-auto mt-auto mb-md-4">
            <button className="btn btn-warning">Cerrar Sesión</button>
        </div>
    </div>   
    )
};