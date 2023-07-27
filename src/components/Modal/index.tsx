import {KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  COLORS,
  GOOGLE_MAP_API_KEY,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../constants/constants';
import React, {useEffect} from 'react';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import CustomInput from '../customInput';
import CustomButton from '../customButton/Button';
import {
  useTypedDispatch,
  useTypedSelector,
} from '../../redux/hooks/useTypedHooks';
import {
  destinationSlice,
  setNewMarchrute,
} from '../../redux/slices/destination';
import {useNavigation} from '@react-navigation/native';

const CustomModal = () => {
  const [from, setFrom] = React.useState<string>('');
  const [to, setTo] = React.useState<string>('');

  const dispatch = useTypedDispatch();
  const selector = useTypedSelector(store => store.destination.location);

  useEffect(() => {
    setFrom(selector.startPoint);
    setTo(selector.endPoint);
  }, []);

  const translateY = useSharedValue<number>(0);
  const contextY = useSharedValue<number>(0);

  const navigation = useNavigation();

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

  const setCoordinates = () => {
    dispatch(
      setNewMarchrute({
        location: {
          startPoint: from,
          endPoint: to,
        },
      }),
    );
    navigation.goBack();
  };

  const onButtonPressed = () => {
    if (from !== '' && to !== '') {
      translateY.value = withTiming(
        0,
        {duration: 150},
        isFinished => isFinished && runOnJS(setCoordinates)(),
      );
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <GestureHandlerRootView style={{flex: 1}}>
        <GestureDetector gesture={PanGesture}>
          <Animated.View style={[rModal, styles.Modal]}>
            <View style={styles.line} />
            <Text style={styles.text}>Введіть точну адресу</Text>
            <CustomInput
              value={from}
              placeHolder="Точка початку"
              setValue={setFrom}
            />
            <CustomInput
              value={to}
              placeHolder="Точка кінця"
              setValue={setTo}
            />
            <CustomButton
              title={'Поїхали!'}
              buttonStyle={[styles.generalButtonStyle]}
              titleStyle={[styles.generalButtonTitle]}
              onPress={onButtonPressed}
            />
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
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    alignSelf: 'center',
    marginVertical: 5,
  },
  line: {
    width: SCREEN_WIDTH * 0.1,
    height: 4,
    borderRadius: 10,
    backgroundColor: COLORS.WHITE,
    alignSelf: 'center',
    marginVertical: 10,
  },
  generalButtonTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: COLORS.WHITE,
  },
  generalButtonStyle: {
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingVertical: 15,
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: COLORS.PURPLE,
  },
});

export default CustomModal;
