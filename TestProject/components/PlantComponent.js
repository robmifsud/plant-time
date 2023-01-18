import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

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
    }

    return ( 
        <View style={styles.bottomcard}>
            <View style={styles.upperbox}>
                { plant ? (
                    <Text style={styles.titlebox}>{plant.plantName}</Text>

                ) : (
                    <Text style={styles.titlebox}>...</Text>
                )}
                
                <Image 
                    source={{uri: plant.plantImage}}
                    style={styles.plantImg}
                />
            </View>
            <View style={styles.lowerbox}>
                <View>
                    <Pressable
                        style={styles.box} 
                        onPress={() => navigation.navigate('All Plants')}
                        android_ripple={{ borderless: true, radius: 20 }}
                    >
                        <Icon name='list' size={50} />
                        <Text style={styles.subtitlebox}>Details</Text>
                    </Pressable>
                </View>
                <View>
                    <Pressable
                        style={styles.box}
                        onPress={editPlant}
                        android_ripple={{ borderless: true, radius: 20 }}
                    >
                        <Icon name='pencil' size={50} />
                        <Text style={styles.subtitlebox}>Edit</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );

};

export default PlantComponent;

const styles = StyleSheet.create({
    plantImg : {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 10
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
        padding: 20,
        marginTop: 10,
        borderColor: '#fbeed5',
        borderWidth: 2,
        marginBottom: 10,
    },
    upperbox: {
        alignItems: 'center',
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconbox: {
        padding: 10,
    },
    lowerbox: {
        borderColor: '#fbeed5',
        borderTopWidth: 2,
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subtitlebox: {
        marginLeft: 10,
        fontSize: 25,
    },
    titlebox: {
        marginLeft: 10,
        fontSize: 25,
        fontWeight: 'bold',
    },
    flexrow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    icon: {
        color: '#ffb74d',
        marginRight: 10,
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