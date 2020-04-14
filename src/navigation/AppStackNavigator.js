import React, {useState, useContext, useEffect} from 'react';
import {
  createStackNavigator,
  TransitionSpecs,
  TransitionPresets,
} from '@react-navigation/stack';
import {View, Text, Animated} from 'react-native';
import {CTX} from '../context';

import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

import {SPLASH, SIGNIN, SIGNUP} from '../constants';

const forFade = ({current, next}) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0,
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: {opacity},
    rightButtonStyle: {opacity},
    titleStyle: {opacity},
    backgroundStyle: {opacity},
  };
};

const AppStack = createStackNavigator();

function ProfileScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Profile</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Setting</Text>
    </View>
  );
}

export default function AppStackScreen() {
  const [loading, setLoading] = useState(true);
  const {token} = useContext(CTX);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  });

  if (loading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }

  return (
    <AppStack.Navigator
      initialRouteName={SPLASH}
      // screenOptions={({route, navigation}) => ({
      //   gestureEnabled: true,
      //   cardOverlayEnabled: true,
      //   headerStatusBarHeight:
      //     navigation.dangerouslyGetState().routes.indexOf(route) > 0
      //       ? 0
      //       : undefined,
      //   ...TransitionPresets.ModalPresentationIOS,
      // })}
      mode="modal"
      headerMode="none">
      {token ? (
        <>
          <AppStack.Screen name="Home" component={HomeScreen} />
          <AppStack.Screen name="Profile" component={ProfileScreen} />
          <AppStack.Screen name="Settings" component={SettingsScreen} />
        </>
      ) : (
        <>
          <AppStack.Screen
            name={SIGNIN}
            component={SignInScreen}
            // options={{
            //   transitionSpec: {
            //     open: TransitionSpecs.TransitionIOSSpec,
            //     close: TransitionSpecs.TransitionIOSSpec,
            //   },
            // }}
          />
          <AppStack.Screen
            name={SIGNUP}
            component={SignUpScreen}
            // options={{
            //   transitionSpec: {
            //     open: TransitionSpecs.TransitionIOSSpec,
            //     close: TransitionSpecs.TransitionIOSSpec,
            //   },
            // }}
            // options={{
            //   title: 'Profile',
            //   ...TransitionPresets.ModalSlideFromBottomIOS,
            // }}
          />
        </>
      )}
    </AppStack.Navigator>
  );
}
