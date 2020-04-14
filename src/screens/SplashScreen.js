import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import MaskedView from '@react-native-community/masked-view';

import {PRIMARY} from '../themes';

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function SplashScreen() {
  const [loadingProgress, setLoadingProgress] = useState(new Animated.Value(0));
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    Animated.timing(loadingProgress, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
      delay: 400,
    }).start(() => setAnimationDone(true));
  });

  const colorLayer = (
    <View style={[StyleSheet.absoluteFill, {backgroundColor: PRIMARY}]} />
  );

  const whiteLayer = (
    <View style={[StyleSheet.absoluteFill, {backgroundColor: '#fff'}]} />
  );

  const imageScale = {
    transform: [
      {
        scale: loadingProgress.interpolate({
          inputRange: [0, 15, 100],
          outputRange: [0.1, 0.06, 16],
        }),
      },
    ],
  };

  const opacity = {
    opacity: loadingProgress.interpolate({
      inputRange: [0, 25, 50],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    }),
  };

  return (
    <View style={{flex: 1}}>
      {colorLayer}
      <MaskedView
        style={{flex: 1}}
        maskElement={
          <View style={styles.centered}>
            <Animated.Image
              source={require('../assets/logo2.png')}
              style={[{width: 1000}, imageScale]}
              resizeMode="contain"
            />
          </View>
        }>
        {whiteLayer}
        <Animated.View style={[opacity, styles.centered]}>
          {/* <Text>Splash</Text> */}
        </Animated.View>
      </MaskedView>
    </View>
  );
}
