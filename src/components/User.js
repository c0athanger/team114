import React from 'react'
import WorkoutRow from './WorkoutRow,js'


const User = ({ user, setIsUpdate }) => {
	return (
		<div className="UserPage">
			<h1>
				{user.name}
			</h1>
			<p>
				Email: {user.email}
			</p>
			<p>
				Password: {user.password}
			</p>
			<table id="userWorkouts">
				<caption>Subscribed workouts</caption>
				<thead>
					<tr>
						<th>Workout name</th>
					</tr>
				</thead>

				<tbody>
					{user.workouts.map((workout, k) => { <WorkoutRow workout={workout} /> })}
				</tbody>
			</table>
			<button onClick={() => { setIsUpdate(0) }}>Return to users table</button>

		</div>
	)
}

export default User