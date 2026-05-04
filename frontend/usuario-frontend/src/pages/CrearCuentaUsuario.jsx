import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { createAccount } from "../api/usuario-account.api.js";
import { ToastAlert, ToastSuccess } from "../componentes/Notifications.jsx";
import App from "../application/app.js";
import { saveNewUserAccountToken } from "../application/Authentication.js";

export function CrearCuentaUsuario() {
    const navigate = useNavigate();
    const [alertData, setAlertData] = useState({show: false, message: ""});
    const [alertSuccess, setAlertSuccess] = useState({show: false, message: ""});
    const [formAddUsuario, setFormAddUsuario] = useState({
        nombre: '', apellido: '', dui: '', fechaNacimiento: '', email: '', pass1: '', pass2: '',
        zonaResidencia: '', ocupacionId: '', condicionId: ''
    });
    const [dataCrearCuenta, setDataCrearCuenta] = useState({ocupaciones: [], condiciones: []})
    
    useEffect(() => {
        const loadData = async () => {
            const data = await App.loadDataCrearCuenta();
            if (data.success) {
                setDataCrearCuenta(({
                    ocupaciones: data.ocupacionesList, condiciones: data.condicionesList
                }));
            }
        };
        loadData();
    }, []);

    const delay = (ms) => new Promise(solve => setTimeout(solve, ms));
    
    const updateForm = (e) => {
        setFormAddUsuario(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const sendForm = async (event) => {
        event.preventDefault();
        setAlertData({ show: false, message: "" });
        setAlertSuccess({ show: false, message: "" });
        const resp = await createAccount(formAddUsuario);

        if (resp.success) {
            setAlertSuccess(({show: true, message: `${resp.message} Se espera un momento...`}));
            saveNewUserAccountToken(resp.token, resp.id);
            await delay(4000);
            return navigate("/user/home");
        } else if (resp.success === false) {
            setAlertData(({show: true, message: resp.message}));
        }
    };
    
    return(
    <>
    { alertData.show && <ToastAlert message={alertData.message} /> }
    { alertSuccess.show && <ToastSuccess message={alertSuccess.message} /> }

    <div className="d-flex flex-column align-items-center m-auto w-100">

        <div className="text-center mb-2">
            <h5 className="fs-5 mb-0">Formulario de registro para nuevo usuario</h5>
            <i className="bi bi-person-plus-fill fs-2 mt-0"></i>
        </div>

        <form onSubmit={(e) => sendForm(e)} className="d-flex flex-column gap-3 border border-2 rounded-2 p-4" >

            <h5 className="fs-5">Datos de registro</h5>
            <div className="d-flex flex-wrap gap-2 gap-md-4">
                <div>
                    <label htmlFor="nombre" className="form-label">Nombres</label>
                    <input type="text" id="nombre" name="nombre" className="form-control" required 
                        value={formAddUsuario.nombre} onChange={updateForm}
                    />
                </div>

                <div>
                    <label htmlFor="apellido" className="form-label">Apelllidos</label>
                    <input type="text" id="apellido" name="apellido" className="form-control" required 
                        value={formAddUsuario.apellido} onChange={updateForm}
                    />
                </div>

                <div>
                    <label htmlFor="dui" className="form-label">DUI</label>
                    <input type="text" id="dui" name="dui" className="form-control" required pattern="^\d{8}-\d{1}$"
                        value={formAddUsuario.dui} onChange={updateForm}
                    />
                </div>

                <div>
                    <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
                    <input type="date" id="fechaNacimiento" name="fechaNacimiento" className="form-control" required 
                        value={formAddUsuario.fechaNacimiento} onChange={updateForm}
                    />
                </div>
            </div>
            <div className="d-flex flex-wrap gap-2 gap-md-4">
                <div>
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" name="email" className="form-control w-100" required 
                        value={formAddUsuario.email} onChange={updateForm}
                    />
                </div>
                <div>
                    <label htmlFor="pass1" className="form-label">Contrasena</label>
                    <input type="text" id="pass1" name="pass1" className="form-control" required 
                        value={formAddUsuario.pass1} onChange={updateForm}
                    />
                </div>
                <div>
                    <label htmlFor="pass2" className="form-label">Confirmar contrasena</label>
                    <input type="text" id="pass2" name="pass2" className="form-control" required 
                        value={formAddUsuario.pass2} onChange={updateForm}
                        />
                </div>
            </div>
     
            <h5 className="fs-5 mt-1">Datos complementarios</h5>
            <div className="d-flex flex-wrap gap-4">
                <div className="d-flex flex-column gap-2 gap-md-3">
                    <div>
                        <label htmlFor="ocupacionId" className="form-label">Trabajo actual</label>
                        <select name="ocupacionId" id="ocupacionId" className="form-select" onChange={updateForm} required defaultValue="">
                            <option value="" disabled>Seleccionar</option>
                            {dataCrearCuenta.ocupaciones.map(ocp => 
                                <option key={ocp.id} value={ocp.id}>{ocp.nombre}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="condicionId" className="form-label">¿Tienes alguna condicion?</label>
                        <select name="condicionId" id="condicionId" className="form-select" onChange={updateForm} required defaultValue="">
                            <option value="" disabled>Seleccionar</option>
                            {dataCrearCuenta.condiciones.map(cond => 
                                <option key={cond.id} value={cond.id}>{cond.nombre}</option>
                            )}
                        </select>
                    </div>
                </div>

                <div className=" flex-grow-1">
                    <label htmlFor="zonaResidencia" className="form-label">Zona de residencia</label>
                    <textarea name="zonaResidencia" id="zonaResidencia" className="form-control w-100" required
                        value={formAddUsuario.zonaResidencia} onChange={updateForm}
                    />
                </div>
            </div>

            <div className="d-flex flex-column-reverse flex-md-row gap-2 justify-content-md-between">
                <a href="/login" className="m-auto m-md-auto ms-md-0">Ya tengo una cuenta</a>
                <button type="submit" className="btn btn-primary flex-grow-sm-1 flex-shrink-md-1">Crear Cuenta</button>
            </div>
            
        </form>
    </div>
    </>
    )
}