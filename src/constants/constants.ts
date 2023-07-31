import {Dimensions} from 'react-native';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');

export const enum BOTTOM_TABS {
  MAP_SCREEN = 'MAP',
  MESSAGES_SCREEN = 'MESSAGES',
  COMPASS_SCREEN = 'COMPASS',
  USER_SCREEN = 'USER',
  MORE_SCREEN = 'MORE',
}

export enum ROOT_NAVIGATION {
  MODAL = 'MODAL',
  TABS = 'TABS',
}

export enum COLORS {
  BLACK = '#000',
  PURPLE = '#665CD1',
  LIGHT_PURPLE = '#a65cd1',
  WHITE = '#fff',
  GREY = '#7E7E7E',
  DARK_PURPLE = '#1D1D4A',
}

export const TAB_NAV_BAR_HEIGHT = SCREEN_HEIGHT * 0.069;
export const MAX_TAB_BAR_HEIGHT = 90;

export const GOOGLE_MAP_API_KEY = 'AIzaSy1goggJzNE-hva2JOqeTDMYsiz7KkE8';
