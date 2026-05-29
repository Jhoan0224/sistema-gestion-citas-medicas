import { useEffect, useState } from "react"
import { AuthApp } from "../app/auth.app.js";
import { AdminApp } from "../app/Admin.app.js";
import { getListCondiciones } from "../api/api-system.js";
import { PersonalMedApp } from "../app/personal-med.app.js";
import { getListOcupacionesCondiciones } from "../api/api-system.js";
import { UsuarioNormalAccount } from "./UsersAccountComponent.jsx";
import { ToastAlert, ToastDanger, ToastSuccess } from "../components/Notifications.jsx";

export function CurrentSystemUserProfile({setRenderView}) {
    const [userProfile, setUserProfile] = useState({
        id: null, nombre: "", apellido: "", dui: "", email: "", fecha_nacimiento: "", roles: [], zona_residencia: ""
    });

    useEffect(() => {
        let isMounted = true;
        const loadUserProfile = async () => {
            const resp = await AuthApp.currentUserProfile();
            if (isMounted && resp.success) { setUserProfile(resp.userProfile) }
        };
        loadUserProfile();
        return () => {isMounted = false;}
    }, []);

    return(
    <>
    <div className="container d-flex flex-column p-2">
        <div className="d-flex align-items-center justify-content-between w-75">
            <span className="fs-5 fw-medium">Mi perfil</span>
            <button onClick={() => setRenderView("PANEL_MAIN")} type="button" className="btn btn-outline-secondary border-2">
                <i className="bi bi-x-lg" />
            </button>
        </div>

        <ul className="list-group m-2 w-75">
            <li className="list-group-item"><span className="fw-medium">ID:</span> {userProfile.id} </li>
            <li className="list-group-item"><span className="fw-medium">Nombres:</span> {userProfile.nombre} </li>
            <li className="list-group-item"><span className="fw-medium">Apellidos:</span> {userProfile.apellido} </li>
            <li className="list-group-item"><span className="fw-medium">Fecha de nacimiento:</span> {userProfile.fecha_nacimiento.split("T")[0]} </li>
            <li className="list-group-item"><span className="fw-medium">DUI:</span> {userProfile.dui} </li>
            <li className="list-group-item"><span className="fw-medium">EMAIL:</span> {userProfile.email} </li>
            <li className="list-group-item"><span className="fw-medium">Roles de usuario:</span> {userProfile.roles} </li>
        </ul>
        
        <span className="fs-6 fw-medium m-2">Documentación</span>
        <ul className="">
            <li className="mb-2">
                <a href="">Documentacion de uso del sistema.</a>
            </li>
            <li className="mb-2">
                <a href="">Preguntas frecuentes.</a>
            </li>
            <li className="mb-2">
                <a href="">Normas del sistema.</a>
            </li>
        </ul>
    </div>
    </>
    )
}

