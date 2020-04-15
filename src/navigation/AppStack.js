import React, {useState, useContext, useEffect, Fragment} from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {CTX} from '../context'

import SplashScreen from '../screens/SplashScreen'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import ForgotScreen from '../screens/ForgotScreen'
import BottomTabScreen from './BottomTabStack'

import {SPLASH, BOTTOMTAB, SIGNIN, SIGNUP, FORGOT} from '../constants'

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
				<Fragment>
					<AppStack.Screen name={BOTTOMTAB} component={BottomTabScreen} />
				</Fragment>
			) : (
				<Fragment>
					<AppStack.Screen name={SIGNIN} component={SignInScreen} />
					<AppStack.Screen name={SIGNUP} component={SignUpScreen} />
					<AppStack.Screen name={FORGOT} component={ForgotScreen} />
				</Fragment>
			)}
		</AppStack.Navigator>
	)
}
