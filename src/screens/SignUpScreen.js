import React from 'react';
import {View, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import {useMutation} from '@apollo/react-hooks';

import {SIGN_UP} from '../graphql/mutations';

export default function SignUpScreen() {
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
