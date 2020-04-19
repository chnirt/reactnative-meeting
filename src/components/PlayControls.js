import React from 'react'
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/dist/Feather'
import {
	VideoSkipBack,
	VideoPrevious,
	VideoPause,
	VideoPlay,
	VideoNext,
	VideoSkipForward,
} from '../assets/icon'

const styles = StyleSheet.create({
	wrapper: {
		paddingHorizontal: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		flex: 3,
	},
	touchable: {
		padding: 5,
	},
	touchableDisabled: {
		opacity: 0.3,
	},
})

export default function PlayerControls({
	playing,
	showPreviousAndNext,
	showSkip,
	previousDisabled,
	nextDisabled,
	onPlay,
	onPause,
	skipForwards,
	skipBackwards,
	onNext,
	onPrevious,
}) {
	return (
		<View style={styles.wrapper}>
			{showPreviousAndNext && (
				<TouchableOpacity
					style={[
						styles.touchable,
						previousDisabled && styles.touchableDisabled,
					]}
					onPress={onPrevious}
					disabled={previousDisabled}>
					<VideoPrevious color="#fff" />
				</TouchableOpacity>
			)}

			{showSkip && (
				<TouchableOpacity style={styles.touchable} onPress={skipBackwards}>
					<VideoSkipBack color="#fff" />
				</TouchableOpacity>
			)}

			<TouchableOpacity
				style={styles.touchable}
				onPress={playing ? onPause : onPlay}>
				{playing ? <VideoPause color="#fff" /> : <VideoPlay color="#fff" />}
			</TouchableOpacity>

			{showSkip && (
				<TouchableOpacity style={styles.touchable} onPress={skipForwards}>
					<VideoSkipForward color="#fff" />
				</TouchableOpacity>
			)}

			{showPreviousAndNext && (
				<TouchableOpacity
					style={[styles.touchable, nextDisabled && styles.touchableDisabled]}
					onPress={onNext}
					disabled={nextDisabled}>
					<VideoNext color="#fff" />
				</TouchableOpacity>
			)}
		</View>
	)
}
