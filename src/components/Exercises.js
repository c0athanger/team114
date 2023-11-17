import React, { useState, useEffect } from 'react'
import Exercise from './Exercise'
import NewExercise from './NewExercise'
import axios from '../../api/axios'

const Exercises = () => {

	const [exercises_query, setExersizes] = useState([]);

	setExersizes([
		{ name: 'Bicep Curl', description: 'Curl weights using your biceps', bodyparts: ['biceps'] },
		{ name: 'Bench Press', description: 'Push barbell while laying on bench', bodyparts: ['chest', 'triceps'] },
		{ name: 'Squat', description: 'Lower your body by bending your knees', bodyparts: ['legs', 'back'] }

	]);

	const def_ex = { name: 'Put name Here', description: 'Put description here', bodyparts: ['body part name'] }


	const [isUpdate, setIsUpdate] = useState(0);
	const [search, setSearch] = useState('');
	const [exDefault, setExDefault] = useState(def_ex);
	const name_space = "name:  "
	const isNew = true;

	const handleCreate = async (e) => {
		const response = await axios.put('/Exercise', JSON.stringify(e), {
			headers: { 'Content-Type': 'application/json' }
		});
		handleSearch();
	}

	const handleUpdate = async (e) => {
		const response = await axios.put('/Exercise', JSON.stringify(e), {
			headers: { 'Content-Type': 'application/json' }
		});
		handleSearch();
	}

	const handleDelete = async (i) => {
		const response = await axios.delete('/Exercise', JSON.stringify(exercises_query[i].exerciseID), {
			headers: { 'Content-Type': 'application/json' }
		});
		handleSearch();
	}

	const handleSearch = async () => {
		const response = await axios.get('/Exercise', JSON.stringify({ search }), {
			headers: { 'Content-Type': 'application/json' }
		});
		setExersizes(response.data)
	}

	useEffect(() => {
		handleSearch()
	}, []);


	const editExercises = (i) => {
		setExDefault(exercises_query[i])
		isNew = 0;
		setIsUpdate(true);
	}

	const addEx = (e) => {
		e.preventDefault()
		isNew = 1;
		setExDefault(def_ex)
		setIsUpdate(1);
	}


	return (
		<>
			{!isUpdate
				? <div>
					<button onClick={addEx}>Create New Exercise</button>
					<table>
						<thead>
							<tr>
								<th>{name_space}
									<label for="idsearch" >
										<input type="text" id="idsearch" placeholder="Enter exercise name here" value={search} onChange={e => setSearch(e.target.value)}></input>
									</label>
								</th>
								<th>Description</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{exercises_query.map((exercise, index) => (
								<tr key={index}>
									<td>
										<button onClick={(e) => { setExDefault(exercises_query[index]); setIsUpdate(2) }}>{exercise.name}</button>
									</td>
									<td>{exercise.description}</td>
									<td>
										<button onClick={(e) => { e.preventDefault(); editExercises(index) }}>Update</button>
										<button onClicl={handleDelete(index)}>Delete</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				: isUpdate == 1
					?
					<div>
						<NewExercise exercise={exDefault} handleSubmit={isNew ? handleCreate : handleUpdate} setIsUpdate={setIsUpdate} />
					</div>
					:
					<div>
						<Exercise exercise={exDefault} setIsUpdate={setIsUpdate} />
					</div>
			}
		</>
	);
}

export default Exercises