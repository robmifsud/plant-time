import * as React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Image, LogBox } from 'react-native';
import MainContainer from './navigation/MainContainer';
import 'expo-dev-client';
import { useState, useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from 'firebase/auth';

// global.__DEV__ = false;

function App(){
  // console. disableYellowBox = true
  LogBox.ignoreAllLogs()

  // Initialise Firebase instance
  initializeApp({
    apiKey: "AIzaSyBHdOM8KSVqQpFdVqFDbMXh1O3DF0fwphw",
    authDomain: "planttime-87863.firebaseapp.com",
    projectId: "planttime-87863",
    storageBucket: "planttime-87863.appspot.com",
    messagingSenderId: "1059978339008",
    appId: "1:1059978339008:web:991ab7113dca64dd218325",
    measurementId: "G-61NH9WW1E4"
  });

  // Initialise google authentication methods
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: '1059978339008-m5d4l8bv1hlgf3a20auu1i3orrqgpcmo.apps.googleusercontent.com'
  });

  const [user, setUser] = useState();

  // Check if user is logged in on render, show login page if not logged in
  useEffect(() => {

    onAuthStateChanged(getAuth(), (user) => {
      setUser(user);
      if(user){
        console.log('User is logged in')
      } else{
        console.log('User is not logged in')
      }
    })

    if (response?.type === 'success') {
      try {
        const { id_token }  = response.params;
        const auth = getAuth();
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential).catch(error => console.log('signInWithCredential Error: ', error));
      } catch (error) {
        console.log('Auth Try Catch error:', error);
      }
    }
  }, [response]);

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
    plantText: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#80b742',
    },
    timeText: {
    fontSize: 32,
    fontWeight: 'regular',
    textAlign: 'center',
    color: '#000',
    },
    subtitle: {
      fontSize: 18,
      textAlign: 'center',
      color: '#888',
      marginTop: 8,
    },
    button: {
      backgroundColor: '#fff',shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      
      elevation: 4,
      
      elevation: 10,
      padding: 12,
      borderRadius: 4,
      marginTop: 24,
      alignItems: 'center',
      flexDirection: 'row'
    },
    logoContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 150,
    },
    
    logo: {
      width: 200,
      height: 200,
      resizeMode: 'contain',
    },
    glogo: {
      width: 20,
      height: 20,
      marginRight: 8
    },
    buttonText: {
      fontSize: 18,
      fontWeight: '500',
      color: '#000',
    },
  });
  
  if(!user){
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
      <Image source={require('./assets/images/logo.png')} style={styles.logo} /><
        View style={styles.textContainer}>
        <Text style={styles.plantText}>Plant</Text>
        <Text style={styles.timeText}>Time</Text>
        </View>
        <Text style={styles.subtitle}>Grow Smart, Monitor Easily</Text>
        </View>
      
        <TouchableOpacity style={styles.button} disabled={!request} onPress={() => {
            promptAsync();
          }}>

          <Image source={require('./assets/images/googil.png')} style={styles.glogo} />
          <Text style={styles.buttonText}>Continue with Google</Text>
          </TouchableOpacity>

      </View>
    );
  }

  return(
    <MainContainer>

    </MainContainer>
  )
  
}

export default App;