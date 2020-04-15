import React, {useState} from 'react'
import {StyleSheet, Platform, KeyboardAvoidingView} from 'react-native'
import {GiftedChat} from 'react-native-gifted-chat'

import {SECONDARY} from '../themes'
import SafeArea from '../components/SafeArea'
import {useEffect} from 'react'
import {CTX} from '../context'
import {useContext} from 'react'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: SECONDARY,
	},
})

export default function ChatScreen() {
	const [messages, setMessages] = useState([])
	const {user} = useContext(CTX)

	useEffect(() => {
		// GiftedChat.append(previous.messages, message)
	})

	function onSend(message) {
		// setMessages(GiftedChat.append(previous.messages, message))

		console.log('Send', message)
	}

	const chat = <GiftedChat messages={messages} onSend={onSend} user={user} />

	if (Platform.OS === 'android') {
		return (
			<KeyboardAvoidingView
				style={{flex: 1}}
				behavior="padding"
				keyboardVerticalOffset={30}
				enabled>
				{chat}
			</KeyboardAvoidingView>
		)
	}
	return <SafeArea style={{flex: 1}}>{chat}</SafeArea>
}
