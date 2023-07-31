import {KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {COLORS, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/constants';
import React from 'react';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

interface IModalProps {
  translateY: Animated.SharedValue<number>;
  contextY: Animated.SharedValue<number>;
  navigation: any;
  children: React.JSX.Element | React.JSX.Element[];
}

const CustomModal = ({
  translateY,
  contextY,
  navigation,
  children,
}: IModalProps) => {
  const PanGesture = Gesture.Pan()
    .onStart(() => {
      contextY.value = translateY.value;
    })
    .onChange(e => {
      translateY.value = contextY.value + e.translationY;
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 5) {
        translateY.value = withTiming(
          0,
          {duration: 100},
          isFinished => isFinished && runOnJS(navigation.goBack)(),
        );
      }
      if (translateY.value <= -SCREEN_HEIGHT / 5) {
        translateY.value = withTiming(-SCREEN_HEIGHT / 3, {duration: 100});
      }
    });

  React.useEffect(() => {
    translateY.value = withTiming(-SCREEN_HEIGHT / 3, {duration: 150});
  });

  const rModal = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    }),
    [],
  );

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <GestureHandlerRootView style={{flex: 1}}>
        <GestureDetector gesture={PanGesture}>
          <Animated.View style={[rModal, styles.Modal]}>
            {children}
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </KeyboardAvoidingView>
  );
};

export const styles = StyleSheet.create({
  Modal: {
    position: 'absolute',
    height: SCREEN_HEIGHT / 3,
    width: SCREEN_WIDTH,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: COLORS.BLACK,
    bottom: -SCREEN_HEIGHT / 3,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
  },
});

export default CustomModal;
