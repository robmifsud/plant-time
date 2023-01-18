import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';

export default function SettingsScreen({navigation}){

    const logout = async() =>{
        await signOut(getAuth()).catch(error => console.log('signOut error: ', error));
    }
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 300,
        },
        textContainer: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        button: {
          backgroundColor: '#fff',shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          
          elevation: 10,
          padding: 12,
          borderRadius: 5,
          marginTop: 24,
          alignItems: 'center',
          flexDirection: 'row'
        },
        buttonText: {
          fontSize: 18,
          fontWeight: '500',
          color: '#000',
        },
      });

    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
        <TouchableOpacity style={styles.button} onPress={logout}>
            <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
    </View>
)
    

    // <TouchableOpacity style={styles.button} disabled={!request} onPress={() => {
    //     promptAsync();
    //   }}>

    // <View style={styles.container}>
    //     <View style={styles.logoContainer}>
    //   <Image source={require('./assets/images/logo.png')} style={styles.logo} /><
    //     View style={styles.textContainer}>
    //     <Text style={styles.plantText}>Plant</Text>
    //     <Text style={styles.timeText}>Time</Text>
    //     </View>
    //     <Text style={styles.subtitle}>Manage your garden!</Text>
    //     </View>
      
    //     <TouchableOpacity style={styles.button} disabled={!request} onPress={() => {
    //         promptAsync();
    //       }}>

    //       <Image source={require('./assets/images/googil.png')} style={styles.glogo} />
    //       <Text style={styles.buttonText}>Continue with Google</Text>
    //       </TouchableOpacity>
}