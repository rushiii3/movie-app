import React from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const CustomSkeleton = () => {
  const translateX = new Animated.Value(-100);

  // Animation configuration
  const animateSkeleton = () => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: 400,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  // Start animation when component mounts
  React.useEffect(() => {
    animateSkeleton();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.placeholder, { transform: [{ translateX }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%', // Adjust height as needed
    backgroundColor: '#f0f0f0', // Placeholder background color
    borderRadius: 15, // Adjust border radius as needed
    overflow: 'hidden',
    marginBottom: 10, // Adjust margin as needed
  },
  placeholder: {
    height: '100%',
    backgroundColor: '#e0e0e0', // Animated color for the skeleton effect
    width: '50%', // Adjust width for the animated placeholder
  },
});

export default CustomSkeleton;
