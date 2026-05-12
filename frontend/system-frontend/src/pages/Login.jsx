import { useState } from "react";
import { AuthApp } from "../app/auth.app.js";

export function LoginHome() {
	const [formLogin, setFormLogin] = useState({typeLogin: "PERSONAL_MEDICO", email: "", pass: ""});

	const updateForm = (e) => { setFormLogin(prev => ({...prev, [e.target.name]: e.target.value} ))}; 

	const sendForm = async (event) => {
		event.preventDefault();
		console.log(formLogin)
	}

	return(
	<>
    <div className="min-vh-100 d-flex">
		<div className="row justify-content-center w-100 m-auto">
			<form onSubmit={(e) => sendForm(e)} className="col-11 col-md-8 col-lg-4 card p-4 shadow-sm mb-5">
				<h4 className="text-center mb-4">SGCM Iniciar Sesión</h4>

				<label htmlFor="typeLogin" className="form-label">Acceder como:</label>
				<select onChange={updateForm} name="typeLogin" id="typeLogin" className="form-select bg-body-tertiary mb-4" defaultValue="personal-medico">
					<option value="PERSONAL_MEDICO">Personal Medico</option>
					<option value="ADMIN">Admin</option>
					<option value="AUDITOR">Auditor</option>
				</select>

				<label htmlFor="email" className="form-label">Email</label>
				<input type="email" name="email" id="email" className="form-control mb-4" required
					value={formLogin.email} onChange={updateForm} />
			
				<label htmlFor="pass" className="form-label">Contrasena</label>
				<input type="text" name="pass" id="pass" className="form-control mb-4" required
				value={formLogin.pass} onChange={updateForm} />
				
				<button type="summit" className="btn btn-primary mx-auto">Acceder</button>
			</form>
		</div>
    </div>
	</>
	)
}