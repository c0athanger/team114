import React, { useState, useEffect } from 'react'
import { BlocksWave } from "react-svg-spinners"


///////////////////////////////////////////////
// Component for creating/Updating new entities
// Props:
// entity -> default entity value
// attr -> Array of table entity attributes
// setIsUpdate -> setter for parent components isUpdate state
// handleSubmit -> function handler for submit button
// isEdit -> Boolean representing if operation is create or update
// setTableLoad -> setting for load spinner boolean
///////////////////////////////////////////////
const NewEntity = ({ entity, attr, setIsUpdate, handleSubmit, isEdit, setTableLoad }) => {

	// define state vars

	// set pk value of entity for updates
	const [pk, setPk] = useState(entity[attr[0]]);

	// set attributes of entity
	const [attr_header, setHeader] = useState(function () { let temp = [...attr]; temp.shift(); return temp }());

	// set entity values
	const [ent, setEnt] = useState({ ...entity });



	// handler for save button
	const EditExercise = (e) => {
		e.preventDefault();
		if (isEdit == false) {
			setIsUpdate(false)
			let temp = { ...ent };
			delete temp[attr[0]];
			setTableLoad(false);
			handleSubmit(temp);
		}
		else {
			setIsUpdate(false);
			let temp = { ...ent };
			handleSubmit(temp);
		}
	}

	// Handler for exercise attribute isUpperBody
	const handleUpperBody = (e) => {
		let temp = { ...ent };
		temp['IsUpperBody'] = e.target.value;
		setEnt(temp);
	}

	// handles logic on if submit should be disabled
	// controls for null entries to non null attributes
	const falsyEntity = () => {
		for (let k of attr_header) {
			if (!ent[k]) {
				return true
			}
		}
		return false
	}

	// Handles loading get requests for lookup tables on render
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
						<th></th>
					</tr>
				</thead>

				<tbody>
					<tr>
						{attr_header.map((attribute, index) => {

							if (attribute === 'IsUpperBody') {
								return (
									<td key={index}>
										<label for="idname" className="required">
											<select value={ent[attribute]} onChange={handleUpperBody}>
												<option value={1}>Yes</option>
												<option value={0}>No</option>
											</select>
										</label>
									</td>
								)
							}
							else {
								return (
									<td key={index}>
										<label for="idname" className="required">
											<input type="text" id="idname" placeholder="Enter value here" value={ent[attribute]} name="name" onChange={e => { let en = { ...ent }; en[attribute] = e.target.value; setEnt(en) }}></input>
										</label>
									</td>
								)
							}
						})}

						<td><button className='entbutton' disabled={falsyEntity() ? true : false} onClick={EditExercise}>Save</button></td>
					</tr>
				</tbody>
			</table>
		</>
	)
}

export default NewEntity
