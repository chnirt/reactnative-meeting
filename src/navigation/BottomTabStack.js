import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/dist/Feather'

import HomeScreen from '../screens/HomeScreen'
import ChatScreen from '../screens/ChatScreen'
import NotificationScreen from '../screens/NotificationScreen'
import ProfileScreen from '../screens/ProfileScreen'

import AddButton from '../components/Button/AddButton'
import {HOME, CHAT, ADD, NOTIFICATION, PROFILE} from '../constants'
import {PRIMARY} from '../themes'
// import CustomBottomBar from '../components/CustomBottomBar'

const config = {
	animation: 'spring',
	config: {
		stiffness: 1000,
		damping: 500,
		mass: 3,
		overshootClamping: true,
		restDisplacementThreshold: 0.01,
		restSpeedThreshold: 0.01,
	},
}

const Tab = createBottomTabNavigator()

export default function BottomTabScreen() {
	return (
		<Tab.Navigator
			tabBarOptions={{
				showLabel: false,
				inactiveTintColor: '#cdccce',
				activeTintColor: PRIMARY,
			}}
			// tabBar={(props) => <CustomBottomBar {...props} />}
		>
			<Tab.Screen
				name={HOME}
				component={HomeScreen}
				options={{
					tabBarIcon: ({color, size}) => (
						<Icon name="home" color={color} size={size} />
					),
					transitionSpec: {
						open: config,
						close: config,
					},
				}}
			/>
			<Tab.Screen
				name={CHAT}
				component={ChatScreen}
				options={{
					tabBarIcon: ({color, size}) => (
						<Icon name="message-circle" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name={ADD}
				children={() => null}
				options={{
					tabBarIcon: ({color, size}) => (
						<AddButton color={color} size={size} />
					),
				}}
				listeners={{
					tabPress: (e) => {
						// Prevent default action
						e.preventDefault()
						console.log('xxx')
					},
				}}
			/>
			<Tab.Screen
				name={NOTIFICATION}
				component={NotificationScreen}
				options={{
					tabBarIcon: ({color, size}) => (
						<Icon name="bell" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name={PROFILE}
				component={ProfileScreen}
				options={{
					tabBarIcon: ({color, size}) => (
						<Icon name="user" color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	)
}
