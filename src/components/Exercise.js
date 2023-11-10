import React from 'react'

const Exercise = ({ exercise, setIsUpdate }) => {
	return (
		<div>
			<h2>Exercise name</h2>
			<p>{exercise.name}</p>
			<h2>Exercise description</h2>
			<p>{exercise.description}</p>
			<h2>Bodyparts targeted by exercise</h2>
			{exercise.bodyparts.map((bodypart, i) => (
				<p key={i}>{bodypart}</p>
			))}
			<button onClick={() => { setIsUpdate(0) }}>Return to exercises table</button>
		</div>
	)
}

export default Exercise