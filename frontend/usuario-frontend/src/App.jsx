import { useEffect, useState } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import { LoginUsuario } from './pages/LoginUsuario'
import { HomeUsuario } from './pages/HomeUsuario'
import { LoadingSpinner } from './componentes/LoadingTmpls'
import { verificarAuth } from './application/Authentication'
import { Navbar, Footer } from './componentes/NavbarFooter'
import { validarAuth } from './api/auth'
import { CrearCuentaUsuario } from './pages/CrearCuentaUsuario'

export default function App() {

  return (
    <>
    <Routes>
        <Route path='/login' element={<LoginUsuario />} />
        <Route path='/crear-cuenta' element={<CrearCuentaUsuario />}/>
        <Route path="/" element={<TemplateUsuario />}>
            <Route index element={<HomeUsuario />} />
        </Route>

    </Routes>
    </>
  )
}


function TemplateUsuario() {
    const [authIsValid, setAuthIsValid] = useState(null);

    useEffect(() => {
        setAuthIsValid(verificarAuth())
    }, []);

    if (authIsValid === null) { return <LoadingSpinner /> }

    if (!authIsValid) { return <LoginUsuario /> }

    if (authIsValid) {
        return(
        <>
        <Navbar />
            <div className='d-flex flex-grow-1 '>
                <Outlet />
            </div>
        <Footer />
        </>
        )
    }
}