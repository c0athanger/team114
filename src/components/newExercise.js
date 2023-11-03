import React, { useState } from 'react'
import { useNavigate } from 'react-router';


const newExercise = ({ exercise = { name: 'Put name Here', description: 'Put description here', bodyparts: ['body part name'] } }) => {
	const [name, setName] = useState(exercise.name);
	const [description, setDescription] = useState(exercise.description);
	const [bodyparts, setBodyparts] = useState(exercise.bodyparts);

	const nav = useNavigate();

	const setBodyPartInd = (val, i) => {
		const new_bodyparts = [...bodyparts];
		new_bodyparts[i] = val;
		setBodyparts(new_bodyparts);
	}

	const pushBodyPart = (e) => {
		e.preventDefault();
		setBodyparts([...bodyparts, 'Put Bodypart here']);
	}

	const EditExercise = (e) => {
		e.preventDefault();
		nav('/Exercises')
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
						<td><button onClick={pushBodyPart}>Add bodypart</button></td>
						{bodyparts.map((bodypart, index) => <addBodyPart name={bodypart[index]} setBodyPartInd={setBodyPartInd} index={index} />)}
						<td><button onClick={EditExercise}>Save</button></td>
					</tr>
				</tbody>
			</table>
		</>
	)
}

export default newExercise