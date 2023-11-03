import React from 'react';
import ExerciseRow from "./ExerciseRow"

const Workout = ({ workout, setIsUpdate }) => {
	return (
		<div className="WorkoutPage">
			<h1>
				{workout.name}
			</h1>
			<p>
				{workout.description}
			</p>
			<table id="workoutExercises">
				<caption>Workout regime</caption>
				<thead>
					<tr>
						<th>Exercise</th>
						<th>Sets</th>
						<th>Reps</th>
						<th>Intensity</th>
					</tr>
				</thead>

				<tbody>
					{workout.exercises.map((exercise, k) => <ExerciseRow exercise={exercise} key={k} />)}
				</tbody>
			</table>
			<button onClick={() => { setIsUpdate(0) }}>Return to workouts table</button>

		</div>
	)
}

export default Workout