import React from 'react'
import {View, Text, Button} from 'react-native'
import {useNavigation} from '@react-navigation/native'

export default function ModalScreen() {
	const navigation = useNavigation()
	return (
		<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
			<Text>Modal</Text>
			<Button title="close" onPress={() => navigation?.goBack()} />
		</View>
	)
}
