import * as React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import MainContainer from './navigation/MainContainer';
import 'expo-dev-client';
import { useState, useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from 'firebase/auth';

function App(){
  initializeApp({
    apiKey: "AIzaSyBHdOM8KSVqQpFdVqFDbMXh1O3DF0fwphw",
    authDomain: "planttime-87863.firebaseapp.com",
    projectId: "planttime-87863",
    storageBucket: "planttime-87863.appspot.com",
    messagingSenderId: "1059978339008",
    appId: "1:1059978339008:web:991ab7113dca64dd218325",
    measurementId: "G-61NH9WW1E4"
  });

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: '1059978339008-m5d4l8bv1hlgf3a20auu1i3orrqgpcmo.apps.googleusercontent.com'
  });

  const [user, setUser] = useState();

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
    },
  });
  
  if(!user){
    return (
      <View style={styles.container}>
        <Button
          disabled={!request}
          title="Login"
          onPress={() => {
            promptAsync();
          }}
          />
      </View>
    );
  }

  return(
    <MainContainer>

    </MainContainer>
  )
  
}

export default App;