function FormPersonalInfoSys({userData, setCancelar}) {
    const [showAlert, setShowAlert] = useState({show: true, type: "", message: ""});
    const [formPersonalInfo, setFormPersonalInfo] = useState({
        nombre: '', apellido: '', fecha_nacimiento: '', dui: '', email: '', zona_residencia: ''
    });
    const [dataUserCuenta, setDataUserCuenta] = useState({ocupaciones: [], condiciones: []});

    useEffect(() => { setFormPersonalInfo(userData) }, [userData]);

    useEffect(() => {
        let isMounted = true;
        const loadDataAccountConfig = async () => {
            const resp = await getListOcupacionesCondiciones();
            if (isMounted && resp.success) {
                setDataUserCuenta({ocupaciones: resp.ocupacionesList, condiciones: resp.condicionesList});
            }
        };
        loadDataAccountConfig();
        return () => {isMounted = false;}
    }, []);

    const updateForm = (e) => setFormPersonalInfo(prev => ({...prev, [e.target.name]: e.target.value}));

    const changeAlertBg = (orignal, change) => {
        return { "backgroundColor": orignal == change ? "transparent" : "rgb(248, 215, 218)" };
    }

    const sendForm = async (event) => {
        event.preventDefault();
        setShowAlert({show: false, type: "", message: ""});
        const resp = await AdminApp.updateUserSysAccount(formPersonalInfo);
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

function UsuarioSysAccount({loadUserInfo, setLoadUserInfo}) { // El objeto setLoadUserInfo contiene: {idUsuario: "", show: false}
    const [accountConfig, setAccountConfig] = useState("");
    const [userData, setUserData] = useState({
        id_usuario: "",  nombre: '', apellido: '', fecha_nacimiento: '', dui: '', email: '',
        idOcupacion: '', idCondicion: '', zona_residencia: ''
    });

    useEffect(() => {
        let isMounted = true;
        const loadData = async () => {
            const resp = await AdminApp.userAccountData(loadUserInfo.idUsuario);            
            if (isMounted && resp.success) { setUserData(resp.usuarioAccountInfo) }
        }
        loadData();
        return () => { isMounted = false }
    }, []);

    const RenderAccountConfig = {
        "USER_INFO_CONFIG": <FormPersonalInfoSys userData={userData} setCancelar={setAccountConfig} />,
        "DELETE_ACCOUNT":<FormDeleteAccountSys userData={userData} setCancelar={setAccountConfig} />,
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
            else if (typeConfig == "CITA") { setCitaPendiente(resp.citaInfo) }
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
                <li className="list-group-item"><b>Zona de residencia: </b>{userData.zona_residencia}</li>
            </ul>
        </div>
        <h5 className="fs-5 fw-normal py-2">Configuración de Cuenta</h5>
        <div className="d-flex gap-3 mb-3 mx-2">
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

export function FormDeleteAccountSys({userData, setCancelar}) {
    const [showAlert, setShowAlert] = useState({show: true, type: "", message: ""});
    const securityCheck = {securityWord: "Si Eliminar Cuenta", inputWord: ""};
    const [formDeleteAccount, setFormDeleteAccount] = useState({email: ''});

    useEffect(() => { setFormDeleteAccount(prev => ({...prev, email: userData.email}))}, [userData]);

    const sendForm = async (event) => {
        event.preventDefault();
        console.log(userData);
        setShowAlert({show: false, type: "", message: ""});
        const securityIsChecked = securityCheck.inputWord == securityCheck.securityWord ? true : false;
        if (securityIsChecked) {
            console.log("ELIMINANDO USERSYS");
            const resp = await AdminApp.deleteUserSysAccount(formDeleteAccount);
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

export function SystemUserProfile({setRenderView}) {
    const [loadUserInfo, setLoadUserInfo] = useState({isOpen: false, show: false});
    const [searchNormalUser, setSearchNormalUser] = useState({typeSearch: "DUI", typeUser: "PERSONAL_MEDICO", textSearch: ""});
    const [userList, setUserList] = useState([]);
    const updateForm = (e) => setSearchNormalUser(prev => ({...prev, [e.target.name]: e.target.value}));

    const sendForm = async (e) => {
        e.preventDefault();
        const resp = await AdminApp.searchUserSys(searchNormalUser);
        if (resp.success) {
            setUserList(resp.userList);
        } else {
            setUserList([]);
        }
        console.log(resp);
            
    }

    
    return(
    <>
    {
      loadUserInfo.show && <UsuarioSysAccount loadUserInfo={loadUserInfo} setLoadUserInfo={setLoadUserInfo} />
    }
    { !loadUserInfo.show &&
    <div className="container d-flex flex-column h-100">

        <div className="d-flex h-auto justify-content-between my-2">
            <span className="fs-5 fw-normal ">Usuarios del Sistema</span>
            <button onClick={() => setRenderView("CREATE_SYSTEM_USER")} type="button" className="btn btn-success">
                <i className="bi bi-person-vcard" /> Crear Usuario
            </button>
        </div>
        
        <form onSubmit={(e) => sendForm(e)} className="row m-0 align-items-end border-top border-bottom border-2 pt-2 pb-3">
            <div className="col-auto">
                <label htmlFor="typeSearch" className="form-label">Buscar por:</label>
                <select onChange={updateForm} name="typeSearch" id="typeSearch" className="form-select">
                    <option value="DUI">DUI</option>
                    <option value="EMAIL">Email</option>
                    <option value="FULLNAME">Nombres</option>
                </select>
            </div>
            <div className="col-auto p-0">
                <label htmlFor="typeUser" className="form-label">Tipo Usuario:</label>
                <select onChange={updateForm} name="typeUser" id="typeUser" className="form-select">
                    <option value="PERSONAL_MEDICO">Personal Med.</option>
                    <option value="ADMIN">Admin</option>
                    <option value="AUDITOR">Auditor</option>
                </select>
            </div>
            <div className="col-sm-4">
                <input name="textSearch" id="textSearch" type="text" className="form-control"
                    value={searchNormalUser.textSearch} onChange={updateForm}  />
            </div>
            <div className="col-sm-2">
                <button type="submit" className="btn btn-primary"><i className="bi bi-search me-1" />Buscar</button>
            </div>
        </form>
        
        <div className="flex-grow-1 overflow-y-auto" style={{ minHeight: '0' }}>
            { userList.length === 0 &&
                <div className="d-flex m-auto p-5">
                        <span className="fs-4 fw-medium text-secondary m-auto">No hay resultados para esta búsqueda</span>
                </div>
            }
            { userList.length > 0 &&            
            <table className="table table-striped table-hover">
                <thead className="sticky-top">
                    <tr>
                        <th>ID</th>
                        <th>DUI</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Detalles</th>
                    </tr>
                </thead>
                <tbody>
                {userList.map((user, index) => (
                <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.dui}</td>
                    <td>{user.nombre}</td>
                    <td>{user.apellido}</td>
                    <td>{user.email}</td>
                    <td>
                    <button onClick={() => setLoadUserInfo({idUsuario: user.id, show: true}) } type="button" className="btn btn-outline-primary">Info.</button>
                    </td>
                </tr>
                ))}
                </tbody>
            </table>
            }
        </div>
    </div>
    }
    </>
    )
}

export function CreateSystemUser({setRenderView}) {
    const [showAlert, setShowAlert] = useState({show: true, type: "", message: ""});
    const [listRolesPrivilegios, setListRolePrivilegios] = useState({roles: [], privilegios: []});
    const [formUserSys, setFormUserSys] = useState({nombre: "", apellido: "", dui: "", fecha_nacimiento: "",
        email: "", pass1: "", pass2: "", zona_residencia: "", id_rol: "", ids_privilegios: []
    });

    const updateForm = (e) => setFormUserSys(prev => ({...prev, [e.target.name]: e.target.value}));
   
    const updateIdsPrivilegios = (e) => {
        const { checked, value } = e.target;
        setFormUserSys(prev => {    
            return checked
                ? {...prev, ids_privilegios: [...(prev.ids_privilegios || []), value]}
                : {...prev, ids_privilegios: prev?.ids_privilegios.filter(id => id !== value)}
        })
    };

    useEffect(() => {
        if (showAlert.type !== "SUCCESS") {return}
        let isMounted = true;
        if (isMounted) {
            setTimeout(() => setRenderView("SYSTEM_USERS"), 1800);
        }
        return () => {isMounted = false}
    }, [showAlert.type]);

    const sendForm = async (e) => {
        e.preventDefault();
        setShowAlert({show: true, type: "", message: ""});      
        const resp = await AdminApp.createUserSysAccount(formUserSys);
        console.log(resp);
        resp.success
            ? setShowAlert({show: true, type: "SUCCESS", message: resp.message})
            : setShowAlert({show: true, type: "ALERT", message: resp.message});    
    };
    
    useEffect(() => {
        let isMounted = true;
        const loadFormUserSysData = async () => {
            const resp = await AdminApp.listRolesPrivilegios();
            if (isMounted && resp.success) {
                setListRolePrivilegios({roles: resp.rolesList, privilegios: resp.privilegiosList});
            }
        };
        loadFormUserSysData();
        return () => {isMounted = false}
    }, []);

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
        <span className="fs-5 mb-3">Creando Usuario del Sistema</span>
        <form onSubmit={(e) => sendForm(e)} className="d-grid gap-3  border border-2 rounded-2 p-3 m-0">
            <div className="row">
                <div className="col-sm-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" name="nombre" id="nombre" className="form-control" 
                        value={formUserSys.nombre} onChange={updateForm} />
                </div>
                <div className="col-sm-3">
                    <label htmlFor="apellido" className="form-label">Apellido</label>
                    <input type="text" name="apellido" id="apellido" className="form-control"
                        value={formUserSys.apellido} onChange={updateForm} />
                </div>
                <div className="col-sm-3">
                    <label htmlFor="dui" className="form-label">DUI</label>
                    <input type="text" name="dui" id="dui" className="form-control"
                        value={formUserSys.dui} onChange={updateForm} />
                </div>
                <div className="col-sm-auto">
                    <label htmlFor="fecha_nacimiento" className="form-label">Fecha nacimiento</label>
                    <input type="date" name="fecha_nacimiento" id="fecha_nacimiento" className="form-control"
                        value={formUserSys.fecha_nacimiento} onChange={updateForm} />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" name="email" id="email" className="form-control" 
                        value={formUserSys.email} onChange={updateForm} />
                </div>
                <div className="col-sm-3">
                    <label htmlFor="pass1" className="form-label">Contrase;a</label>
                    <input type="text" name="pass1" id="pass1" className="form-control"
                        value={formUserSys.pass1} onChange={updateForm} />
                </div>
                <div className="col-sm-3">
                    <label htmlFor="pass2" className="form-label">Confirmar contrase;a</label>
                    <input type="text" name="pass2" id="pass2" className="form-control"
                        value={formUserSys.pass2} onChange={updateForm} />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-7">
                    <label htmlFor="zona_residencia" className="form-label">Zona de residencia</label>
                    <textarea type="text" name="zona_residencia" id="zona_residencia" className="form-control"
                        value={formUserSys.zona_residencia} onChange={updateForm} />
                </div>
            </div>
            <div className="row">    
                <div className="col-sm-auto">
                    <label htmlFor="id_rol" className="form-label">Rol del usuario</label>
                    <select onChange={updateForm} name="id_rol" id="id_rol" className="form-select">
                        <option value="">Seleccionar</option>
                        {listRolesPrivilegios.roles.map(rol => (
                            <option key={rol.id} value={rol.id}>{rol.nombre}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-auto">
                    <label htmlFor="ids_privilegios" className="form-label">Privilegios del usuario</label>
                    <div className="dropdown">
                        <button className="btn border dropdown-toggle" type="button" data-bs-auto-close="outside" data-bs-toggle="dropdown" aria-expanded="false">
                            Seleccionar
                        </button>
                        <ul className="dropdown-menu py-2 px-3">
                            {listRolesPrivilegios.privilegios.map(priv => (
                            <li key={priv.id}>
                                <div className="form-check">
                                    <input  type="checkbox" onChange={(e) => updateIdsPrivilegios(e)} id={`check-priv-${priv.id}`} value={priv.id} className="form-check-input" />
                                    <label className="form-check-label" htmlFor={`check-priv-${priv.id}`}>
                                        {priv.nombre}
                                    </label>
                                </div>
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-sm-7">
                    <label htmlFor="id_privilegio_selected" className="form-label">Privilegios del seleccionados</label>
                    <textarea readOnly name="id_privilegio_selected" id="id_privilegio_selected" className="form-control" 
                        value={listRolesPrivilegios.privilegios.filter(priv => formUserSys?.ids_privilegios?.includes(String(priv.id)))
                            .map(priv => priv.nombre).join(", ")}   />
                </div>
            </div>
            <div className="d-flex justify-content-between mx-2">
                <button onClick={() => setRenderView("SYSTEM_USERS")} type="button" className="btn btn-warning">Cancelar</button>
                <button type="submit" className="btn btn-success">Crear Usuario</button>
            </div>
        </form>
    </div>
    </>
    )
}

export function NormalUserProfile({setRenderView}) {
    const [loadUserInfo, setLoadUserInfo] = useState({isOpen: false, show: false});
    const [searchNormalUser, setSearchNormalUser] = useState({typeSearch: "DUI", textSearch: ""});
    const [userList, setUserList] = useState([]);
    const updateForm = (e) => setSearchNormalUser(prev => ({...prev, [e.target.name]: e.target.value}));

    const sendForm = async (e) => {
        e.preventDefault();
        const resp = await AdminApp.searchNormalUser(searchNormalUser);
        resp.success ? setUserList(resp.userList) : setUserList([]);
    };
    
    return(
    <>
        {
        loadUserInfo.show && <UsuarioNormalAccount loadUserInfo={loadUserInfo} setLoadUserInfo={setLoadUserInfo} />
        }
        { !loadUserInfo.show &&
        <div className="container d-flex flex-column h-100">

            <div className="d-flex h-auto justify-content-between my-2">
                <span className="fs-5 fw-normal ">Usuarios/Pacientes</span>
            </div>
            
            <form onSubmit={(e) => sendForm(e)} className="row m-0 align-items-end border-top border-bottom border-2 pt-2 pb-3">
                <div className="col-auto">
                    <label htmlFor="typeSearch" className="form-label">Buscar por:</label>
                    <select onChange={updateForm} name="typeSearch" id="typeSearch" className="form-select">
                        <option value="DUI">DUI</option>
                        <option value="EMAIL">Email</option>
                        <option value="FULLNAME">Nombres</option>
                    </select>
                </div>
                <div className="col-sm-4">
                    <input name="textSearch" id="textSearch" type="text" className="form-control"
                        value={searchNormalUser.textSearch} onChange={updateForm}  />
                </div>
                <div className="col-sm-2">
                    <button type="submit" className="btn btn-primary"><i className="bi bi-search me-1" />Buscar</button>
                </div>
            </form>
            
            <div className="flex-grow-1 overflow-y-auto" style={{ minHeight: '0' }}>
                <table className="table table-striped table-hover">
                    <thead className="sticky-top">
                        <tr>
                            <th>ID</th>
                            <th>DUI</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                    {userList.map((user, index) => (
                    <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.dui}</td>
                        <td>{user.nombre}</td>
                        <td>{user.apellido}</td>
                        <td>{user.email}</td>
                        <td>
                        <button onClick={() => setLoadUserInfo({idUsuario: user.id, show: true}) } type="button" className="btn btn-outline-primary">Info.</button>
                        </td>
                    </tr>
                    ))}
                    </tbody>
                </table>
                {
                userList.length === 0 && 
                    <div className="d-flex m-auto p-5">
                        <span className="fs-4 fw-medium text-secondary m-auto">No hay resultados para esta búsqueda</span>
                    </div>
                }
            </div>
        </div>
        }
    </>
    )
}