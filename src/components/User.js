import React from 'react'

const User = ({ Username, Email, Password }) => {
	return (
		<div className="UserPage">
			<h1>
				{Username}
			</h1>
			<p>
				Email: {Description}
			</p>
			<p>
				Password: {Password}
			</p>
		</div>
	)
}

export default User