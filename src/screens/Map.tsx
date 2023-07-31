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
  Marker,
  PROVIDER_GOOGLE,
  Polyline,
} from 'react-native-maps';
import {customMapStyle} from './customMapStyle';
import React from 'react';
import {useTypedDispatch, useTypedSelector} from '../redux/hooks/useTypedHooks';
import {useLocationPermissions} from '../hooks/checkPermissions';
import dayjs from 'dayjs';
import Route from '../components/Route/route';
import MapViewDirections from 'react-native-maps-directions';
import {setRouteInfo} from '../redux/slices/routeInfo';

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
  const [selectedRouteIndex, setSelectedRouteIndex] = React.useState<number>(0);
  const mapRef = React.createRef<MapView>();
  const [userCoords, setUserCoords] = React.useState<{
    shouldBeChanged: boolean;
    coords: LatLng | null;
    selectedRouteIndex: number | null;
  }>({shouldBeChanged: false, coords: null, selectedRouteIndex: null});

  React.useEffect(() => {
    if (!!destination.data) {
      setSelectedRouteIndex(1);
      mapRef.current?.fitToCoordinates(
        [
          {
            latitude: destination.data[0].legs[0].end_location.lat,
            longitude: destination.data[0].legs[0].end_location.lng,
          },
          {
            latitude: destination.data[0].legs[0].start_location.lat,
            longitude: destination.data[0].legs[0].start_location.lng,
          },
        ],
        {
          edgePadding: {
            right: SCREEN_WIDTH / 10,
            bottom: SCREEN_HEIGHT / 10,
            left: SCREEN_WIDTH / 10,
            top: SCREEN_HEIGHT / 10,
          },
        },
      );
    }
  }, [destination.data]);

  // const setRoute = async (res: MapDirectionsResponse) => {
  //   const startPointAdress = await mapRef.current?.addressForCoordinate({
  //     longitude: res.legs[0].start_location.lng,
  //     latitude: res.legs[0].start_location.lat,
  //   });

  //   console.log(startPointAdress);

  //   const endPointAdress = await mapRef.current?.addressForCoordinate({
  //     longitude: res.legs[0].end_location.lng,
  //     latitude: res.legs[0].end_location.lat,
  //   });

  //   mapRef.current?.fitToCoordinates(res.coordinates, {
  //     edgePadding: {
  //       right: SCREEN_WIDTH / 10,
  //       bottom: SCREEN_HEIGHT / 10,
  //       left: SCREEN_WIDTH / 10,
  //       top: SCREEN_HEIGHT / 10,
  //     },
  //   });

  //   setModalInfoCoords({
  //     time: res.duration,
  //     coords: res.coordinates[res.coordinates.length / 2],
  //   });

  //   if (!startPointAdress || !endPointAdress) {
  //     return;
  //   }
  //   dispatch(
  //     updateRouteInfo({
  //       routeInfo: {
  //         duration: res.duration / 60,
  //         distance: res.distance,
  //         startPointAdress: {
  //           global:
  //             startPointAdress?.country + ', ' + startPointAdress?.locality,
  //           street: startPointAdress?.thoroughfare,
  //         },
  //         endPointAdress: {
  //           global: endPointAdress?.country + ', ' + endPointAdress?.locality,
  //           street: endPointAdress?.thoroughfare,
  //         },
  //       },
  //     }),
  //   );
  // };

  const onButtonPressed = () => {
    if (!!destination.data) {
      useLocationPermissions().then(() => {
        setUserCoords({
          shouldBeChanged: true,
          coords: null,
          selectedRouteIndex: selectedRouteIndex ?? 1,
        });
      });
    } else {
      navigation.navigate(ROOT_NAVIGATION.MODAL);
    }
  };

  const renderItem = (route, index) => (
    <Route
      key={index}
      selectedRouteIndex={selectedRouteIndex}
      index={index}
      setSelectedRouteIndex={setSelectedRouteIndex}
      el={route}
    />
  );

  return (
    <View style={{flex: 1}}>
      <MapView
        ref={mapRef}
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        customMapStyle={customMapStyle}
        userLocationPriority="high"
        followsUserLocation
        userLocationFastestInterval={100}
        userLocationUpdateInterval={1000}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
        onUserLocationChange={res => {
          if (res.nativeEvent.coordinate && !!userCoords.selectedRouteIndex) {
            mapRef.current?.animateCamera({
              heading: 60,
              zoom: 18.5,
              center: res.nativeEvent.coordinate,
              pitch: 40,
            });
          }
          if (userCoords.shouldBeChanged && res.nativeEvent.coordinate) {
            setUserCoords({
              selectedRouteIndex: userCoords.selectedRouteIndex,
              shouldBeChanged: false,
              coords: {
                latitude: res.nativeEvent.coordinate.latitude,
                longitude: res.nativeEvent.coordinate.longitude,
              },
            });
          }
        }}
        showsUserLocation={true}>
        {!!destination.data && userCoords.selectedRouteIndex === null ? (
          <>{destination.data.map(renderItem)}</>
        ) : (
          <>
            {!!selectedRouteIndex && (
              <Route el={destination.data[selectedRouteIndex]} />
            )}
          </>
        )}
        {!!userCoords.coords && !!selectedRouteIndex && !!destination.data && (
          <MapViewDirections
            origin={userCoords.coords}
            destination={{
              latitude:
                destination.data[selectedRouteIndex].legs[0].end_location.lat,
              longitude:
                destination.data[selectedRouteIndex].legs[0].end_location.lng,
            }}
            apikey={GOOGLE_MAP_API_KEY}
            strokeWidth={4}
            precision="high"
            splitWaypoints={true}
            // onReady={() => {
            //   onPress({
            //     from: destination.location.startPoint,
            //     to: destination.location.endPoint,
            //   });
            // }}
            strokeColor={COLORS.LIGHT_PURPLE}
          />
        )}
      </MapView>

      {!userCoords.shouldBeChanged &&
        userCoords.selectedRouteIndex === null && (
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
            title={!!destination.data ? 'В дорогу' : 'Вибрать маршрут'}
          />
        )}
    </View>
  );
};

export default MapScreen;
