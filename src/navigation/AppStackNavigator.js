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

const fade = (props) => {
  const {position, scene} = props;

  const index = scene.index;

  const translateX = 0;
  const translateY = 0;

  const opacity = position.interpolate({
    inputRange: [index - 0.7, index, index + 0.7],
    outputRange: [0.3, 1, 0.3],
  });

  return {
    opacity,
    transform: [{translateX}, {translateY}],
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
      // mode="modal"
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
            options={{
              transitionConfig: () => ({
                screenInterpolator: (props) => {
                  return fade(props);
                },
              }),
            }}
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
