import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {styles} from './styles';
import {COLORS} from '../../constants/constants';
import {TouchableOpacity} from 'react-native';

const CustomInput = ({
  placeHolder,
  value,
  setValue,
}: {
  placeHolder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <TextInput
      placeholder={placeHolder}
      value={value}
      onChangeText={setValue}
      style={styles.input}
      placeholderTextColor={COLORS.GREY}
    />
  );
};

export default CustomInput;
