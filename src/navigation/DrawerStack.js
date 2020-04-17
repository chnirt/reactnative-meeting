import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'

import DashboardStackScreen from './DashboardStack'
import {DASHBOARD} from '../constants'

const DrawerStack = createDrawerNavigator()

export default function DrawerStackScreen() {
	return (
		<DrawerStack.Navigator>
			<DrawerStack.Screen name={DASHBOARD} component={DashboardStackScreen} />
		</DrawerStack.Navigator>
	)
}
