import { createStackNavigator } from '@react-navigation/stack';
import EditPlant from '../../components/EditPlant';
import HomeScreen from './HomeScreen';
import * as globalStyles from '../../styles/globalStyles'

const Stack = createStackNavigator();

function HomeScreenStack() {
  return (
    <Stack.Navigator
        defaultScreenOptions={{headerShown : true}}
    >
      <Stack.Screen name="Home Screen" component={HomeScreen} options={{title : 'Home Screen', headerTintColor: globalStyles.primary}} />
      <Stack.Screen name="Edit Plant" component={EditPlant} options={{headerTintColor: globalStyles.primary}} />
    </Stack.Navigator>
  );
}

export default HomeScreenStack;
