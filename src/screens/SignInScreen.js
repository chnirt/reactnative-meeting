import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Button,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useMutation} from '@apollo/react-hooks';
import {useSafeArea} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/dist/Octicons';

import {CTX} from '../context';
import {SIGN_IN} from '../graphql/mutations';
import {PRIMARY, SECONDARY} from '../themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SECONDARY,
  },
  circle: {
    width: 580,
    height: 580,
    borderRadius: 580 / 2,
    backgroundColor: '#fff',
    position: 'absolute',
    left: -140,
    top: -20,
  },
  header: {
    fontWeight: '800',
    fontSize: 16,
    color: '#514e5a',
    marginTop: 16,
  },
  input: {
    marginTop: 16,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#bab7c3',
    borderRadius: 30,
    paddingHorizontal: 16,
    color: '#514e5a',
    fontWeight: '600',
  },
  continue: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function SignInScreen() {
  const [username, setUsername] = React.useState('admin');
  const [password, setPassword] = React.useState('123456789');
  const {_authenticate} = useContext(CTX);
  const navigation = useNavigation();
  const [signIn] = useMutation(SIGN_IN);

  const insets = useSafeArea();

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
    <View
      style={{
        ...styles.container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}>
      <View style={styles.circle} />
      <View style={{marginTop: 64, alignItems: 'center'}}>
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: PRIMARY,
            justifyContent: 'center',
            borderRadius: 15,
          }}>
          <Image
            source={require('../assets/logo2.png')}
            style={{
              width: 60,
              height: 50,
              alignSelf: 'center',
            }}
          />
        </View>
      </View>
      <View style={{marginHorizontal: 32}}>
        <Text style={styles.header}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.header}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={{alignItems: 'flex-end', marginTop: 36}}>
          <TouchableOpacity
            style={styles.continue}
            onPress={() => onSignIn({username, password})}>
            <Icon name="chevron-right" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <Button title="Sign up" onPress={navigateSignUp} />
      </View>
    </View>
  );
}
