import { useState, useEffect } from 'react'
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import { HomePersonalMed } from './pages/HomePersonalMed.jsx'
import { HomeAdmin } from './pages/HomeAdmin.jsx'
import { LoginHome } from './pages/Login.jsx'
import { SpinerLoading } from './components/UiComponent.jsx'
import { AuthApp } from './app/auth.app.js'
function App() {

	return (
		<>
		<Routes>
			<Route path="/" element={<Home />}/>
			<Route path="/spiner" element={<SpinerLoading />}/>
			<Route index element={<Home />}/>
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
	const [adminIsLogged, setAdminIsLogged] = useState(null);

	useEffect(() => {
		let isMounted = true;
		const verifyLogin = async () => {
			//const resp = await AuthApp.verifyAdminIsLogged();
			const resp = true;
			if (isMounted) {
				resp === true ? setAdminIsLogged(true) : setAdminIsLogged(false);
			}
		};
		verifyLogin();
		return () => {isMounted = false;}
	}, []);

	// CAMBIAR SOLO EN CAMBIO DE URL
	if (adminIsLogged === null) { return <SpinerLoading /> }
	if (adminIsLogged === false) { return <Navigate to="/login" /> }

	return(
		<div className='d-flex vh-100'>
			<Outlet />
		</div>
	)
}

function TemplatePersonalMedico() {
	const [persMedIsLogged, setPersMedIsLogged] = useState(null);

	useEffect(() => {
		let isMounted = true;
		const verifyLogin = async () => {
			// const resp = await AuthApp.verifyPersonalMedIsLogged();
			const resp = true;
			if (isMounted) {
				resp === true ?	setPersMedIsLogged(true) : setPersMedIsLogged(false);
			}
		};
		verifyLogin();
		return () => { isMounted = false }
	}, []);

	if (persMedIsLogged === null) { return <SpinerLoading /> }
	if (persMedIsLogged === false) { return <Navigate to="/login" /> }

	return (
	<div className='d-flex vh-100'>
		<Outlet />	
	</div>
	)
}

export default App;