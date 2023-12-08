import React, { useState, useEffect } from 'react'
import Exercise from './Exercise'
import JunctionEntity from './JunctionEntity'
import axios from '../axios'
import { useLocation } from 'react-router-dom';

const Table = ({ attr, rt, name, fk }) => {


	const location = useLocation();
	const [isUpdate, setIsUpdate] = useState(0);
	const [search, setSearch] = useState('');
	const [exDefault, setExDefault] = useState({});
	const [isNew, setIsNew] = useState(true);
	const [isEdit, setEdit] = useState(0);
	const [query, setQuery] = useState([]);

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

	useEffect(() => {
		const handleSearchEffect = async () => {
			const response = await axios.get(`${rt}?search=${search}`);
			setQuery(response.data)
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
			{!isUpdate
				? <div>
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
						<JunctionEntity entity={exDefault} attr={attr} handleSubmit={isNew ? handleCreate : handleUpdate} setIsUpdate={setIsUpdate} isEdit={isEdit} />
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
