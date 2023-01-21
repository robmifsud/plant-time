import * as React from 'react';
import {Button, ScrollView, View, Text, StyleSheet, Pressable, FlatList, PixelRatio, TouchableOpacity} from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import AccordionItem from '../../components/AccordionItem';

export default function SettingsScreen({navigation}){

    const [isModalFAQVisible, setIsModalFAQVisible] = React.useState(false);
    const [isModalChangePasswordVisible, setIsModalChangePasswordVisible] = React.useState(false);

    const handleFAQModal = () => setIsModalFAQVisible(() => !isModalFAQVisible);
    const handleChangePasswordModal = () => setIsModalChangePasswordVisible(() => !isModalChangePasswordVisible);

    const data = [
      {
          id: 0,
          title: 'How do you add a Plant?',
          body: "To add a plant simply",
      },
      {
          id: 1,
          title: 'How do I add a Plant sensor?',
          body: "To add a plant simply",
      },
      {
          id: 2,
          title: 'How do I identify the state of my plant?',
          body: "To add a plant simply",
      },
    ];

    const logout = async() =>{
        await signOut(getAuth()).catch(error => console.log('signOut error: ', error));
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
      <View style={{flex:1, paddingTop: "10%", paddingLeft: "4%", paddingRight: "4%",}}>
        <View style={{marginBottom: "20%",}}>
            <Pressable style={{borderColor: "#000000", backgroundColor:'#3a5a40', padding: "3%", borderRadius: 10, elevation: 10, shadowColor: 'black', margin:8 }} onPress={handleChangePasswordModal} android_ripple={{borderless:true, radius:20}}>
                <View style={{alignItems: "center", flexDirection: "row",}}>
                    <Icon style = {{color: 'white', marginLeft: "5%", marginRight: "5%"}} name= 'log-out-outline' size={PixelRatio.getPixelSizeForLayoutSize(12)}/>
                    <Text style={{color: 'white', fontSize: PixelRatio.getPixelSizeForLayoutSize(7)}}>
                        Log out
                    </Text>
                </View>
            </Pressable>
            <Modal style = {{margin: 0, backgroundColor: "#FDFDF7" }} isVisible={isModalChangePasswordVisible}>
                <ScrollView style={{}}>
                    <Text style={{paddingTop: "5%",backgroundColor:'white', fontSize: PixelRatio.getPixelSizeForLayoutSize(8), borderBottomColor: '#3a5a40', borderBottomWidth: 1, paddingBottom: 7, fontWeight: 'bold', paddingLeft: "4%", paddingRight: "4%", marginBottom: "4%"}}>
                        Do you wish to log out?
                    </Text>
                    <View style={{paddingLeft: "4%", paddingRight: "4%"}}>
                      <Pressable style={{alignItems: 'center', backgroundColor:'white', padding: "3%", borderRadius: 10, elevation: 10, shadowColor: 'black', margin:8, marginBottom: "5%"}} onPress={logout}>
                        <Text style={{color: 'black', fontSize: PixelRatio.getPixelSizeForLayoutSize(7)}}>
                            Log out
                        </Text>
                      </Pressable>
                      <Pressable style={{alignItems: 'center', backgroundColor:'#3a5a40', padding: "3%", borderRadius: 10, elevation: 10, shadowColor: 'black', margin:8, marginBottom: "5%"}} onPress={handleChangePasswordModal}>
                        <Text style={{color: 'white', fontSize: PixelRatio.getPixelSizeForLayoutSize(7)}}>
                            Close
                        </Text>
                      </Pressable>
                    </View>                       
                    
                </ScrollView>
            </Modal>
            <Pressable style={{borderColor: "#000000", backgroundColor:'#3a5a40', padding: "3%", borderRadius: 10, elevation: 10, shadowColor: 'black', margin:8 }} onPress={handleFAQModal} android_ripple={{borderless:true, radius:20}}>
                <View style={{alignItems: "center", flexDirection: "row",}}>
                    <Icon style = {{color: 'white', marginLeft: "5%", marginRight: "5%"}} name= 'help-circle-outline' size={PixelRatio.getPixelSizeForLayoutSize(12)}/>
                    <Text style={{color: 'white', fontSize: PixelRatio.getPixelSizeForLayoutSize(7)}}>
                        FAQ
                    </Text>
                </View>
            </Pressable>
            <Modal style = {{margin: 0, backgroundColor: "#FDFDF7"}} isVisible={isModalFAQVisible}>
                <ScrollView style={{}}>
                    <Text style={{paddingTop: "5%", backgroundColor:'white' ,fontSize: PixelRatio.getPixelSizeForLayoutSize(8), borderBottomColor: '#3a5a40', borderBottomWidth: 1, paddingBottom: 7, fontWeight: 'bold', paddingLeft: "4%", paddingRight: "4%", marginBottom: "4%"}}>
                        FAQ:
                    </Text>
                    <View style={{paddingLeft: "4%", paddingRight: "4%"}}>
                        <FlatList
                            data = {data}
                            keyExtractor = {(item) => item.id.toString()}
                            renderItem = {({item}) => (<AccordionItem title= {item.title} bodyText = {item.body}/>
                            )}
                        />
                        <Pressable style={{alignItems: 'center', backgroundColor:'#3a5a40', padding: "3%", borderRadius: 10, elevation: 10, shadowColor: 'black', marginBottom: "5%"}} onPress={handleFAQModal}>
                            <Text style={{color: 'white', fontSize: PixelRatio.getPixelSizeForLayoutSize(7)}}>
                                Close
                            </Text>
                        </Pressable>
                    </View>
                    
                </ScrollView>
            </Modal>
        </View>
    </View>
    );
}