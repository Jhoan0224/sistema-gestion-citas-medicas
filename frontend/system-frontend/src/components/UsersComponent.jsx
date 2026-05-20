import { useState, useEffect } from "react";
import { PersonalMedApp } from "../app/personal-med.app.js";
import { UsuarioAccount } from "./UsersAccountComponent.jsx";


export function CreateUser({setRenderView}) {
  const [dataCrearCuenta, setDataCrearCuenta] = useState({ocupaciones: [], condiciones: []});
  const [formCreateUser, setFormCreateUser] = useState({
        nombre: '', apellido: '', dui: '', fechaNacimiento: '', email: '', pass1: '', pass2: '',
        zonaResidencia: '', ocupacionId: '', condicionId: ''
  });
    
  useEffect(() => {
    const loadData = async () => {
        const data = await PersonalMedApp.crearUsuarioData();
        if (data.success) {
            setDataCrearCuenta(({ ocupaciones: data.ocupacionesList, condiciones: data.condicionesList }));
        }
    };
    loadData();
  }, []);

  const updateForm = (e) => { setFormCreateUser(prev => ({...prev, [e.target.name]: e.target.value})) };
  const sendForm = async (e) => {
    e.preventDefault();    
    const resp = await PersonalMedApp.createUserAccount(formCreateUser);
    alert(resp.message);
    
  }

  return(
    <>
    <div className="container d-flex flex-column h-100">
      <span className="fs-5 mb-2 mx-4">Registrando nuevo usuario</span>

      <form onSubmit={(e) => sendForm(e)} className="form-control d-grid gap-4 p-3 border-2 mx-4 w-auto">
        <span className="fs-5">Datos de registro</span>
        <div className="row">
          <div className="col-sm-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input name="nombre" id="nombre" type="text" className="form-control" required
              value={formCreateUser.nombre} onChange={updateForm}
              />
          </div>
          <div className="col-sm-3">
            <label htmlFor="apellido" className="form-label">Apellido</label>
            <input name="apellido" id="apellido" type="text" className="form-control" required
              value={formCreateUser.apellido} onChange={updateForm}
              />
          </div>
          <div className="col-sm-3">
            <label htmlFor="dui" className="form-label">DUI</label>
            <input name="dui" id="dui" type="text" className="form-control" required
              value={formCreateUser.dui} onChange={updateForm}
              />
          </div>
          <div className="col-sm-3">
            <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
            <input name="fechaNacimiento" id="fechaNacimiento" type="date" className="form-control"required
              value={formCreateUser.fechaNacimiento} onChange={updateForm}
              />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input name="email" id="email" type="email" className="form-control" required
              value={formCreateUser.email} onChange={updateForm}
              />
          </div>
          <div className="col-sm-3">
            <label htmlFor="pass1" className="form-label">Contrasena</label>
            <input name="pass1" id="pass1" type="text" className="form-control" required
              value={formCreateUser.pass1} onChange={updateForm}
              />
          </div>
          <div className="col-sm-3">
            <label htmlFor="pass2" className="form-label">Confirmar contrasena</label>
            <input name="pass2" id="pass2" type="text" className="form-control" required
              value={formCreateUser.pass2} onChange={updateForm}
              />
          </div>
        </div>

        <span className="fs-5">Datos complementarios</span>

        <div className="row">
          <div className="col-sm-3 d-flex flex-column">
            <label htmlFor="ocupacionId" className="form-label">Trabajo actual</label>
            <select onChange={updateForm} name="ocupacionId" id="ocupacionId" className="form-select mb-3" required>
              <option value="">Seleccionar</option>
              {dataCrearCuenta.ocupaciones.map(ocup => (
                <option value={ocup.id}>{ocup.nombre}</option>
              ))}
            </select>
            
            <label htmlFor="condicionId" className="form-label">¿Tienes alguna condicion?</label>
            <select onChange={updateForm} name="condicionId" id="condicionId" className="form-select" required>
              <option value="">Seleccionar</option>
              {dataCrearCuenta.condiciones.map(cond => (
                <option value={cond.id}>{cond.nombre}</option>
              ))}
            </select>
          </div>

          <div className="col">
            <label htmlFor="zonaResidencia" className="form-label">Zona de residencia</label>
            <textarea name="zonaResidencia" id="zonaResidencia" className="form-control"
              value={formCreateUser.zonaResidencia} onChange={updateForm}/>
          </div>
        </div>

        <div className="d-flex justify-content-between m-2">
          <button onClick={() => setRenderView("PANEL_MAIN")} type="button" className="btn btn-warning">Cancelar</button>
          <button type="submit" className="btn btn-primary">Crear Cuenta</button>
        </div>
      </form>
    </div>
    </>
  )
}

