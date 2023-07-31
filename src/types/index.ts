import {SvgProps} from 'react-native-svg';

export interface ROUTE_POINTS_HEADER {
  GlobalDestination: string;
  StreetDestination: string;
  date: string;
  time: string;
}

export type MAP_POINTS_ADRESSES = {
  global: string;
  street: string;
};

export type DESTINATION_TYPES = {
  data: null | any;
};

export type TABS_TYPES = {
  routeName: string;
  ScreenElement: any;
  Icon: React.JSXElementConstructor<SvgProps>;
};
