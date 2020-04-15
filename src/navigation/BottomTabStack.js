import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/dist/Feather'

import HomeScreen from '../screens/HomeScreen'
import ChatScreen from '../screens/ChatScreen'
import CreateScreen from '../screens/CreateScreen'
import NotificationScreen from '../screens/NotificationScreen'
import ProfileScreen from '../screens/ProfileScreen'

import AddButton from '../components/AddButton'

import {HOME, CHAT, ADD, NOTIFICATION, PROFILE} from '../constants'
import {PRIMARY} from '../themes'

const Tab = createBottomTabNavigator()

export default function BottomTabScreen(props) {
	return (
		<Tab.Navigator
			tabBarOptions={{
				showLabel: false,
				inactiveTintColor: '#cdccce',
				activeTintColor: PRIMARY,
			}}>
			<Tab.Screen
				name={HOME}
				options={{
					tabBarIcon: ({color, size}) => (
						<Icon name="home" color={color} size={size} />
					),
				}}
				component={HomeScreen}
			/>
			<Tab.Screen
				name={CHAT}
				options={{
					tabBarIcon: ({color, size}) => (
						<Icon name="message-circle" color={color} size={size} />
					),
				}}
				component={ChatScreen}
			/>
			<Tab.Screen
				name={ADD}
				options={{
					tabBarIcon: ({color, size}) => (
						<AddButton color={color} size={size} />
					),
				}}
				children={() => <CreateScreen {...props} />}
			/>
			<Tab.Screen
				name={NOTIFICATION}
				options={{
					tabBarIcon: ({color, size}) => (
						<Icon name="bell" color={color} size={size} />
					),
				}}
				component={NotificationScreen}
			/>
			<Tab.Screen
				name={PROFILE}
				options={{
					tabBarIcon: ({color, size}) => (
						<Icon name="user" color={color} size={size} />
					),
				}}
				component={ProfileScreen}
			/>
		</Tab.Navigator>
	)
}
