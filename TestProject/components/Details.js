import * as React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	ScrollView,
	Dimensions,
	PixelRatio,
	RefreshControl
} from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Fontisto';
import * as globalStyles from '../styles/globalStyles';
import 'firebase/app';
import {
	getFirestore,
	updateDoc,
	doc,
	getDoc,
	onSnapshot,
} from 'firebase/firestore';
import {useRoute, useNavigation} from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function Details({ navigation }){
	// Component used to display all plant details in a single page

	const [species, setSpecies] = useState([]);
	const [barPercentage, setBarPercentage] = useState(0);
	const [idealMoisture, setIdealMoisture] = useState(0);
	const [moistureLevel, setMoistureLevel] = useState(0);
	const [refreshing, setRefreshing] = useState();
	const route = useRoute();
	const navigator = useNavigation();
    
    const { ogPlant } = route.params;
	
	useEffect(() => {
		// async function fetchData(){
		// 	const db = getFirestore()
		// 	await getDoc(doc(db, ogPlant.speciesId))
		// 	.then((docSnaphot) =>{
		// 		setSpecies(docSnaphot.get('speciesName'))
		// 		setIdealMoisture(docSnaphot.get('idealMoisture'))
		// 		// Only pass concurrent values to avoid issues with states not being updated while rendering
		// 		// getMoisture(docSnaphot.get('idealMoisture'))
		// 	})
		// }
		
		// if(ogPlant.moistureSensorId != ''){
		// 	getDoc(doc(getFirestore(),'moistureSensors',ogPlant.moistureSensorId))
		// 	.then((doc) => {
		// 		setMoistureLevel(doc.get('moistureLevel'))
		// 	})
		// }
		// Fetch data on render
		// fetchData();
		if(ogPlant.moistureSensorId != ''){
			const unsub = onSnapshot(doc(getFirestore(),'moistureSensors',ogPlant.moistureSensorId), (docSnapshot) => {
				setMoistureLevel(docSnapshot.get('moistureLevel'))
				const temp = 50 + (moistureLevel - idealMoisture);
		
				// Set bar percentage to show moisture status for the sliding bar in the UI
				if(temp<0){
					setBarPercentage(0)	
				} else if(temp>100){
					setBarPercentage(100)
				} else {
					setBarPercentage(temp)
				}
			});
			return () => {
				unsub();
				console.log("MyComponent is unmounting");
			};
		}
	}, []);

	useEffect(()=>{
		const unsubB = onSnapshot(doc(getFirestore(), ogPlant.speciesId),(docSnapshot) => {
			setSpecies(docSnapshot.get('speciesName'))
			setIdealMoisture(docSnapshot.get('idealMoisture'))
		})
		return () => {
			unsubB();
			console.log("MyComponent is unmounting");
		};
	},[])

	// useEffect(() =>{
	// 	if(ogPlant.moistureSensorId != ''){
	// 		const unsub = onSnapshot(doc(getFirestore(),'moistureSensors',ogPlant.moistureSensorId), (docSnapshot) => {
	// 			setMoistureLevel(docSnapshot.get('moistureLevel'))
	// 		});
	// 		return () => {
	// 			unsub()
	// 		};
	// 	}
	// },[])

	// Fetch species name and moisture level using the speciesId from plant document

	useEffect(() => {
		console.log('set percentage')
		const temp = 50 + (moistureLevel - idealMoisture);
		
		// Set bar percentage to show moisture status for the sliding bar in the UI
		if(temp<0){
			setBarPercentage(0)	
		} else if(temp>100){
			setBarPercentage(100)
		} else {
			setBarPercentage(temp)
		}
	}, [moistureLevel])

	useEffect(() => {
		console.log('set percentage')
		const temp = 50 + (moistureLevel - idealMoisture);
		
		// Set bar percentage to show moisture status for the sliding bar in the UI
		if(temp<0){
			setBarPercentage(0)	
		} else if(temp>100){
			setBarPercentage(100)
		} else {
			setBarPercentage(temp)
		}
	}, [])

	// Get current plant moisture level using moistureSensorId from plant document
	async function getMoisture(idealMoisture){
		if(ogPlant.moistureSensorId != ''){
			const db = getFirestore()
			await getDoc(doc(db,'moistureSensors', ogPlant.moistureSensorId))
			.then((docSnaphot) => {
				const current = docSnaphot.get('moistureLevel');
				return current;
			}).then((current) => {
				setMoistureLevel(current);
				const temp = 50 + (current - idealMoisture);
				
				// Set bar percentage to show moisture status for the sliding bar in the UI
				if(temp<0){
					setBarPercentage(0)	
				} else if(temp>100){
					setBarPercentage(100)
				} else {
					setBarPercentage(temp)
				}
			})
		}
	}

	// Function to handle irrigation
	// We increment moisture by 5% to simulate real world use
	async function waterPlant(){
		const newLevel = moistureLevel + 5;
		const db = getFirestore()
		updateDoc(doc(db,'moistureSensors',ogPlant.moistureSensorId),{
			moistureLevel: newLevel
		})
		// getMoisture(idealMoisture);
	}

	// Function to handle pull down to refresh
	const onRefresh = useCallback(() => {
		setRefreshing(true);
		fetchData()
			.then(() => setRefreshing(false))
			.catch((error) => {
				console.log('Refresh error: ', error);
				setRefreshing(false);
			});
	}, []);

	// Hook to refresh data when tab is focused in the app
	// useEffect(() => {
	// 	const unsubscribe = navigator.addListener('focus', () => {
	// 		// Handle callback here
	// 		if(ogPlant.moistureSensorId != ''){
	// 			getDoc(doc(getFirestore(),'moistureSensors',ogPlant.moistureSensorId))
	// 			.then((doc) => {
	// 				setMoistureLevel(doc.get('moistureLevel'))
	// 			})
	// 		}
	// 	});
	// 	return unsubscribe;
	// }, [navigator]);

    return (
        <ScrollView 
		// refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
		>
			<View style={styles.container}>
				<View style={styles.section}>
					<Image style={styles.image} source={{ uri: ogPlant.plantImage }} />
					<Text style={styles.subTitle}>{ogPlant.plantName}</Text>
					<Text style={styles.species}>Species:  {species}</Text>
				</View>

				{(ogPlant.moistureSensorId != '') ? (
					<View style={styles.section}>
						<View style={styles.row}>
							<Text style={styles.subTitle}>
								Moisture Level:
							</Text>
							{(barPercentage < 25) ? (
								// Warning labels for different moisture status
								<View style={styles.lowWarn}>
									<Icon name='warning' size={13} style={styles.warnIcon}/>
									<Text style={styles.warnText}>Moisture low</Text>
								</View>
							) : (barPercentage>75) ? (
								<View style={styles.lowWarn}>
									<Icon name='warning' size={13} style={styles.warnIcon}/>
									<Text style={styles.warnText}>Moisture high</Text>
								</View>
							) : (
								<Text></Text>
							)}
						</View>
						<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#416f3e', '#46cf34', '#2dc5ff', '#2740f9', '#5007cf']} style={styles.bar}>
							{(barPercentage != '') ? (
								<View style={[styles.needle, {marginLeft: `${barPercentage}%`}]}></View>
							) : ( 
								<View></View>
							)}
						</LinearGradient>
						<View style={styles.ticksRow}>
							<View style={styles.tick}> 
								<Text style={styles.tickText}>Low</Text>
							</View>
							<View style={styles.tick}>
								<Text style={styles.tickText}>Optimal</Text>
							</View>
							<View style={styles.tick}> 
								<Text style={styles.tickText}>High</Text>
							</View>
						</View>
					</View>
				) : (
					<View style={styles.section}>
						<Text style={styles.notFound}>
							A soil moisture sensor has not yet been assigned to this plant.
						</Text>
					</View>
				)}

				{(ogPlant.irrigatorId != '') ? (
					<View style={styles.section}>
						<TouchableOpacity onPress={waterPlant} style={styles.waterBtn}>
							<Icon2 name='blood-drop' size={25} style={styles.dropIcon}/>
							<Text style={{color: 'white', fontSize:20}}>
								Water plant
							</Text>
						</TouchableOpacity>
					</View>
				): (
					<View style={styles.section}>
						<Text style={styles.notFound}>
							An irrigator has not yet been assigned to this plant.
						</Text>
					</View>
				)}

			</View>
		</ScrollView>
    );
}

