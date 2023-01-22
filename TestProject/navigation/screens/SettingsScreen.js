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

    const logout = async() => {
        navigator.push('LogOut')
    }
    const faq = async() => {
        navigator.push('Faq')
    }
    
    const styles = StyleSheet.create({
      modalcontainer:{
        flex: 1,
      },
      titlemodal:{
          paddingTop: 60,
          paddingBottom: 20,
          fontSize: 25,
          color: '#000000',
          fontWeight: 'bold',
      },
      subtitlemodal:{
          fontSize: 20,
          color: '#000000'
      },
      text: {
          fontSize: 25,
          color: '#000000'
      },
      card: {
          margin: 8,
          borderColor: "#000000",
          borderWidth: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: 'space-between',
      },
      iconbox: {
          padding: 10,
      },
      lowerbox: {
          borderColor: "#fbeed5",
          borderTopWidth:2,
          paddingTop: 10,
          flexDirection: "row",
          justifyContent: 'space-between',
      },
      box: {
          flexDirection: "row",
          alignItems: "center",
      },
      subtitlebox: {
          marginLeft: 10,
          fontSize: 25,
      },
      titlebox: {
          marginLeft: 10,
          fontSize: 35,
          fontWeight: 'bold',
      },
      flexrow: {
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
      },
      icon: {
          color: '#000000',
          marginRight: 20,
          paddingLeft: 20,
      },
      pressable: {
          right: 0
      },
      section: {
          paddingTop: 40,
          marginBottom: 40,
      },
      uppercard: {
          justifyContent: 'space-between',
          flexDirection: "row",
          alignItems:'flex-end',
      },
      containermain: {
          flex:1,
          backgroundColor:'white',
          paddingTop: 40,
          paddingBottom: 40,
          paddingLeft: 20,
          paddingRight: 20,
      },
      });

    return(
      <View style={{flex:1, paddingTop: 20, paddingLeft: "4%", paddingRight: "4%",}}>
        <View style={{marginBottom: "20%",}}>
            <TouchableOpacity style={{borderColor: "#000000", backgroundColor:globalStyles.primary, padding: "3%", borderRadius: 10, elevation: 10, shadowColor: 'black', margin:8 }} onPress={logout} android_ripple={{borderless:true, radius:20}}>
                <View style={{alignItems: "center", flexDirection: "row",}}>
                    <Icon style = {{color: 'white', marginLeft: "5%", marginRight: "5%"}} name= 'log-out-outline' size={PixelRatio.getPixelSizeForLayoutSize(12)}/>
                    <Text style={{color: 'white', fontSize: PixelRatio.getPixelSizeForLayoutSize(7)}}>
                        Log Out
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={{borderColor: "#000000", backgroundColor:globalStyles.primary, padding: "3%", borderRadius: 10, elevation: 10, shadowColor: 'black', margin:8 }} onPress={faq} android_ripple={{borderless:true, radius:20}}>
                <View style={{alignItems: "center", flexDirection: "row",}}>
                    <Icon style = {{color: 'white', marginLeft: "5%", marginRight: "5%"}} name= 'help-circle-outline' size={PixelRatio.getPixelSizeForLayoutSize(12)}/>
                    <Text style={{color: 'white', fontSize: PixelRatio.getPixelSizeForLayoutSize(7)}}>
                        FAQ
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
    );
}
