import React, { useState, useEffect } from 'react'
import NewEntity from './NewEntity'
import axios from '../axios'
import { useLocation } from 'react-router-dom';
import { BlocksWave } from "react-svg-spinners"

///////////////////////////////////////////////
// Component for creating tables
// Props:
// attr -> Array of table entity attributes
// rt -> route to backend CRUD operations
// name -> Name of the table
///////////////////////////////////////////////

const Table = ({ attr, rt, name }) => {



	// Define state vars
	const location = useLocation();

	// Boolean for rerendeing of entiity component
	// for CU operations
	const [isUpdate, setIsUpdate] = useState(0);

	// Search query string for Read operations
	const [search, setSearch] = useState('');

	// Default value of entity to be sent for CU operations,
	// will contain value of entity to be updated if updating
	const [exDefault, setExDefault] = useState({});

	// Booleans for letting new entity know if operation
	// is create or update
	const [isNew, setIsNew] = useState(true);
	const [isEdit, setEdit] = useState(0);

	// State holding read query info
	const [query, setQuery] = useState([]);

	// Boolean for controlling load spinner logic
	const [isLoad, setLoad] = useState(false);

	const name_space = "name:  ";

	// Handle Create Operations
	const handleCreate = async (e) => {
		console.log("req:"); console.log(e);
		const response = await axios.post(rt, JSON.stringify(e), {
			headers: { 'Content-Type': 'application/json' }
		});
		handleSearch();
	}

	// Handle Update Operations
	const handleUpdate = async (e) => {
		console.log("upreq:"); console.log(e);
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
		setQuery(response.data)
		setLoad(true)
	}

	// Query Table on first render
	useEffect(() => {
		handleSearch()
	}, []);

	// Query Table on reroute
	useEffect(() => {
		setLoad(false)
		const handleSearchEffect = async () => {
			const response = await axios.get(`${rt}?search=${search}`);
			setQuery(response.data)
			setLoad(true)
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
			} else {
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
				? <div>
					<button onClick={addEntity}>Create new {name}</button>
					<table>
						<thead>
							<tr>
								<th>{name_space}
									<label for="idsearch" >
										<input type="text" id="idsearch" placeholder={`Enter ${name} here`} value={search} onChange={e => setSearch(e.target.value)}></input>
									</label>
									<button className='searchbutton' onClick={handleSearch}> Search </button>
								</th>
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
									<td></td>
									{attr.map((attribute, i) => (
										<td>{entity[attribute]}</td>
									))}
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
						<NewEntity entity={exDefault} attr={attr} handleSubmit={isNew ? handleCreate : handleUpdate} setIsUpdate={setIsUpdate} isEdit={isEdit} setTableLoad={setLoad} />
					</div>

					: <div>
						<BlocksWave width={100} height={100} color={"orange"} />
					</div>

			}
		</>
	);
}

export default Table
