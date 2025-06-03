import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useRef } from 'react';
import { Platform, Pressable, ViewStyle } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export interface HoldToConfirmButtonProps {
  label?: string;
  durationMs?: number;
  onComplete: () => void;
  width?: number;
  height?: number;
  disabled?: boolean;
  style?: ViewStyle;
}

const HoldToConfirmButton: React.FC<HoldToConfirmButtonProps> = ({
  label = 'Hold to confirm',
  durationMs = 1500,
  onComplete,
  width = 380,
  height = 140,
  disabled = false,
  style,
}) => {
  const progress = useSharedValue(0);
  const flashOpacity = useSharedValue(0);
  const completedRef = useRef(false);

  const handleComplete = useCallback(() => {
    if (!completedRef.current) {
      completedRef.current = true;
      onComplete();
      
      // Flash effect
      flashOpacity.value = withTiming(1, { duration: 150 }, () => {
        flashOpacity.value = withTiming(0, { duration: 150 }, () => {
          // Reset after flash
          progress.value = withTiming(0, { duration: 300 });
          completedRef.current = false;
        });
      });
    }
  }, [onComplete, flashOpacity, progress]);

  const startProgress = useCallback(() => {
    if (disabled || completedRef.current) return;
    
    completedRef.current = false;
    progress.value = withTiming(1, { duration: durationMs }, (finished) => {
      if (finished && !completedRef.current) {
        runOnJS(handleComplete)();
      }
    });
  }, [disabled, durationMs, handleComplete, progress]);

  const stopProgress = useCallback(() => {
    if (!completedRef.current) {
      progress.value = withTiming(0, { duration: 200 });
    }
  }, [progress]);

  const containerStyle = useAnimatedStyle(() => ({
    width,
    height,
    paddingHorizontal: 20,
    opacity: disabled ? 0.4 : 1,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    alignSelf: 'center',
    shadowColor: '#2ecc71',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  }));

  const backgroundStyle = useAnimatedStyle(() => ({
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(46, 204, 113, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(46, 204, 113, 0.9)',
    backdropFilter: 'blur(20px)', // Pour web
  }));

  const fillStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: interpolate(
      progress.value,
      [0, 1],
      [0, width],
      Extrapolate.CLAMP
    ),
    borderRadius: 8,
  }));

  const flashStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    opacity: flashOpacity.value,
  }));

  const textStyle = useAnimatedStyle(() => ({
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    zIndex: 10,
    opacity: interpolate(
      progress.value,
      [0, 0.3, 1],
      [1, 0.9, 1],
      Extrapolate.CLAMP
    ),
  }));

  const Container = Platform.OS === 'ios' ? BlurView : Animated.View;
  const blurProps = Platform.OS === 'ios' ? { 
    intensity: 40, 
    tint: 'dark' as const,
    style: backgroundStyle
  } : { style: backgroundStyle };

  return (
    <Pressable
      onPressIn={startProgress}
      onPressOut={stopProgress}
      onLongPress={() => {}}
      disabled={disabled}
      style={{ alignSelf: 'center' }}
    >
      <Animated.View style={[containerStyle, style]}>
        <Animated.View style={backgroundStyle}>
          {/* Green Translucent Background */}
          <Animated.View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(46, 204, 113, 0.4)',
            borderRadius: 8,
            zIndex: 1,
          }} />
          
          {/* Progress Fill Bar - Slime Effect */}
          <Animated.View style={fillStyle}>
            <LinearGradient
              colors={[
                '#1e8449', // Very dark green
                '#239b56', // Dark green
                '#28b463', // Medium dark green
                '#2d8a47', // Dark forest green
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                flex: 1,
                borderRadius: 8,
              }}
            />
          </Animated.View>
          
          {/* Green Glossy Overlay */}
          <LinearGradient
            colors={[
              'rgba(255, 255, 255, 0.3)',
              'rgba(46, 204, 113, 0.2)',
              'rgba(255, 255, 255, 0.1)',
              'rgba(46, 204, 113, 0.3)',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 8,
              zIndex: 6,
            }}
          />
          
          {/* Flash effect */}
          <Animated.View style={flashStyle} />
          
          {/* Text */}
          <Animated.Text style={textStyle}>
            {label}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export default HoldToConfirmButton; 