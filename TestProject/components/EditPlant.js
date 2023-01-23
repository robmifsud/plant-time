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
} from 'react-native';
import { useState, useEffect } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
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
	addDoc
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {useRoute, useNavigation} from "@react-navigation/native";

const { width, height } = Dimensions.get('window');

export default function EditPlant({ navigation }){
    
    const route = useRoute();
	const navigator = useNavigation();
    
    const { ogPlant } = route.params;
    
    const [species, setSpecies] = useState([]);
    const [initialSpecies, setInitialSpecies] = useState({});
	const [plantName, setPlantName] = useState(ogPlant.plantName);
	const [plantImage, setPlantImage] = useState(ogPlant.plantImage);
	const [imageSelected, setImageSelected] = useState(false);
	const [plantSpecies, setPlantSpecies] = useState(ogPlant.speciesId);
	const [sensorModal, setSensorModal] = useState(false);
	const [sensorModelNo, setSensorModelNo] = useState('');
	const [moistureSensorId, setMoistureSensorId] = useState(ogPlant.moistureSensorId);

    useEffect(() => {
		async function getSpecies() {
			const db = getFirestore();
			const querySnapshot = await getDocs(collection(db, 'species'));
			let array = querySnapshot.docs.map((doc) => {
                // Fetching initial species type
                if (doc.ref.path == ogPlant.speciesId){
                    setInitialSpecies({
                        key : doc.ref.path,
                        value : doc.data().speciesName
                    });
                }
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
			setImageSelected(true);
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
			// console.log('uploadBytes result: ', result.ref)
			getDownloadURL(result.ref)
				.then((url) => {
					updateDoc(doc(getFirestore(), 'plants', reference), {
						plantImage: url,
					});
				})
				.catch((error) => console.log('Error fetching img url after upload: ', error));
		});
	};

    const updatePlant = async () => {
        if(plantName === '' || plantSpecies === ''){
			Alert.alert(
				'Warning',
				'Please fill in all the fields and try again.',
				[{ text: 'Ok', style: 'cancel' }]
			);
		} else {
            const db = getFirestore();

            
            const plant = {
                plantName: plantName,
                userId: getAuth().currentUser.uid,
                speciesId: plantSpecies,
                plantImage: plantImage, // to remove?
                statusId: '/status/2', // default status : good
				moistureSensorId: moistureSensorId,
            };

            await setDoc(doc(db, 'plants', ogPlant.id), plant)
            .then(() => {
                console.log('Plant with id: ', ogPlant.id, ' updated in firestore: ', plant);

                if (imageSelected) {
                    uploadImage(ogPlant.id);
                }

                Alert.alert(
                    'Success!',
                    'Your changes were saved successfully. ',
                    [{ text: 'Ok', style: 'default' }]
                );

				navigator.navigate('AllPlants');

            })
            .catch((error) => {
                console.log('Error while updating plant in firestore: ', error);
                Alert.alert(
                    'Error!',
                    'Something went wrong while updating your plant, please try again.',
                    [{ text: 'Ok', style: 'cancel' }]
                );
            });
        }
	};

	const deletePlant = async() =>{
		const db = getFirestore();
		if (moistureSensorId != ''){
			await deleteDoc(doc(db,'moistureSensors', moistureSensorId))
			.then(() => {
				console.log('Deleted sensor with id: ', moistureSensorId);
				setMoistureSensorId('');
			})
			.catch(error => console.log('Error deleting sensor with id ', moistureSensorId, ' :', error))
		}

		deleteDoc(doc(db,'plants',ogPlant.id))
		.then(() =>{
			console.log('Deleted plant with id: ',ogPlant.id);
			Alert.alert(
				'Success!',
				'This plant has been deleted. ',
				[{ text: 'Ok', style: 'default' }]
			);
			navigator.goBack();
		})
		.catch(error =>{
			console.log('Could not delete plant with id: ', ogPlant.id, ' error: ', error);
			Alert.alert(
				'Error!',
				'Something went wrong while deleting your plant, please try again.',
				[{ text: 'Ok', style: 'cancel' }]
			);
		})
	}

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
						source={require('../assets/images/add-image-icon.png')}
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
							defaultOption={initialSpecies}
							setSelected={setPlantSpecies}
							placeholder='Select species'
							boxStyles={styles.selectBox}
							dropdownStyles={[styles.selectBox, styles.selectDrop]}
						/>
					</View>
					<TouchableOpacity onPress={() => {setSensorModal(true)}} style={styles.buttonClickContain}>
						<View style={styles.addButton}>
							<Icon name='tint' size={25} style={styles.darkIcon} />
							<Text style={styles.darkButtonText}>Add soil moisture sensor</Text>
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
								<TextInput style={styles.modalInput} value={sensorModelNo} onChangeText={(sensorModelNo) => setSensorModelNo(sensorModelNo)}></TextInput>

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
						<View style={styles.addButton}>
							<Icon2 name='plus-a' size={15} style={styles.icon} />
							<Text style={styles.darkButtonText}>Add irrigator</Text>
						</View>
					</TouchableOpacity>
					<View style={[styles.buttonClickContain, {marginTop: 10}]}>
						<TouchableOpacity style={styles.deleteButton} onPress={deletePlant}>
							<Icon name='trash' size={25} style={styles.icon} />
							{/* <Text style={styles.buttonText}>Delete Plant</Text> */}
						</TouchableOpacity>
						<TouchableOpacity style={styles.updateButton} onPress={updatePlant}>
							<Icon2 name='check' size={15} style={styles.updateIcon} />
							<Text style={styles.updateText}>Update Plant</Text>
						</TouchableOpacity>
					</View>
					{/* <View style={styles.buttonClickContain}>
					</View> */}
				</View>
			</View>
    	</ScrollView>
    );
}

const styles = StyleSheet.create({
	inputContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},

	uploadImageButton: {
		marginBottom: 15,
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
		marginBottom: 20,
		alignSelf: 'center',
		width: '80%',
		maxWidth: 600,
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
		borderBottomWidth: 2,
		borderColor: '#ABB5BE',
		padding: 16,
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

	deleteButton: {
		flexDirection: 'row',
		elevation: globalStyles.elevation,
		paddingVertical: 12,
		paddingHorizontal: 19,
		borderRadius: 4,
		// marginTop: 16,
		alignSelf: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		borderRadius: 5,
		height: '100%', 
		backgroundColor: '#b02121',
	},
	addButton:{
		flexDirection: 'row',
		elevation: globalStyles.elevation,
		padding: 12,
		borderRadius: 4,
		// marginTop: 0,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		borderRadius: 5,
		width: '100%',
		height: 55, 
		backgroundColor: '#fff'
	},
	darkIcon: {
		color: 'black',
		marginLeft: 10,
		marginRight: 20,
	},

	updateButton: {
		elevation: globalStyles.elevation,
		flexDirection: 'row',
		backgroundColor: globalStyles.primary,
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 5,
		paddingHorizontal: 20,
		paddingVertical: 15,
		height: '100%',
	},

	updateText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
	updateIcon: {
		color: 'white',
		marginRight: 20,
	},
	buttonClickContain: {
		width: '80%',
		marginBottom: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 55,
	},

	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
	darkButtonText: {
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
		color: 'white',
		// marginLeft: 10,
		// marginRight: 10,
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
		borderRadius: 12,
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
		borderRadius: 6,
		backgroundColor: 'rgba(58,90,64,0.2)',
		paddingTop: 2,
		paddingBottom: 2,
		paddingLeft: 10,
		marginBottom:24
	},
	modalButtonRow:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 'auto'
	},
	modalButton:{

		flex:1,
		justifyContent: 'center',
		alignItems: 'center',
		width:'100%',
		maxWidth:'45%',
		borderRadius:8,
		padding:8,
		fontSize:20,
		fontWeight:'bold',
	},
	modalButtonText:{
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16
	},
	
});
