import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLORS, ROOT_NAVIGATION} from '../constants/constants';
import CustomModal from '../components/Modal';
import Router from './Bottom';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modal from '../components/Modal/ModalContent';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            navigationBarColor: COLORS.BLACK,
            headerShown: false,
          }}>
          <Stack.Screen name={ROOT_NAVIGATION.TABS} component={Router} />
          <Stack.Screen
            name={ROOT_NAVIGATION.MODAL}
            component={Modal}
            options={{presentation: 'transparentModal', animation: 'none'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default RootNavigator;
