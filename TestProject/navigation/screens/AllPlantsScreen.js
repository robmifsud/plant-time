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
} from 'firebase/firestore';
import PlantComponent from '../../components/PlantComponent';
import { getAuth } from 'firebase/auth';
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get('window');

export default function AllPlantsScreen({ navigation }) {
	const [plantsRef, setPlantsRef] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const navigator = useNavigation();

	const fetchData = async () => {
		// Fetching data from firestore must be in async function as useEffect method expects synchronous code
		const tempArray = [];
		const db = getFirestore();
		const querySnapshot = await getDocs(query(collection(db, 'plants'), where('userId', '==', getAuth().currentUser.uid)));
		querySnapshot.forEach(doc => {
			const dict = {
				// id : doc.ref.path,
				// ref: doc.ref,
				id : doc.id,
				plantName : doc.get('plantName'),
				plantImage : doc.get('plantImage'),
				speciesId : doc.get('speciesId'),
				statusId : doc.get('statusId'),
				userId : doc.get('userId'),
				moistureSensorId : doc.get('moistureSensorId'),
			}
			tempArray.push(dict)
		})

		setPlantsRef(tempArray);
	};

	useEffect(() => {
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
			{plantsRef.map((item) => {
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
