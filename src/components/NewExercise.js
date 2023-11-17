import React, { useState } from 'react'
import AddBodypart from './AddBodypart';


const NewExercise = ({ exercise, setIsUpdate, handleSubmit }) => {
	const [name, setName] = useState(exercise.name);
	const [description, setDescription] = useState(exercise.description);


	const EditExercise = (e) => {
		e.preventDefault();
		setIsUpdate(false)
		if (('exerciseID' in exercise) == false) {
			handleSubmit({ name, description });
		}
		else {
			const exerciseID = exercise.exerciseID;
			handleSubmit({ name, description, exerciseID })
		}
	}

	return (
		<>
			<p>
				To create/edit the Exercise, fill in all the fields and then click the save button.
			</p>
			<table id="editExercise">
				<caption>Create/edit an exercise</caption>
				<thead>
					<tr>
						<th>Exercise Name</th>
						<th>Description</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td>
							<label for="idname" className="required">
								<input type="text" id="idname" value={name} name="name" onChange={e => setName(e.target.value)}></input>
							</label>
						</td>
						<td>
							<label for="iddescription" className="required">
								<input type="text" id="iddescription" value={description} name="description" onChange={e => setDescription(e.target.value)}></input>
							</label>
						</td>
						<td><button onClick={EditExercise}>Save</button></td>
					</tr>
				</tbody>
			</table>
		</>
	)
}

export default NewExercise