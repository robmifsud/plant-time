import * as React from 'react';
import { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	ScrollView,
	Image,
	Dimensions,
	TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { browserPopupRedirectResolver } from '@firebase/auth';
import {
	Card,
	Title,
	Paragraph,
	LeftContent,
	Button,
} from 'react-native-paper';

const { width, height } = Dimensions.get('window');
const PlantComponent = (props) => {
	const [imageUrl, setImageUrl] = useState(null);
	const [plant, setPlant] = useState({});
	const navigation = useNavigation();

	useEffect(() => {
		setPlant(props.plant);
	});

	const editPlant = () => {
		navigation.push('Edit Plant', {
			ogPlant: plant,
		});
	};

	return (
		<View style={styles.bottomcard}>
			<Card
				style={{
					backgroundColor: '#3a5a40',
					shadowColor: 'black',
					shadowOffset: {
						width: 0,
						height: 1,
					},
					shadowOpacity: 0.23,
					shadowRadius: 2.62,
				}}
			>
				<Card.Cover
					source={{ uri: plant.plantImage }}
					style={{
						borderBottomEndRadius: 0,
						borderBottomLeftRadius: 0,
						backgroundColor: 'white',
					}}
				/>
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						flexWrap: 'wrap',
						justifyContent: 'space-between',
						width: '100%',
					}}
				>
					<View style={styles.textContainer}>
						{plant ? (
							<Text style={styles.titlebox}>{plant.plantName}</Text>
						) : (
							<Text style={styles.titlebox}>...</Text>
						)}
					</View>
					<View style={styles.iconContainer}>
						<Pressable
							style={{ marginTop: 4 }}
							android_ripple={{ borderless: true, radius: 20 }}
						>
							<Icon name='pencil' color='white' size={25} onPress={editPlant} />
						</Pressable>
						<Pressable style={styles.box} android_ripple={{ borderless: true, radius: 20 }}>
							<Icon name='list' color='white' size={35} />
						</Pressable>
					</View>
				</View>
			</Card>
		</View>
	);
};

export default PlantComponent;

const styles = StyleSheet.create({
	textContainer: {
		padding: 16,
		//
	},

	iconContainer: {
		flexDirection: 'row',
		padding: 12,
	},

	// Unused
	buttonContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	plantImg: {
		//width: 100,
		//height: 100,
		//borderRadius: 50,
		//margin: 10,
		height: 125,
		width: 125,
	},
	subtitle: {
		fontSize: 30,
		fontWeight: 'bold',
		padding: 10,
		paddingBottom: 0,
		paddingLeft: 20,
	},
	subtitlebutton: {
		paddingBottom: 0,
		fontSize: 25,
		fontWeight: 'bold',
		padding: 10,
	},
	notification: {
		fontSize: 18,
		textDecorationLine: 'underline',
		color: '#ffb74d',
	},
	notificationcard: {
		backgroundColor: '#fcf8e3',
		margin: 8,
		borderColor: '#fbeed5',
		borderWidth: 2,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	bottomcard: {
		// borderRadius: 15,
		// padding: 0,
		// marginTop: 10,
		// marginBottom: 10,
		// width: width * 0.9,
		// backgroundColor: 'white',
		// overflow: 'hidden',
		// height: 100,
		width: width * 0.95,
		marginBottom: 20,
	},
	upperbox: {
		flex: 1,
		alignItems: 'flex-start',
		//paddingBottom: 10,
		flexDirection: 'row',
		//justifyContent: 'space-between',
		//borderWidth: 1,
		alignSelf: 'stretch',
		borderColor: 'green',
	},
	iconbox: {
		padding: 10,
	},
	lowerbox: {
		borderColor: 'red',
		borderTopWidth: 2,
		paddingTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	box: {
		// flexDirection: 'row',
		// alignItems: 'center',
		marginLeft: 12,
		// marginRight: 1,
	},
	subtitlebox: {
		marginLeft: 10,
		fontSize: 25,
		borderWidth: 2,
		//borderColor: 'green',
	},
	titlebox: {
		fontSize: 18,
		fontWeight: '600',
		//borderWidth: 1,
		//marginTop: 25,
		//marginBottom: 5,
		color: 'white',
	},
	flexrow: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
	},

	close: {
		color: '#ffb74d',
		textAlign: 'right',
		padding: 10,
	},
	pressable: {
		right: 0,
	},
	section: {
		marginBottom: 10,
	},
	uppercard: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	containermain: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: 40,
		paddingBottom: 40,
		paddingLeft: 20,
		paddingRight: 20,
	},
});
