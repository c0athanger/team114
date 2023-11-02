import { Outlet } from "react-router-dom"
import NavBar from './NavBar'

const Layout = () => {
	return (
		<main className="home">
    	<NavBar/>
    	<div id="content" className='siteContent'> 
				<Outlet />
			</div>
		</main>
	)
}

export default Layout