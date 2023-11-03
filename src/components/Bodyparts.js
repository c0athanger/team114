import React, { useState } from 'react'
import NewBodypart from './NewBodypart';


const Bodyparts = () => {
	const bodyparts_query = ['legs', 'arms', 'back'];
	const def_ex = 'Put bodypart name here'
	const [isUpdate, setIsUpdate] = useState(0);
	const [exDefault, setExDefault] = useState(def_ex);

	const editBodyparts = (i) => {
		setExDefault(bodyparts_query[i])
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
				? <>
					<button onClick={addEx}>Create New Bodypart</button>
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>ACtions</th>

							</tr>
						</thead>
						<tbody>
							{bodyparts_query.map((bodypart, k) => (<tr><td> {bodypart} </td><td><button onClick={() => { editBodyparts(k) }}>Edit</button><button>Delete</button></td></tr>))}
						</tbody>
					</table>
				</>
				:
				<>
					<NewBodypart bodypart={exDefault} setIsUpdate={setIsUpdate} />
				</>
			}
		</>

	)
}

export default Bodyparts