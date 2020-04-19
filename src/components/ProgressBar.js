import React from 'react'
import Slider from '@react-native-community/slider'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/dist/Feather'

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
	timeWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
	},
	timeLeft: {
		flex: 1,
		fontSize: 16,
		color: '#FFFFFF',
	},
	timeRight: {
		flex: 1,
		fontSize: 16,
		color: '#FFFFFF',
		textAlign: 'right',
	},
	fullscreenBottom: {
		paddingLeft: 10,
	},
})

export default function ProgressBar({
	currentTime,
	duration,
	onSlideCapture,
	onSlideStart,
	onSlideComplete,
	fullscreen,
	onFullscreen,
}) {
	const position = getMinutesFromSeconds(currentTime)
	const fullDuration = getMinutesFromSeconds(duration)

	return (
		<View style={styles.wrapper}>
			<View style={styles.timeWrapper}>
				<Text style={styles.timeLeft}>{position}</Text>
				<Slider
					style={{width: '60%'}}
					value={currentTime}
					minimumValue={0}
					maximumValue={duration}
					step={1}
					onValueChange={handleOnSlide}
					onSlidingStart={onSlideStart}
					onSlidingComplete={onSlideComplete}
					minimumTrackTintColor={'#F44336'}
					maximumTrackTintColor={'#fff'}
					thumbTintColor={'#F44336'}
				/>
				<Text style={styles.timeRight}>{fullDuration}</Text>
				<TouchableOpacity
					onPress={onFullscreen}
					// hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
					style={styles.fullscreenBottom}>
					{fullscreen ? (
						<Icon name="minimize" size={20} color="#fff" />
					) : (
						<Icon name="maximize" size={20} color="#fff" />
					)}
				</TouchableOpacity>
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
