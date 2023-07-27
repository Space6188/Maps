import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {COLORS, TAB_NAV_BAR_HEIGHT} from '../constants/constants';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import React from 'react';

const NavButton = ({
  onPress,
  Icon,
  focused,
}: {
  onPress: () => void;
  focused: boolean;
  Icon: React.JSXElementConstructor<SvgProps>;
}) => {
  const rButton = useAnimatedStyle(
    () => ({
      backgroundColor: withTiming(focused ? COLORS.WHITE : COLORS.BLACK),
      transform: [
        {
          translateY: withSpring(focused ? -TAB_NAV_BAR_HEIGHT / 2 : 0),
        },
      ],
    }),
    [focused],
  );

  return (
    <TouchableOpacity onPress={onPress} style={styles.Holder}>
      <Animated.View style={[rButton, styles.animatedContainer]}>
        <Icon
          width={'65%'}
          height={'65%'}
          color={focused ? COLORS.PURPLE : COLORS.WHITE}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Holder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedContainer: {
    width: '60%',
    borderRadius: 30,
    aspectRatio: 1 / 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NavButton;
