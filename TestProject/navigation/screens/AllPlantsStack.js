import { createStackNavigator } from '@react-navigation/stack';
import AllPlantsScreen from '../screens/AllPlantsScreen';
import EditPlant from '../../components/EditPlant';

const Stack = createStackNavigator();

function AllPlantsStack() {
  return (
    <Stack.Navigator
        defaultScreenOptions={{headerShown : true}}
    >
      <Stack.Screen name="AllPlants" component={AllPlantsScreen} options={{title : 'All Plants'}} />
      <Stack.Screen name="Edit Plant" component={EditPlant} options={{ }} />
    </Stack.Navigator>
  );
}

export default AllPlantsStack;
