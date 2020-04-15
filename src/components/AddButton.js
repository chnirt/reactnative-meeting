import React, {useState} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/dist/Feather';
import {PRIMARY} from '../themes';

const styles = StyleSheet.create({
  button: {
    backgroundColor: PRIMARY,
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 72 / 2,
    top: -20,
    shadowColor: '#7f58ff',
    shadowOffset: {height: 10},
    shadowOpacity: 0.3,
    borderWidth: 3,
    borderColor: '#fff',
  },
});

export default function AddButton({color, size}) {
  // const [buttonSize, setButtonSize] = useState();
  // const [mode, setMode] = useState();

  let buttonSize = new Animated.Value(1);
  let mode = new Animated.Value(0);

  function onPress() {
    console.log('hallo');
    Animated.sequence([
      Animated.timing(buttonSize, {
        toValue: 0.95,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(buttonSize, {
        toValue: 1,
        useNativeDriver: true,
      }),
      // Animated.timing(mode, {
      //   toValue: mode._value === 0 ? 1 : 0,
      //   useNativeDriver: true,
      // }),
    ]).start();
  }

  const sizeStyle = {
    transform: [{scale: buttonSize}],
  };

  const rotation = mode.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <View style={{position: 'absolute', alignItems: 'center'}}>
      <Animated.View style={[styles.button, sizeStyle]}>
        <TouchableHighlight onPress={onPress} underlayColor="#7f58ff">
          {/* <Animated.View style={{transform: [{rotate: rotation}]}}> */}
          <Icon name="plus" color="#fff" size={size} />
          {/* </Animated.View> */}
        </TouchableHighlight>
      </Animated.View>
    </View>
  );
}
