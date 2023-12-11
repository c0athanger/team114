import React, { useState, useEffect } from 'react'
import JunctionEntity from './JunctionEntity'
import axios from '../axios'
import { useLocation } from 'react-router-dom';
import { BlocksWave } from "react-svg-spinners"

const Table = ({ attr, rt, name }) => {


	const location = useLocation();
	const [isUpdate, setIsUpdate] = useState(0);
	const [search, setSearch] = useState('');
	const [exDefault, setExDefault] = useState({});
	const [isNew, setIsNew] = useState(true);
	const [isEdit, setEdit] = useState(0);
	const [query, setQuery] = useState([]);
	const [isLoad, setLoad] = useState(false);

	const [fkTableOne, setfkTableOne] = useState({});
	const [fkTableTwo, setfkTableTwo] = useState({});

	const fk_path = {
		BodyPartID: "/BodyPart",
		UserID: "/User",
		WorkoutID: "/Workout",
		ExerciseID: "/Exercise",
	}

	const parseNames = (data, fk, f) => {
		let temp = {};
		if (fk == "BodyPartID") temp[null] = null;
		let name_key = fk == 'UserID' ? 'Username' : 'Name';
		for (let e of data) {
			temp[e[fk]] = e[name_key]
		}
		f({ ...temp })
	}

	const handleCreate = async (e) => {
		console.log("req:"); console.log(e);
		const response = await axios.post(rt, JSON.stringify(e), {
			headers: { 'Content-Type': 'application/json' }
		});
		handleSearch();
	}

	const handleUpdate = async (e) => {
		console.log("upreq:"); console.log(e);
		const response = await axios.put(rt, JSON.stringify(e), {
			headers: { 'Content-Type': 'application/json' }
		});
		handleSearch();
	}

	const handleDelete = async (i) => {
		const response = await axios.delete(rt, {
			headers: { 'Content-Type': 'application/json' },
			data: JSON.stringify(query[i])
		});
		handleSearch();
	}

	const handleSearch = async () => {
		console.log(`${rt}?search=${search}`)
		const response = await axios.get(`${rt}?search=${search}`);
		const response1 = await axios.get(fk_path[attr[attr.length - 2]]);
		const response2 = await axios.get(fk_path[attr[attr.length - 1]]);
		parseNames(response1.data, fk1, setfkTableOne);
		parseNames(response2.data, fk2, setfkTableTwo);
		setQuery(response.data)
		setLoad(true);
		console.log(response.data)
	}

	useEffect(() => {
		handleSearch()
	}, []);

	useEffect(() => {
		setLoad(false);
		const handleSearchEffect = async () => {
			console.log(`${rt}?search=${search}`)
			const response = await axios.get(`${rt}?search=${search}`);
			const response1 = await axios.get(fk_path[attr[attr.length - 2]]);
			const response2 = await axios.get(fk_path[attr[attr.length - 1]]);
			parseNames(response1.data, fk1, setfkTableOne);
			parseNames(response2.data, fk2, setfkTableTwo);
			setQuery(response.data);
			setLoad(true);
			console.log(query)
			console.log(response.data)
		}
		setIsUpdate(0); setSearch(''); setExDefault({});
		setIsNew(true);
		setEdit(0);
		handleSearchEffect().catch(console.error);
	}, [location]);

	const editEntity = (i) => {
		setEdit(1);
		setIsNew(0);
		setExDefault(query[i])
		setIsUpdate(1);
	}

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


	return (
		<>
			{!isUpdate && isLoad
				? <div className='tableitems'>
					<button onClick={addEntity}>Create new {name}</button>
					<table>
						<thead>
							<tr>
								{attr.map((attribute, index) => (
									<th key={index}>
										{attribute}
									</th>
								))}
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
