import { useEffect, useState } from "react"
import { AuthApp } from "../app/auth.app.js";


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
            console.log(resp);            
        };
        loadUserProfile();
        return () => {isMounted = false;}
    }, []);

    return(
    <>
    <div className="container d-flex flex-column h-100 p-sm-4">
        <div className="d-flex align-items-center justify-content-between w-75 m-2">
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

export function SystemUserProfile() {

    return(
    <>
    <div className="container d-flex flex-column px-3">
        <div className="d-flex justify-content-between my-3">
            <span className="fs-5 fw-normal m-2">Usuarios del Sistema</span>
            <button type="button" className="btn btn-success">
                <i className="bi bi-person-vcard" /> Crear Usuario
            </button>
        </div>
        
        <form className="row m-0 align-items-end border-top border-bottom border-2 py-3">
            <div className="col-sm-2">
                <label htmlFor="typeRol" className="form-label">Buscar por:</label>
                <select name="typeRol" id="typeRol" className="form-select">
                    <option value="">Todos</option>
                    <option value="">Email</option>
                    <option value="">Nombres</option>
                </select>
            </div>
            <div className="col-sm-1 p-0">
                <label htmlFor="typeRol" className="form-label">Buscar por:</label>
                <select name="typeRol" id="typeRol" className="form-select">
                    <option value="">DUI</option>
                    <option value="">Email</option>
                    <option value="">Nombres</option>
                </select>
            </div>
            <div className="col-sm-4">
                <input name="textSearch" id="textSearch" type="text" className="form-control"
                    />
            </div>
            <div className="col-sm-2">
                <button type="submit" className="btn btn-primary"><i className="bi bi-search me-1" />Buscar</button>
            </div>
        </form>
        
        <div className="flex-grow-1 mt-2">
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>DUI</th>
                        <th>Email</th>
                        <th>Detalles</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>
    </>
    )
}

export function CreateSystemUser() {



    return(
    <>
    <div className="container">

    </div>
    </>
    )
}