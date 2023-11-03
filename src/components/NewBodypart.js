import React from 'react'

const NewBodypart = ({ bodypart, setIsUpdate }) => {

	return (
		<>
			<p>
				To create/edit the Bodypart, fill in all the fields and then click the save button.
			</p>
			<table id="editExercise">
				<caption>Create/edit an Bodypart</caption>
				<thead>
					<tr>
						<th>Bodypart Name</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td>
							<label for="idname" className="required">
								<input type="text" id="idname" value={bodypart} name="bodypart" onChange={e => { }}></input>
							</label>
						</td>
						<td><button onClick={() => { setIsUpdate(0) }}>Save</button></td>
					</tr>
				</tbody>
			</table>
		</>
	)
}

export default NewBodypart