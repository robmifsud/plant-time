import * as React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Image,
	TouchableOpacity,
	Button
} from 'react-native';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Fontisto';
import firestore from '@react-native-firebase/firestore';
import { ReactNativeFirebase } from '@react-native-firebase/app';
import { SelectList } from 'react-native-dropdown-select-list';
import * as ImagePicker from 'expo-image-picker';

export default function AddPlantsScreen({ navigation }) {
	const [species, setSpecies] = useState([]);
	const [plantName, setPlantName] = useState('');
	const [plantImage, setPlantImage] = useState(null);
	const [selected, setSelected] = useState("");

	useEffect(() => {
		const getSpecies = firestore()
		.collection('species')
		.onSnapshot(snapshot => {
			let array = snapshot.docs.map(doc =>{
				return {key : doc.ref.path, value : doc.data().speciesName}
			})
			const newItems = snapshot.docs.map(doc => {
				let dict = doc.data();
				dict.id = doc.ref.path;
				return dict}
			);
        	setSpecies(array);
		});

		return () => getSpecies();
    }, []);

	async function uploadImage(){

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log('Result: ', result);

		if (!result.canceled) {
			console.log("uri set: ", result.assets[0].uri);
			setPlantImage(result.assets[0].uri);
		  }
	}

	return (
		
		<View style={styles.inputContainer}>
			{ plantImage ? (
					<Image
						style={styles.addImage}
						source={{uri: plantImage}}
					/>
                ) : (
                    <Image
						style={styles.addImage}
						source={require('../../assets/images/add-image-icon.png')}
					/>
                )}

			<Button style={styles.uploadImageButton} title='Upload Image' onPress={uploadImage}/>

			<View style={styles.textInput}>
				<TextInput placeholder='Name' fontSize={20} value={plantName} onChangeText={(plantName) => setPlantName(plantName)}/>
			</View>

			<View style={styles.selectContainer}>
				<SelectList data = {species} setSelected = {setSelected}/>
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

				<Image
					style={styles.doneImage}
					source={require('../../assets/images/done-icon.png')}
				/>
			</View>
		</View>
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

	selectList:{
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
		width: '70%',
		padding: 16,
		marginBottom: 8,
	},

	addImage: {
		width: 80,
		height: 80,
		marginTop: 20,
		marginBottom: 20
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
