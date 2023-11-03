import React from 'react'
import WorkoutRow from './WorkoutRow,js'

const User = ({ Username, Email, Password, Workouts }) => {
	return (
		<div className="UserPage">
			<h1>
				{Username}
			</h1>
			<p>
				Email: {Email}
			</p>
			<p>
				Password: {Password}
			</p>
			<table id="UserWorkouts">
				<caption>Subscribed workouts</caption>
				<thead>
					<tr>
						<th>Workout</th>
					</tr>
				</thead>

				<tbody>
					{Workouts.map((workout, k) => <WorkoutRow workout={workout} key={k} />)}
				</tbody>
			</table>
		</div>
	)
}

export default User