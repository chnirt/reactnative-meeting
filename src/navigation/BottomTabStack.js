import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/dist/Feather'

import HomeScreen from '../screens/HomeScreen'
import MessageScreen from '../screens/MessageScreen'
import NotificationScreen from '../screens/NotificationScreen'
import ProfileScreen from '../screens/ProfileScreen'

import AddButton from '../components/Button/AddButton'
import {HOME, MESSAGE, ADD, NOTIFICATION, PROFILE, MODAL} from '../constants'
import {PRIMARY} from '../themes'
// import {Platform} from 'react-native'
import {useNavigation} from '@react-navigation/native'
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
	const navigation = useNavigation()
	return (
		<Tab.Navigator
			tabBarOptions={{
				showLabel: false,
				inactiveTintColor: '#cdccce',
				activeTintColor: PRIMARY,
				style: {
					borderTopWidth: 0,
					shadowOffset: {height: -3},
					shadowOpacity: 0.1,
					shadowColor: '#000',
				},
			}}
			// tabBar={(props) => <CustomBottomBar {...props} />}
		>
			<Tab.Screen
				name={HOME}
				component={HomeScreen}
				options={{
					// header: <Text>Hello</Text>,
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
				name={MESSAGE}
				component={MessageScreen}
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
					tabBarIcon: ({color, size}) => {
						return <AddButton color={color} size={size} />
					},
				}}
				listeners={{
					tabPress: (e) => {
						// Prevent default action
						e.preventDefault()
						navigation?.navigate(MODAL)
						// console.log('tabPress')
					},
					tabLongPress: () => {
						// console.log('tabLongPress')
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
