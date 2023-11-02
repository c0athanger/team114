import React from 'react'

const Exercise = ({ Title, txt }) => {
	return (
		<tr>
			<td>{Title}</td>
			<td>{txt}</td>
		</tr>
	)
}

export default Exercise