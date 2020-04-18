import React, {useState, useEffect} from 'react'
import {
	StyleSheet,
	View,
	Text,
	Button,
	Dimensions,
	StatusBar,
	ScrollView,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import Video from 'react-native-video'
import Orientation from 'react-native-orientation-locker'

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
	text: {
		marginTop: 30,
		marginHorizontal: 20,
		fontSize: 15,
		textAlign: 'justify',
	},
})

export default function RoomScreen({route}) {
	const [fullscreen, setFullscreen] = useState(false)
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
		console.log(orientation)
		orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
			? setFullscreen(true, StatusBar.setHidden(true))
			: setFullscreen(false, StatusBar.setHidden(false))
	}

	function handleFullscreen() {
		fullscreen
			? Orientation.unlockAllOrientations()
			: Orientation.lockToLandscapeLeft()
	}

	return (
		<View style={styles.container}>
			<Video
				source={{
					uri:
						'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
				}}
				style={styles.video}
				controls={true}
				resizeMode={'cover'}
				fullscreen={fullscreen}
			/>
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
