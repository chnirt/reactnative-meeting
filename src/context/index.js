import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-community/async-storage'

const CTX = React.createContext()

export {CTX}

export default function Context({children}) {
	const [users, setUsers] = useState([
		{
			_id: Math.floor(Math.random() * 10000) + 1,
			username: 'admin',
			password: '0',
		},
	])
	const [token, setToken] = useState(null)
	const [skip, setSkip] = useState(false)
	const [user, setUser] = useState({})

	useEffect(() => {
		_bootstrapAsync()
	})

	const _bootstrapAsync = async () => {
		const userToken = await AsyncStorage.getItem('userToken')
		const userSkip = await AsyncStorage.getItem('userSkip')
		setToken(userToken)
		setSkip(JSON.parse(!!userSkip))
	}

	const _register = ({username, password}) => {
		setUsers([...users, {username, password}])
		return true
	}

	const _authenticate = async (token) => {
		await AsyncStorage.setItem('userToken', token)
		setToken(token)
	}

	const _authenticate1 = async ({username, password}) => {
		let user1 = users.filter(
			(item) => item.username === username && item.password === password,
		)

		setUser(...user1)

		let token1 = username + password

		await AsyncStorage.setItem('userToken', token1)

		setToken(token1)
	}

	const _logout = async () => {
		await AsyncStorage.removeItem('userToken')
		// await AsyncStorage.removeItem('userSkip');
		// await AsyncStorage.clear();
		setToken(null)
	}

	const _seen = async () => {
		await AsyncStorage.setItem('userSkip', JSON.stringify(true))
		setSkip(true)
	}

	return (
		<CTX.Provider
			value={{
				users,
				user,
				token,
				skip,
				_register,
				_authenticate,
				_authenticate1,
				_logout,
				_seen,
			}}>
			{children}
		</CTX.Provider>
	)
}
