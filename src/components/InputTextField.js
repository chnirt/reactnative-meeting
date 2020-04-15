import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {TextInput} from 'react-native-gesture-handler'

const styles = StyleSheet.create({
	group: {
		marginTop: 16,
	},
	inputTitle: {
		fontWeight: '800',
		fontSize: 16,
		color: '#514e5a',
	},
	input: {
		marginTop: 16,
		height: 50,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: '#bab7c3',
		borderRadius: 30,
		paddingHorizontal: 16,
		color: '#514e5a',
		fontWeight: '600',
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
	return (
		<View style={{...styles.group, ...style}}>
			<Text style={styles.inputTitle}>{title}</Text>
			<TextInput
				placeholder={placeholderText}
				secureTextEntry={isSecure}
				style={styles.input}
				value={value}
				onChangeText={onChangeText}
			/>
		</View>
	)
}
