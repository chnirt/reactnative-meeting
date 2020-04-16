import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import MessageScreen from '../screens/MessageScreen'
import ChatScreen from '../screens/ChatScreen'

import {MESSAGE, CHAT} from '../constants'

const MessageStack = createStackNavigator()

export default function MessageStackScreen() {
	return (
		<MessageStack.Navigator initialRouteName={MESSAGE} headerMode="none">
			<MessageStack.Screen name={MESSAGE} component={MessageScreen} />
			<MessageStack.Screen name={CHAT} component={ChatScreen} />
		</MessageStack.Navigator>
	)
}
