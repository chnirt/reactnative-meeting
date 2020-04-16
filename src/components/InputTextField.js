import React, {useState} from 'react'
import {StyleSheet, View, Text, Switch, Dimensions} from 'react-native'
import {TextInput} from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/dist/Feather'

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get(
	'window',
)

const styles = StyleSheet.create({
	group: {
		marginTop: 16,
	},
	inputTitle: {
		fontWeight: '800',
		fontSize: 16,
		color: '#514e5a',
	},
	passwordContainer: {
		marginTop: 16,
		flexDirection: 'row',
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: '#bab7c3',
		borderRadius: 30,
	},
	input: {
		height: 50,
		paddingHorizontal: 16,
		color: '#514e5a',
		fontWeight: '600',
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		position: 'absolute',
		top: 15,
		right: 16,
	},
})

export default function InputTextField({
	style,
	title,
	placeholderText,
	isSecure,
	value,
	onChangeText,
}) {
	const [hidden, setHidden] = useState(true)
	return (
		<View style={{...styles.group, ...style}}>
			<Text style={styles.inputTitle}>{title}</Text>
			<View style={styles.passwordContainer}>
				<TextInput
					placeholder={placeholderText}
					secureTextEntry={isSecure && hidden}
					style={styles.input}
					value={value}
					onChangeText={onChangeText}
					width={SCREEN_WIDTH - 100}
					height={50}
				/>
				{isSecure && (
					<Icon
						style={styles.icon}
						name={hidden ? 'eye' : 'eye-off'}
						size={20}
						onPress={() => setHidden(!hidden)}
					/>
				)}
			</View>
		</View>
	)
}
