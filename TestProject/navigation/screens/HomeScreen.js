import * as React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, RefreshControl } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import { getFirestore, getDocs, collection, where, query } from 'firebase/firestore';
import PlantComponent from '../../components/PlantComponent';
import { getAuth } from 'firebase/auth';
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
	const [plants, setPlants] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const navigator = useNavigation();
	
	const fetchData = async() => {
		const tempArray = [];
		const db = getFirestore();
		const querySnapshot = await getDocs(query(collection(db, 'plants'), where('userId', '==', getAuth().currentUser.uid)));
		querySnapshot.forEach(doc => {
			const dict = {
				id : doc.id,
				plantName : doc.get('plantName'),
				plantImage : doc.get('plantImage'),
				speciesId : doc.get('speciesId'),
				statusId : doc.get('statusId'),
				userId : doc.get('userId')
			}
			tempArray.push(dict)
		})

		setPlants(tempArray);
	}

	useEffect(() =>{
		fetchData();
	}, [])

	useEffect(() => {
		const unsubscribe = navigator.addListener('focus', () => {
			// Handle callback here
			fetchData();
		});
		return unsubscribe;
	}, [navigator])

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		fetchData()
		.then(() => setRefreshing(false))
		.catch(error =>{
			console.log('Refresh error: ', error)
			setRefreshing(false)
		})
	}, []);

	return (
		<ScrollView 
			style={styles.containermain}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
		>
			<View style={styles.section}>
				<Text style={styles.subtitle}>Notifications</Text>
				<View style={styles.notificationcard}>
					<View style={styles.flexrow}>
						<Icon style={styles.icon} name='warning' size={30} />
						<Text style={styles.notification}>Daisy is not receiving enough sun</Text>
					</View>
					<Pressable
						style={styles.pressable}
						onPress={() => this.changeText('Check')}
						android_ripple={{ borderless: true, radius: 20 }}
					>
						<Icon style={styles.close} name='close-outline' size={30} />
					</Pressable>
				</View>
			</View>
			<View style={styles.section}>
				<View style={styles.uppercard}>
					<Text style={styles.subtitle}>Plants</Text>
					<Pressable
						onPress={() => navigation.navigate('AllPlantsStack')}
						android_ripple={{ borderless: true, radius: 20 }}
					>
						<Text style={styles.subtitlebutton}>View All</Text>
					</Pressable>
				</View>
				{plants.map(item => {
					return(<PlantComponent key={item.id} plant={item} />)
				})}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	subtitle: {
		fontSize: 30,
		fontWeight: 'regular',
		paddingBottom: 5,
		paddingLeft: 20,
		
	},
	subtitlebutton: {
		fontSize: 20,
		fontWeight: '200',
	},
	notification: {
		fontSize: 13,
		textDecorationLine: 'underline',
		color: '#ffb74d',
	},
	notificationcard: {
		backgroundColor: '#fcf8e3',
		margin: 8,
		borderColor: '#fbeed5',
		borderWidth: 2,
		borderRadius: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	bottomcard: {
		padding: 20,
		marginTop: 10,
		borderColor: '#fbeed5',
		borderWidth: 2,
		
	},
	upperbox: {
		alignItems: 'center',
		paddingBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	iconbox: {
		padding: 10,
	},
	lowerbox: {
		borderColor: '#fbeed5',
		borderTopWidth: 2,
		paddingTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		
	},
	box: {
		flexDirection: 'row',
		alignItems: 'center',
		
	},
	subtitlebox: {
		marginLeft: 10,
		fontSize: 25,
		
	},
	titlebox: {
		marginLeft: 10,
		fontSize: 35,
		fontWeight: 'bold',
		
	},
	flexrow: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
	},
	icon: {
		color: '#ffb74d',
		marginRight: 10,
	},
	close: {
		color: '#ffb74d',
		textAlign: 'right',
		padding: 10,
	},
	pressable: {
		right: 0,
	},
	section: {
		marginBottom: 40,
	},
	uppercard: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	containermain: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: 40,
		paddingBottom: 40,
		paddingLeft: 20,
		paddingRight: 20,
		
	},
});
