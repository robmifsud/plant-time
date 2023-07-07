import * as React from 'react';
import {
	View,
	StyleSheet,
	ScrollView,
	RefreshControl,
	Dimensions,
} from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import {
	getFirestore,
	getDocs,
	collection,
	query,
	where,
	onSnapshot,
	getDoc,
	doc
} from 'firebase/firestore';
import PlantComponent from '../../components/PlantComponent';
import { getAuth } from 'firebase/auth';
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get('window');

export default function AllPlantsScreen({ navigation }) {
	const [plantsRef, setPlantsRef] = useState([]);
	
	const [refreshing, setRefreshing] = useState(false);
	const navigator = useNavigation();

	// Fetch all plant documents from Firestore on render
	// const fetchData = async () => {
	// 	// Fetching data from firestore must be in async function as useEffect method expects synchronous code
	// 	const tempArray = [];
	// 	const db = getFirestore();
	// 	const querySnapshot = await getDocs(query(collection(db, 'plants'), where('userId', '==', getAuth().currentUser.uid)));
	// 	querySnapshot.forEach(doc => {
	// 		// Load data into object for easier access later on
	// 		const dict = {
	// 			id : doc.id,
	// 			plantName : doc.get('plantName'),
	// 			plantImage : doc.get('plantImage'),
	// 			speciesId : doc.get('speciesId'),
	// 			statusId : doc.get('statusId'),
	// 			userId : doc.get('userId'),
	// 			moistureSensorId : doc.get('moistureSensorId'),
	// 			irrigatorId: doc.get('irrigatorId'),
	// 		}
	// 		tempArray.push(dict)
	// 	})

	// 	setPlantsRef(tempArray);
	// };

	useEffect(() => {
		// fetchData();
		const unsub = onSnapshot(query(collection(getFirestore(),'plants'),where('userId', '==', getAuth().currentUser.uid)), (querySnapshot) =>{
			const tempArray = [];
			querySnapshot.forEach((doc) => {
				const dict = {
					id: doc.id,
					plantName: doc.get('plantName'),
					plantImage: doc.get('plantImage'),
					speciesId: doc.get('speciesId'),
					statusId: doc.get('statusId'),
					userId: doc.get('userId'),
					moistureSensorId : doc.get('moistureSensorId'),
					irrigatorId: doc.get('irrigatorId'),
				};
				tempArray.push(dict);
			});
			setPlantsRef(tempArray);
		});
		return() => {
			unsub()
		}
	}, []);

	

	// Hook to refresh data when tab is focused in the app
	// useEffect(() => {
	// 	const unsubscribe = navigator.addListener('focus', () => {
	// 		// Handle callback here
	// 		fetchData();
	// 	});
	// 	return unsubscribe;
	// }, [navigator])

	// Function ot handle pull down to refresh
	// const onRefresh = useCallback(() => {
	// 	setRefreshing(true);
	// 	fetchData()
	// 		.then(() => setRefreshing(false))
	// 		.catch((error) => {
	// 			console.log('Refresh error: ', error);
	// 			setRefreshing(false);
	// 		});
	// }, []);

	return (
		<ScrollView
			contentContainerStyle={styles.containermain}
			// refreshControl={
			// 	<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			// }
		>
			{plantsRef.map((item) => {
				// Traverse all plants and send data to plant components
				return <PlantComponent key={item.id} plant={item} />;
			})}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	containermain: {
		flexGrow: 1,
		width: width,
		marginBottom: 10,
		paddingTop: 10,
		alignItems: 'center',
	},
});
