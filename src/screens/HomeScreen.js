import React, {useContext} from 'react'
import {
	View,
	Text,
	Button,
	useWindowDimensions,
	useColorScheme,
} from 'react-native'

import {CTX} from '../context'

export default function HomeScreen() {
	const {_logout} = useContext(CTX)
	const window = useWindowDimensions()
	const colorScheme = useColorScheme()

	return (
		<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
			<Text>Home</Text>
			<Text>{`Window Dimensions: height - ${window.height}, width - ${window.width}`}</Text>
			<Text>useColorScheme(): {colorScheme}</Text>
			<Button title="Log out" onPress={_logout} />
		</View>
	)
}
