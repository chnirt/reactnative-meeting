import React, {useState, useContext, useEffect} from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {CTX} from '../context'

import SplashScreen from '../screens/SplashScreen'
import BottomTabScreen from './BottomTabStack'
import AuthStackScreen from './AuthStack'

import {SPLASH, BOTTOMTAB, AUTH} from '../constants'

const forFade = ({current, closing}) => ({
	cardStyle: {
		opacity: current.progress,
	},
})

const AppStack = createStackNavigator()

export default function AppStackScreen() {
	const [loading, setLoading] = useState(true)
	const {token} = useContext(CTX)

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false)
		}, 700)
		return () => {
			clearTimeout(timer)
		}
	})

	if (loading) {
		return <SplashScreen />
	}

	return (
		<AppStack.Navigator
			initialRouteName={SPLASH}
			screenOptions={({route, navigation}) => ({
				cardStyleInterpolator: forFade,
			})}
			headerMode="none">
			{token ? (
				<AppStack.Screen name={BOTTOMTAB} component={BottomTabScreen} />
			) : (
				<AppStack.Screen name={AUTH} component={AuthStackScreen} />
			)}
		</AppStack.Navigator>
	)
}
