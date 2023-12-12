import React, { useState, useEffect } from 'react'
import axios from '../axios';
import { BlocksWave } from "react-svg-spinners"


///////////////////////////////////////////////
// Component for creating/Updating junction entities
// Props:
// entity -> default entity value
// attr -> Array of table entity attributes
// setIsUpdate -> setter for parent components isUpdate state
// handleSubmit -> function handler for submit button
// isEdit -> Boolean representing if operation is create or update
// setTableLoad -> setting for load spinner boolean
///////////////////////////////////////////////
const NewEntity = ({ entity, attr, setIsUpdate, handleSubmit, isEdit, setTableLoad }) => {

	// Define state vars

	// Foreign Keys
	const [fk1, _] = useState(attr[attr.length - 1]);
	const [fk2, __] = useState(attr[attr.length - 2]);

	// Entity attributes
	const [attr_header, setHeader] = useState([]);

	// entity state object
	const [ent, setEnt] = useState({ ...entity });

	// Lookup tables for converting FK IDs to names
	const [fkTableOne, setfkTableOne] = useState({});
	const [fkTableTwo, setfkTableTwo] = useState({});

	// Boolean for controlling load spinner logic
	const [isLoad, setLoad] = useState(false);


	// backend paths for creating lookup tables
	const fk_path = {
		BodyPartID: "/BodyPart",
		UserID: "/User",
		WorkoutID: "/Workout",
		ExerciseID: "/Exercise",
	}

	// handler for save button
	const EditExercise = (e) => {
		e.preventDefault();
		setTableLoad(false);
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

	// Handler for exercise attribute isUpperBody
	const handleUpperBody = (e) => {
		let temp = { ...ent };
		temp['IsUpperBody'] = e.target.value;
		setEnt(temp);
	}

	// handlers for FKs
	const handleFK1 = (e) => {
		let temp = { ...ent };
		temp[fk1] = e.target.value;
		setEnt(temp);
	}

	const handleFK2 = (e) => {
		let temp = { ...ent };
		temp[fk2] = e.target.value;
		setEnt(temp);
	}

	// handles logic on if submit should be disabled
	// controls for null entries to non null attributes
	const falsyEntity = () => {
		for (let k of attr_header) {
			if (!ent[k] && k != 'BodyPartID') {
				return true
			}
		}
		return false
	}

	// Parsing backend query to create lookup tables
	const parseNames = (data, fk, f) => {
		let temp = {};
		if (fk == "BodyPartID") temp[null] = null;
		let name_key = fk == 'UserID' ? 'Username' : 'Name';
		for (let e of data) {
			temp[e[fk]] = e[name_key]
		}
		f({ ...temp })
	}

	// Handles loading get requests for lookup tables on render
	useEffect(() => {
		const handleGet = async () => {
			const response1 = await axios.get(fk_path[fk1]);
			const response2 = await axios.get(fk_path[fk2]);
			parseNames(response1.data, fk1, setfkTableOne);
			parseNames(response2.data, fk2, setfkTableTwo);
			let temp = { ...ent }
			if (temp[fk1] == null) {
				if (fk1 == "BodyPartID" && response1.data == []) temp[fk1] = null;
				else {
					temp[fk1] = response1.data[0][fk1]
				}
			}
			if (temp[fk2] == null) {
				if (fk2 == "BodyPartID" && response2.data == []) temp[fk2] = null;
				else {
					temp[fk2] = response2.data[0][fk2]
				}
			}
			console.log(temp)
			setEnt({ ...temp })
			setHeader(function () { let temp = [...attr]; temp.shift(); return temp }());
			setLoad(true);

		}
		handleGet().catch(console.error);
	}, [])

	// Conditional html rendering of entity entry form. If not finished
	// loading will render load spinner instead
	return (
		<>
			{isLoad
				? <>
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
									else if (attribute == fk1) {
										return (
											<td key={index}>
												<label for="idname" className="required">
													<select value={ent[attribute]} onChange={handleFK1}>
														{Object.keys(fkTableOne).map((fk, ind) => (
															<option value={fk}>{fkTableOne[fk] ? fkTableOne[fk] : "None"}</option>
														))}
													</select>
												</label>
											</td>
										)
									}
									else if (attribute == fk2) {
										return (
											<td key={index}>
												<label for="idname" className="required">
													<select value={ent[attribute]} onChange={handleFK2}>
														{Object.keys(fkTableTwo).map((fk, ind) => (
															<option value={fk}>{fkTableTwo[fk] ? fkTableTwo[fk] : "None"}</option>
														))}
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
				:
				<div>
					<BlocksWave width={100} height={100} color={"orange"} />
				</div>
			}
		</>
	)
}

export default NewEntity
