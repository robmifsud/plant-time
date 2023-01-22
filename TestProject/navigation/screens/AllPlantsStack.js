import { createStackNavigator } from '@react-navigation/stack';
import AllPlantsScreen from '../screens/AllPlantsScreen';
import EditPlant from '../../components/EditPlant';
import * as globalStyles from '../../styles/globalStyles';

const Stack = createStackNavigator();

function AllPlantsStack() {
  return (
    <Stack.Navigator
        defaultScreenOptions={{headerShown : true}}
    >
      <Stack.Screen name="AllPlants" component={AllPlantsScreen} options={{title : 'All Plants', headerTintColor: globalStyles.primary}} />
      <Stack.Screen name="Edit Plant" component={EditPlant} options={{headerTintColor: globalStyles.primary}} />
    </Stack.Navigator>
  );
}

export default AllPlantsStack;
