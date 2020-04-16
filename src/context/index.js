import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-community/async-storage'

const CTX = React.createContext()

export {CTX}

export default function Context({children}) {
	const [users, setUsers] = useState([
		{
			_id: Math.floor(Math.random() * 10000) + 1,
			avatar: 'https://placeimg.com/140/140/any',
			name: 'admin',
			username: 'admin',
			password: '0',
		},
	])
	const [token, setToken] = useState(null)
	const [skip, setSkip] = useState(false)
	const [user, setUser] = useState({
		_id: Math.floor(Math.random() * 10000) + 1,
		avatar: 'https://placeimg.com/140/140/any',
		name: 'admin',
	})

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
		let {username1, password1, ...rest} = users.filter(
			(item) => item.username === username && item.password === password,
		)

		setUser(rest)

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
