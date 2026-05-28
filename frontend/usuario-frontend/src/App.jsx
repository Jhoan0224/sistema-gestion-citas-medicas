import { useEffect, useState } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { validarSesionUsuario, } from './application/Authentication';
import { LoginUsuario } from './pages/LoginUsuario';
import { HomeUsuario } from './pages/HomeUsuario';
import { Home } from './pages/Home.jsx';
import { CrearCuentaUsuario } from './pages/CrearCuentaUsuario';
import { AgendarCitaUsuario } from './pages/FormsCitasUsuario';
import { UsuarioAccount } from './pages/UsuarioAccount';
import { LoadingSpinner } from './componentes/LoadingTmpls';
import { Navbar, Footer } from './componentes/NavbarFooter';

export default function App() {

  return (
    <>
    <Routes>
        <Route index element={<Home />} />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginUsuario />} />
        <Route path='/crear-cuenta' element={<CrearCuentaUsuario />}/>
        
        <Route path="/user" element={<TemplateUsuario />}>
            <Route index element={<HomeUsuario />} />
            <Route path='home' element={<HomeUsuario />} />
            <Route path='agendar-cita' element={<AgendarCitaUsuario />} />
            <Route path='user-account' element={<UsuarioAccount />} />
        </Route>
    </Routes>
    </>
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