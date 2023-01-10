import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Feather';

const PlantComponent = (props) => {
    const [plantName, setPlantName] = useState();
    const [plant, setPlant] = useState(null);
    // props.plant.get().then((documentSnapshot) => {
    //     const tempPlantName = documentSnapshot.get('plantName');
    //     // setPlantName(tempPlantName);
    //     setPlant(documentSnapshot);
    //     // console.log('Plant exists: ', documentSnapshot.exists);
    // })

    useEffect(() => {
        props.plant.get().then((documentSnapshot) => {
            setPlant(documentSnapshot);
            // console.log('Plant exists: ', documentSnapshot.exists);
        })
    }, []);

    return (
        <View style={styles.section}>
        <View style={styles.bottomcard}>
            <View style={styles.upperbox}>
                { plant ? (
                    <Text style={styles.titlebox}>{plant.get('plantName')}</Text>

                ) : (
                    <Text style={styles.titlebox}>...</Text>
                )}
                {/* <Text style={styles.titlebox}>{plantName}</Text> */}
                <Icon3 style={styles.iconbox} name='smile' size={80} />
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
                        onPress={() => navigation.navigate('All Plants')}
                        android_ripple={{ borderless: true, radius: 20 }}
                    >
                        <Icon name='pencil' size={50} />
                        <Text style={styles.subtitlebox}>Edit</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    </View>
    );

};

export default PlantComponent;
