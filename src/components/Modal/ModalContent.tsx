import {useNavigation} from '@react-navigation/native';
import {useTypedDispatch} from '../../redux/hooks/useTypedHooks';
import React, {useEffect} from 'react';
import {useSharedValue, withTiming, runOnJS} from 'react-native-reanimated';
import {useLazyGetRoutesQuery} from '../../redux/api/api';
import {setRoutes} from '../../redux/slices/destination';
import CustomModal from '.';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, SCREEN_WIDTH} from '../../constants/constants';
import CustomButton from '../customButton/Button';
import CustomInput from '../customInput';

const Modal = () => {
  const translateY = useSharedValue<number>(0);
  const contextY = useSharedValue<number>(0);

  const [from, setFrom] = React.useState<string>('');
  const [to, setTo] = React.useState<string>('');
  const dispatch = useTypedDispatch();
  const navigation = useNavigation();
  const [onPress, {data = null, isLoading}] = useLazyGetRoutesQuery();

  const setCoordinates = () => {
    dispatch(setRoutes(data.routes));
    navigation.goBack();
  };

  const onButtonPressed = async () => {
    if (from !== '' && to !== '') {
      onPress({to: to, from: from});
    }
  };

  useEffect(() => {
    if (!!data) {
      translateY.value = withTiming(
        0,
        {duration: 150},
        isFinished => isFinished && runOnJS(setCoordinates)(),
      );
    }
  }, [data]);

  return (
    <CustomModal
      translateY={translateY}
      contextY={contextY}
      navigation={navigation}>
      <View style={styles.line} />
      <Text style={styles.text}>Введіть точну адресу</Text>
      <CustomInput
        value={from}
        placeHolder="Точка початку"
        setValue={setFrom}
      />
      <CustomInput value={to} placeHolder="Точка кінця" setValue={setTo} />
      <CustomButton
        title={'Поїхали!'}
        buttonStyle={[styles.generalButtonStyle]}
        titleStyle={[styles.generalButtonTitle]}
        onPress={onButtonPressed}
      />
    </CustomModal>
  );
};

const styles = StyleSheet.create({
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

export default Modal;
