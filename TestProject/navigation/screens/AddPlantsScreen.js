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
	Dimensions,
	Modal
} from 'react-native';
import { useState, useEffect, use } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import * as globalStyles from '../../styles/globalStyles';
import * as ImagePicker from 'expo-image-picker';
import 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
	getFirestore,
	getDocs,
	collection,
	addDoc,
	updateDoc,
	doc,
	deleteDoc
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import sampleImage from '../../assets/iconPlant.png'
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');

export default function AddPlantsScreen({ navigation }) {
	const [species, setSpecies] = useState([]);
	const [plantName, setPlantName] = useState('');
	const sampleUri = Image.resolveAssetSource(sampleImage).uri;
	const [plantImage, setPlantImage] = useState(sampleUri);
	const [plantSpecies, setPlantSpecies] = useState('');
	const [sensorModal, setSensorModal] = useState(false);
	const [sensorModelNo, setSensorModelNo] = useState('');
	const [moistureSensorId, setMoistureSensorId] = useState('');
	// TO DO: state to hanle no sensor selected?

	const navigator = useNavigation();

	useEffect(() => {
		async function getSpecies() {
			const db = getFirestore();
			const querySnapshot = await getDocs(collection(db, 'species'));
			let array = querySnapshot.docs.map((doc) => {
				return { key: doc.ref.path, value: doc.data().speciesName };
			});
			setSpecies(array);
		}
		getSpecies();
	}, []);

	async function addImage() {

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setPlantImage(result.assets[0].uri);
		}
	}

	const uploadImage = async (reference) => {
		const blob = await new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.onload = function () {
				resolve(xhr.response);
			};
			xhr.onerror = function () {
				reject(new TypeError('Network request failed'));
			};
			xhr.responseType = 'blob';

			xhr.open('GET', plantImage, true);
			xhr.send(null);
		});

		uploadBytes(ref(getStorage(), reference), blob).then((result) => {
			getDownloadURL(result.ref)
				.then((url) => {
					updateDoc(doc(getFirestore(), 'plants', reference), {
						plantImage: url,
					});
				})
				.catch((error) => console.log('Error fetching img url after upload: ', error));
		});
	};

	const addPlant = async () => {
		if(plantName === '' || plantSpecies === ''){
			console.log('Name: ', plantName, "  ", 'Species: ', plantSpecies)
			Alert.alert(
				'Warning',
				'Please fill in all the fields and try again.',
				[{ text: 'Ok', style: 'cancel' }]
			);
		} else {
			// Get plants collection from firestore and add new plant document to the collection
			const plant = {
				plantName: plantName,
				userId: getAuth().currentUser.uid,
				speciesId: plantSpecies,
				plantImage: plantImage, // to remove?
				statusId: '/status/2', // default status : good
				moistureSensorId: moistureSensorId,
			};

			await addDoc(collection(getFirestore(), 'plants'), plant)
			.then((docRef) => {
				console.log('Plant with id: ', docRef.id, ' added to firestore: ', plant);

				uploadImage(docRef.id);
				
				// Reset states
				setPlantName('');
				setPlantImage(sampleUri);
				setMoistureSensorId('');
				setSensorModelNo('');

				Alert.alert(
					'Success',
					'Your plant has successfully been created',
					[{ text: 'Ok', style: 'cancel' }]
				);

				navigator.navigate('AllPlants');

			})
			.catch((error) => {
				console.log('Error while saving plant to firestore: ', error);
				Alert.alert(
					'Error',
					'Something went wrong while adding your plant, please try again',
					[{ text: 'Ok', style: 'cancel' }]
				);
			});
		}
	};

	const addSensor = async () => {
		const db = getFirestore();
		if (moistureSensorId != ''){
			await deleteDoc(doc(db,'moistureSensors', moistureSensorId))
			.then(() => {
				console.log('Deleted sensor with id: ', moistureSensorId);
				setMoistureSensorId('');
			})
			.catch(error => console.log('Error deleting sensor with id ', moistureSensorId, ' :', error))
		}
		const soilMoistureSensor = {
			moistureLevel : 50,
			modelNumber : sensorModelNo,
		}
		await addDoc(collection(db,'moistureSensors'), soilMoistureSensor)
		.then((docRef) => {
			console.log('Sensor with id: ',docRef.id ,'added to firestore.');
			setMoistureSensorId(docRef.id);
			setSensorModal(false)
			Alert.alert(
				'Success!',
				'A soil moisture sensor has been added successfully.',
				[{ text: 'Ok', style: 'cancel' }]
			);
		})
		.catch(error => {
			console.log('Error while adding Soil Moisture Sensor: ', error);
			Alert.alert(
				'Error',
				'Something went wrong while adding the sensor, please try again',
				[{ text: 'Ok', style: 'cancel' }]
			);
			setSensorModal(false);
		})
	}

	return (
		<ScrollView>
			<View style={styles.inputContainer}>
				
				{plantImage ? (
					<Image style={styles.addImage} source={{ uri: plantImage }} />
				) : (
					<Image
						style={styles.addImage}
						source={require('../../assets/images/add-image-icon.png')}
					/>
				)}
				<TouchableOpacity
					style={styles.uploadImageButton}
					onPress={addImage}
				>
					<Icon name='image' size={25} style={styles.plusIcon} />
					<Text style={{color: 'white', fontSize: 16}}>Upload Image</Text>
				</TouchableOpacity>
				<View style={styles.textInput}>
					<TextInput
						placeholder='Name'
						selectionColor={globalStyles.primary}
						fontSize={20}
						value={plantName}
						onChangeText={(plantName) => setPlantName(plantName)}
					/>
				</View>
				<View style={styles.buttonContainer}>
					<View style={styles.selectContainer}>
						<SelectList
							data={species}
							setSelected={setPlantSpecies}
							dropdownStyles={[styles.selectBox, styles.selectDrop]}
							save='key'
							boxStyles={styles.selectBox}
							placeholder='Select species'
						/>
					</View>
					<TouchableOpacity onPress={() => {setSensorModal(true)}} style={styles.buttonClickContain}>
						<View style={styles.button}>
							<View style={{marginLeft: '2%', width: '10%', alignItems: 'center'}}>
								<Icon name='tint' size={25} style={styles.darkIcon} />
							</View>
							<View style={{marginLeft: '5%', width: '80%'}}>
								<Text style={styles.buttonText}>Add soil moisture sensor</Text>
							</View>
						</View>
					</TouchableOpacity>

					<Modal
						animationType="fade"
						transparent={true}
						visible={sensorModal}
					>
						<View style={styles.modalContainer}>
							<View style={styles.cardContainer}>
								<Text style={styles.modalTitle}>Add Sensor</Text>
								<Text style={styles.modalSubtitle}>Model Number:</Text>
								<TextInput style={styles.modalInput} selectionColor={globalStyles.primary} selectTextOnFocus={true} value={sensorModelNo} onChangeText={(sensorModelNo) => setSensorModelNo(sensorModelNo)}></TextInput>

								<View style={styles.modalButtonRow}>
									<TouchableOpacity
										onPress={() => {setSensorModal(false)}}
										style={[styles.modalButton, {backgroundColor: '#b02121'}]}
									>
										<Text style={styles.modalButtonText}>Cancel</Text>
									</TouchableOpacity>
									<TouchableOpacity 
										style={[styles.modalButton, {backgroundColor : 'rgb(58,90,64)'}]}
										onPress={addSensor}
									>
										<Text style={styles.modalButtonText}>Add</Text>
									</TouchableOpacity> 
								</View>
							</View>
						</View>
					</Modal>

					<TouchableOpacity onPress={''} style={styles.buttonClickContain}>
						<View style={styles.button}>
							<View style={{marginLeft: '2%', width: '10%', alignItems: 'center'}}>
								<Icon3 name='watering-can' size={25} style={styles.darkIcon} />
							</View>
							<View style={{marginLeft: '5%', width: '80%'}}>
								<Text style={styles.buttonText}>Add irrigator</Text>
							</View>
						</View>
					</TouchableOpacity>
					<View style={styles.submitButtonClickContain}>
						<TouchableOpacity onPress={addPlant} style={styles.submit}>
							<Icon2 name='check' size={15} style={styles.submitIcon} />
							<Text style={styles.submitText}>Submit Plant</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		flexGrow: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},

	uploadImageButton: {
		marginBottom: 20,
		paddingVertical: 10,
		paddingHorizontal: 15,
		elevation: globalStyles.elevation,
		backgroundColor: globalStyles.secondary,
		borderRadius: 4,
		flexDirection: 'row',
		alignItems: 'center'
	},
	plusIcon:{
		color: 'white',
		marginRight: 20,

	},
	selectContainer: {
		marginTop: 20,
		alignSelf: 'center',
		width: '80%',
		maxWidth: 600,
	},

	selectList: {
		borderWidth: 3,
	},

	addImageText: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 30,
		color: 'black',
	},

	textInput: {
		borderBottomWidth: 1.5,
		borderColor: '#ABB5BE',
		padding: 10,
		marginBottom: 8,
		width: '80%',
	},

	addImage: {
		width: 170,
		height: 170,
		marginTop: 20,
		marginBottom: 10,
	},

	buttonContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: width * 1,
	},

	button: {
		flexDirection: 'row',
		elevation: globalStyles.elevation,
		padding: 12,
		borderRadius: 4,
		marginTop: 16,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		borderRadius: 5,
		width: '100%',
		height: 55, 
		backgroundColor: '#fff'
	},
	
	submit: {
		flexDirection: 'row',
		backgroundColor: globalStyles.primary,
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 5,
		paddingHorizontal: 20,
		paddingVertical: 15,
		elevation: globalStyles.elevation,
	},
	selectBox:{
		backgroundColor: 'white',
		borderColor: 'white',
		borderWidth: 0,
		borderRadius: 4,
		elevation: globalStyles.elevation,
	},
	selectDrop:{
		backgroundColor: globalStyles.background,
	},
	submitText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'regular',
	},

	submitIcon: {
		color: 'white',
		marginRight: 20,
	},
	buttonClickContain: {
		width: '80%',
		// marginBottom: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	submitButtonClickContain: {
		width: '80%',
		marginTop: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},

	buttonText: {
		color: 'black',
		fontSize: 16,
		fontWeight: 'regular',
	},

	doneImage: {
		width: 80,
		height: 80,
		marginTop: 10,
	},

	icon: {
		color: 'black',
		marginLeft: 10,
		marginRight: 20,
	},

	darkIcon: {
		color: 'black',
	},
	spacer: {
		height:300
	},
	modalContainer: {
		backgroundColor: 'rgba(256,256,256,0.85)',
		width: '100%',
		height: '100%',
		flex:1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	cardContainer:{
		padding: 24,
		width: '80%',
		// height: '30%',
		backgroundColor: 'white',
		borderRadius: 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},
	modalTitle:{
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 8,
		marginLeft: 6
	},
	modalSubtitle:{
		fontSize:16,
		marginBottom: 4,
		marginLeft: 6
	},
	modalInput:{
		borderRadius: 4,
		backgroundColor: 'rgba(58,90,64,0.2)',
		paddingTop: 2,
		paddingBottom: 2,
		paddingLeft: 10,
		marginBottom:24,
	},
	modalButtonRow:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 'auto'
	},
	modalButton:{
		elevation: 2,
		flex:1,
		justifyContent: 'center',
		alignItems: 'center',
		width:'100%',
		maxWidth:'45%',
		borderRadius:6,
		padding:8,
		fontSize:20,
		fontWeight:'bold',
	},
	modalButtonText:{
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16
	}

});
