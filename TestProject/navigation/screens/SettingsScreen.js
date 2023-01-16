import * as React from 'react';
import {View, Text, Button } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';

export default function SettingsScreen({navigation}){

    const logout = async() =>{
        await signOut(getAuth()).catch(error => console.log('signOut error: ', error));
    }

    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title='Sign Out' onPress={logout}/>
            <Text onPress={() => navigation.navigate('Home')} style={{fontSize:26, fontWeight: 'bold'}}>
                Settings Screen
            </Text>
        </View>
    );
}