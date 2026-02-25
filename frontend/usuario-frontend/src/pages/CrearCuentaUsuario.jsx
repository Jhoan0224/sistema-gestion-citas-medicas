import { useState } from "react"

export function CrearCuentaUsuario() {
    const [formAddUsuario, setFormAddUsuario] = useState({
        nombre: '', apellido: '', dui: '', fechaNacimiento: '', email: '', passCheck1: '', passCheck2: '', trabajoActual: ''
    });

    const updateForm = (e) => {
        setFormAddUsuario({...formAddUsuario, [e.target.name]: e.target.value});
    }

    const sendForm = (event) => {
        event.preventDefault();
    }
    
    return(
    <>
    <div className="d-flex flex-column align-items-center m-auto w-100">

        <div className="text-center mb-2">
            <h5 className="fs-5 mb-0">Formulario de registro para nuevo usuario</h5>
            <i className="bi bi-person-plus-fill fs-2 mt-0"></i>
        </div>

        <form onSubmit={(e) => sendForm(e)} className="d-flex flex-column gap-3 border border-2 rounded-2 p-4" >

            <h5 className="fs-5">Datos de registro</h5>
            <div className="d-flex gap-4">
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
            </div>
            <div className="d-flex gap-4">
                <div>
                    <label htmlFor="dui" className="form-label">DUI</label>
                    <input type="text" id="dui" name="dui" className="form-control" required 
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
            <div className="d-flex gap-4">
                <div>
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" name="email" className="form-control" required 
                        value={formAddUsuario.email} onChange={updateForm}
                    />
                </div>
                <div>
                    <label htmlFor="passCheck1" className="form-label">Contrasena</label>
                    <input type="text" id="passCheck1" name="passCheck1" className="form-control" required 
                        value={formAddUsuario.passCheck1} onChange={updateForm}
                    />
                </div>
                <div>
                    <label htmlFor="passCheck2" className="form-label">Confirmar contrasena</label>
                    <input type="text" id="passCheck2" name="passCheck2" className="form-control" required 
                        value={formAddUsuario.passCheck2} onChange={updateForm}
                    />
                </div>
            </div>
     
            <h5 className="fs-5 mt-1">Datos complementarios</h5>
            <div className="d-flex gap-4">
                <div>
                    <label htmlFor="trabajoActual" className="form-label">Trabajo actual</label>
                    <select name="trabajoActual" id="trabajoActual" className="form-select" onChange={updateForm} required defaultValue="">
                        <option value="" disabled>Seleccionar</option>
                        <option value="1">Ingeniero</option>
                        <option value="2">Agricultor</option>
                    </select>

                </div>
                <div>
                    <label htmlFor="passCheck1" className="form-label">Zona de residencia</label>
                    <select name="trabajoActual" id="trabajoActual" className="form-select" onChange={updateForm} required defaultValue="">
                        <option value="" disabled>Seleccionar</option>
                        <option value="1">Ingeniero</option>
                        <option value="2">Agricultor</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="passCheck2" className="form-label">¿Tiene alguna condicion? </label>
                    <select name="trabajoActual" id="trabajoActual" className="form-select" onChange={updateForm} required defaultValue="1">
                        <option value="1" disabled>Ninguna</option>
                        <option value="2">Ingeniero</option>
                        <option value="3">Agricultor</option>
                    </select>
                </div>

            </div>
            <div className="d-flex m-auto mt-3">
                <button className="btn btn-primary">Crear Cuenta</button>
            </div>
                <a href="/login">Ya tengo una cuenta</a>
        </form>
    </div>
    </>
    )
}