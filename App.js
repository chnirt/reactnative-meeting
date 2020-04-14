/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Context from './src/context';
import Apollo from './src/graphql/apollo';
import AppNavigator from './src/navigation/AppStackNavigator';

export default function App() {
  return (
    <Context>
      <Apollo>
        <SafeAreaProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </Apollo>
    </Context>
  );
}
