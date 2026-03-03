import { useEffect, useState } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import { LoginUsuario } from './pages/LoginUsuario'
import { HomeUsuario } from './pages/HomeUsuario'
import { LoadingSpinner } from './componentes/LoadingTmpls'
import { validarSesionUsuario, } from './application/Authentication'
import { Navbar, Footer } from './componentes/NavbarFooter'
import { CrearCuentaUsuario } from './pages/CrearCuentaUsuario'

export default function App() {

  return (
    <>
    <Routes>
        <Route path='/login' element={<LoginUsuario />} />
        <Route path='/crear-cuenta' element={<CrearCuentaUsuario />}/>
        
        <Route path="/" element={<TemplateUsuario />}>
            <Route index element={<HomeUsuario />} />
            <Route path='home' element={<HomeUsuario />} />
        </Route>

    </Routes>
    </>
  )
}


function TemplateUsuario() {
    const [authIsValid, setAuthIsValid] = useState(true);
    const [userBasicInfo, setUserBasicInfo] = useState({});

    // useEffect(() => {
    //     const validarSesion = async () => {
    //         const resp = await validarSesionUsuario();
    //         if (resp.success) {
    //             setUserBasicInfo({...resp.usuarioBasicInfo});
    //             setAuthIsValid(resp.success);
    //         } else {
    //             setAuthIsValid(false);
    //         }
    //     };
    //     validarSesion();
    // }, []);

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