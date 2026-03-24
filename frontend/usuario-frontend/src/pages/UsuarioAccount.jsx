import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { FormSecurityUserAccount, FormPersonalInfo, FormDeleteAccount } from "../componentes/FormUserAccount"
import UsuarioAccountData from "../componentes/UserAccountInfo.jsx";


export function UsuarioAccount() {
    const navigate = useNavigate();
    const [currentConfig, setCurrentConfig] = useState(null);

    const RenderAccountConfig = {
        Security: <FormSecurityUserAccount setCancelar={setCurrentConfig} />,
        PersonalInfo: <FormPersonalInfo setCancelar={setCurrentConfig} />,
        DeleteAccount: <FormDeleteAccount setCancelar={setCurrentConfig}/>
    };

    return(
    <>
    <div className="container">
        <div className="d-flex justify-content-between py-2">
            <h5 className="fs-5">Información de Usuario</h5>
            <button onClick={() => navigate('/home')} className="btn btn-outline-secondary me-2"><i class="bi bi-x-lg"></i></button>
        </div>
        <div className="border mx-2 mb-2">
            <UsuarioAccountData />
        </div>
        <h5 className="fs-5 py-2">Configuración de Cuenta</h5>
        <div className="d-flex gap-3 mb-3">
            <button onClick={() => setCurrentConfig("Security")} className="btn btn-outline-primary">Seguridad de la cuenta</button>
            <button onClick={() => setCurrentConfig("Security")} className="btn btn-outline-primary">Actulizar mi infomarción</button>
            <button onClick={() => setCurrentConfig("DeleteAccount")} className="btn btn-outline-danger ms-auto me-0">Eliminar mi cuenta</button>
        </div>
        {
            setCurrentConfig && RenderAccountConfig[currentConfig] ? 
            (
                <div className="border rounded-2 p-3">
                    { 
                        RenderAccountConfig[currentConfig]
                    }
                </div>
            ): null
        }
    </div>
    </>
    )
}