import React from 'react';
import { View, Text } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import successAnimation from '../../assets/SuccessLottie.json'; // Make sure the path is correct

const SuccessAnimation = () => {
  return (

    
    <View className="flex-1 justify-center items-center">
        
      <AnimatedLottieView
        source={successAnimation}
        autoPlay
        loop={false}
        style={{ width: 200, height: 200 }}
        onAnimationFinish={() => console.log('Animation finished')}
      />

      <Text style={{ fontSize: 18, marginTop: 20 }}>Registration Successful!</Text>
    </View>
  );
};

export default SuccessAnimation;
