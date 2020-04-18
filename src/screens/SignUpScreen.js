import React from 'react'
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableOpacity,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
// import {useMutation} from '@apollo/react-hooks'
import Icon from 'react-native-vector-icons/dist/Feather'

// import {SIGN_UP} from '../graphql/mutations'
import SafeArea from '../components/SafeArea'
import {PRIMARY, SECONDARY} from '../themes'
import InputTextField from '../components/InputTextField'
import {SIGNIN} from '../constants'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: SECONDARY,
	},
	circle: {
		width: 710,
		height: 710,
		borderRadius: 710 / 2,
		backgroundColor: '#fff',
		position: 'absolute',
		left: -140,
		top: -20,
	},
	back: {
		position: 'absolute',
		top: 32 / 2,
		left: 32,
		width: 80,
		height: 50,
		borderRadius: 50 / 2,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		width: 70,
		height: 70,
		borderRadius: 70,
		justifyContent: 'center',
		alignItems: 'center',
		shadowRadius: 5,
		shadowOffset: {height: 5},
		shadowOpacity: 0.3,
	},
	continue: {
		backgroundColor: PRIMARY,
	},
})

export default function SignUpScreen() {
	const [email, setEmail] = React.useState('')
	const [username, setUsername] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [fullName, setFullName] = React.useState('')
	const [phoneNumber, setPhoneNumber] = React.useState('')
	// const [signUp] = useMutation(SIGN_UP)

	const navigation = useNavigation()

	function navigateSignIn() {
		navigation?.navigate(SIGNIN)
	}

	function onSignUp(input) {
		// signUp({
		// 	variables: {
		// 		input,
		// 	},
		// })
		// 	.then(({data}) => {
		// 		// console.log(data?.signup);
		// 		if (data?.signup) {
		// 			navigateSignIn()
		// 		}
		// 	})
		// 	.catch((error) => console.log(error))
		navigateSignIn()
	}

	return (
		<SafeArea style={styles.container}>
			<View style={styles.circle} />
			<ScrollView>
				<TouchableOpacity style={styles.back} onPress={navigateSignIn}>
					<Icon name="chevron-left" size={30} color="#000" />
					<Text>SIGN IN</Text>
				</TouchableOpacity>

				<View style={{marginTop: 64, marginHorizontal: 32}}>
					<InputTextField
						title="Email"
						placeholderText="Enter your email"
						value={email}
						onChangeText={setEmail}
						prefix={<Icon name="mail" size={20} />}
					/>
					<InputTextField
						title="Username"
						placeholderText="Enter your username"
						value={username}
						onChangeText={setUsername}
						prefix={<Icon name="user" size={20} />}
					/>
					<InputTextField
						title="Password"
						placeholderText="Enter your password"
						value={password}
						onChangeText={setPassword}
						prefix={<Icon name="lock" size={20} />}
						isSecure
					/>
					<InputTextField
						title="FullName"
						placeholderText="Enter your fullName"
						value={fullName}
						onChangeText={setFullName}
						prefix={<Icon name="file-text" size={20} />}
					/>
					<InputTextField
						title="phoneNumber"
						placeholderText="Enter your phoneNumber"
						value={phoneNumber}
						onChangeText={setPhoneNumber}
						prefix={<Icon name="phone" size={20} />}
					/>
					<View
						style={{
							alignItems: 'flex-end',
							marginTop: 15,
						}}>
						<TouchableOpacity
							style={[styles.button, styles.continue]}
							onPress={() =>
								onSignUp({email, username, password, fullName, phoneNumber})
							}>
							<Icon name="user-plus" size={30} color="#fff" />
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeArea>
	)
}
