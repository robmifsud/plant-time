import { createStackNavigator } from '@react-navigation/stack';
import AllPlantsScreen from '../screens/AllPlantsScreen';
import EditPlant from '../../components/EditPlant';
import Details from '../../components/Details';
import * as globalStyles from '../../styles/globalStyles';

const Stack = createStackNavigator();

function AllPlantsStack() {
  // Stack navigator to handle all actions within the 'All Plants' tab
  return (
    <Stack.Navigator
        defaultScreenOptions={{headerShown : true}}
    >
      <Stack.Screen name="AllPlants" component={AllPlantsScreen} options={{title : 'All Plants', headerTintColor: globalStyles.primary}} />
      <Stack.Screen name="EditPlant" component={EditPlant} options={{title: 'Edit', headerTintColor: globalStyles.primary}} />
      <Stack.Screen name="Details" component={Details} options={{headerTintColor: globalStyles.primary}} />
    </Stack.Navigator>
  );
}

export default AllPlantsStack;