const styles = StyleSheet.create({
	container:{
		width: '100%',
		height: '100%',
		padding: PixelRatio.getPixelSizeForLayoutSize(4),
		flexDirection:'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	image:{
		width:'100%',
		aspectRatio: 4/3,
		marginBottom: 15,
		borderRadius: 4,
		backgroundColor: 'white',
	},
	subTitle:{
		fontSize:20,
		fontWeight: 'bold',
		marginRight: 'auto',
	},
	species:{
		alignSelf: 'flex-start',
		fontSize:16,
		marginTop: 5,
		marginLeft: 2,
	},	
	section:{
		width: '100%',
		padding: PixelRatio.getPixelSizeForLayoutSize(8),
		borderRadius:4,
		backgroundColor: 'white',
		flexDirection: 'column',
		alignItems: 'center',
		marginBottom: 10,
	},
	row:{
		flexDirection:'row',
		width: '100%',
		alignItems:'center',
	},
	lowWarn:{
		paddingVertical: 4,
		paddingHorizontal: 8,
		borderRadius: 4,
		backgroundColor: 'rgba(236, 37, 37, 0.9)',
		borderColor: 'rgba(236, 37, 37, 1)',
		color: 'rgba(236, 37, 37, 1)',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	warnText:{
		color: 'white',
		fontWeight: 'bold'
	},
	warnIcon:{
		color: 'white',
		marginRight:5,
	},
	bar:{
		width:'90%',
		paddingHorizontal:'4%',
		height:40,
		borderRadius:4,
		flexDirection: 'row',
		alignItems: 'center',
		elevation:6,
		marginBottom: 15,
		marginTop:25,
	},
	needle:{
		backgroundColor: 'white',
		width: 7,
		height: 50,
		
		borderRadius: 10,
		borderWidth: 1.5,
		borderColor: globalStyles.background,

	},
	segmentSection:{
		width: '100%',
		borderRadius:4,
		backgroundColor: 'white',
		height: PixelRatio.getPixelSizeForLayoutSize(100),
		padding: PixelRatio.getPixelSizeForLayoutSize(8),
		justifyContent: 'center',
		alignItems: 'center',
	},
	segmentBar:{
		width:'90%',
		height:40,
		borderRadius:6,
		flexDirection: 'row',
		alignItems: 'center',
	},
	segment:{
		height: '80%',
		flex:1,
	},
	ticksRow:{
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	tick:{
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems:'center',
		backgroundColor: globalStyles.background,
		borderRadius:4,
		paddingHorizontal: 5,
		paddingVertical:3,
		elevation:1,
	},
	tickText:{
		fontSize:14,
		fontWeight: 'bold'
	},
	notFound:{
		opacity:0.4,
		fontSize: 16,
		width: '100%',
	},
	waterBtn:{
		width: '100%',
		backgroundColor: 'rgba(104, 188, 238, 1)',
		paddingHorizontal:16,
		paddingVertical:12,
		borderRadius:4,
		flexDirection: 'row',
		alignItems: 'center',

	},
	dropIcon:{
		color: 'white',
		marginRight: 15,
	},
});
