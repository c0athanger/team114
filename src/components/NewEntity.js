import React, { useState, useEffect } from 'react'
import AddBodypart from './AddBodypart';


const NewEntity = ({ entity, attr, setIsUpdate, handleSubmit, isEdit }) => {
	const [attr_header, setHeader] = useState(attr);
	const [ent, setEnt] = useState(entity)


	const EditExercise = (e) => {
		e.preventDefault();
		if (isEdit == false) {
			setIsUpdate(false)
			delete entity[attr[0]];
			handleSubmit(entity);
		}
		else {
			setIsUpdate(true);
			handleSubmit(entity);
		}
	}

	useEffect(() => {
		let temp = entity
		delete temp[attr[0]];
		setEnt(temp);
		temp = attr;
		temp.shift();
		setHeader(temp);
	}, [])

	return (
		<>
			<p>
				To create/edit the entity, fill in all the fields and then click the save button.
			</p>
			<table id="editntity">
				<caption>Create/edit an entity</caption>
				<thead>
					<tr>
						{attr_header.map((attribute, index) => (
							<th key={index}>
								{attribute}
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					<tr>
						{attr_header.map((attribute, index) => (
							<td key={index}>
								<label for="idname" className="required">
									<input type="text" id="idname" placeholder="Enter value here" value={ent[attribute]} name="name" onChange={e => { let en = { ...ent }; en[attribute] = e.target, value; setEnt(en) }}></input>
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
