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
const { width, height } = Dimensions.get('window');
export default function HomeScreen({ navigation }) {
	const [plantsRef, setPlantsRef] = useState([]);
	const [refreshing, setRefreshing] = useState(false);

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
				userId : doc.get('userId')
			}
			tempArray.push(dict)
		})

		setPlantsRef(tempArray);
	};

	useEffect(() => {
		fetchData();
	}, []);

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
			<View style={styles.spacer}></View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	subtitle: {
		fontSize: 30,
		fontWeight: 'bold',
		padding: 10,
		paddingBottom: 0,
		paddingLeft: 20,
	},
	subtitlebutton: {
		paddingBottom: 0,
		fontSize: 25,
		fontWeight: 'bold',
		padding: 10,
	},
	notification: {
		fontSize: 18,
		textDecorationLine: 'underline',
		color: '#ffb74d',
	},
	notificationcard: {
		backgroundColor: '#fcf8e3',
		margin: 8,
		borderColor: '#fbeed5',
		borderWidth: 2,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	bottomcard: {
		padding: 20,
		marginTop: 10,
		borderColor: '#fbeed5',
		borderWidth: 2,
		marginBottom: 10,
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
		flexGrow: 1,
		width: width,
		marginBottom: 10,
		marginTop: 30,
		// flexDirection: 'column',
		alignItems: 'center',
		// justifyContent: 'flex-start',
		// flex: 1,
		// width: width,
		// backgroundColor: 'white',
		//paddingTop: 10,
		// paddingBottom: 40,
		// marginBottom: 40,
		//paddingLeft: 20,
		//paddingRight: 20,
	},
	spacer: {
		height: 20,
	},
});
