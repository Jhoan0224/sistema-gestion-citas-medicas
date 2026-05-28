import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { sendLoginUsuario } from "../application/Authentication.js";
import { ToastAlert, ToastSuccess } from "../componentes/Notifications.jsx";

export function LoginUsuario() {
    const navigate = useNavigate();
    const [alertData, setAlertData] = useState({show: false, message: ""});
    const [alertSuccess, setAlertSuccess] = useState({show: false, message: ""});
    const [formLogin, setFormLogin] = useState({ email: '', pass: '' });

    const updateForm = (e) => {
        setFormLogin({...formLogin, [e.target.name]: e.target.value});
    }

    const delay = (ms) => new Promise(solve => setTimeout(solve, ms));

    const sendForm = async (event) => {
        event.preventDefault();
        setAlertData({show: false, message: ""});
        const resp = await sendLoginUsuario(formLogin);

        if (resp.success) {
            setAlertSuccess({show: true, message: `${resp.message} Espera un momento...`});
            await delay(3000);
            return navigate("/user/home");

        } else if (!resp.success) {
            setAlertData({show: true, message: resp.message});
        }
    };

    return(
    <>
    { alertData.show && <ToastAlert message={alertData.message} /> }
    { alertSuccess.show && <ToastSuccess message={alertSuccess.message} /> }

    <div className="d-flex flex-grow-1 justify-content-center align-items-center p-3">
        <div className="border border-2 rounded-2 py-4 p-5">
            <div className="text-center mb-3">
                <h5 className="fs-4 mb-0">Sistema de Citas de Usuario</h5>
                <i className="bi bi-house-heart fs-1 mt-0"></i>
            </div>

            <form onSubmit={(e) => sendForm(e)} className="d-flex flex-column gap-3">
                <div>
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" id="email"
                        value={formLogin.email} onChange={updateForm} />
                </div>
                <div>
                    <label htmlFor="pass" className="form-label">Password</label>
                    <input type="text" name="pass" className="form-control" id="pass" maxLength="20"
                        value={formLogin.pass} onChange={updateForm} />
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">Acceder</button>
                </div>
                <a href="/crear-cuenta" className="">Registrame</a>
            </form>
        </div>
    </div>
    </>
    )
};