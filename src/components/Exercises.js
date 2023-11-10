import React, { useState } from 'react'
import Exercise from './Exercise'
import NewExercise from './NewExercise'

const Exercises = () => {
	const exercises_query = [
		{ name: 'Bicep Curl', description: 'Curl weights using your biceps', bodyparts: ['biceps'] },
		{ name: 'Bench Press', description: 'Push barbell while laying on bench', bodyparts: ['chest', 'triceps'] },
		{ name: 'Squat', description: 'Lower your body by bending your knees', bodyparts: ['legs', 'back'] }

	]

	const def_ex = { name: 'Put name Here', description: 'Put description here', bodyparts: ['body part name'] }

	const [isUpdate, setIsUpdate] = useState(0);
	const [search, setSearch] = useState('');
	const [exDefault, setExDefault] = useState(def_ex);
	const name_space = "name:  "

	const editExercises = (i) => {
		setExDefault(exercises_query[i])
		setIsUpdate(true);
	}

	const addEx = (e) => {
		e.preventDefault()
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
										<button>Delete</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				: isUpdate == 1
					?
					<div>
						<NewExercise exercise={exDefault} setIsUpdate={setIsUpdate} />
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