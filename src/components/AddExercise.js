
import React, { useState } from 'react'

const AddExercise = ({ ex, pushExercise }) => {
	const [name, setName] = useState(ex.name);
	const [sets, setSets] = useState(ex.sets);
	const [reps, setReps] = useState(ex.reps);
	const [intensity, setIntensity] = useState(ex.intensity);

	const createExercise = (e) => {
		e.preventDefault();
		pushExercise({ name, sets, reps, intensity });
		setName('Put exercise here');
		setSets(0);
		setReps(0);
		setIntensity(0);
	}


	return (
		<>
			<td><button onClick={() => { pushExercise({ name, sets, reps, intensity }); }}>Add Exercise</button></td>
			<td>
				<label for={ex.name} className="required">
					<input type="text" id={ex.name} value={ex.name} name={ex.name} onChange={e => setName(e.target.value)}></input>
				</label>
			</td>
			<td>
				<label for={ex.sets} className="required">
					<input type="number" id={ex.sets} value={ex.sets} name={ex.sets} onChange={e => setSets(e.target.value)}></input>
				</label>
			</td>
			<td>
				<label for={ex.reps} className="required">
					<input type="number" id={ex.reps} value={ex.reps} name={ex.reps} onChange={e => setReps(e.target.value)}></input>
				</label>
			</td>
			<td>
				<label for={ex.intensity} className="required">
					<input type="number" id={ex.intensity} value={ex.intensity} name={ex.intensity} onChange={e => setIntensity(e.target.value)}></input>
				</label>
			</td >
		</>

	)
}

export default AddExercise