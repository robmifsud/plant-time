import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

//screens
import HomeScreen from './screens/HomeScreen';
import AddPlantsScreen from './screens/AddPlantsScreen';
import AllPlantsScreen from './screens/AllPlantsScreen';
import SettingsScreen from './screens/SettingsScreen';
import EditPlantScreen from './screens/EditPlantScreen';

//screen names
const homeName = 'Home';
const addplantsName = 'Add Plants';
const settingsName = 'Settings';
const allplantsName = 'All Plants';
const editplantName = 'Edit Plant';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
	return (
		<NavigationContainer>
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

						return <Icon name={iconName} size={30} />;
					},
					tabBarStyle: { height: Platform.select({ios:85, android:65}), paddingTop: Platform.select({ios: 5, android: 7.5}) },
				})}
				tabBarOptions={{
					activeTintColor: '#80b742',
					inactiveTintColor: 'grey',
					labelStyle: { paddingBottom: Platform.select({ios: 5, android: 10}), fontSize: 10 },
				}}
			>
				{/* the icons and names at the bottom & top */}
				<Tab.Screen name={homeName} component={HomeScreen} />
				<Tab.Screen name={addplantsName} component={AddPlantsScreen} />
				<Tab.Screen name={allplantsName} component={AllPlantsScreen} />
				<Tab.Screen name={settingsName} component={SettingsScreen} />
				<Tab.Screen name={editplantName} component={EditPlantScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
