import './App.css'
import { useState } from 'react'
import { clientsData, usersData } from './data'

function App() {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [authorized, setAuthorized] = useState(false)
	const [clientData, setClientData] = useState(clientsData)

	const handleLoginChange = event => {
		setLogin(event.target.value)
	}

	const handlePasswordChange = event => {
		setPassword(event.target.value)
	}

	const handleSubmit = event => {
		event.preventDefault()

		const user = usersData.find(
			user => user.login === login && user.password === password
		)

		if (user) {
			const filteredData = clientsData.filter(
				client => client.responsible === user.fio
			)
			setClientData(filteredData)
			setAuthorized(true)
		} else {
			setAuthorized(false)
		}
	}

	const handleStatusChange = (index, status) => {
		const updatedData = [...clientData]
		updatedData[index].status = status
		setClientData(updatedData)
	}

	return (
		<div>
			<h1>Hello </h1>
			<div>
				{authorized ? (
					<table>
						<thead>
							<tr>
								<th>ФИО</th>
								<th>Статус</th>
								<th>Изменить статус</th>
							</tr>
						</thead>
						<tbody>
							{clientData.map((client, index) => (
								<tr key={index}>
									<td>
										{client.surname} {client.name} {client.patronymic}
									</td>
									<td>{client.status}</td>
									<td>
										<select
											value={client.status}
											onChange={event =>
												handleStatusChange(index, event.target.value)
											}
										>
											<option value='В работе'>В работе</option>
											<option value='Отказ'>Отказ</option>
											<option value='Сделка закрыта'>Сделка закрыта</option>
										</select>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<form onSubmit={handleSubmit}>
						<label>
							Логин:
							<input type='text' value={login} onChange={handleLoginChange} />
						</label>
						<br />
						<label>
							Пароль:
							<input
								type='password'
								value={password}
								onChange={handlePasswordChange}
							/>
						</label>
						<br />
						<button type='submit'>Войти</button>
					</form>
				)}
			</div>
		</div>
	)
}

export default App
