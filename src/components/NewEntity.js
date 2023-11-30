import React, { useState, useEffect } from 'react'
import AddBodypart from './AddBodypart';


const NewEntity = ({ entity, attr, setIsUpdate, handleSubmit, isEdit }) => {
	const [pk, setPk] = useState(entity[attr[0]]);
	const [attr_header, setHeader] = useState(function () { let temp = [...attr]; temp.shift(); return temp }());
	const [ent, setEnt] = useState({ ...entity })


	const EditExercise = (e) => {
		e.preventDefault();
		if (isEdit == false) {
			setIsUpdate(false)
			let temp = { ...ent };
			delete temp[attr[0]];
			handleSubmit(temp);
		}
		else {
			setIsUpdate(true);
			let temp = { ...ent };
			handleSubmit(temp);
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
									<input type="text" id="idname" placeholder="Enter value here" value={ent[attribute]} name="name" onChange={e => { let en = { ...ent }; en[attribute] = e.target.value; setEnt(en) }}></input>
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
