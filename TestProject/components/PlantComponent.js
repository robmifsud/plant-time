import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Feather';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';;

const PlantComponent = (props) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [plant, setPlant] = useState({});

    useEffect(() => {;
        setPlant(props.plant);

        const fetchImage = async() => {            
            getDownloadURL(ref(getStorage(), plant.id))
            .then(url => {
                console.log('Image url: ', url);
                setImageUrl(url);
            })
            .catch(error => console.log('Errow while fetching image: ', error))
        }

        fetchImage();
        
    }, []);

    return (
        <View style={styles.section}>
        <View style={styles.bottomcard}>
            <View style={styles.upperbox}>
                { plant ? (
                    <Text style={styles.titlebox}>{plant.plantName}</Text>

                ) : (
                    <Text style={styles.titlebox}>...</Text>
                )}
                {
                    imageUrl ? (<Image source={imageUrl}/>)
                    : (<View></View>)
                }
                
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
