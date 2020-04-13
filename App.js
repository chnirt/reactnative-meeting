/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  useWindowDimensions,
  useColorScheme,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Context, {CTX} from './src/context';
import Apollo from './src/graphql/apollo';
import {SIGN_IN, SIGN_UP} from './src/graphql/mutations';
import {useMutation} from '@apollo/react-hooks';

const RootStack = createStackNavigator();

function HomeScreen() {
  const {_logout} = useContext(CTX);
  const window = useWindowDimensions();
  const colorScheme = useColorScheme();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home</Text>
      <Text>{`Window Dimensions: height - ${window.height}, width - ${window.width}`}</Text>
      <Text>useColorScheme(): {colorScheme}</Text>
      <Button title="Log out" onPress={_logout} />
    </View>
  );
}

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

function SignInScreen() {
  const [username, setUsername] = React.useState('admin');
  const [password, setPassword] = React.useState('123456789');
  const {_authenticate} = useContext(CTX);
  const navigation = useNavigation();
  const [signIn] = useMutation(SIGN_IN);

  async function onSignIn(input) {
    signIn({
      variables: {
        input,
      },
    })
      .then(({data}) => {
        // console.log(data?.signin?.token);
        _authenticate(data?.signin?.token);
      })
      .catch((error) => console.log(console.log(error)));
  }

  function navigateSignUp() {
    navigation?.navigate('SignUp');
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={() => onSignIn({username, password})} />
      <Button title="Sign up" onPress={navigateSignUp} />
    </View>
  );
}

function SignUpScreen() {
  const [email, setEmail] = React.useState('chin@gmail.com');
  const [username, setUsername] = React.useState('chin');
  const [password, setPassword] = React.useState('0123asd');
  const [fullName, setFullName] = React.useState('Trinh Chin Chin');
  const [phoneNumber, setPhoneNumber] = React.useState('0704498756');
  const [signUp] = useMutation(SIGN_UP);

  const navigation = useNavigation();

  function navigateSignIn() {
    navigation?.navigate('SignIn');
  }

  function onSignUp(input) {
    signUp({
      variables: {
        input,
      },
    })
      .then(({data}) => {
        // console.log(data?.signup);
        if (data?.signup) {
          navigateSignIn();
        }
      })
      .catch((error) => console.log(console.log(error)));
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="FullName"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        placeholder="phoneNumber"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button
        title="Sign up"
        onPress={() =>
          onSignUp({email, username, password, fullName, phoneNumber})
        }
      />
      <Button title="Sign in" onPress={navigateSignIn} />
    </View>
  );
}

function SplashScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Splash</Text>
    </View>
  );
}

function RootStackScreen() {
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
    <RootStack.Navigator>
      {token ? (
        <>
          <RootStack.Screen name="Home" component={HomeScreen} />
          <RootStack.Screen name="Profile" component={ProfileScreen} />
          <RootStack.Screen name="Settings" component={SettingsScreen} />
        </>
      ) : (
        <>
          <RootStack.Screen name="SignIn" component={SignInScreen} />
          <RootStack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </RootStack.Navigator>
  );
}

export default function App() {
  return (
    <Context>
      <Apollo>
        <NavigationContainer>
          <RootStackScreen />
        </NavigationContainer>
      </Apollo>
    </Context>
  );
}
