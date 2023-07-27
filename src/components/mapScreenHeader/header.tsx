import {Text, View} from 'react-native';
import RoutePoint from './point';
import {ROUTE_POINTS_HEADER} from '../../types';
import {COLORS, SCREEN_WIDTH} from '../../constants/constants';
import {styles} from './styles';
import {useTypedSelector} from '../../redux/hooks/useTypedHooks';
import dayjs from 'dayjs';
import {useDate} from '../../hooks/useDate';

const MapScreenHeader = () => {
  const routeInfo = useTypedSelector(store => store.destination);

  const {fullDateNow, timeNow, timeArrived, dateArrived} = useDate({
    time: routeInfo.routeInfo?.duration,
  });

  return (
    <View style={styles.Header_Holder}>
      <Text style={styles.mainHeaderText}>
        {!!routeInfo.routeInfo
          ? 'Ваш маршрут прокладено'
          : 'Встановіть маршрут'}
      </Text>
      {!!routeInfo.routeInfo && (
        <>
          <RoutePoint
            streetName={routeInfo.routeInfo.startPointAdress.street}
            globalName={routeInfo.routeInfo.startPointAdress.global}
            date={fullDateNow}
            time={timeNow}
          />
          <RoutePoint
            streetName={routeInfo.routeInfo.endPointAdress.street}
            globalName={routeInfo.routeInfo.endPointAdress.global}
            date={dateArrived}
            time={timeArrived}
          />
        </>
      )}
    </View>
  );
};

export default MapScreenHeader;
