import React, {useRef, useEffect} from 'react'
import {View, StyleSheet, Animated, TouchableHighlight} from 'react-native'

import Icon from 'react-native-vector-icons/dist/Feather'
import {PRIMARY, SHADOW} from '../../themes'
import {useNavigation} from '@react-navigation/native'

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

export default function AddButton({color, size, onPress}) {
	const buttonSize = useRef(new Animated.Value(1)).current
	const mode = useRef(new Animated.Value(0)).current

	const navigation = useNavigation()

	useEffect(() => {
		const unsubscribeTabPress = navigation.addListener('tabPress', (e) => {
			// Prevent default behavior
			e.preventDefault()

			// Do something manually
			// ...
			onPress()
			Animated.timing(buttonSize, {
				toValue: 1,
				useNativeDriver: true,
			}).start()
			Animated.timing(mode, {
				toValue: 0,
				useNativeDriver: false,
			}).start()
		})

		const unsubscribeTabLongPress = navigation.addListener(
			'tabLongPress',
			(e) => {
				// Do something
				onPressAnimated()
			},
		)

		return () => {
			unsubscribeTabPress()
			unsubscribeTabLongPress()
		}
	})

	const onPressAnimated = () => {
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
		<View
			style={{
				backgroundColor: 'transparents',
				position: 'absolute',
				alignItems: 'center',
			}}>
			<Animated.View style={[styles.button, scaleStyle]}>
				<Animated.View style={rotateStyle}>
					<Icon name="plus" color="#fff" size={size} />
				</Animated.View>
			</Animated.View>
		</View>
	)
}
