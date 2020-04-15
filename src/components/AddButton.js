import React, {useRef} from 'react'
import {View, StyleSheet, Animated, TouchableHighlight} from 'react-native'

import Icon from 'react-native-vector-icons/dist/Feather'
import {PRIMARY, SHADOW} from '../themes'

const styles = StyleSheet.create({
	button: {
		backgroundColor: PRIMARY,
		width: 72,
		height: 72,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 72 / 2,
		top: -20,
		shadowColor: SHADOW,
		shadowOffset: {height: 10},
		shadowOpacity: 0.3,
	},
})

export default function AddButton({color, size}) {
	const buttonSize = useRef(new Animated.Value(1)).current
	const mode = useRef(new Animated.Value(0)).current

	const onPress = () => {
		Animated.sequence([
			Animated.timing(buttonSize, {
				toValue: 0.9,
				useNativeDriver: true,
			}),
			Animated.timing(buttonSize, {
				toValue: 1,
				useNativeDriver: true,
			}),
		]).start()
		Animated.timing(mode, {
			toValue: mode._value === 0 ? 1 : 0,
			useNativeDriver: false,
		}).start()
	}

	const scaleStyle = {
		transform: [{scale: buttonSize}],
	}

	const rotateStyle = {
		transform: [
			{
				rotate: mode.interpolate({
					inputRange: [0, 1],
					outputRange: ['0deg', '45deg'],
				}),
			},
		],
	}

	return (
		<View style={{position: 'absolute', alignItems: 'center'}}>
			<Animated.View style={[styles.button, scaleStyle]}>
				<TouchableHighlight onPress={onPress} underlayColor={PRIMARY}>
					<Animated.View style={rotateStyle}>
						<Icon name="plus" color="#fff" size={size} />
					</Animated.View>
				</TouchableHighlight>
			</Animated.View>
		</View>
	)
}
