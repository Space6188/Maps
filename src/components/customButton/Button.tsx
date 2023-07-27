import React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

const CustomButton = ({
  title,
  buttonStyle,
  titleStyle,
  onPress,
  disabled,
}: {
  title: string;
  buttonStyle: StyleProp<ViewStyle>;
  titleStyle: StyleProp<TextStyle>;
  onPress: () => void;
  disabled?: boolean;
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={buttonStyle}>
      <Text style={titleStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
