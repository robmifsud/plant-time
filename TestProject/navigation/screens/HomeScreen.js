import * as React from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	RefreshControl,
	Dimensions,
} from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import * as globalStyles from '../../styles/globalStyles'
import {
	getFirestore,
	getDocs,
	collection,
	where,
	query,
} from 'firebase/firestore';
import PlantComponent from '../../components/PlantComponent';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
	const [plants, setPlants] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const navigator = useNavigation();

	const fetchData = async () => {
		const tempArray = [];
		const db = getFirestore();
		const querySnapshot = await getDocs(
			query(
				collection(db, 'plants'),
				where('userId', '==', getAuth().currentUser.uid)
			)
		);
		querySnapshot.forEach((doc) => {
			const dict = {
				id: doc.id,
				plantName: doc.get('plantName'),
				plantImage: doc.get('plantImage'),
				speciesId: doc.get('speciesId'),
				statusId: doc.get('statusId'),
				userId: doc.get('userId'),
				moistureSensorId : doc.get('moistureSensorId'),
			};
			tempArray.push(dict);
		});

		setPlants(tempArray);
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		const unsubscribe = navigator.addListener('focus', () => {
			// Handle callback here
			fetchData();
		});
		return unsubscribe;
	}, [navigator]);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		fetchData()
			.then(() => setRefreshing(false))
			.catch((error) => {
				console.log('Refresh error: ', error);
				setRefreshing(false);
			});
	}, []);

	return (
		<ScrollView
			contentContainerStyle={styles.containermain}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
		>
			<View style={styles.notifSection}>
				<Text style={[styles.subtitle, styles.noNotif]}>No New Notifications</Text>
			</View>
			<View style={styles.section}>
				<View style={styles.uppercard}>
					<Text style={styles.subtitle}>Your Plants:</Text>
					<TouchableOpacity
						onPress={() => navigation.navigate('AllPlantsStack')}
						android_ripple={{ borderless: false}}
					>
						<Text style={styles.subtitleButton}>View All</Text>
					</TouchableOpacity>
				</View>
				{plants.map((item) => {
					return <PlantComponent key={item.id} plant={item} />;
				})}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	subtitle: {
		fontSize: 20,
		fontWeight: '',
		padding: 10,
		paddingBottom: 0,
		marginLeft: 5,
	},
	noNotif: {
		opacity: 0.4,
	},
	uppercard: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginBottom: 15,
	},
	subtitleButton: {
		paddingBottom: 8,
		paddingTop: 8,
		marginRight: 5,
		marginTop:5,
		fontSize: 14,
		fontWeight: '600',
		padding: 10,
		borderRadius: 4,
		backgroundColor: globalStyles.secondary,
		color: 'white'
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
	notifSection: {
		marginBottom: 25,
	},
	containermain: {
		flexGrow: 1,
		width: width,
		marginBottom: 40,
		marginTop: 25,
		alignItems: 'center',
	},
});
