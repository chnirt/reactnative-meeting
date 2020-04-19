import React from 'react'
import Slider from '@react-native-community/slider'
import {View, Text, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
	timeWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 5,
	},
	timeLeft: {
		flex: 1,
		fontSize: 16,
		color: '#FFFFFF',
		paddingLeft: 10,
	},
	timeRight: {
		flex: 1,
		fontSize: 16,
		color: '#FFFFFF',
		textAlign: 'right',
		paddingRight: 10,
	},
})

export default function ProgressBar({
	currentTime,
	duration,
	onSlideCapture,
	onSlideStart,
	onSlideComplete,
}) {
	const position = getMinutesFromSeconds(currentTime)
	const fullDuration = getMinutesFromSeconds(duration)

	return (
		<View style={styles.wrapper}>
			<Slider
				// style={{width: 200, height: 40}}
				thumbTouchSize={{width: 20, height: 20}}
				value={currentTime}
				minimumValue={0}
				maximumValue={duration}
				step={1}
				onValueChange={handleOnSlide}
				onSlidingStart={onSlideStart}
				onSlidingComplete={onSlideComplete}
				minimumTrackTintColor={'#F44336'}
				maximumTrackTintColor={'#fff'}
				thumbTintColor={'#F44ddf'}
				// trackImage={<Text>Hello</Text>}
			/>
			<View style={styles.timeWrapper}>
				<Text style={(styles.timeLeft, {color: 'red'})}>{position}</Text>
				<Text style={(styles.timeRight, {color: 'blue'})}>{fullDuration}</Text>
			</View>
		</View>
	)

	function getMinutesFromSeconds(time) {
		const minutes = time >= 60 ? Math.floor(time / 60) : 0
		const seconds = Math.floor(time - minutes * 60)

		return `${minutes >= 10 ? minutes : '0' + minutes}:${
			seconds >= 10 ? seconds : '0' + seconds
		}`
	}

	function handleOnSlide(time) {
		onSlideCapture({seekTime: time})
	}
}
