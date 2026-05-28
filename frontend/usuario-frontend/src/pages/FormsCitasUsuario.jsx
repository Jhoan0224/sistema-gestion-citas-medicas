import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import App from "../application/app.js";
import { ID_USER } from "../api/usuario-api.js";
import { agendarCitaUserAccount } from "../api/usuario-account.api.js";
import { ToastAlert, ToastDanger, ToastSuccess } from "../componentes/Notifications.jsx";


export function AgendarCitaUsuario() {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState({show: true, type: "", message: ""});
    const [formAgendarCita, setFormAgendarCita] = useState({
        id_usuario: "", titulo: '', motivo: '', tipoAtencion: '', horarioPreferido: '', signosIds: [], sintomasIds: []
    });
    const [listSignosSintomas, setListSignosSintomas] = useState({signos: [], sintomas: [], departamentos: [], ocupaciones: [], condiciones: []});

    useEffect(() => {
        let isMounted = true;
        const loadData = async () => {
            const data = await App.loadDataAgendarCita();            
            if (isMounted && data.success) {
                setListSignosSintomas(({signos: data.signosList, sintomas: data.sintomasList}));
            }
        };
        loadData();
        return () => {isMounted = false}
    }, []);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            const idUsuario = ID_USER();
            setFormAgendarCita(prev => ({...prev, id_usuario: idUsuario}));
        }
        return () => {isMounted = false}
    }, []);

    const updateForm = (e) => setFormAgendarCita(prev => ({...prev, [e.target.name]: e.target.value}));

    const updateFormIds = (e) => {
        const {name, id, checked } = e.target;      
        setFormAgendarCita(prev => {
            const listActual = prev[name] || [];
            
            return {
                ...prev,
                [name]: checked
                ? [...listActual, id.split('-')[1]]
                : listActual.filter(ids => ids !== id.split('-')[1])
            }
        });
    };

    useEffect(() => {
        if (showAlert.type !== "SUCCESS") {return}
        let isMounted = true;
        if (isMounted) {
            setTimeout(() => navigate("/user/home"), 1800);
        }
        return () => {isMounted = false}
    }, [showAlert.type]);

    const sendForm = async (e) => {
        e.preventDefault();
        console.log(formAgendarCita);
        setShowAlert({show: false, type: "", message: ""});
        const resp = await agendarCitaUserAccount(formAgendarCita);
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
    <div className="d-flex flex-column align-items-center p-3">
        <div className="d-flex justify-content-between w-75 py-2">
            <h5 className="fs-5">Formulario de Agenda de Cita Médica</h5>
            <button onClick={() => navigate('/user/home')} className="btn btn-outline-secondary me-2"><i className="bi bi-x-lg"></i></button>
        </div>

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

            <div className="col-12">
            
            <label htmlFor="sintomas" className="form-label">Selecciona los sintomas que presentas:</label>
            <div className="d-flex flex-wrap flex-md-nowrap gap-4 mb-3">
                <div className="dropdown" id="sintomas">
                    <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
                        Sintomas
                    </button>
                    <ul className="dropdown-menu">
                    {listSignosSintomas.sintomas.map(sintoma => (
                        <li key={`sig-${sintoma.id}`}>
                            <input type="checkbox" id={`sin-${sintoma.id}`} value={sintoma.nombre} name="sintomasIds" className="form-check-input m-1"
                                onChange={updateFormIds}
                            />
                            <label htmlFor={`sin-${sintoma.id}`} className="form-label">{sintoma.nombre}</label>
                        </li>
                    ))                    
                    }
                    </ul>
                </div>
                <textarea rows="2" className="form-control flex-grow-1" readOnly 
                    value={listSignosSintomas.sintomas
                        .filter(s => formAgendarCita.sintomasIds.some(id => id == s.id))
                        .map(s => s.nombre).join(', ')
                    }
                />
            </div>

            <label htmlFor="signos" className="form-label">Selecciona los signos que presentas:</label>
            <div className="d-flex flex-wrap flex-md-nowrap gap-4">
                <div className="dropdown" id="signos">
                    <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
                        Signos
                    </button>
                    <ul className="dropdown-menu">
                    {listSignosSintomas.signos.map(signo => (
                        <li key={`sig-${signo.id}`}>
                            <input type="checkbox" id={`sig-${signo.id}`} value={signo.nombre} name="signosIds" className="form-check-input m-1"
                                onChange={updateFormIds}
                            />
                            <label htmlFor={`sig-${signo.id}`} className="form-label">{signo.nombre}</label>
                        </li>
                    ))                    
                    }
                    </ul>
                </div>
                <textarea rows="2" className="form-control flex-grow-1" readOnly 
                    value={listSignosSintomas.signos
                        .filter(s => formAgendarCita.signosIds.some(id => id == s.id))
                        .map(s => s.nombre).join(', ')
                    }
                />
            </div>

            </div>

            <div className="col-12 d-flex flex-wrap-reverse flex-md-nowrap justify-content-between gap-3 px-3">
                <button onClick={() => navigate('/user/home')} type="button" className="btn btn-warning flex-grow-1 flex-md-grow-0">
                    Cancelar
                </button>
                <button type="submit" className="btn btn-primary flex-grow-1 flex-md-grow-0">
                    Enviar solicitud
                </button>
            </div>
        </div>
        </form>
    </div>
    </>
    )
};