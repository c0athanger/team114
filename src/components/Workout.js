import React from 'react';
import ExerciseRow from "./ExerciseRow"

const Workout = ({ Name, Description, Exercises }) => {
	return (
		<div className="WorkoutPage">
			<h1>
				{Name}
			</h1>
			<p>
				{Description}
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
					{Exercises.map((exercise, k) => <ExerciseRow exercise={exercise} key={k} />)}
				</tbody>
			</table>

		</div>
	)
}

export default Workout