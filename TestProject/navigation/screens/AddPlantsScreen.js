import * as React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Image,
	TouchableOpacity,
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
				<TouchableOpacity
					onPress={() => {
						/* do this */
					}}
				>
					<View style={styles.button}>
						<Text style={styles.buttonText}>Add temperature sensor</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => {
						/* do this */
					}}
				>
					<View style={styles.button}>
						<Text style={styles.buttonText}>Add soil moisture sensor</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => {
						/* do this */
					}}
				>
					<View style={styles.button}>
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
		paddingTop: 20,
		paddingHorizontal: 16,
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
		marginBottom: 20,
	},

	addImage: {
		width: 150,
		height: 150,
	},

	buttonContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
		width: '100%',
	},

	button: {
		backgroundColor: 'black',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,

		width: 400,
		marginTop: 40,
		padding: 16,
	},

	buttonText: {
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
	},

	doneImage: {
		width: 80,
		height: 80,
		marginTop: 50,
	},
});
