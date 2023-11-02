import React from {} 'react'

const Workout = ({ Name, Description, Exercises }) => {
	return (
		<div className="WorkoutPage">
			<h1>
				{Name}
			</h1>
			<p>
				{Description}
			</p>
		</div>
	)
}

export default Workout