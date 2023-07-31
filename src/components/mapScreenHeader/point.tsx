import {View, Text} from 'react-native';
import {styles} from './styles';

const RoutePoint = ({
  globalName,
  // streetName,
  date,
  time,
}: {
  globalName: string;
  // streetName: string;
  date: string;
  time: string;
}) => {
  return (
    <View style={styles.HStack}>
      <View style={styles.VStack}>
        <Text
          numberOfLines={1}
          style={[styles.generalForDest, styles.globalDest]}>
          {globalName}
        </Text>
        {/* <Text
          numberOfLines={1}
          style={[styles.generalForDest, styles.streetDest]}>
          {streetName}
        </Text> */}
      </View>
      <View style={[styles.VStack, styles.VStackDateAlignment]}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

export default RoutePoint;
