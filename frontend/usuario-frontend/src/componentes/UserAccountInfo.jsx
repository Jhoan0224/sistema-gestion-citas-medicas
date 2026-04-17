import { useEffect, useState } from "react"
import { getUserAccountData } from "../api/usuario-account.api.js";

export default function UsuarioAccountData() {
    const [userData, setUserData] = useState({
        nombre: 'Vanessa', apellido: '', fecha_nacimiento: '', dui: '', email: '',
        ocupacion: '', departamento: 'San Miguel', condicion: ''
    });

    useEffect(() => {
        const loadData = async () => {
            const resp = await getUserAccountData();
            console.log("ok >> ", resp);
            
            if (resp.success) { setUserData(resp.usuarioAccountInfo); }
        };
        loadData();
    }, []);

    return(
    <>
    <ul className="list-group list-group-flush">
        <li className="list-group-item"><b>Nombres: </b>{userData.nombre}</li>
        <li className="list-group-item"><b>Apellidos: </b>{userData.apellido}</li>
        <li className="list-group-item"><b>Fecha de nacimiento: </b>{userData.fecha_nacimiento.split('T')[0]}</li>
        <li className="list-group-item"><b>DUI: </b>{userData.dui}</li>
        <li className="list-group-item"><b>Email: </b>{userData.email}</li>
        <li className="list-group-item"><b>Ocupacion actual:</b> {userData.ocupacion}</li>
        <li className="list-group-item"><b>Zona de residencia: </b>{userData.departamento}</li>
        <li className="list-group-item"><b>Condicion medica: </b>{userData.condicion}</li>
    </ul>
    </>
    )
}