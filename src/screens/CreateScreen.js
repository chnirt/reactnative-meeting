import React, {useRef} from 'react'
import {View, Animated, Button} from 'react-native'

export default function CreateScreen() {
	const buttonSize = useRef(new Animated.Value(1)).current

	const onPress = () => {
		// Will change fadeAnim value to 1 in 5 seconds
		Animated.sequence([
			Animated.timing(buttonSize, {
				toValue: 0.9,
				duration: 200,
				useNativeDriver: true,
			}),
			Animated.timing(buttonSize, {
				toValue: 1,
				useNativeDriver: true,
			}),
		]).start()
	}

	return (
		<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
			<Animated.View
				style={[
					{width: 200, height: 200, backgroundColor: 'red'},
					{
						transform: [{scale: buttonSize}],
					},
				]}>
				<Button title="on Press" onPress={onPress} />
			</Animated.View>
		</View>
	)
}
