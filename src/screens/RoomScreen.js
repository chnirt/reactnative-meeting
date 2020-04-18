import React from 'react'
import {View, Text, Button} from 'react-native'
import {useNavigation} from '@react-navigation/native'

export default function RoomScreen({route}) {
	const navigation = useNavigation()
	return (
		<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
			<Text>Room</Text>
			<Text>{route?.params?._id}</Text>
			<Text>{route?.params?.name}</Text>
			<Button title="close" onPress={() => navigation?.goBack()} />
		</View>
	)
}
