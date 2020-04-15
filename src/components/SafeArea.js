import React from 'react'
import {View} from 'react-native'
import {useSafeArea} from 'react-native-safe-area-context'

export default function SafeArea({style, children}) {
	const insets = useSafeArea()
	return (
		<View
			style={{
				paddingTop: insets.top,
				paddingBottom: insets.bottom,
				paddingLeft: insets.left,
				paddingRight: insets.right,
				...style,
			}}>
			{children}
		</View>
	)
}
