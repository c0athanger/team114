import React, { useState, useEffect } from 'react'
import NewEntity from './NewEntity'
import axios from '../axios'
import { useLocation } from 'react-router-dom';
import { BlocksWave } from "react-svg-spinners"

const Table = ({ attr, rt, name }) => {



	const location = useLocation();
	const [isUpdate, setIsUpdate] = useState(0);
	const [search, setSearch] = useState('');
	const [exDefault, setExDefault] = useState({});
	const name_space = "name:  ";
	const [isNew, setIsNew] = useState(true);
	const [isEdit, setEdit] = useState(0);
	const [query, setQuery] = useState([]);
	const [isLoad, setLoad] = useState(false);

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
		setLoad(true)
	}

	useEffect(() => {
		handleSearch()
	}, []);

	useEffect(() => {
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
			} else {
				def_ex_temp[a] = ""
			}
		}

		setExDefault(def_ex_temp)
		setIsUpdate(1);
	}


	return (
		<>
			{!isUpdate && isLoad
				? <div className='tablediv'>
					<button className='tableitems' onClick={addEntity}>Create new {name}</button>
					<table className='tableitems'>
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
