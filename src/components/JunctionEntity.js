import React, { useState, useEffect } from 'react'
import AddBodypart from './AddBodypart';
import axios from '../axios';


const NewEntity = ({ entity, attr, setIsUpdate, handleSubmit, isEdit }) => {
	const [pk, setPk] = useState(entity[attr[0]]);
	const [attr_header, setHeader] = useState(function () { let temp = [...attr]; temp.shift(); return temp }());
	const [ent, setEnt] = useState({ ...entity });
	const [fkTable1, setfkTable1] = useState({});
	const [fkTable2, setfkTable2] = useState({});

	const fk_path_arr = [
		["BodyPartID", "/BodyPartID"],
		["ExerciseID", "/ExerciseID"]
	]


	const EditExercise = (e) => {
		e.preventDefault();
		if (isEdit == false) {
			setIsUpdate(false)
			let temp = { ...ent };
			delete temp[attr[0]];
			handleSubmit(temp);
		}
		else {
			setIsUpdate(false);
			let temp = { ...ent };
			handleSubmit(temp);
		}
	}

	const handleUpperBody = (e) => {
		let temp = { ...ent };
		temp['IsUpperBody'] = e.target.value;
		setEnt(temp);
	}

	useEffect(() => {
		const handleGet = async () => {
			const response1 = await axios.get(`${fk_path_dict[0][1]}`);
			const response2 = await axios.get(`${fk_path_dict[1][1]}`);
			setfkTable1(response1.data);
			setfkTable2(response2.data);
		}
		handleGet().catch(console.error);
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

						<td><button onClick={EditExercise}>Save</button></td>
					</tr>
				</tbody>
			</table>
		</>
	)
}

export default NewEntity