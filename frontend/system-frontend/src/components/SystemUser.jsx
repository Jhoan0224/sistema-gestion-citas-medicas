import { useEffect, useState } from "react"
import { AuthApp } from "../app/auth.app.js";
import { AdminApp } from "../app/Admin.app.js";

export function CurrentSystemUserProfile({setRenderView}) {
    const [userProfile, setUserProfile] = useState({
        id: null, nombre: "", apellido: "", dui: "", email: "", fecha_nacimiento: "", roles: [], zona_residencia: ""
    });

    useEffect(() => {
        let isMounted = true;
        const loadUserProfile = async () => {
            const resp = await AuthApp.currentUserProfile();
            if (isMounted && resp.success) {
                setUserProfile(resp.userProfile);
            }
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
            <li className="list-group-item"><span className="fw-medium">Fecha de nacimiento:</span> {userProfile.fecha_nacimiento} </li>
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

export function SystemUserProfile({setRenderView}) {
    const [searchUserSys, setSearchUserSys] = useState({typeSearch: "DUI", typeUser: "PERSONAL_MEDICO", textSearch: ""});
    const [userList, setUserList] = useState([]);
    const updateForm = (e) => setSearchUserSys(prev => ({...prev, [e.target.name]: e.target.value}));

    const sendForm = async (e) => {
        e.preventDefault();
        const resp = await AdminApp.searchUserSys(searchUserSys);
        if (resp.success) {
            setUserList(resp.userList);
        } else {
            setUserList([]);
        }
        console.log(resp);
            
    }

    
    return(
    <>
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
                    value={searchUserSys.textSearch} onChange={updateForm}  />
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
        </div>
    </div>
    </>
    )
}

export function CreateSystemUser() {
    const [listRolesPrivilegios, setListRolePrivilegios] = useState({roles: [], privilegios: []});
    const [formUserSys, setFormUserSys] = useState({nombre: "", apellido: "", dui: "", fecha_nacimiento: "",
        email: "", pass1: "", pass2: "", zona_residencia: "", id_rol: "", ids_privilegios: []});

    const updateForm = (e) => setFormUserSys(prev => ({[e.target.name]: e.target.value}));
    const updateIdsPrivilegios = (e) => {
        const { checked, value } = e.target;
        setFormUserSys(prev => {
            return checked
                ? {...prev, ids_privilegios: [...prev.ids_privilegios, value]}
                : {...prev, ids_privilegios: prev.ids_privilegios.filter(id => id !== value)}
        })
    };

    const sendForm = async (e) => {
        e.preventDefault();

    }
    console.log(formUserSys.ids_privilegios);
    
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