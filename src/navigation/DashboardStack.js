import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {BOTTOMTAB, MODAL} from '../constants'

import BottomTabScreen from './BottomTabStack'
import ModalScreen from '../screens/ModalScreen'

const DashboardStack = createStackNavigator()

export default function DashboardStackScreen() {
	return (
		<DashboardStack.Navigator
			initialRouteName={BOTTOMTAB}
			headerMode="none"
			mode="modal">
			<DashboardStack.Screen name={BOTTOMTAB} component={BottomTabScreen} />
			<DashboardStack.Screen name={MODAL} component={ModalScreen} />
		</DashboardStack.Navigator>
	)
}
