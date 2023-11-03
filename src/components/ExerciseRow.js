import React from 'react'

const ExerciseRow = ({ exercise }) => {
	return (
		<tr>
			<Td>{exercise.name}</Td>
			<Td>{exercise.sets}</Td>
			<Td>{exercise.reps}</Td>
			<Td>{exercise.internsity}</Td>
		</tr>
	)
}

export default ExerciseRow