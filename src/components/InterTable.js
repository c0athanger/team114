import React from 'react'
import { useState, useEffect } from 'react'

const interTable = ({ name, route, attributes }) => {

	const [query, setQuery] = useState([]);
	const [def_ex, _] = useState('Put ' + name + ' here');
	const [isUpdate, setIsUpdate] = useState(0);
	const [exDefault, setExDefault] = useState(def_ex);

	const editEntity = (i) => {
		setExDefault(bodyparts_query[i])
		setIsUpdate(true);
	}

	const addEntity = (e) => {
		e.preventDefault()
		setExDefault(def_ex)
		setIsUpdate(1);
	}


	return (
		<>
			{!isUpdate
				? <div>
					<button onClick={addEx}>Create bodypart</button>
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Actions</th>

							</tr>
						</thead>
						<tbody>
							{bodyparts_query.map((bodypart, k) => (<tr><td> {bodypart} </td><td><button onClick={() => { editEntity(k) }}>Edit</button><button>Delete</button></td></tr>))}
						</tbody>
					</table>
				</div>
				:
				<>
					<NewBodypart bodypart={exDefault} setIsUpdate={setIsUpdate} />
				</>
			}
		</>

	)
}



export default interTable