

import React, { useState } from 'react'
import User from './User'
import NewUser from './NewUser'

const Users = () => {
	const users_query = [
		{ email: 'user1@email.com', username: 'user1', password: 'password1', workouts: [{ name: 'Upper body workout' }] },
		{ email: 'user2@email.com', username: 'user2', password: 'password2', workouts: [{ name: 'Lower body workout' }] },
		{ email: 'user3@email.com', username: 'user3', password: 'password3', workouts: [{ name: 'Full body workout' }] },
	]

	const def_ex = { email: 'Put Email Here', username: 'Put username here', password: 'Put password here', workouts: [{ name: 'Put workout name here' }] }

	const [isUpdate, setIsUpdate] = useState(0);
	const [exDefault, setExDefault] = useState(def_ex);

	const editUsers = (i) => {
		setExDefault(users_query[i])
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
					<button onClick={addEx}>Create New User</button>
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Password</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{users_query.map((user, index) => (
								<tr key={index}>
									<td>
										<button onClick={() => { setExDefault(users_query[index]); setIsUpdate(2) }}>{user.username}</button>
									</td>
									<td>{user.email}</td>
									<td>{user.password}</td>
									<td>
										<button onClick={(e) => { e.preventDefault(); editUsers(index) }}>Update</button>
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
						<NewUser user={exDefault} setIsUpdate={setIsUpdate} />
					</div>
					:
					<div>
						<User user={exDefault} setIsUpdate={setIsUpdate} />
					</div>
			}
		</>
	);
}

export default Users