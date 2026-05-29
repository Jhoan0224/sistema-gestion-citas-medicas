import { useState, useEffect } from 'react'
import { Routes, Route, Outlet, Navigate, useLocation, useNavigate, replace } from 'react-router-dom'
import { AuthApp } from './app/auth.app.js'
import { SpinerLoading, NotFound } from './components/UiComponent.jsx'
import { HomePersonalMed } from './pages/HomePersonalMed.jsx'
import { HomeAdmin } from './pages/HomeAdmin.jsx'
import { LoginHome } from './pages/Login.jsx'

export default function App() {

	return (
	<>
	<Routes>
		
		<Route path='*' element={<NotFound />} />
		<Route index element={<LoginHome />}/>
		<Route path='/login' element={<LoginHome />} />

		<Route path='/personal-med' element={<TemplatePersonalMedico />} >
			<Route index element={<HomePersonalMed />} />
			<Route path='home' element={<HomePersonalMed />} />

		</Route>

		<Route path='/system-admin' element={<TemplateAdmin />} >
			<Route index element={<HomeAdmin />} />
			<Route path='home' element={<HomeAdmin />} />
		</Route>
	</Routes>
	</>
	)
}

function TemplateAdmin() {
	const navigate = useNavigate();
	const location = useLocation();
	const [adminIsLogged, setAdminIsLogged] = useState(null);
	
	useEffect(() => {
		let isMounted = true;
		const verifyLogin = async () => {
			const resp = await AuthApp.verifyAdminIsLogged();
			if (isMounted) {
				setAdminIsLogged(resp.success);
				return <SpinerLoading />;
			}
		};
		verifyLogin();
		return () => { isMounted = false }
	}, [location]);

	// CAMBIAR SOLO EN CAMBIO DE URL
	if (adminIsLogged === null) { return <SpinerLoading /> }
	if (adminIsLogged === false) { return <Navigate to="/login" /> }

	return( <div className='d-flex vh-100'> <Outlet /> </div> );
}

function TemplatePersonalMedico() {
	const navigate = useNavigate();
	const urlChanges = useLocation();
	const [persMedIsLogged, setPersMedIsLogged] = useState(null);

	useEffect(() => {
		let isMounted = true;		
		const verifyLogin = async () => {
			const resp = await AuthApp.verifyPersonalMedIsLogged();
			if (isMounted) {
				setPersMedIsLogged(resp.success);
				return <SpinerLoading />;
			}		
		};
		verifyLogin();
		return () => { isMounted = false }
	}, [urlChanges.pathname]);

	if (persMedIsLogged === null) { return <SpinerLoading /> }
	
	if (persMedIsLogged === false) { return navigate("/login") }

	return ( <div className='d-flex vh-100'> <Outlet /> </div> );
}