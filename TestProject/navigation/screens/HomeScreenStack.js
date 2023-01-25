import { createStackNavigator } from '@react-navigation/stack';
import EditPlant from '../../components/EditPlant';
import HomeScreen from './HomeScreen';
import Details from '../../components/Details';
import * as globalStyles from '../../styles/globalStyles'

const Stack = createStackNavigator();

function HomeScreenStack() {
  // Stack navigator to handle all actions within the 'Home' tab
  return (
    <Stack.Navigator
        defaultScreenOptions={{headerShown : true}}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{title : 'Home', headerTintColor: globalStyles.primary}} />
      <Stack.Screen name="EditPlant" component={EditPlant} options={{title: 'Edit', headerTintColor: globalStyles.primary}} />
      <Stack.Screen name="Details" component={Details} options={{headerTintColor: globalStyles.primary}} />
    </Stack.Navigator>
  );
}

export default HomeScreenStack;
