import React from 'react'
import Icon from 'react-native-vector-icons/dist/Feather'

/**
 *
 * Screen Icon
 * @param {size} param0
 * @param {color} param1
 */

export const ScreenBack = ({size = 20, color}) => (
	<Icon name="chevron-left" size={size} color={color} />
)

export const ScreenNext = ({size = 20, color}) => (
	<Icon name="chevron-right" size={size} color={color} />
)

/**
 *
 * Form Icon
 * @param {size} param0
 * @param {color} param1
 */

export const FormUsername = ({size = 20, color}) => (
	<Icon name="user" size={size} color={color} />
)

export const FormPassword = ({size = 20, color}) => (
	<Icon name="lock" size={size} color={color} />
)

export const FormEmail = ({size = 20, color}) => (
	<Icon name="mail" size={size} color={color} />
)

export const FormFullName = ({size = 20, color}) => (
	<Icon name="file-text" size={size} color={color} />
)

export const FormPhoneNumber = ({size = 20, color}) => (
	<Icon name="phone" size={size} color={color} />
)

export const FormSignIn = ({size = 20, color}) => (
	<Icon name="chevron-right" size={size} color={color} />
)

export const FormSignUp = ({size = 20, color}) => (
	<Icon name="user-plus" size={size} color={color} />
)

export const FormForgot = ({size = 20, color}) => (
	<Icon name="send" size={size} color={color} />
)
/**
 *
 * Video Icon
 * @param {size} param0
 * @param {color} param1
 */

export const VideoSkipBack = ({size = 20, color}) => (
	<Icon name="skip-back" size={size} color={color} />
)
export const VideoPrevious = ({size = 20, color}) => (
	<Icon name="chevrons-left" size={size} color={color} />
)
export const VideoPause = ({size = 20, color}) => (
	<Icon name="pause" size={size} color={color} />
)
export const VideoPlay = ({size = 20, color}) => (
	<Icon name="play" size={size} color={color} />
)
export const VideoNext = ({size = 20, color}) => (
	<Icon name="chevrons-right" size={size} color={color} />
)
export const VideoSkipForward = ({size = 20, color}) => (
	<Icon name="skip-forward" size={size} color={color} />
)
