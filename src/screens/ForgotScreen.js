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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: SECONDARY,
	},
	circle: {
		width: 510,
		height: 510,
		borderRadius: 510 / 2,
		backgroundColor: '#fff',
		position: 'absolute',
		left: -50,
		top: -200,
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
					<View
						style={{
							alignItems: 'flex-end',
							marginTop: 15,
						}}>
						<TouchableOpacity
							style={[styles.button, styles.continue]}
							onPress={() => onSend({email})}>
							<Icon name="send" size={30} color="#fff" />
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeArea>
	)
}