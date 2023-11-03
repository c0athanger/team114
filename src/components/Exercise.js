import React from 'react'

const Exercise = ({ exercise, setIsUpdate }) => {
	return (
		<div>
			<p>{exercise.name}</p>
			<p>{exercise.description}</p>
			{exercise.bodyparts.map((bodypart, i) => (
				<p>{bodypart}</p>
			))}
			<button onClick={() => { setIsUpdate(0) }}>Return to exercises table</button>
		</div>
	)
}

export default Exercise