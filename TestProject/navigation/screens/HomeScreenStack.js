import { createStackNavigator } from '@react-navigation/stack';
import EditPlant from '../../components/EditPlant';
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();

function HomeScreenStack() {
  return (
    <Stack.Navigator
        defaultScreenOptions={{headerShown : true}}
    >
      <Stack.Screen name="Home Screen" component={HomeScreen} options={{title : 'Home Screen'}} />
      <Stack.Screen name="Edit Plant" component={EditPlant} options={{ }} />
    </Stack.Navigator>
  );
}

export default HomeScreenStack;
