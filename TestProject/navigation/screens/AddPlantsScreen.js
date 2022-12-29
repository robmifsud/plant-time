import * as React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Image,
	Pressable,
} from 'react-native';

export default function AddPlantsScreen({ navigation }) {
	return (
		<View style={styles.inputContainer}>
			<Image
				style={styles.addImage}
				source={require('../../assets/images/add-image-icon.png')}
			/>

			<View>
				<Text style={styles.addImageText}>Add image</Text>
			</View>

			<View style={styles.textInput}>
				<TextInput placeholder='Name' fontSize={20} />
			</View>
			<View style={styles.textInput}>
				<TextInput placeholder='Species' fontSize={20} />
			</View>

			<View style={styles.buttonContainer}>
				<Pressable style={styles.button}>
					<Text style={styles.buttonText}>Add temperature sensor</Text>
				</Pressable>

				<Pressable style={styles.button}>
					<Text style={styles.buttonText}>Add soil moisture</Text>
				</Pressable>

				<Pressable style={styles.button}>
					<Text style={styles.buttonText}>Add temperature sensor</Text>
				</Pressable>

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

	addImageText: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 30,
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
	},

	buttonContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},

	button: {
		backgroundColor: 'black',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 64,
		width: '70%',
		marginTop: 40,
		padding: 16,
	},

	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},

	doneImage: {
		width: 80,
		height: 80,
		marginTop: 20,
	},
});
