import { useState } from "react";


export function FormSecurityUserAccount({setCancelar}) {
    const [updateEmail, setUpdateEmail] = useState(false);
    const [formUpdSecurity, setFormUpdSecurity] = useState({
       isEmailModified: false, email: 'myemail@gmail.com', newEmail: '', pass: '', newPassCheck1: '', newPassCheck2: ''
    });

    const updateForm = (e) => {
        setFormUpdSecurity({...formUpdSecurity, [e.target.name]: e.target.value});
    };

    const sendForm = (event) => {
        event.preventDefault();
        const formSecurity = {...formUpdSecurity};

        if (updateEmail) { formSecurity.isEmailModified = true;}

    };

    return(
    <>
    <h5 className="fs-6">Actualizando seguridad de la cuenta</h5>

    <form className="m-3">
        <div className="d-flex gap-3 flex-wrap flex-md-nowrap mb-3">
            <div className="d-inline-flex align-items-end">
                <div>
                    <label htmlFor="email" className="form-label">Email actual</label>
                    <input type="email" id="email" name="email" className="form-control w-auto" readOnly required 
                        value={formUpdSecurity.email}
                    />
                </div>
                <button type="button" onClick={() => setUpdateEmail(prev => (!prev))} className="btn btn-primary mx-1"><i className="bi bi-pencil-square"></i></button>
            </div>
            {
                updateEmail &&
                <div>
                    <label htmlFor="newEmail" className="form-label">Nuevo Email</label>
                    <input type="email" id="newEmail" name="newEmail" className="form-control w-auto" readOnly required 
                        value={formUpdSecurity.newEmail}
                        onChange={updateForm}
                    />
                </div>
            }
        </div>

        <div className="d-flex flex-wrap flex-md-nowrap gap-4">
            <div>
                <label htmlFor="passCheck1" className="form-label">Contrasena</label>
                <input type="text" id="passCheck1" name="passCheck1" className="form-control" required 
                    value={formUpdSecurity.newPassCheck1} onChange={updateForm}
                />
            </div>
            <div>
                <label htmlFor="passCheck2" className="form-label">Nueva contrasena</label>
                <input type="text" id="passCheck2" name="passCheck2" className="form-control" required 
                    value={formUpdSecurity.newPassCheck2} onChange={updateForm}
                />
            </div>
            <div>
                <label htmlFor="passCheck2" className="form-label">Confirmar nueva contrasena</label>
                <input type="text" id="passCheck2" name="passCheck2" className="form-control" required 
                    value={formUpdSecurity.pass} onChange={updateForm}
                />
            </div>
        </div>

        <div className="d-flex gap-3 flex-column flex-md-row justify-content-md-between mt-4 mb-3">
            <button type="button" onClick={() => setCancelar(null)} className="btn btn-warning">Cancelar</button>
            <button className="btn btn-primary">Guardar Cambios</button>
        </div>
    </form>
    </>
    )
}

export function FormPersonalInfo({setCancelar}) {

    return(
    <>
    PersonalInfo
    </>
    )
}
export function FormDeleteAccount({setCancelar}) {

    return(
    <>
    <div className="d-flex flex-column px-3 py-2">
        <h5 className="fs-6">Eliminación de Cuenta</h5>
        <p className="text-center">Al Elimnar tú cuenta se desactivara durante 15 días, durante este periodo de tiempo aún puedes volver Activar tu cuenta.
            Pasado ese periodo de tiempo, tu cuenta y los datos relacionados no se podran recuperar.
        </p>
        <p className="text-center">La Frase de seguridad es: <i className="fw-medium">Si Eliminar Cuenta</i></p>
        <form className="border rounded-2 px-4 py-2 mx-auto">
            <div className="form-floating my-3">
                <input type="text" name="check1" id="check1" className="form-control fw-medium" placeholder="Frase de seguridad"/>
                <label htmlFor="check1">Frase de seguridad</label>
            </div>
            <div className="d-flex gap-3 mb-2">
                <button onClick={() => setCancelar(null)} className="btn btn-primary mx-auto">Cancelar</button>
                <button className="btn btn-danger mx-auto">Eliminar Cuenta</button>
            </div>
        </form>
    </div>
    </>
    )
}