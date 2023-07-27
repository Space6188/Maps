import {StyleSheet} from 'react-native';
import {COLORS, SCREEN_WIDTH} from '../../constants/constants';

export const styles = StyleSheet.create({
  Header_Holder: {
    backgroundColor: COLORS.BLACK,
    alignItems: 'center',
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    paddingVertical: 10,
  },
  mainHeaderText: {
    color: COLORS.PURPLE,
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 10,
  },
  HStack: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  VStack: {
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  VStackDateAlignment: {
    alignItems: 'flex-end',
  },
  generalForDest: {
    fontWeight: '500',
  },
  globalDest: {
    color: COLORS.WHITE,
    fontSize: 16,
  },
  streetDest: {
    color: COLORS.GREY,
    fontSize: 14,
  },
  date: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.WHITE,
  },
  time: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.PURPLE,
  },
});
