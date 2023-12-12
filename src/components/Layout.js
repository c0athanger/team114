import { Outlet } from "react-router-dom"
import NavBar from './NavBar'

///////////////////////////////////////////////
// Site layout component
///////////////////////////////////////////////
const Layout = () => {
	return (
		<main className="home">
			<NavBar />
			<div id="content" className='siteContent'>
				<Outlet />
			</div>
		</main>
	)
}

export default Layout