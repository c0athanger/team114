import React, { useState, useEffect } from 'react'
import Exercise from './Exercise'
import NewEntity from './NewEntity'
import axios from '../axios'

const Table = ({ attr, rt, name }) => {

	const [query, setQuery] = useState([]);




	const [isUpdate, setIsUpdate] = useState(0);
	const [search, setSearch] = useState('');
	const [exDefault, setExDefault] = useState({});
	const name_space = "name:  "
	const [isNew, setIsNew] = useState(true);
	const [isEdit, setEdit] = useState(0);

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
		const response = await axios.get(`${rt}?search=${search}`);
		setQuery(response.data)
	}

	useEffect(() => {
		handleSearch()

	}, []);


	const editEntity = (i) => {
		setEdit(1);
		setIsNew(0);
		setExDefault(query[i])
		setIsUpdate(true);
	}

	const addEntity = (e) => {
		e.preventDefault()
		setEdit(0);
		setIsNew(1);

		let def_ex_temp = {};

		for (let a of attr) {
			def_ex_temp[a] = "Enter value here"
		}

		setExDefault(def_ex_temp)
		setIsUpdate(1);
	}


	return (
		<>
			{!isUpdate
				? <div>
					<button onClick={addEntity}>Create new {name}</button>
					<table>
						<thead>
							<tr>
								<th>{name_space}
									<label for="idsearch" >
										<input type="text" id="idsearch" placeholder={`Enter ${name} here`} value={search} onChange={e => setSearch(e.target.value)}></input>
									</label>
									<button onClick={handleSearch}> Search </button>
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
				: isUpdate == 1
					?
					<div>
						<NewEntity entity={exDefault} attr={attr} handleSubmit={isNew ? handleCreate : handleUpdate} setIsUpdate={setIsUpdate} isEdit={isEdit} />
					</div>
					:
					<div>
						<Exercise exercise={exDefault} setIsUpdate={setIsUpdate} />
					</div>
			}
		</>
	);
}

export default Table
