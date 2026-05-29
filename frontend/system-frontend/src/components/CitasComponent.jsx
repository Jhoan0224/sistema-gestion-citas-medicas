import { useState, useEffect } from "react";
import { PersonalMedApp } from "../app/personal-med.app.js";
import { ToastAlert, ToastDanger, ToastSuccess } from "../components/Notifications.jsx";

export function AgendarCita({setRenderView}) {
    const [showAlert, setShowAlert] = useState({show: true, type: "", message: ""});
    const [listSignosSintomas, setListSignosSintomas] = useState({signos: [], sintomas: [], departamentos: [], ocupaciones: [], condiciones: []});
    const [formAgendarCita, setFormAgendarCita] = useState({
     dui: "", dui_usuario: "", titulo: '', motivo: '', tipoAtencion: '', horarioPreferido: '', signosIds: [], sintomasIds: []
    });

    useEffect(() => {
      const loadData = async () => {
          const data = await PersonalMedApp.agendarCitaData();
          if (data.success) {
            setListSignosSintomas(({signos: data.signosList, sintomas: data.sintomasList}));
          }
      };
      loadData();
    }, []);
    
    const updateForm = (e) => {
        setFormAgendarCita(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const updateFormIds = (e) => {
      const {name, id, checked } = e.target;      
      setFormAgendarCita(prev => {
        const listActual = prev[name] || [];
        
        return {...prev,
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
            setTimeout(() => setRenderView("PANEL_MAIN"), 1800);
        }
        return () => {isMounted = false}
    }, [showAlert.type]);

    const sendForm = async (e) => {
      e.preventDefault();
      setShowAlert({show: true, type: "", message: ""});
      if (formAgendarCita.dui !== formAgendarCita.dui_usuario) {
        setShowAlert({show: true, type: "ALERT", message: "El DUI no coincide"});
      }
      const resp = await PersonalMedApp.agendarCitaUsuario(formAgendarCita);
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
      <div className="container d-flex flex-column">
        <span className="fs-5 mb-3 mx-4">Agendando nueva cita</span>
        <form onSubmit={(e) => sendForm(e)} className="form-control border-2 w-auto mx-4">
          <div className="row">
            <div className="col-sm-4 col-md-3">
              <label htmlFor="dui_usuario" className="form-label">DUI del usuario</label>
              <input type="text" name="dui_usuario" id="dui_usuario" className="form-control" required
                value={formAgendarCita.dui_usuario} onChange={updateForm}/>
            </div>
            <div className="col-sm-4 col-md-3 ">
              <label htmlFor="dui" className="form-label">Confirmar DUI del usuario</label>
              <input type="text" name="dui" id="dui" className="form-control" required
                value={formAgendarCita.dui} onChange={updateForm}/>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-sm-6">
              <label htmlFor="titulo" className="form-label">Titulo</label>
              <input type="text" name="titulo" id="titulo" className="form-control" required
                value={formAgendarCita.titulo} onChange={updateForm}/>
            </div>
            <div className="col-sm-6">
              <label htmlFor="motivo" className="form-label">Motivo</label>
              <input type="text" name="motivo" id="motivo" className="form-control" required
                value={formAgendarCita.motivo} onChange={updateForm}/>
            </div>
          </div>

          <div className="row mb-4">

            <div className="col-sm-6">
              <div className="border rounded-3 p-3 bg-white">
                <div className="form-check">
                  <input onChange={updateForm} value="matutino" id="matutino"  name="horarioPreferido" className="form-check-input" type="radio" required />
                  <label htmlFor="matutino" className="form-check-label">Matutino</label>
                </div>
                
                <div className="form-check">
                  <input onChange={updateForm} value="vespertino" id="vespertino"  name="horarioPreferido" className="form-check-input" type="radio" required />
                  <label htmlFor="vespertino" className="form-check-label">Vespertino</label>
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="border rounded-3 p-3 bg-white">
                <div className="form-check">
                  <input onChange={updateForm} value="consultaMedica" id="consultaMedica"  name="tipoAtencion" className="form-check-input" type="radio" required />
                  <label htmlFor="consultaMedica" className="form-check-label">Consulta Médica</label>
                </div>
                <div className="form-check">
                  <input onChange={updateForm} value="controlMedico" id="controlMedico"  name="tipoAtencion" className="form-check-input" type="radio" required />
                  <label htmlFor="controlMedico" className="form-check-label">Control Médico</label>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-4">
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

          </div>

          <div className="row mb-2">
            <div className="col-12 d-flex flex-wrap-reverse flex-md-nowrap justify-content-between gap-3 px-3">
              <button onClick={() => setRenderView("PANEL_MAIN")} type="button" className="btn btn-warning flex-grow-1 flex-md-grow-0">
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
}