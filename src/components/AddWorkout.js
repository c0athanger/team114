
import React, { useState } from 'react'

const AddWorkout = ({ ex, pushWorkout }) => {
	const [name, setName] = useState(ex.name);

	const createWorkout = (e) => {
		e.preventDefault();
		pushWorkout({ name });
		setName('Put exercise here');
	}


	return (
		<>
			<td><button onClick={() => { pushWorkout({ name }); }}>Add Workout</button></td>
			<td>
				<label for={ex.name} className="required">
					<input type="text" id={ex.name} value={ex.name} name={ex.name} onChange={e => setName(e.target.value)}></input>
				</label>
			</td>
		</>

	)
}

export default AddWorkout