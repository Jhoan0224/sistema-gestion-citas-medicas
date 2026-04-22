import { use, useEffect, useState } from "react"
import {updateSecurityAccount, getUserAccountData, updateInfoAccount} from '../api/usuario-account.api.js'
import App from "../application/app.js";

export function FormSecurityUserAccount({userData, setCancelar}) {
    const [updateEmail, setUpdateEmail] = useState(false);
    const [formUpdSecurity, setFormUpdSecurity] = useState({
       isEmailModified: false, email: '', newEmail: '', pass: '', newPassCheck1: '', newPassCheck2: ''
    });

    const updateForm = (e) => {
        setFormUpdSecurity(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const sendForm = async (event) => {
        event.preventDefault();
        const formSecurity = {...formUpdSecurity};
        formSecurity.email = userData.email;
        if (updateEmail) {formSecurity.isEmailModified = true}
        const resp = await updateSecurityAccount(formSecurity);
    };
    
    return(
    <>
    <h5 className="fs-6">Actualizando seguridad de la cuenta</h5>
    <form onSubmit={(e) => sendForm(e)} className="m-3">
        <div className="d-flex gap-3 flex-wrap flex-md-nowrap mb-3">
            <div className="d-inline-flex align-items-end">
                <div>
                    <label htmlFor="email" className="form-label">Email actual</label>
                    <input type="email" id="email" name="email" className="form-control w-auto" readOnly required 
                        value={userData.email}
                    />
                </div>
                <button type="button" onClick={() => setUpdateEmail(prev => (!prev))} className="btn btn-primary mx-1"><i className="bi bi-pencil-square"></i></button>
            </div>
            {
                updateEmail &&
                <div>
                    <label htmlFor="newEmail" className="form-label">Nuevo Email</label>
                    <input type="email" id="newEmail" name="newEmail" className="form-control w-auto" autoComplete="on"
                        value={formUpdSecurity.newEmail} onChange={updateForm}
                    />
                </div>
            }
        </div>

        <div className="d-flex flex-wrap flex-md-nowrap gap-4">
            <div>
                <label htmlFor="pass" className="form-label">Contrasena</label>
                <input type="text" id="pass" name="pass" className="form-control" required 
                    value={formUpdSecurity.pass} onChange={updateForm}
                />
            </div>
            <div>
                <label htmlFor="newPassCheck1" className="form-label">Nueva contrasena</label>
                <input type="text" id="newPassCheck1" name="newPassCheck1" className="form-control" required 
                    value={formUpdSecurity.newPassCheck1} onChange={updateForm}
                />
            </div>
            <div>
                <label htmlFor="newPassCheck2" className="form-label">Confirmar nueva contrasena</label>
                <input type="text" id="newPassCheck2" name="newPassCheck2" className="form-control" required 
                    value={formUpdSecurity.newPassCheck2} onChange={updateForm}
                />
            </div>
        </div>

        <div className="d-flex gap-3 flex-column flex-md-row justify-content-md-between mt-4 mb-3">
            <button type="button" onClick={() => setCancelar(null)} className="btn btn-warning">Cancelar</button>
            <button type="submit" className="btn btn-primary">Guardar Cambios</button>
        </div>
    </form>
    </>
    )
}

export function FormPersonalInfo({setCancelar}) {
    const [userData, setUserData] = useState({
        nombre: 'Andrea', apellido: '', fecha_nacimiento: '', dui: '',
        idOcupacion: '', zonaResidencia: 'Santa Ana', idCondicion: ''
    });
    const [formPersonalInfo, setFormPersonalInfo] = useState({
        nombre: 'Andrea', apellido: '', fecha_nacimiento: '2000-01-01', dui: '', email: '',
        zonaResidencia: 'Santa Ana', idOcupacion: '', idCondicion: ''
    });
    const [dataUserCuenta, setDataUserCuenta] = useState({ocupaciones: [], condiciones: []});

    const updateForm = (e) => {
        setFormPersonalInfo(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const changeAlertBg = (orignal, change) => {       
        return {"backgroundColor": orignal == change ? "transparent" : "rgb(248, 215, 218)"};
    }

    useEffect(() => {
        const loadData = async () => {
            const resp = await App.loadDataUpdateCuenta();
            if (resp.success) {
                setFormPersonalInfo(resp.usuarioInfo);
                setUserData(resp.usuarioInfo);
                setDataUserCuenta(prev => ({...prev, ocupaciones: resp.ocupacionesList, condiciones: resp.condicionesList}))
            }
        };
        loadData();
    }, []);
              
    const sendForm = async (event) => {
        event.preventDefault();
        const resp = await updateInfoAccount(formPersonalInfo);
        console.log(resp);
    };

    return(
    <>
    <h5 className="fs-6">Actualizando información personal</h5>
    <form onSubmit={(e) => sendForm(e)} className="m-3">
        <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex align-items-center gap-3" style={changeAlertBg(formPersonalInfo.nombre, userData.nombre)}>
                <b>Nombres: </b>
                <input type="text" name="nombre" id="nombre" className="form-control w-auto"
                    value={formPersonalInfo.nombre} onChange={updateForm} />
            </li>
            <li className="list-group-item d-flex align-items-center gap-3" style={changeAlertBg(formPersonalInfo.apellido, userData.apellido)}>
                <b>Apellidos: </b>
                <input type="text" name="apellido" id="apellido" className="form-control w-auto"
                    value={formPersonalInfo.apellido} onChange={updateForm} />
            </li>

            <li className="list-group-item d-flex align-items-center gap-3" style={changeAlertBg(formPersonalInfo.fecha_nacimiento.split("T")[0], userData.fecha_nacimiento.split("T")[0])}>
                <b>Fecha de nacimiento: </b>
                <input type="date" name="fecha_nacimiento" id="fecha_nacimiento" className="form-control w-auto"
                    value={formPersonalInfo.fecha_nacimiento.split('T')[0].split("-").join("-") || ""} onChange={updateForm} />
            </li>
            
            <li className="list-group-item d-flex align-items-center gap-3" style={changeAlertBg(formPersonalInfo.dui, userData.dui)}>
                <b>DUI: </b>
                <input type="text" name="dui" id="dui" className="form-control w-auto"
                    value={formPersonalInfo.dui} onChange={updateForm} />
            </li>
            {/* <li className="list-group-item d-flex align-items-center gap-3" style={changeAlertBg(formPersonalInfo.email, userData.email)}>
                <b>Email: </b>
                <input type="text" name="email" id="email" className="form-control w-25"
                    value={formPersonalInfo.email} onChange={updateForm} />
            </li> */}

            <li className="list-group-item d-flex align-items-center gap-3" style={changeAlertBg(formPersonalInfo.idOcupacion, userData.idOcupacion)}>
                <b>Ocupacion actual: </b>
                <select name="idOcupacion" id="idOcupacion" className="form-select w-auto" onChange={updateForm} required value={formPersonalInfo.idOcupacion}>
                    <option value="" disabled>Seleccionar</option>
                    {dataUserCuenta.ocupaciones.map(ocup =>                       
                        <option key={ocup.id} value={ocup.id}>{ocup.nombre}</option>
                    )}
                </select>
            </li>
            <li className="list-group-item d-flex align-items-center gap-3" style={changeAlertBg(formPersonalInfo.idCondicion, userData.idCondicion)}>
                <b>Condicion medica: </b>
                <select name="idCondicion" id="idCondicion" className="form-select w-auto" onChange={updateForm} required value={formPersonalInfo.idCondicion}>
                    <option value="" disabled>Seleccionar</option>
                    {dataUserCuenta.condiciones.map(cond =>                       
                        <option key={cond.id} value={cond.id}>{cond.nombre}</option>
                    )}
                </select>
            </li>
            <li className="list-group-item d-flex align-items-center gap-3" style={changeAlertBg(formPersonalInfo.zona_residencia, userData.zona_residencia)}>
                <b>Zona de residencia: </b>
                <input type="text" name="zona_residencia" id="zona_residencia" className="form-control w-50"
                    value={formPersonalInfo.zona_residencia || ""} onChange={updateForm} />
            </li>
        </ul>

        <div className="d-flex gap-3 flex-column flex-md-row justify-content-md-between mt-4 mb-3">
            <button type="button" onClick={() => setCancelar(null)} className="btn btn-warning">Cancelar</button>
            <button type="submit" className="btn btn-primary">Guardar Cambios</button>
        </div>
    </form>
    </>
    )
}


export function FormDeleteAccount({setCancelar}) {

    return(
    <>
    <div className="d-flex flex-column px-3 py-2">
        <h5 className="fs-6">Eliminación de Cuenta</h5>
        <p className="text-center">Al Elimnar tú cuenta se desactivara durante 15 días, durante este periodo de tiempo aún puedes volver Activar tu cuenta.
            Pasado ese periodo de tiempo, tu cuenta y los datos relacionados no se podran recuperar.
        </p>
        <p className="text-center">La Frase de seguridad es: <i className="fw-medium">Si Eliminar Cuenta</i></p>
        <form className="border border-danger rounded-2 px-4 py-2 mx-auto">
            <div className="form-floating my-3">
                <input type="text" name="check1" id="check1" className="form-control fw-medium" placeholder="Frase de seguridad"/>
                <label htmlFor="check1">Frase de seguridad</label>
            </div>
            <div className="d-flex gap-3 mb-2">
                <button onClick={() => setCancelar(null)} className="btn btn-primary mx-auto">Cancelar</button>
                <button className="btn btn-danger mx-auto">Eliminar Cuenta</button>
            </div>
        </form>
    </div>
    </>
    )
}