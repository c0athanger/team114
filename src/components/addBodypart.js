import React from 'react'

const addBodypart = ({ name, setBodyPartInd, index }) => {
	return (
		<td>
			<label for={name} className="required">
				<input type="text" id={name} value={name} name={name} onChange={e => setBodyPartInd(e.target.value, index)}></input>
			</label>
		</td>

	)
}

export default addBodypart