import { useNavigate } from "react-router-dom"

export function UsuarioSinCita() {
    const navigate = useNavigate();

    return(
    <>
    <div className="d-flex flex-column align-items-center text-center p-2">
        <h4 className="fs-4">Actualmente no tienes ninguna cita pendiente.</h4>
        <p className="">Si necesitas atención medica puedes agendar tu cita medica!</p>
        <button onClick={() => navigate("/agendar-cita")} className="btn btn-warning">Agendar Cita</button>
    </div>
    </>
    )
}

export function FormAgendarCita() {

    return(
    <>
    <div>
        <h5>Agendar cita form</h5>
    </div>
    </>
    )
}