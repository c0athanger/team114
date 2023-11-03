
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import AddExercise from './AddExercise';


const NewWorkout = ({ workout, setIsUpdate }) => {
	const [name, setName] = useState(workout.name);
	const [description, setDescription] = useState(workout.description);
	const [exercises, setExercises] = useState(workout.exercises);
	const def_ex = { name: 'Put workout name here', description: 'Put workout description here', exercises: [{ name: 'Exercise name', sets: 0, reps: 0, intensity: 0 }] }

	const nav = useNavigate();

	const setExerciseInd = (val, i) => {
		const new_exercises = [...exercises];
		new_exercises[i] = val;
		setExercises(new_exercises);
	}

	const pushExercise = (name, sets, reps, intensity) => {
		setExercises([...exercises, { name: 'Put exercise here', sets: 0, reps: 0, intensity: 0 }]);
	}

	const EditWorkout = (e) => {
		e.preventDefault();
		setIsUpdate(0);
	}

	return (
		<>
			<p>
				To create/edit the Workout, fill in all the fields and then click the save button.
			</p>
			<table id="editWorkout">
				<caption>Create/edit an workout</caption>
				<thead>
					<tr>
						<th>Workout Name</th>
						<th>Description</th>
						<th>Add exercise button:</th>
						<th>Name</th>
						<th>Sets</th>
						<th>Reps</th>
						<th>Intensity</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td>
							<label for="idname" className="required">
								<input type="text" id="idname" value={name} name="name" onChange={e => setName(e.target.value)}></input>
							</label>
						</td>
						<td>
							<label for="iddescription" className="required">
								<input type="text" id="iddescription" value={description} name="description" onChange={e => setDescription(e.target.value)}></input>
							</label>
						</td>

						<AddExercise ex={def_ex} pushExercise={pushExercise} />
						<td><button onClick={EditWorkout}>Save</button></td>
					</tr>
				</tbody>
			</table>
			<table>
				<thead>
					<tr>
						<th>Exercise Name</th>
						<th>Sets</th>
						<th>Reps</th>
						<th>Intensity</th>
					</tr>
				</thead>
				<tbody>
					{workout.exercises.map((exercise, index) => (
						<tr key={index}>
							<td>{exercise.name}</td>
							<td>{exercise.sets}</td>
							<td>{exercise.reps}</td>
							<td>{exercise.intensity}</td>
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

export default NewWorkout