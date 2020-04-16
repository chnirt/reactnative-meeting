import React, {useState} from 'react'
import {
	StyleSheet,
	Platform,
	KeyboardAvoidingView,
	Button,
	Text,
} from 'react-native'
import {GiftedChat} from 'react-native-gifted-chat'
import {useNavigation} from '@react-navigation/native'

import {SECONDARY} from '../themes'
import SafeArea from '../components/SafeArea'
import {CTX} from '../context'
import {useContext} from 'react'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: SECONDARY,
		paddingBottom: 0,
	},
})

export default function ChatScreen({route}) {
	const [messages, setMessages] = useState([
		{
			_id: '7d0c6db7-a99e-42b5-9431-86387b519a9e',
			createdAt: '2020-04-15T18:31:02.714Z',
			text: 'Zxczxc',
			user: {
				_id: Math.floor(Math.random() * 10000) + 1,
				name: 'chin',
				avatar: 'https://placeimg.com/140/140/any',
			},
			// image: 'https://facebook.github.io/react/img/logo_og.png',
		},
		{
			_id: 'a9328836-c91d-45ab-9ef4-af489d5c3472',
			createdAt: '2020-04-15T18:33:55.648Z',
			text: 'ttretre',
			user: {
				_id: Math.floor(Math.random() * 10000) + 1,
				name: 'hung',
				avatar: 'https://placeimg.com/140/140/any',
			},
			// video:
			// 	'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
		},
	])
	const {user} = useContext(CTX)
	const navigation = useNavigation()

	function onSend(message) {
		setMessages(GiftedChat.append(messages, message))
	}

	function goBack() {
		navigation?.goBack()
	}

	const chat = <GiftedChat messages={messages} onSend={onSend} user={user} />

	if (Platform.OS === 'android') {
		return (
			<KeyboardAvoidingView
				style={{flex: 1}}
				behavior="padding"
				// keyboardVerticalOffset={30}
				enabled>
				{chat}
				<Button title="Back" onPress={goBack} />
			</KeyboardAvoidingView>
		)
	}
	return (
		<SafeArea style={styles.container}>
			<Text>{route?.params?.name}</Text>

			<Button title="Back" onPress={goBack} />
			{chat}
		</SafeArea>
	)
}
