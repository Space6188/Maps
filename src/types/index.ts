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
  routeInfo: {
    distance: number;
    duration: number;
    startPointAdress: MAP_POINTS_ADRESSES;
    endPointAdress: MAP_POINTS_ADRESSES;
  } | null;
  location: {
    startPoint: string;
    endPoint: string;
  };
};

export type TABS_TYPES = {
  routeName: string;
  ScreenElement: any;
  Icon: React.JSXElementConstructor<SvgProps>;
};
