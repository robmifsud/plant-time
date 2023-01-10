import * as React from 'react';
import {View, Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin} from '@react-native-google-signin/google-signin';

export default function SettingsScreen({navigation}){
    const signOut = async () => {
        try{
          await GoogleSignin.revokeAccess();
          await auth().signOut();
        } catch (error){
          console.error(error);
        }
      }

    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title='Sign Out' onPress={signOut}/>
            <Text onPress={() => navigation.navigate('Home')} style={{fontSize:26, fontWeight: 'bold'}}>
                Settings Screen
            </Text>
        </View>
    );
}