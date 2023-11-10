import React from 'react'


const User = ({ user, setIsUpdate }) => {
	console.log(user.workouts);
	return (
		<div className="UserPage">
			<h2>
				Username
			</h2>
			<p>
				{user.username}
			</p>
			<h2>
				Email
			</h2>
			<p>
				{user.email}
			</p>
			<h2>
				Password
			</h2>
			<p>
				{user.password}
			</p>
			<h2> Subscribed workouts </h2>
			<table id="userWorkouts">
				<thead>
					<tr>
						<th>Workout name</th>
					</tr>
				</thead>

				<tbody>
					{user.workouts.map((workout, k) => (
						<tr key={k}>
							<td>{workout.name}</td>
						</tr>
					))}
				</tbody>
			</table>
			<button onClick={() => { setIsUpdate(0) }}>Return to users table</button>

		</div>
	)
}

export default User