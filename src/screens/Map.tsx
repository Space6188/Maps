import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  COLORS,
  GOOGLE_MAP_API_KEY,
  ROOT_NAVIGATION,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  TAB_NAV_BAR_HEIGHT,
} from '../constants/constants';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../components/customButton/Button';
import MapView, {
  LatLng,
  MarkerAnimated,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {customMapStyle} from './customMapStyle';
import React from 'react';
import {useTypedDispatch, useTypedSelector} from '../redux/hooks/useTypedHooks';
import {
  destinationSlice,
  setNewMarchrute,
  updateRouteInfo,
} from '../redux/slices/destination';
import MapViewDirections, {
  MapDirectionsResponse,
} from 'react-native-maps-directions';
import {DESTINATION_TYPES} from '../types';
import {useLocationPermissions} from '../hooks/checkPermissions';

{
  /* <CustomButton
      buttonStyle={{
        bottom: TAB_NAV_BAR_HEIGHT * 1.5,
        backgroundColor: COLORS.DARK_PURPLE,
        paddingHorizontal: 20,
        paddingVertical: 10,
        position: 'absolute',
        alignSelf: 'center',
        borderRadius: 25,
      }}
      titleStyle={{color: COLORS.WHITE, fontSize: 16, fontWeight: '600'}}
      onPress={onButtonPressed}
      title="Обрати маршрут"
    /> */
}

const MapScreen = () => {
  const navigation = useNavigation<{navigate: any}>();
  const destination = useTypedSelector(store => store.destination);
  const mapRef = React.createRef<MapView>();
  const [isTracking, setIsTracking] = React.useState<boolean>(false);

  const dispatch = useTypedDispatch();

  const setRoute = async (res: MapDirectionsResponse) => {
    const startPointAdress = await mapRef.current?.addressForCoordinate({
      longitude: res.legs[0].start_location.lng,
      latitude: res.legs[0].start_location.lat,
    });
    console.log(res.waypointOrder);
    const endPointAdress = await mapRef.current?.addressForCoordinate({
      longitude: res.legs[0].end_location.lng,
      latitude: res.legs[0].end_location.lat,
    });

    mapRef.current?.fitToCoordinates(res.coordinates, {
      edgePadding: {
        right: SCREEN_WIDTH / 10,
        bottom: SCREEN_HEIGHT / 10,
        left: SCREEN_WIDTH / 10,
        top: SCREEN_HEIGHT / 10,
      },
    });

    if (!startPointAdress || !endPointAdress) {
      return;
    }
    dispatch(
      updateRouteInfo({
        routeInfo: {
          duration: res.duration / 60,
          distance: res.distance,
          startPointAdress: {
            global:
              startPointAdress?.country + ', ' + startPointAdress?.locality,
            street: startPointAdress?.name,
          },
          endPointAdress: {
            global: endPointAdress?.country + ', ' + endPointAdress?.locality,
            street: endPointAdress?.name,
          },
        },
      }),
    );
  };

  const onButtonPressed = () => {
    if (!!destination.routeInfo) {
      useLocationPermissions().then(() => {
        setIsTracking(prev => !prev);
      });
    } else {
      navigation.navigate(ROOT_NAVIGATION.MODAL);
    }
  };

  console.log(destination);

  return (
    <View style={{flex: 1}}>
      <MapView
        ref={mapRef}
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        customMapStyle={customMapStyle}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
        onUserLocationChange={
          isTracking
            ? res =>
                mapRef.current?.animateCamera({
                  center: {
                    latitude: res.nativeEvent.coordinate?.latitude,
                    longitude: res.nativeEvent.coordinate?.longitude,
                  },
                  zoom: 18.2,
                  heading: 30,
                  pitch: 40,
                })
            : undefined
        }
        showsUserLocation={true}>
        <MapViewDirections
          origin={destination.location.startPoint}
          destination={destination.location.endPoint}
          apikey={GOOGLE_MAP_API_KEY}
          strokeWidth={3}
          precision="high"
          splitWaypoints={true}
          onReady={setRoute}
          strokeColor="hotpink"
        />
      </MapView>
      <CustomButton
        buttonStyle={{
          bottom: TAB_NAV_BAR_HEIGHT * 1.5,
          backgroundColor: COLORS.DARK_PURPLE,
          paddingHorizontal: 20,
          paddingVertical: 10,
          position: 'absolute',
          alignSelf: 'center',
          borderRadius: 25,
        }}
        titleStyle={{color: COLORS.WHITE, fontSize: 16, fontWeight: '600'}}
        onPress={onButtonPressed}
        title={!!destination.routeInfo ? 'В дорогу' : 'Вибрати маршрут'}
      />
    </View>
  );
};

export default MapScreen;
