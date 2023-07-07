import * as React from 'react';
import {Button, ScrollView, View, Text, StyleSheet, Pressable, FlatList, PixelRatio, TouchableOpacity, SafeAreaView} from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import * as globalStyles from '../../styles/globalStyles';
import Modal from "react-native-modal";
import AccordionItem from '../../components/AccordionItem';
import {useRoute, useNavigation} from "@react-navigation/native";

export default function SettingsScreen({navigation}){
    const navigator = useNavigation();

    // Handle navigation to log out component
    const logout = async() => {
        navigator.push('LogOut')
    }
    // Handle navigation to FAQ component
    const faq = async() => {
        navigator.push('Faq')
    }
    
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={logout} android_ripple={{borderless:true, radius:20}}>
                <Icon style = {styles.icon} name= 'log-out-outline' size={PixelRatio.getPixelSizeForLayoutSize(12)}/>
                <Text style={styles.text}>
                    Log Out
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={faq} android_ripple={{borderless:true, radius:20}}>
                <Icon style = {styles.icon} name= 'help-circle-outline' size={PixelRatio.getPixelSizeForLayoutSize(12)}/>
                <Text style={styles.text}>
                    FAQ
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: 20, 
        paddingLeft: "4%", 
        paddingRight: "4%",
    },
    button: {
        borderColor: "#000000", 
        backgroundColor:globalStyles.primary, 
        padding: "3%", 
        borderRadius: 6, 
        elevation: globalStyles.elevation, 
        shadowColor: 'black', 
        margin:8,
        alignItems: "center", 
        flexDirection: "row",
    },
    icon: {
        color: 'white',
        marginLeft: "5%", 
        marginRight: "5%"
    },
    text: {
        color: 'white', 
        fontSize: PixelRatio.getPixelSizeForLayoutSize(7),
    },
});