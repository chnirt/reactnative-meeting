import React, {useState} from 'react'
import {StyleSheet, View, Text, Dimensions, Keyboard} from 'react-native'
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
	inputContainer: {
		flexDirection: 'row',
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: '#bab7c3',
		borderRadius: 30,
	},
	inputContainerWithLabel: {
		marginTop: 16,
		flexDirection: 'row',
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: '#bab7c3',
		borderRadius: 30,
	},
	input: {
		height: 50,
		paddingHorizontal: 48,
		color: '#514e5a',
		fontWeight: '600',
	},
	search: {
		backgroundColor: '#fff',
	},
	suffixIcon: {
		position: 'absolute',
		top: 15,
		right: 16,
	},
	prefixIcon: {
		position: 'absolute',
		top: 15,
		left: 16,
	},
})

export default function InputTextField({
	style,
	title,
	placeholderText,
	isSecure,
	value,
	onChangeText,
	white,
	prefix,
}) {
	const [hidden, setHidden] = useState(true)
	return (
		<View style={{...styles.group, ...style}}>
			{title && <Text style={styles.inputTitle}>{title}</Text>}
			<View
				style={[
					title ? styles.inputContainerWithLabel : styles.inputContainer,
					white && {backgroundColor: '#fff'},
				]}>
				<View style={styles.prefixIcon}>{prefix}</View>
				<TextInput
					placeholder={placeholderText}
					secureTextEntry={isSecure && hidden}
					style={[styles.input, !prefix && {paddingHorizontal: 16}]}
					value={value}
					onChangeText={onChangeText}
					width={SCREEN_WIDTH - 100}
					height={50}
					placeholderTextColor="#d9d9d9"
				/>
				{isSecure && (
					<Icon
						style={styles.suffixIcon}
						name={hidden ? 'eye' : 'eye-off'}
						size={20}
						onPress={() => setHidden(!hidden)}
					/>
				)}
			</View>
		</View>
	)
}
