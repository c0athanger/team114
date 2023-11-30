import React, { useState } from 'react'
import AddBodypart from './AddBodypart';


const NewEntity = ({ entity, attr, setIsUpdate, handleSubmit, isEdit }) => {
	const [Name, setName] = useState(exercise.Name);
	const [Description, setDescription] = useState(exercise.Description);

	const [ent, setEnt] = useState(entity)


	const EditExercise = (e) => {
		e.preventDefault();
		if (isEdit == false) {
			setIsUpdate(false)
			handleSubmit(entity);
		}
		else {
			setIsUpdate(true);
			handleSubmit(entity);
		}
	}

	return (
		<>
			<p>
				To create/edit the entity, fill in all the fields and then click the save button.
			</p>
			<table id="editntity">
				<caption>Create/edit an entity</caption>
				<thead>
					<tr>
				{attr.map((attribute, index) => (
                        <th key={index}>
                            {attribute}
                        </th>
                ))}
					</tr>
				</thead>

				<tbody>
					<tr>
				{attr.map((attribute, index) => (
                        <td key={index}>
							<label for="idname" className="required">
								<input type="text" id="idname" placeholder="Enter value here" value={entity[attribute]} name="name" onChange={e => {let en = {...entity}; en[attribute] = e.target,value; setEnt(en)}}></input>
							</label>
                        </td>
                ))}
						<td><button onClick={EditExercise}>Save</button></td>
					</tr>
				</tbody>
			</table>
		</>
	)
}

export default NewEntity
