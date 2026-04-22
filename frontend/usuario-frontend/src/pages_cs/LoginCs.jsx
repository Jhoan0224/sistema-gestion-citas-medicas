import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { sendLoginUsuario } from "../application/Authentication.js";

export function LoginCs() {
    const navigate = useNavigate();
    const [formLogin, setFormLogin] = useState({
        email: '', pass: ''
    });

    const updateForm = (e) => {
        setFormLogin({...formLogin, [e.target.name]: e.target.value});
    }

    const sendForm = async (event) => {
        event.preventDefault();
        const authResult = await sendLoginUsuario(formLogin);

        if (authResult.success) {
            return navigate('/user/home');
        } else {
            alert(authResult.message);
        }
    }

    return(
    <>
    <div className="d-flex flex-grow-1 justify-content-center align-items-center p-3">
        <div className="border border-2 rounded-2 py-4 p-5">
            <div className="text-center mb-3">
                <h5 className="fs-4 mb-0">Sistema de Citas de Usuario</h5>
                <i className="bi bi-house-heart fs-1 mt-0"></i>
            </div>

            <form onSubmit={(e) => sendForm(e)} className="d-flex flex-column gap-3">
                <div>
                    <label htmlFor="email" className="form-label">Email</label>
                    {/* <input type="text" name="dui" className="form-control" id="dui" pattern="^[0-9]{8}-[0-9]{1}$" */}
                    <input type="email" name="email" className="form-control" id="email"
                        value={formLogin.email}
                        onChange={updateForm}
                        />
                </div>
                <div>
                    <label htmlFor="pass" className="form-label">Password</label>
                    <input type="text" name="pass" className="form-control" id="pass" maxLength="20"
                        value={formLogin.pass}
                        onChange={updateForm}
                        />
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
}