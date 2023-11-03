
import React, { useState } from 'react'
import Workout from './Workout'
import NewWorkout from './NewWorkout'

const Exercises = () => {
	const workouts_query = [
		{ name: 'Upper Body workout', description: 'Workout targeting the upper body', exercises: [{ name: 'biceps curl', sets: 2, reps: 8, intensity: 70 }, { name: 'triceps curl', sets: 3, reps: 8, intensity: 70 }] },
		{ name: 'Lower Body workout', description: 'Workout targeting the lower body', exercises: [{ name: 'hamstring curl', sets: 2, reps: 8, intensity: 70 }, { name: 'squat', sets: 2, reps: 10, intensity: 70 }] },
		{ name: 'Full Body workout', description: 'Workout targeting the entire body', exercises: [{ name: 'Squat', sets: 2, reps: 5, intensity: 80 }, { name: 'bench press', sets: 3, reps: 5, intensity: 75 }] }

	]

	const def_ex = { name: 'Put workout name here', description: 'Put workout description here', exercises: [{ name: 'Exercise name', sets: 0, reps: 0, intensity: 0 }] }

	const [isUpdate, setIsUpdate] = useState(0);
	const [exDefault, setExDefault] = useState(def_ex);

	const editExercises = (i) => {
		setExDefault(workouts_query[i])
		setIsUpdate(true);
	}

	const addEx = (e) => {
		e.preventDefault()
		setExDefault(def_ex)
		setIsUpdate(1);
	}


	return (
		<>
			{!isUpdate
				? <div>
					<button onClick={addEx}>Create New Workout</button>
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Description</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{workouts_query.map((workout, index) => (
								<tr key={index}>
									<td>
										<button onClick={(e) => { setExDefault(workouts_query[index]); setIsUpdate(2) }}>{workout.name}</button>
									</td>
									<td>{workout.description}</td>
									<td>
										<button onClick={(e) => { e.preventDefault(); editExercises(index) }}>Update</button>
										<button>Delete</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				: isUpdate == 1
					?
					<div>
						<NewWorkout workout={exDefault} setIsUpdate={setIsUpdate} />
					</div>
					:
					<div>
						<Workout workout={exDefault} setIsUpdate={setIsUpdate} />
					</div>
			}
		</>
	);
}

export default Exercises