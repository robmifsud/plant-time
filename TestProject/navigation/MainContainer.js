import * as React from 'react';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

//screens
import AddPlantsScreen from './screens/AddPlantsScreen';
import AllPlantsStack from './screens/AllPlantsStack';
import HomeScreenStack from './screens/HomeScreenStack';
import SettingsScreenStack from './screens/SettingsScreenStack';
import * as globalStyles from '../styles/globalStyles'

//screen names
const homeName = 'Home';
const addplantsName = 'Add Plants';
const settingsName = 'Settings';
const allplantsName = 'AllPlantsStack';

const Tab = createBottomTabNavigator();

export default function MainContainer() {

	const MyTheme = {
		...DefaultTheme,
		colors: {
		  ...DefaultTheme.colors,
		  background: globalStyles.background
		},
	};

	return (
		<NavigationContainer theme={MyTheme}>
			<Tab.Navigator
				initialRouteName={homeName}
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						let rn = route.name;

						if (rn === homeName) {
							iconName = focused ? 'home' : 'home-outline';
						} else if (rn === addplantsName) {
							iconName = focused ? 'list' : 'list-outline';
						} else if (rn === settingsName) {
							iconName = focused ? 'settings' : 'settings-outline';
						} else if (rn === allplantsName) {
							iconName = focused ? 'leaf' : 'leaf-outline';
						}

						return <Icon name={iconName} size={30} color={focused ? globalStyles.primary: globalStyles.secondary}/>;
					},
					tabBarStyle: { height: Platform.select({ios:85, android:65}), paddingTop: Platform.select({ios: 5, android: 7.5})},
					// tabBarActiveTintColor: '#80b742',
					tabBarActiveTintColor: globalStyles.primary,
					tabBarInactiveTintColor: globalStyles.secondary,
					headerTintColor : globalStyles.primary,
					tabBarLabelStyle: {
						paddingBottom: Platform.select({ios: 5, android: 10}), 
						fontSize: 10
					},
				})}

			>
				{/* the icons and names at the bottom & top */}
				<Tab.Screen name={homeName} component={HomeScreenStack} options={{headerShown : false, title:'Home Screen'}}/>
				<Tab.Screen name={addplantsName} component={AddPlantsScreen} />
				<Tab.Screen name={allplantsName} component={AllPlantsStack} options={{headerShown : false, title:'All Plants'}}/>
				<Tab.Screen name={settingsName} component={SettingsScreenStack} options={{headerShown : false, title:'Settings'}}/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