export function SearchUser({setRenderView}) {
  const [loadUserInfo, setLoadUserInfo] = useState({isOpen: false, show: false});
  const [userList, setUserList] = useState([]);
  const [formSearchUser, setFormSearchUser] = useState({filterSearch: "DUI", textSearch: "", aproxAge: "ALL_AGE"});
  
  const updateForm = (e) => setFormSearchUser(prev => ({...prev, [e.target.name]: e.target.value}));
  const resetAge = () => setFormSearchUser(prev => ({...prev, aproxAge: "ALL_AGE"}));


  const sendForm = async (e) => {formSearchUser
    e.preventDefault();
    const resp = await PersonalMedApp.searchUserForm(formSearchUser);
    if (resp.success) {
      setUserList(resp.userList)
    }
    console.log(resp);
    

  }

  return(
    <>
    {
      loadUserInfo.show && <UsuarioAccount loadUserInfo={loadUserInfo} setLoadUserInfo={setLoadUserInfo} />
    }
    { !loadUserInfo.show &&
    <>
    <div className="container d-flex flex-column h-100">
      <span className="fs-5 fw-medium mb-2">Usuarios/Pacientes</span>
      
      <form onSubmit={(e) => sendForm(e)} className="row align-items-end border-top border-bottom border-2 pb-3 pt-2 mx-2 mb-3">
        <div className="col-sm-2 p-0">
          <label htmlFor="filterSearch" className="form-label">Filtrar por</label>
          <select onChange={updateForm} name="filterSearch" id="filterSearch" className="form-select">
            <option value="DUI">DUI</option>
            <option value="EMAIL">Email</option>
            <option value="FULLNAME">Nombre completo</option>
          </select>
        </div>
        <div className="col-sm-4">
          <input name="textSearch" id="textSearch" type="text" className="form-control" required
            value={formSearchUser.textSearch} onChange={updateForm}  />
        </div>
        <div className="col-sm-2">
          <label onDoubleClick={() => resetAge()} htmlFor="aproxAge" className="form-label">Edad aprox. <span className="fw-medium">±5</span>: {formSearchUser.aproxAge == "ALL_AGE" ? "\u2731" : formSearchUser.aproxAge}</label>
          <input name="aproxAge" id="aproxAge" type="range" className="form-range" value="99" min="10" max="99" step="1"
          value={formSearchUser.aproxAge} onChange={updateForm} />
        </div>
        <div className="col-sm-2">
          <button type="sumbit" className="btn btn-primary"><i className="bi bi-search" /> Buscar</button>
        </div>
      </form>

      <div className="flex-grow-1 overflow-y-auto" style={{ minHeight: '0' }}>
        <table className="table table-striped table-hover">
          <thead className="sticky-top">
            <tr>
              <th>DUI</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Edad</th>
              <th>Email</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user, index) => (
              <tr key={index}>
                  <td>{user.dui}</td>
                  <td>{user.nombre}</td>
                  <td>{user.apellido}</td>
                  <td>{new Date(Date.parse(user?.fecha_nacimiento)).toLocaleDateString(undefined, {year: "numeric", month: "2-digit", day: "2-digit"})}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => setLoadUserInfo({idUsuario: user.id, show: true})} type="button" className="btn btn-outline-primary">Info.</button>
                  </td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </div>
    </>
    }

    </>
  )
}