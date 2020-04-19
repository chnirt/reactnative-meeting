import React, {useState, useEffect} from 'react'
import {
	StyleSheet,
	View,
	Text,
	Button,
	Dimensions,
	StatusBar,
	ScrollView,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import Video from 'react-native-video'
import Orientation from 'react-native-orientation-locker'
import Icon from 'react-native-vector-icons/dist/Feather'

import PlayerControls from '../components/PlayControls'
import ProgressBar from '../components/ProgressBar'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ebebeb',
		// justifyContent: 'center',
		// alignItems: 'center',
	},
	video: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').width * (9 / 16),
		backgroundColor: 'black',
	},
	fullscreenVideo: {
		height: Dimensions.get('window').width,
		width: Dimensions.get('window').height,
		backgroundColor: 'black',
	},
	fullscreenButton: {
		flex: 1,
		flexDirection: 'row',
		alignSelf: 'flex-end',
		alignItems: 'center',
		paddingTop: 32,
		paddingRight: 32,
	},
	controlOverlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: '#000000c4',
		justifyContent: 'space-between',
	},
	text: {
		marginTop: 30,
		marginHorizontal: 20,
		fontSize: 15,
		textAlign: 'justify',
	},
})

export default function RoomScreen({route}) {
	const videoRef = React.createRef()
	const [state, setState] = useState({
		fullscreen: false,
		play: true,
		currentTime: 0,
		duration: 0,
		showControls: true,
	})
	const navigation = useNavigation()

	useEffect(() => {
		// This would be inside componentDidMount()
		Orientation.addOrientationListener(handleOrientation)

		return () => {
			// This would be inside componentWillUnmount()
			Orientation.removeOrientationListener(handleOrientation)
		}
	}, [])

	function handleOrientation(orientation) {
		orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
			? setState((s) => ({...s, fullscreen: true}), StatusBar.setHidden(true))
			: setState((s) => ({...s, fullscreen: false}), StatusBar.setHidden(false))
	}

	function handleFullscreen() {
		state.fullscreen
			? Orientation.unlockAllOrientations()
			: Orientation.lockToLandscapeLeft()
	}

	function handlePlayPause() {
		// If playing, pause and show controls immediately.
		if (state.play) {
			setState((s) => ({...s, play: false, showControls: true}))
			return
		}

		setState({...state, play: true})
		setTimeout(() => setState((s) => ({...s, showControls: false})), 2000)
	}

	function skipBackward() {
		videoRef.current.seek(state.currentTime - 15)
		setState((s) => ({...s, currentTime: state.currentTime - 15}))
	}

	function skipForward() {
		videoRef.current.seek(state.currentTime + 15)
		setState((s) => ({...s, currentTime: state.currentTime + 15}))
	}

	function onSeek(data) {
		videoRef.current.seek(data.seekTime)
		setState((s) => ({...s, currentTime: data.seekTime}))
	}

	function onLoadEnd(data) {
		setState((s) => ({
			...s,
			duration: data.duration,
			currentTime: data.currentTime,
		}))
	}

	function onProgress(data) {
		setState((s) => ({
			...s,
			currentTime: data.currentTime,
		}))
	}

	function onEnd() {
		setState((s) => ({...s, play: false}))
		videoRef.current.seek(0)
	}

	function showControls() {
		state.showControls
			? setState((s) => ({...s, showControls: false}))
			: setState((s) => ({...s, showControls: true}))
	}

	return (
		<View style={styles.container}>
			<TouchableWithoutFeedback onPress={showControls}>
				<View>
					<Video
						ref={videoRef}
						source={{
							uri:
								'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
						}}
						style={state.fullscreen ? styles.fullscreenVideo : styles.video}
						controls={false}
						resizeMode={'contain'}
						onLoad={onLoadEnd}
						onProgress={onProgress}
						onEnd={onEnd}
						paused={!state.play}
					/>
					{state.showControls && (
						<View style={styles.controlOverlay}>
							<TouchableOpacity
								onPress={handleFullscreen}
								hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
								style={styles.fullscreenButton}>
								{state.fullscreen ? (
									<Icon name="minimize" size={20} color="#fff" />
								) : (
									<Icon name="maximize" size={20} color="#fff" />
								)}
							</TouchableOpacity>
							<PlayerControls
								onPlay={handlePlayPause}
								onPause={handlePlayPause}
								playing={state.play}
								showPreviousAndNext={false}
								showSkip={true}
								skipBackwards={skipBackward}
								skipForwards={skipForward}
							/>
							<ProgressBar
								currentTime={state.currentTime}
								duration={state.duration > 0 ? state.duration : 0}
								onSlideStart={handlePlayPause}
								onSlideComplete={handlePlayPause}
								onSlideCapture={onSeek}
							/>
						</View>
					)}
				</View>
			</TouchableWithoutFeedback>
			<ScrollView>
				<Text style={styles.text}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus enim
					suscipit ipsa impedit laboriosam saepe, sapiente excepturi molestiae
					laudantium, non tempora cumque, quam assumenda deserunt? Similique
					eaque voluptas itaque corporis. Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Sequi unde iusto vel facere quibusdam nisi placeat,
					debitis veritatis autem deserunt at voluptas nam ut mollitia qui fugit
					minus minima quod.
				</Text>
			</ScrollView>
			<Text>Room</Text>
			<Text>{route?.params?._id}</Text>
			<Text>{route?.params?.name}</Text>
			<Button title="close" onPress={() => navigation?.goBack()} />
		</View>
	)
}
