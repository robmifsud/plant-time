import * as React from 'react';
import { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as globalStyles from '../styles/globalStyles'
import { useNavigation } from '@react-navigation/native';
import {
	Card,
} from 'react-native-paper';

const { width, height } = Dimensions.get('window');

// Component to show plant cards on home screen and all plants screen
const PlantComponent = (props) => {
	const [plant, setPlant] = useState({});
	const navigation = useNavigation();

	// Populate state on render
	useEffect(() => {
		setPlant(props.plant);
	});

	// Handle navigation to edit page
	const editPlant = () => {
		navigation.push('EditPlant', {
			ogPlant: plant,
		});
	};

	// Handle navigation to details page
	const details = () => {
		navigation.push('Details', {
			ogPlant: plant,
		});
	};

	return (
		<View style={styles.cardContainer}>
			<Card style={styles.mainContent} onPress={details}>
				<Card.Cover source={{ uri: plant.plantImage }} style={styles.cardCover}/>
				<View style={styles.subContent}>
					<View style={styles.textBox}>
						{plant ? (
							<Text style={styles.text}>{plant.plantName}</Text>
						) : (
							<Text style={styles.text}>...</Text>
						)}
					</View>
					<View style={styles.iconContainer}>
						<TouchableOpacity
							style={[styles.iconButton, styles.editButton]}
							android_ripple={{ borderless: true, radius: 20 }}
							onPress={editPlant}
						>
							<Icon name='pencil' color='white' size={25} />
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.detailsButton, styles.iconButton]}
							android_ripple={{ borderless: true, radius: 20 }}
							onPress={details}
						>
							<Icon name='list' color='white' size={25.5} />
						</TouchableOpacity>
					</View>
				</View>
			</Card>
		</View>
	);
};

export default PlantComponent;

const styles = StyleSheet.create({
	iconButton: {
		padding: 5,
		borderRadius: 6,
		backgroundColor: globalStyles.secondary,
		aspectRatio: 1/1,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: globalStyles.elevation,
	},
	editButton: {
		marginRight: 6,
	},
	detailsButton: {
		marginLeft: 6,
	},

	cardContainer: {
		width: width * 0.95,
		marginBottom: 10,
	},

	mainContent: {
		backgroundColor: globalStyles.primary,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,
		// borderWidth: 1,
		// borderColor: 'red',
	},

	subContent: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		width: '100%',
	},

	textBox: {
		padding: 16,
	},

	text: {
		fontSize: 18,
		fontWeight: '600',
		color: 'white',
	},

	iconContainer: {
		flexDirection: 'row',
		alignSelf: 'flex-end',
		padding: 12,
		marginLeft: 'auto',
	},

	cardCover: {
		backgroundColor: 'transparent',
		elevation: 6
	}
});
