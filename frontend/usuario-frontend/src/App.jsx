import { useEffect, useState } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import { LoginUsuario } from './pages/LoginUsuario'
import { HomeUsuario } from './pages/HomeUsuario'
import { LoadingSpinner } from './componentes/LoadingTmpls'
import { validarSesionUsuario, } from './application/Authentication'
import { Navbar, Footer } from './componentes/NavbarFooter'
import { CrearCuentaUsuario } from './pages/CrearCuentaUsuario'
import { AgendarCitaUsuario } from './pages/FormsCitasUsuario'
import { UsuarioAccount } from './pages/UsuarioAccount'
import { LoginCs } from './pages_cs/LoginCs.jsx'
import { PersonalOfficeCs } from './pages_cs/PersonalCs.jsx'
import { useLocation } from 'react-router-dom';

export default function App() {

  return (
    <>
    <Routes>
        <Route path='/login' element={<LoginUsuario />} />
        <Route path='/crear-cuenta' element={<CrearCuentaUsuario />}/>
        
        <Route path="/user" element={<TemplateUsuario />}>
            <Route index element={<HomeUsuario />} />
            <Route path='home' element={<HomeUsuario />} />
            <Route path='agendar-cita' element={<AgendarCitaUsuario />} />
            <Route path='user-account' element={<UsuarioAccount />} />
        </Route>

        <Route path='/cs-admin' element={<TempalteAdminCs />} >
            <Route index element={<LoginCs />}/>
            <Route path='home' element={<PersonalOfficeCs />}/>
            

        </Route>


    </Routes>
    </>
  )
}


function TempalteAdminCs() {

    return(
        <div className='d-flex flex-grow-1 '>
            <Outlet />
        </div>  
    )
}

function TemplateUsuario() {
    const [authIsValid, setAuthIsValid] = useState(true);
    const [userBasicInfo, setUserBasicInfo] = useState({});
    const location = useLocation(); 
    
    useEffect(() => {
        const validarSesion = async () => {
            const resp = await validarSesionUsuario();
            if (resp.success) {
                setUserBasicInfo({...resp.usuarioBasicInfo});
                setAuthIsValid(resp.success);
            } else {
                setAuthIsValid(false);
            }
        };
        validarSesion();
    }, [location]);

    if (authIsValid === null) { return <LoadingSpinner /> }

    if (!authIsValid) { return <LoginUsuario /> }

    if (authIsValid) {
        return(
        <>
        <Navbar userBasicInfo={userBasicInfo} />
            <div className='d-flex flex-grow-1 '>
                <Outlet />
            </div>
        <Footer />
        </>
        )
    }
}