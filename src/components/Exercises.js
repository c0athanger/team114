import React from 'react'
import Exercise from './Exercise'

const Exercises = () => {
	const exercises_query = [
		{ Name: 'Bicep Curl', Description: 'Curl weights using your biceps' },
		{ Name: 'Bench Press', Description: 'Push barbell while laying on bench' },
		{ Name: 'Squat', Description: 'Lower your body by bending your knees' }

	]
	return (
		<div>
		<button>Create New Exercise</button>
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Description</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{exercises_query.map((exercise, index) => (
					<tr key={index}>
						<td>{exercise.Name}</td>
						<td>{exercise.Description}</td>
						<td>
							<button>Update</button>
							<button>Delete</button>
						</td>
					</tr>
				))}
				<tr>
					<td><input type="text" placeholder="Exercise Name"/></td>
					<td><input type="text" placeholder="Exercise Description"/></td>
					<td><button>Add</button></td>
				</tr>
			</tbody>
		</table>
	</div>
	
);
}

export default Exercises