import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {DASHBOARD, ROOM, CHAT} from '../constants'

import DashboardStackScreen from './DashboardStack'
import RoomScreen from '../screens/RoomScreen'
import ChatScreen from '../screens/ChatScreen'

const MainStack = createStackNavigator()

export default function MainStackScreen() {
	return (
		<MainStack.Navigator initialRouteName={DASHBOARD} headerMode="none">
			<MainStack.Screen name={DASHBOARD} component={DashboardStackScreen} />
			<MainStack.Screen name={ROOM} component={RoomScreen} />
			<MainStack.Screen name={CHAT} component={ChatScreen} />
		</MainStack.Navigator>
	)
}
