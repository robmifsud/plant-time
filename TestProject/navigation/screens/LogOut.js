import * as React from 'react';
import {  ScrollView, View, Text, StyleSheet, PixelRatio, TouchableOpacity, } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from "@react-navigation/native";
import * as globalStyles from '../../styles/globalStyles';

export default function LogOut({navigation}){
    const navigator = useNavigation();

    // Function to handle user log out
    const logout = async() => {
        await signOut(getAuth()).catch(error => console.log('signOut error: ', error));
    }

    return(
        // Prompt user to log out of application
        <ScrollView style={{}}>
            <View style={styles.container}>
                <View style={styles.prompt}>
                    <Text style={styles.title}>
                        Are your sure you want to Log Out?
                    </Text>
                </View>
                <TouchableOpacity style={styles.logOutButton} onPress={logout}>
                    <Text style={styles.text}>
                        Log Out
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeBtn} onPress={navigator.goBack}>
                    <Text style={[styles.text, {color: 'white'}]}>
                        Close
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container : {
        flexDirection: 'column',
        flex:1, 
        padding: PixelRatio.getPixelSizeForLayoutSize(8),
    },
    logOutButton: {
        width: '100%',
        alignItems: 'center', 
        backgroundColor:'white', 
        padding: "3%", 
        borderRadius: 4, 
        elevation: globalStyles.elevation, 
        shadowColor: 'black', 
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(6)
    },
    closeBtn: {
        alignItems: 'center',
        width: '100%',
        backgroundColor: globalStyles.primary,
        padding: "3%",
        borderRadius: 4,
        elevation: globalStyles.elevation,
        shadowColor: 'black',
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(5)
    },
    title : {
        fontSize: PixelRatio.getPixelSizeForLayoutSize(8), 
        fontWeight: 'bold', 
    },
    prompt: {
        borderRadius: 4,
        padding: PixelRatio.getPixelSizeForLayoutSize(7),
        width: '100%',
        backgroundColor: 'white',
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(10)
    },
    text: {
        fontSize: PixelRatio.getPixelSizeForLayoutSize(7)
    },
});
