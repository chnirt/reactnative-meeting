import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {DASHBOARD, ROOM, CHAT} from '../constants'

import DashboardStackScreen from './DashboardStack'
import RoomScreen from '../screens/RoomScreen'
import ChatScreen from '../screens/ChatScreen'

const DashboardStack = createStackNavigator()

export default function MainStackScreen() {
	return (
		<DashboardStack.Navigator initialRouteName={DASHBOARD} headerMode="none">
			<DashboardStack.Screen
				name={DASHBOARD}
				component={DashboardStackScreen}
			/>
			{/* <DashboardStack.Screen name={BOTTOMTAB} component={BottomTabScreen} /> */}
			<DashboardStack.Screen name={ROOM} component={RoomScreen} />
			<DashboardStack.Screen name={CHAT} component={ChatScreen} />
		</DashboardStack.Navigator>
	)
}
