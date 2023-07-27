import {Provider} from 'react-redux';
import RootNavigator from './src/navigation/root';
import {store} from './src/redux/store/store';
import MapScreen from './src/screens/Map';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
