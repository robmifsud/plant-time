import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from './SettingsScreen';
import LogOut from './LogOut';
import Faq from './Faq';
import * as globalStyles from '../../styles/globalStyles';

const Stack = createStackNavigator();

function SettingsScreenStack() {
  return (
    <Stack.Navigator
        defaultScreenOptions={{headerShown : true}}
    >
      <Stack.Screen name="Settings Screen" component={SettingsScreen} options={{title : 'Settings Screen', headerTintColor: globalStyles.primary}} />
      <Stack.Screen name="LogOut" component={LogOut} options={{title : 'Log Out', headerTintColor: globalStyles.primary}} />
      <Stack.Screen name="Faq" component={Faq} options={{title : 'FAQ', headerTintColor: globalStyles.primary}} />
    </Stack.Navigator>
  );
}

export default SettingsScreenStack;
