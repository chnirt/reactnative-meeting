/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Context from './src/context';
import Apollo from './src/graphql/apollo';
import AppNavigator from './src/navigation/AppStackNavigator';

export default function App() {
  return (
    <Context>
      <Apollo>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </Apollo>
    </Context>
  );
}
