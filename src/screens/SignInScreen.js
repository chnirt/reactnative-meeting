import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Button} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useMutation} from '@apollo/react-hooks';

import {CTX} from '../context';
import {SIGN_IN} from '../graphql/mutations';

export default function SignInScreen() {
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
