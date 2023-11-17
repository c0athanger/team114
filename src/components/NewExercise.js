import React, { useState } from 'react'
import AddBodypart from './AddBodypart';


const NewExercise = ({ exercise, setIsUpdate, handleSubmit }) => {
	const [Name, setName] = useState(exercise.name);
	const [Description, setDescription] = useState(exercise.description);


	const EditExercise = (e) => {
		e.preventDefault();
		setIsUpdate(false)
		if (('exerciseID' in exercise) == false) {
			handleSubmit({ Name, Description });
		}
		else {
			const exerciseID = exercise.exerciseID;
			handleSubmit({ Name, Description, exerciseID })
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
								<input type="text" id="idname" value={Name} name="name" onChange={e => setName(e.target.value)}></input>
							</label>
						</td>
						<td>
							<label for="iddescription" className="required">
								<input type="text" id="iddescription" value={Description} name="description" onChange={e => setDescription(e.target.value)}></input>
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