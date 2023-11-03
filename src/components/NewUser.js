

import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import AddWorkout from './AddWorkout';


const NewUser = ({ user, setIsUpdate }) => {
	const [username, setUsername] = useState(user.username);
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState(user.password);
	const [workouts, setWorkouts] = useState(user.workouts);
	const def_ex = { email: 'Put Email Here', username: 'Put username here', password: 'Put password here', sw: ['Put workout name here'] }



	const pushWorkout = (name) => {
		setWorkouts([...workouts, 'name']);
	}

	const EditUser = (e) => {
		e.preventDefault();
		setIsUpdate(0);
	}

	return (
		<>
			<p>
				To create/edit this User, fill in all the fields and then click the save button.
			</p>
			<table id="editWorkout">
				<caption>Create/edit the user</caption>
				<thead>
					<tr>
						<th>Username</th>
						<th>Email</th>
						<th>Password</th>
						<th>Add workouts button: </th>
						<th>Workout name</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td>
							<label for="idname" className="required">
								<input type="text" id="idname" value={username} name="username" onChange={e => setUsername(e.target.value)}></input>
							</label>
						</td>
						<td>
							<label for="idEmail" className="required">
								<input type="text" id="idEmail" value={email} name="email" onChange={e => setEmail(e.target.value)}></input>
							</label>
						</td>
						<td>
							<label for="idpw" className="required">
								<input type="text" id="idpw" value={password} name="password" onChange={e => setPassword(e.target.value)}></input>
							</label>
						</td>

						<AddWorkout ex={def_ex} pushWorkout={pushWorkout} />
						<td><button onClick={EditUser}>Save</button></td>
					</tr>
				</tbody>
			</table>
			<table>
				<thead>
					<tr>
						<th>Workout Name</th>
					</tr>
				</thead>
				<tbody>
					{user.workouts.map((workout, index) => (
						<tr key={index}>
							<td>{workout.name}</td>
							<td>
								<button>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}

export default NewUser