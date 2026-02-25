import { useState } from "react"

export function LoginUsuario() {
    const [formLogin, setFormLogin] = useState({
        dui: '', pass: ''
    });

    const updateForm = (e) => {
        setFormLogin({...LoginUsuario, [e.target.name]: e.target.value});
    }

    const sendForm = (event) => {
        event.preventDefault();
        
    }
    return(
    <>
    <div className="border border-2 rounded-2 p-4">
        <div className="mb-3">
            <h5 className="fs-4 mb-0">Sistema de Citas de Usuario</h5>
            <i className="bi bi-house-heart fs-1 mt-0"></i>
        </div>

        <form onSubmit={(e) => sendForm(ee)} className="d-flex flex-column gap-3">
            <div>
                <label htmlFor="dui" className="form-label">DUI</label>
                <input type="text" name="dui" className="form-control" id="dui" pattern="^[0-9]{8}-[0-9]{1}$"
                    value={formLogin.dui}
                    onChange={() => updateForm()}
                />
            </div>
            <div>
                <label htmlFor="pass" className="form-label">Password</label>
                <input type="text" name="pass" className="form-control" id="pass" maxLength="20"
                    value={formLogin.pass}
                    onChange={() => updateForm()}
                />
            </div>
            <div>
                <button type="submit" className="btn btn-primary">Acceder</button>
            </div>
        </form>
    </div>
    </>
    )
}