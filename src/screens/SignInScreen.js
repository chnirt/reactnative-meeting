import React, {useContext} from 'react'
import {useNavigation} from '@react-navigation/native'
import {
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	ScrollView,
	Text,
} from 'react-native'
// import {useMutation} from '@apollo/react-hooks'

import {CTX} from '../context'
// import {SIGN_IN} from '../graphql/mutations'
import {PRIMARY, SECONDARY} from '../themes'
import SafeArea from '../components/SafeArea'
import InputTextField from '../components/InputTextField'
import Google from '../components/Icon/Google'
import Facebook from '../components/Icon/Facebook'
import {SIGNUP, FORGOT} from '../constants'
import {
	ScreenBack,
	FormUsername,
	FormPassword,
	FormSignIn,
} from '../assets/icon'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: SECONDARY,
	},
	circle: {
		width: 580,
		height: 580,
		borderRadius: 580 / 2,
		backgroundColor: '#fff',
		position: 'absolute',
		left: -140,
		top: 0,
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
	greeting: {
		color: PRIMARY,
		fontSize: 24,
		fontWeight: '800',
		textAlign: 'center',
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
	social: {
		backgroundColor: '#fff',
	},
	google: {
		top: 60,
	},
	facebook: {
		top: 50,
	},
})

export default function SignInScreen() {
	const [username, setUsername] = React.useState('admin')
	const [password, setPassword] = React.useState('0')
	const {_authenticate1} = useContext(CTX)
	const navigation = useNavigation()
	// const [signIn] = useMutation(SIGN_IN)

	async function onSignIn(input) {
		// console.log(input)
		// signIn({
		// 	variables: {
		// 		input,
		// 	},
		// })
		// 	.then(({data}) => {
		// 		// console.log(data?.signin?.token);
		// 		_authenticate(data?.signin?.token)
		// 	})
		// 	.catch((error) => console.log(console.log(error)))
		_authenticate1(input)
	}

	function navigateSignUp() {
		navigation?.navigate(SIGNUP)
	}

	function navigateForgot() {
		navigation?.navigate(FORGOT)
	}

	return (
		<SafeArea style={styles.container}>
			<View style={styles.circle} />
			<ScrollView>
				<TouchableOpacity style={styles.back} onPress={navigateSignUp}>
					<ScreenBack size={30} />
					<Text>SIGN UP</Text>
				</TouchableOpacity>
				<View style={{marginTop: 64, alignItems: 'center'}}>
					<View
						style={{
							width: 80,
							height: 80,
							backgroundColor: PRIMARY,
							justifyContent: 'center',
							borderRadius: 15,
						}}>
						<Image
							source={require('../assets/logo.png')}
							style={{
								width: 48,
								height: 40,
								alignSelf: 'center',
							}}
						/>
					</View>
				</View>
				<View style={{marginTop: 16, marginHorizontal: 32}}>
					<Text style={styles.greeting}>WELCOME BACK,</Text>
				</View>
				<View style={{marginHorizontal: 32}}>
					<InputTextField
						title="Username"
						placeholderText="Enter your username"
						value={username}
						onChangeText={setUsername}
						prefix={<FormUsername />}
					/>
					<InputTextField
						title="Password"
						placeholderText="Enter your password"
						value={password}
						onChangeText={setPassword}
						prefix={<FormPassword />}
						isSecure
					/>
					<View style={{marginTop: 10}}>
						<TouchableOpacity onPress={navigateForgot}>
							<Text style={{color: '#414959', fontSize: 13}}>
								<Text
									style={{
										fontSize: 14,
										fontWeight: '300',
										color: '#514e5a',
									}}>
									Forgot password
								</Text>
							</Text>
						</TouchableOpacity>
					</View>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'flex-end',
							marginTop: 10,
						}}>
						<TouchableOpacity
							style={[styles.button, styles.social, styles.facebook]}
							onPress={() => onSignIn({username, password})}>
							<Facebook width="25" height="50" />
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.button, styles.social, styles.google]}
							onPress={() => onSignIn({username, password})}>
							<Google width="40" height="40" />
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.button, styles.continue]}
							onPress={() => onSignIn({username, password})}>
							<FormSignIn size={30} color="#fff" />
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeArea>
	)
}
