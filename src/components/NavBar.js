import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';

// Date: 12/30/2022  
// Routing and navbar loosely based off this react navbar tutorial
// Source URL: https://github.com/tech2etc/React-Navbar-Advance
///////////////////////////////////////////////
// Component for site navbar
///////////////////////////////////////////////
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

	// html to for navbar links
	return (
		<header className="nav_header">
			<nav>
				<ul className="nav_links">
					<li><Link to="/Users">Users</Link></li>
					<li><Link to="/Exercises">Exercises</Link></li>
					<li><Link to="/Workouts">Workouts</Link></li>
					<li><Link to="/Bodyparts">Bodyparts</Link></li>
					<li><Link to="/UsersWorkouts">UserWorkouts</Link></li>
					<li><Link to="/ExerciseBodyParts">ExerciseBodyparts</Link></li>
					<li><Link to="/WorkoutExercises">WorkoutExercises</Link></li>
				</ul>
			</nav>
		</header>
	)
}

export default NavBar