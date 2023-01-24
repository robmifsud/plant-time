import * as React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Image,
	TouchableOpacity,
	Button,
	Alert,
	ScrollView,
	Modal,
	Dimensions,
	PixelRatio,
} from 'react-native';
import { useState, useEffect } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
// import LinearGradient from 'react-native-linear-gradient';
// import Gauge from "react-native-gauge";
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Fontisto';
import * as globalStyles from '../styles/globalStyles';
import * as ImagePicker from 'expo-image-picker';
import 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
	getFirestore,
	getDocs,
	collection,
    setDoc,
	updateDoc,
	doc,
	deleteDoc,
	addDoc,
	getDoc
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {useRoute, useNavigation} from "@react-navigation/native";
// import { LinearGradient } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function Details({ navigation }){
    const [species, setSpecies] = useState([]);
    const route = useRoute();
	const navigator = useNavigation();
    
    const { ogPlant } = route.params;

	const testLev = 40;

    useEffect(() => {
		// console.log();
		async function fetchData(){
			const db = getFirestore()
			getDoc(doc(db, ogPlant.speciesId))
			.then((docSnaphot)=>{
				setSpecies(docSnaphot.get('speciesName'))
			})
		}

		fetchData();
	}, []);

    return (
        <ScrollView>
			<View style={styles.container}>
				<View style={styles.section}>
					<Image style={styles.image} source={{ uri: ogPlant.plantImage }} />
					<Text style={styles.subTitle}>{ogPlant.plantName}</Text>
					<Text style={styles.species}>Species:  {species}</Text>
				</View>
				<View style={styles.section}>
					<Text style={styles.subTitle}>
						Moisture Level:
					</Text>
					<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#416f3e', '#46cf34', '#2dc5ff', '#2740f9', '#5007cf']} style={styles.bar}>
						<View style={styles.needle}></View>
					</LinearGradient>
					<View style={styles.ticksRow}>
						<View style={styles.tick}> 
							{/* <Text style={styles.tickText}>Moisture</Text> */}
							<Text style={styles.tickText}>Low</Text>
						</View>
						<View style={styles.tick}>
							<Text style={styles.tickText}>Optimal</Text>
						</View>
						<View style={styles.tick}> 
							{/* <Text style={styles.tickText}>Moisture</Text> */}
							<Text style={styles.tickText}>High</Text>
						</View>
					</View>
				</View>
				{true ? (
					<View style={styles.section}>
						<TouchableOpacity style={styles.waterBtn}>
							<Icon2 name='blood-drop' size={25} style={styles.dropIcon}/>
							<Text style={{color: 'white', fontSize:20}}>
								Water plant
							</Text>
						</TouchableOpacity>
					</View>
				): (
					<View style={styles.section}>
						<Text style={styles.noIrrig}>
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
		alignSelf: 'flex-start',
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
		marginLeft: '50%',
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
	noIrrig:{
		opacity:0.4,
		fontSize: 16,
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
