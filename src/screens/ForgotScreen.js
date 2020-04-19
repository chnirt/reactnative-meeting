import React from 'react'
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableOpacity,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/dist/Feather'

import SafeArea from '../components/SafeArea'
import {PRIMARY, SECONDARY} from '../themes'
import {SIGNIN} from '../constants'
import InputTextField from '../components/InputTextField'
import {ScreenBack, FormEmail, FormForgot} from '../assets/icon'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: SECONDARY,
	},
	circle: {
		width: 500,
		height: 500,
		borderRadius: 500 / 2,
		backgroundColor: '#fff',
		position: 'absolute',
		left: -50,
		top: -160,
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
})

export default function Forgot() {
	const [email, setEmail] = React.useState('')

	const navigation = useNavigation()

	function navigateSignIn() {
		navigation?.navigate(SIGNIN)
	}

	function onSend(input) {
		navigateSignIn()
	}

	return (
		<SafeArea style={styles.container}>
			<View style={styles.circle} />
			<ScrollView>
				<TouchableOpacity style={styles.back} onPress={navigateSignIn}>
					<ScreenBack size={30} color="#000" />
					<Text>SIGN IN</Text>
				</TouchableOpacity>
				<View
					style={{
						marginTop: 64,
						marginHorizontal: 32,
						flexDirection: 'row',
						justifyContent: 'center',
					}}>
					<Text style={styles.greeting}>FORGOT PASSWORD?</Text>
				</View>
				<View style={{marginHorizontal: 32}}>
					<InputTextField
						title="Email"
						placeholderText="Enter your email"
						value={email}
						onChangeText={setEmail}
						prefix={<FormEmail />}
					/>
					<View
						style={{
							alignItems: 'flex-end',
							marginTop: 15,
						}}>
						<TouchableOpacity
							style={[styles.button, styles.continue]}
							onPress={() => onSend({email})}>
							<FormForgot size={30} color="#fff" />
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeArea>
	)
}
