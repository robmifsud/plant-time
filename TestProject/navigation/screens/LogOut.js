import * as React from 'react';
import {  ScrollView, View, Text, StyleSheet, PixelRatio, TouchableOpacity, } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from "@react-navigation/native";
import * as globalStyles from '../../styles/globalStyles';

export default function LogOut({navigation}){
    const navigator = useNavigation();

    const logout = async() =>{
        await signOut(getAuth()).catch(error => console.log('signOut error: ', error));
    }

    const styles = StyleSheet.create({
        container : {
            flex:1, 
            marginTop: '5%',
            paddingLeft: "4%", 
            paddingRight: "4%", 
            marginBottom: "20%",
        },
        title : {
            fontSize: PixelRatio.getPixelSizeForLayoutSize(8), 
            borderBottomColor: '#3a5a40', 
            borderBottomWidth: 1, 
            paddingBottom: 7, 
            fontWeight: 'bold', 
            paddingLeft: "4%", 
            paddingRight: "4%", 
            marginBottom: "4%"
        },
        // floatingTitle : {
        //     fontSize: PixelRatio.getPixelSizeForLayoutSize(8), 
        //     padding: PixelRatio.getPixelSizeForLayoutSize(16),
        //     borderRadius : PixelRatio.getPixelSizeForLayoutSize(8),
        //     elevation: 10,
        // }
    });

    return(
        <View style={styles.container}>
            <ScrollView style={{}}>
                <Text style={styles.title}>
                    Are your sure you want to Log Out?
                </Text>
                <View style={{paddingLeft: "4%", paddingRight: "4%"}}>
                    <TouchableOpacity style={{alignItems: 'center', backgroundColor:'white', padding: "3%", borderRadius: 4, elevation: globalStyles.elevation, shadowColor: 'black', margin:8, marginBottom: "5%"}} onPress={logout}>
                    <Text style={{color: 'black', fontSize: PixelRatio.getPixelSizeForLayoutSize(7)}}>
                        Log Out
                    </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{alignItems: 'center', backgroundColor: globalStyles.primary, padding: "3%", borderRadius: 4, elevation: globalStyles.elevation, shadowColor: 'black', margin:8, marginBottom: "5%"}} onPress={navigator.goBack}>
                    <Text style={{color: 'white', fontSize: PixelRatio.getPixelSizeForLayoutSize(7)}}>
                        Close
                    </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
