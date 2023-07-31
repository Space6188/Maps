import dayjs from 'dayjs';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../constants/constants';
import {Marker, Polyline} from 'react-native-maps';
import {useTypedDispatch} from '../../redux/hooks/useTypedHooks';
import {setRouteInfo} from '../../redux/slices/routeInfo';
var duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

const Route = ({
  selectedRouteIndex,
  setSelectedRouteIndex,
  index,
  el,
}: {
  selectedRouteIndex?: number;
  setSelectedRouteIndex?: React.Dispatch<React.SetStateAction<number>>;
  index?: number;
  el: any;
}) => {
  const decode = (encoded: string) => {
    var points = [];
    var index = 0,
      len = encoded.length;
    var lat = 0,
      lng = 0;
    while (index < len) {
      var b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charAt(index++).charCodeAt(0) - 63; //finds ascii
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      var dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;
      shift = 0;
      result = 0;
      do {
        b = encoded.charAt(index++).charCodeAt(0) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      var dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({latitude: lat / 1e5, longitude: lng / 1e5});
    }
    return points;
  };

  const DecoderARR = decode(el.overview_polyline.points);
  const dispatch = useTypedDispatch();

  let centeredMarker = DecoderARR[Math.round(DecoderARR.length / 2)];

  console.log(centeredMarker);

  const {distance, duration, end_address, start_address} = el.legs[0];

  const onRoutePressed = () => {
    !!setSelectedRouteIndex && setSelectedRouteIndex(index);
    dispatch(
      setRouteInfo({
        time: duration.value,
        dest: end_address,
        origin: start_address,
      }),
    );
  };

  return (
    <React.Fragment key={index}>
      {!!centeredMarker && !!index && (
        <Marker
          onPress={onRoutePressed}
          coordinate={{
            latitude: centeredMarker.latitude,
            longitude: centeredMarker.longitude,
          }}>
          <View
            style={[
              styles.marker,
              {
                backgroundColor:
                  selectedRouteIndex === index
                    ? COLORS.LIGHT_PURPLE
                    : COLORS.GREY,
                zIndex: selectedRouteIndex === index ? 2 : 0,
              },
            ]}>
            <Text style={styles.time}>
              {dayjs
                .duration(duration.value, 'minutes')
                .format('HH год. mm хв.')}
            </Text>
            <Text style={styles.dist}>{distance.text}</Text>
          </View>
        </Marker>
      )}
      <Polyline
        style={{zIndex: selectedRouteIndex === index ? 2 : 0}}
        strokeColor={
          selectedRouteIndex === index ? COLORS.LIGHT_PURPLE : COLORS.GREY
        }
        onPress={onRoutePressed}
        strokeWidth={3}
        tappable={true}
        coordinates={DecoderARR}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  marker: {
    padding: 6,
    borderRadius: 5,
    justifyContent: 'center',
  },
  time: {
    color: COLORS.WHITE,
    fontSize: 11,
    fontWeight: '600',
  },
  dist: {color: COLORS.WHITE, fontSize: 10},
});

export default React.memo(Route, (prev, next) => {
  return prev.selectedRouteIndex === next.selectedRouteIndex;
});
