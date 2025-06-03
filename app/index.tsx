import React, { useRef } from 'react';
import { Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { HoldToConfirmButton } from '../src/components/HoldToConfirmButton';

const { width, height } = Dimensions.get('window');

const Home = () => {
  const confettiRef1 = useRef<ConfettiCannon>(null);

  const handleConfirm = () => {
    confettiRef1.current?.start();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <ConfettiCannon
        ref={confettiRef1}
        count={150}
        origin={{ x: width/2, y: 0}}
        autoStart={false}
        fadeOut={true}
        fallSpeed={2500}
        explosionSpeed={350}
        colors={['#52a3db', '#9b59b6', '#2ecc71', '#f39c12', '#e74c3c', '#ff6b9d']}
      />
    
      
      <View style={styles.centerContainer}>
        <HoldToConfirmButton
          label="Hold to confirm"
          onComplete={handleConfirm}
          width={400}
          height={80}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
});

export default Home;