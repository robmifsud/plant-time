import * as React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import MainContainer from './navigation/MainContainer';
import auth from '@react-native-firebase/auth';
import 'expo-dev-client';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useState, useEffect } from 'react';

function App(){
  GoogleSignin.configure({
    webClientId: '1059978339008-m5d4l8bv1hlgf3a20auu1i3orrqgpcmo.apps.googleusercontent.com',
  });

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential)
    
    user_sign_in.then((user) =>{
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    })
  }

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
        <GoogleSigninButton
          style={{width:300, height: 65, marginTop:300, padding: 12}}
          onPress={onGoogleButtonPress}
        />
      </View>
    );
  }
  // else
  return(
    // <View style={styles.container}>
    //   <View style={{marginTop:100, alignItems:'center'}}>
    //     <Text style={styles.Text}> Welcome, {user.displayName}</Text>
    //     <Image
    //       source={{uri: user.photoURL}}
    //       style={{height:300, width:300, borderRadius:150, margin:50}}
    //     />
    //   </View>
    // </View>
    <MainContainer>

    </MainContainer>
  )
  
  return(
    <MainContainer>

    </MainContainer>
  );
}

export default App;