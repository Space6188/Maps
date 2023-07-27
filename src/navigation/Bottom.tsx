import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {
  BOTTOM_TABS,
  COLORS,
  MAX_TAB_BAR_HEIGHT,
  SCREEN_HEIGHT,
  TAB_NAV_BAR_HEIGHT,
} from '../constants/constants';
import MapScreenHeader from '../components/mapScreenHeader/header';
import React from 'react';
import {TABS_TYPES} from '../types';
import NavButton from './navigation.button';
import MapScreen from '../screens/Map';
import TABS_ARR from './routes';
import {TouchableOpacity} from 'react-native';
import {SvgProps} from 'react-native-svg';

const BottomTabNavigator = createBottomTabNavigator();

let options = {
  tabBarShowLabel: false,
  header: () => <MapScreenHeader />,
  tabBarActiveTintColor: COLORS.PURPLE,
  tabBarInactiveTintColor: COLORS.WHITE,
  tabBarStyle: {
    backgroundColor: COLORS.BLACK,
    position: 'absolute',
    height: TAB_NAV_BAR_HEIGHT,
    maxHeight: MAX_TAB_BAR_HEIGHT,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
};

const Router = () => {
  const renderRoutes = ({item, index}: {item: TABS_TYPES; index: number}) => {
    const {Icon} = item;
    return (
      <React.Fragment key={index}>
        <BottomTabNavigator.Screen
          name={item.routeName}
          component={item.ScreenElement}
          options={{
            tabBarButton: props => {
              const {accessibilityState, onPress} = props;
              return (
                <NavButton
                  {...props}
                  focused={accessibilityState.selected}
                  onPress={onPress}
                  Icon={Icon}
                />
              );
            },
          }}
        />
      </React.Fragment>
    );
  };

  return (
    <BottomTabNavigator.Navigator screenOptions={options}>
      {TABS_ARR.map((el, index) => renderRoutes({item: el, index: index}))}
    </BottomTabNavigator.Navigator>
  );
};

export default Router;
