import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthApp } from "../app/auth.app.js";
import { ToastAlert, ToastDanger, ToastSuccess } from "../components/Notifications.jsx";

export function LoginHome() {
	const navigate = useNavigate();
	const [alertData, setAlertData] = useState({show: false, message: ""});
    const [alertSuccess, setAlertSuccess] = useState({show: false, message: ""});
	const [formLogin, setFormLogin] = useState({typeLogin: "PERSONAL_MEDICO", email: "", pass: ""});

	const updateForm = (e) => setFormLogin(prev => ({...prev, [e.target.name]: e.target.value} )); 

	const typeLoginSendRequest = {
		"ADMIN": (formLogin) => AuthApp.loginAdmin(formLogin),
		"PERSONAL_MEDICO": (formLogin) => AuthApp.loginPersMed(formLogin)
	};

	const typeLoginSuccessRedirect = {
		"ADMIN": () => navigate("/system-admin/home", {replace: true}),
		"PERSONAL_MEDICO": () => navigate("/personal-med/home", {replace: true})
	};

  	const delay = (ms) => new Promise(solve => setTimeout(solve, ms));
	const sendForm = async (event) => {
		event.preventDefault();
		setAlertData({show: false, message: ""});
		const resp = await typeLoginSendRequest[formLogin.typeLogin](formLogin);
		if (resp.success) {
            setAlertSuccess({show: true, message: `${resp.message} Espera un momento...`});
            await delay(3000);
            typeLoginSuccessRedirect[formLogin.typeLogin]();
        } else if (!resp.success) {
            setAlertData({show: true, message: resp.message});
        }	
	};

	return(
	<>
	{ alertData.show && <ToastAlert message={alertData.message} /> }
    { alertSuccess.show && <ToastSuccess message={alertSuccess.message} /> }
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