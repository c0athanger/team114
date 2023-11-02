import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';

const NavBar = () => {

	const [active, setactive] = useState(0);



	const onMouseEnter = (e) => {
		setactive(1);
	}

	const onMouseLeave = (e) => {
		if (active == 1) {
			setactive(0);
		}
	}

	return (
		<header className="nav_header">
			<nav>
				<ul className="nav_links">
					<li><Link to="/">Users</Link></li>
					<li><Link to="/Exercises">Exercises</Link></li>
					<li><Link to="/Workouts">Workouts</Link></li>
					<li><Link to="/About">About</Link></li>
				</ul>
			</nav>
		</header>
	)
}

export default NavBar