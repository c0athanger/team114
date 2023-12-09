import React, { useState, useEffect } from 'react'
import AddBodypart from './AddBodypart';
import axios from '../axios';


const NewEntity = ({ entity, attr, setIsUpdate, handleSubmit, isEdit }) => {
	const [fk1, _] = useState(attr[attr.length - 1]);
	const [fk2, __] = useState(attr[attr.length - 2]);
	const [attr_header, setHeader] = useState([]);
	const [ent, setEnt] = useState({ ...entity });
	const [fkTableOne, setfkTableOne] = useState({});
	const [fkTableTwo, setfkTableTwo] = useState({});



	const fk_path = {
		BodyPartID: "/BodyPart",
		UserID: "/User",
		WorkoutID: "/Workout",
		ExerciseID: "/Exercise",
	}


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

	const falsyEntity = () => {
		for (let k of attr_header) {
			if (!ent[k] && k != 'BodyPartID') {
				return true
			}
		}
		return false
	}

	const parseNames = (data, fk, f) => {
		let temp = {};
		let name_key = fk == 'UserID' ? 'Username' : 'Name';
		for (let e of data) {
			temp[e[fk]] = e[name_key]
		}
		if (fk == "BodyPartID") temp[null] = "None";
		if (ent[fk] == null) {
			let temp = { ...ent };
			temp[fk] = Object.keys(temp)[0];
			console.log(temp);
			setEnt({ ...temp });
		}
		console.log(temp);
		f({ ...temp })
	}

	useEffect(() => {
		const handleGet = async () => {
			const response1 = await axios.get(fk_path[fk1]);
			const response2 = await axios.get(fk_path[fk2]);
			parseNames(response1.data, fk1, setfkTableOne);
			parseNames(response2.data, fk2, setfkTableTwo);
			setHeader(function () { let temp = [...attr]; temp.shift(); return temp }());

		}
		handleGet().catch(console.error);
	}, [])

	useEffect(() => {

	}, [fkTableOne, fkTableTwo]);

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
							else if (attribute == fk1) {
								return (
									<td key={index}>
										<label for="idname" className="required">
											<select value={ent[attribute]} onChange={handleFK1}>
												{Object.keys(fkTableOne).map((fk, ind) => (
													<option value={fk}>{fkTableOne[fk]}</option>
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
													<option value={fk}>{fkTableTwo[fk]}</option>
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

						<td><button disabled={falsyEntity() ? true : false} onClick={EditExercise}>Save</button></td>
					</tr>
				</tbody>
			</table>
		</>
	)
}

export default NewEntity
