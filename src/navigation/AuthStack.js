import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {SIGNIN, SIGNUP, FORGOT} from '../constants'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import ForgotScreen from '../screens/ForgotScreen'

const AuthStack = createStackNavigator()

export default function AuthStackScreen() {
	return (
		<AuthStack.Navigator initialRouteName={SIGNIN} headerMode="none">
			<AuthStack.Screen name={SIGNIN} component={SignInScreen} />
			<AuthStack.Screen name={SIGNUP} component={SignUpScreen} />
			<AuthStack.Screen name={FORGOT} component={ForgotScreen} />
		</AuthStack.Navigator>
	)
}
