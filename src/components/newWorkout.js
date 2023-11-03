
import React, { useState } from 'react'
import { useNavigate } from 'react-router';


const newWorkout = ({ workout = { name: 'Put name Here', description: 'Put description here', exercise: [{ name: 'Put exercise here', sets: 0, reps: 0, intensity: 0 }] } }) => {
	const [name, setName] = useState(workout.name);
	const [description, setDescription] = useState(workout.description);
	const [exercises, setExercises] = useState(workout.exercises);

	const nav = useNavigate();

	const setExerciseInd = (val, i) => {
		const new_exercises = [...exercises];
		new_exercises[i] = val;
		setBodyparts(new_exercises);
	}

	const pushExercise = (e) => {
		e.preventDefault();
		setBodyparts([...exercises, { name: 'Put exercise here', sets: 0, reps: 0, intensity: 0 }]);
	}

	const EditWorkout = (e) => {
		e.preventDefault();
		nav('/Workouts')
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
						<td><button onClick={pushExercise}>Add Exercise</button></td>
						{exercises.map((exercise, index) => <addExercise name={exercise[index]} setExerciseInd={setExerciseInd} index={index} />)}
						<td><button onClick={EditWorkout}>Save</button></td>
					</tr>
				</tbody>
			</table>
		</>
	)
}

export default newWorkout