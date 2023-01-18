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
} from 'react-native';
import { useState, useEffect } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Fontisto';
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
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {useRoute} from "@react-navigation/native";

export default function EditPlant({ navigation }){
    
    const route = useRoute();
    
    const { ogPlant } = route.params;
    
    const [species, setSpecies] = useState([]);
    const [initialSpecies, setInitialSpecies] = useState({});
	const [plantName, setPlantName] = useState(ogPlant.plantName);
	const [plantImage, setPlantImage] = useState(ogPlant.plantImage);
	const [imageSelected, setImageSelected] = useState(false);
	const [plantSpecies, setPlantSpecies] = useState(ogPlant.speciesId);

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

            // Get plants collection from firestore and add new plant document to the collection
            const plant = {
                plantName: plantName,
                userId: getAuth().currentUser.uid,
                speciesId: plantSpecies,
                plantImage: plantImage, // to remove?
                statusId: '/status/2', // default status : good
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
				<Button
					style={styles.uploadImageButton}
					title='Upload Image'
					onPress={addImage}
				/>
				<View style={styles.textInput}>
					<TextInput
						placeholder='Name'
						fontSize={20}
						value={plantName}
						onChangeText={(plantName) => setPlantName(plantName)}
					/>
				</View>
				<View style={styles.selectContainer}>
					<SelectList
						data={species}
						defaultOption={initialSpecies}
						setSelected={setPlantSpecies}
						placeholder='Select species'
					/>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity onPress={''} style={styles.buttonClickContain}>
						<View style={styles.button}>
							<Icon name='thermometer-1' size={25} style={styles.icon} />
							<Text style={styles.buttonText}>Add temperature sensor</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={''} style={styles.buttonClickContain}>
						<View style={styles.button}>
							<Icon name='tint' size={25} style={styles.icon} />
							<Text style={styles.buttonText}>Add soil moisture sensor</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={''} style={styles.buttonClickContain}>
						<View style={styles.button}>
							<Icon2 name='plus-a' size={15} style={styles.icon} />
							<Text style={styles.buttonText}>Add irrigator</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={updatePlant} style={styles.buttonClickContain}>
						<Image
							style={styles.doneImage}
							source={require('../assets/images/done-icon.png')}
						/>
					</TouchableOpacity>
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
		marginTop: 20,
	},

	selectContainer: {
		marginTop: 20,
		alignSelf: 'center',
		width: '70%',
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
		borderBottomWidth: 2,
		borderColor: '#ABB5BE',
		padding: 16,
		marginBottom: 8,
		width: '70%',
	},

	addImage: {
		width: 80,
		height: 80,
		marginTop: 20,
		marginBottom: 20,
	},

	buttonContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		marginTop: 50,
	},

	button: {
		flexDirection: 'row',
		backgroundColor: '#3a5a40',
		alignItems: 'center',
		justifyContent: 'flex-start',
		borderRadius: 64,
		width: 300,
		padding: 12,
		height: 55,
	},

	buttonClickContain: {
		marginBottom: 24,
	},

	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},

	doneImage: {
		width: 80,
		height: 80,
		marginTop: 10,
	},

	icon: {
		color: 'white',
		marginLeft: 10,
		marginRight: 30,
	},
});
