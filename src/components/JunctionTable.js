import React, { useState, useEffect } from 'react'
import JunctionEntity from './JunctionEntity'
import axios from '../axios'
import { useLocation } from 'react-router-dom';
import { BlocksWave } from "react-svg-spinners"

///////////////////////////////////////////////
// Component for creating junction tables(M:M)
// Props:
// attr -> Array of table entity attributes
// rt -> route to backend CRUD operations
// name -> Name of the table
///////////////////////////////////////////////

const Table = ({ attr, rt, name }) => {

	// Define state vars
	const location = useLocation();

	// Boolean for rerendeing of junction entity component
	// for CU operations
	const [isUpdate, setIsUpdate] = useState(0);

	// Search query string for Read operations
	const [search, setSearch] = useState('');

	// Default value of entity to be sent for CU operations,
	// will contain value of entity to be updated if updating
	const [exDefault, setExDefault] = useState({});

	// Booleans for letting new junction entity know if operation
	// is create or update
	const [isNew, setIsNew] = useState(true);
	const [isEdit, setEdit] = useState(0);

	// State holding read query info
	const [query, setQuery] = useState([]);

	// Boolean for controlling load spinner logic
	const [isLoad, setLoad] = useState(false);

	// Lookup tables for converting FK IDs to names
	const [fkTableOne, setfkTableOne] = useState({});
	const [fkTableTwo, setfkTableTwo] = useState({});

	// backend paths for creating lookup tables
	const fk_path = {
		BodyPartID: "/BodyPart",
		UserID: "/User",
		WorkoutID: "/Workout",
		ExerciseID: "/Exercise",
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

	// Handle Create Operations
	const handleCreate = async (e) => {
		const response = await axios.post(rt, JSON.stringify(e), {
			headers: { 'Content-Type': 'application/json' }
		});
		handleSearch();
	}

	// Handle Update Operations
	const handleUpdate = async (e) => {
		const response = await axios.put(rt, JSON.stringify(e), {
			headers: { 'Content-Type': 'application/json' }
		});
		handleSearch();
	}

	// Handle Delete Operations
	const handleDelete = async (i) => {
		const response = await axios.delete(rt, {
			headers: { 'Content-Type': 'application/json' },
			data: JSON.stringify(query[i])
		});
		handleSearch();
	}

	// Handle Read/Search Operations
	const handleSearch = async () => {
		const response = await axios.get(`${rt}?search=${search}`);
		const response1 = await axios.get(fk_path[attr[attr.length - 2]]);
		const response2 = await axios.get(fk_path[attr[attr.length - 1]]);
		parseNames(response1.data, attr[attr.length - 2], setfkTableOne);
		parseNames(response2.data, attr[attr.length - 1], setfkTableTwo);
		setQuery(response.data)
		setLoad(true);
	}

	// Query Table on first render
	useEffect(() => {
		handleSearch()
	}, []);

	// Query Table on reroute
	useEffect(() => {
		setLoad(false);
		const handleSearchEffect = async () => {
			const response = await axios.get(`${rt}?search=${search}`);
			const response1 = await axios.get(fk_path[attr[attr.length - 2]]);
			const response2 = await axios.get(fk_path[attr[attr.length - 1]]);
			parseNames(response1.data, attr[attr.length - 2], setfkTableOne);
			parseNames(response2.data, attr[attr.length - 1], setfkTableTwo);
			setQuery(response.data);
			setLoad(true);
		}
		setIsUpdate(0); setSearch(''); setExDefault({});
		setIsNew(true);
		setEdit(0);
		handleSearchEffect().catch(console.error);
	}, [location]);

	// Handle update button
	const editEntity = (i) => {
		setEdit(1);
		setIsNew(0);
		setExDefault(query[i])
		setIsUpdate(1);
	}

	// Handle Create button
	const addEntity = (e) => {
		e.preventDefault()
		setEdit(0);
		setIsNew(1);

		let def_ex_temp = {};

		for (let a of attr) {
			if (a == 'IsUpperBody') {
				def_ex_temp[a] = "1"

			}
			else if (a[a.length - 1] == 'D' && a[a.length - 2] == 'I') {
				def_ex_temp[a] = null
			}
			else {
				def_ex_temp[a] = ""
			}
		}

		setExDefault(def_ex_temp)
		setIsUpdate(1);
	}


	// html code with conditional rerendering
	// if isLoad and NOT isUpdate show table
	// else if ifLoad show new entity
	// else show loading spinner
	return (
		<>
			{!isUpdate && isLoad
				? <div className='tableitems'>
					<button onClick={addEntity}>Create new {name}</button>
					<table>
						<thead>
							<tr>
								{attr.map((attribute, index) => {
									if (index < attr.length - 2) return (
										<th key={index}>
											{attribute}
										</th>
									);
									else return (
										<>
											<th key={index}>
												{attribute}
											</th>
											<th key={index}>
												{`${attribute.substring(0, attribute.length - 2)} Name`}
											</th>
										</>
									)
								})}
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{query.map((entity, index) => (
								<tr key={index}>
									{attr.map((attribute, i) => {
										if (i < attr.length - 2) return (
											<td>{entity[attribute] ? entity[attribute] : "None"}</td>
										);
										else if (i == attr.length - 2) return (
											<>
												<td>{entity[attribute] ? entity[attribute] : "None"}</td>
												<td>{fkTableOne[entity[attribute]] ? fkTableOne[entity[attribute]] : "None"}</td>
											</>
										)
										else return (
											<>
												<td>{entity[attribute] ? entity[attribute] : "None"}</td>
												<td>{fkTableTwo[entity[attribute]] ? fkTableTwo[entity[attribute]] : "None"}</td>
											</>
										)
									})}
									<td>
										<button onClick={(e) => { e.preventDefault(); editEntity(index) }}>Update</button>
										<button onClick={(e) => { e.preventDefault(); handleDelete(index) }}>Delete</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				: isLoad
					? <div>
						<JunctionEntity entity={exDefault} attr={attr} handleSubmit={isNew ? handleCreate : handleUpdate} setIsUpdate={setIsUpdate} isEdit={isEdit} setTableLoad={setLoad} />
					</div>

					: <div>
						<BlocksWave width={100} height={100} color={"orange"} />
					</div>
			}
		</>
	);
}

export default Table
