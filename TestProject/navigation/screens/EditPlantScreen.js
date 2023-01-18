import * as React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Image,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Fontisto';

export default function AddPlantsScreen({ navigation }) {
	return (
		<View style={styles.inputContainer}>
			{/* <Image
				style={styles.plantImage}
				source={require('../../assets/images/daisy.png')}
			/> */}

			<View>
				<Text style={styles.changeImageText}>Change image</Text>
			</View>

			<View style={styles.textInput}>
				<TextInput placeholder='Name' fontSize={20} />
			</View>
			<View style={styles.textInput}>
				<TextInput placeholder='Species' fontSize={20} />
			</View>

			<View style={styles.buttonContainer}>
				<TouchableOpacity onPress={''} style={styles.buttonClickContain}>
					<View style={styles.button}>
						<Icon name='thermometer-1' size={25} style={styles.icon} />
						<Text style={styles.buttonText}>Temp_1</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={''} style={styles.buttonClickContain}>
					<View style={styles.button}>
						<Icon name='tint' size={25} style={styles.icon} />
						<Text style={styles.buttonText}>Humd_23</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={''} style={styles.buttonClickContain}>
					<View style={styles.button}>
						<Icon2 name='day-sunny' size={15} style={styles.icon} />
						<Text style={styles.buttonText}>Sun_10</Text>
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

	changeImageText: {
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

	plantImage: {
		width: 80,
		height: 80,
		marginTop: 20,
		marginBottom: 10,
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
