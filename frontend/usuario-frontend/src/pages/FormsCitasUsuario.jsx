import { useState } from "react"


export function AgendarCitaUsuario() {
    const [formAgendarCita, setFormAgendarCita] = useState({
        titulo: '', motivo: '', tipoAtencion: '', horarioPreferido: ''
    });

    const updateForm = (e) => {
        setFormAgendarCita(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const sendForm = async (e) => {
        e.preventDefault();
        console.log(formAgendarCita);
    }
    return(
    <>
    <div className="d-flex flex-column align-items-center p-3 w-100">
        <h5 className="fs-5">Formulario de Agenda de Cita Médica</h5>
        <form onSubmit={(event) => sendForm(event)} className="border rounded-3 p-4 w-75 shadow-sm">
        <div className="row g-3">
            <div className="col-md-6">
                <label htmlFor="titulo" className="form-label fw-semibold">Título</label>
                <input type="text" id="titulo" name="titulo" placeholder="Título relacionado" className="form-control"
                    value={formAgendarCita.titulo}
                    onChange={updateForm}
                />
            </div>

            <div className="col-md-6">
                <label htmlFor="motivo" className="form-label fw-semibold">Motivo</label>
                <textarea id="motivo" name="motivo" rows="2" placeholder="Descripción breve..." className="form-control"
                    value={formAgendarCita.motivo}
                    onChange={updateForm}
                />
            </div>

            <div className="col-md-6">

                <div className="border rounded-3 p-3 bg-white">
                    <label className="form-label fw-semibold mb-2">Tipo de atención</label>
                    <div className="form-check">
                        <input type="radio" name="tipoAtencion" id="consultaMedica" className="form-check-input"
                            value="consultaMedica"
                            onChange={updateForm}
                        />
                        <label htmlFor="consultaMedica" className="form-check-label">Consulta Médica</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" name="tipoAtencion" value="controlMedico" id="controlMedico" className="form-check-input"
                            onChange={updateForm}
                        />
                        <label htmlFor="controlMedico" className="form-check-label">Control Médico</label>
                    </div>
                </div>

            </div>

            <div className="col-md-6">
                <div className="border rounded-3 p-3 bg-white">
                    <label className="form-label fw-semibold mb-2">Horario preferido</label>

                    <div className="form-check">
                        <input type="radio" name="horarioPreferido" value="matutino" id="matutino" className="form-check-input"
                            onChange={updateForm}
                        />
                        <label htmlFor="matutino" className="form-check-label">Matutino</label>
                    </div>

                    <div className="form-check">
                        <input type="radio" name="horarioPreferido" value="vespertino" id="vespertino" className="form-check-input"
                            onChange={updateForm}
                        />
                        <label htmlFor="vespertino" className="form-check-label">Vespertino</label>
                    </div>
                </div>
            </div>

            <div className="col-12 text-end">
                <button type="submit" className="btn btn-primary px-4">
                    Enviar solicitud
                </button>
            </div>
        </div>
        </form>
    </div>
    </>
    )
}

