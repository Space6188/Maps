import {BOTTOM_TABS} from '../constants/constants';
import MapScreen from '../screens/Map';
import EmptySceen from '../screens/PlugScreens';
import MapSVG from '../assets/Maps.svg';
import MessageSVG from '../assets/Message.svg';
import CompassSVG from '../assets/Compass.svg';
import UserSVG from '../assets/User.svg';
import MoreSVG from '../assets/More.svg';
import NavButton from './navigation.button';
import {TABS_TYPES} from '../types';

export default [
  {
    routeName: BOTTOM_TABS.MAP_SCREEN,
    ScreenElement: MapScreen,
    Icon: MapSVG,
  },
  {
    routeName: BOTTOM_TABS.MESSAGES_SCREEN,
    ScreenElement: EmptySceen,
    Icon: MessageSVG,
  },
  {
    routeName: BOTTOM_TABS.COMPASS_SCREEN,
    ScreenElement: EmptySceen,
    Icon: CompassSVG,
  },
  {
    routeName: BOTTOM_TABS.USER_SCREEN,
    ScreenElement: EmptySceen,
    Icon: UserSVG,
  },
  {
    routeName: BOTTOM_TABS.MORE_SCREEN,
    ScreenElement: EmptySceen,
    Icon: MoreSVG,
  },
];
