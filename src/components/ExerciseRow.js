import React from 'react'

const ExerciseRow = ({ exercise }) => {
	return (
		<tr>
			<td>{exercise.name}</td>
			<td>{exercise.sets}</td>
			<td>{exercise.reps}</td>
			<td>{exercise.intensity}</td>
		</tr>
	)
}

export default ExerciseRow