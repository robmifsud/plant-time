import * as React from 'react';
import {View, Text } from 'react-native';

export default function AllPlantsScreen({navigation}){
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text onPress={() => navigation.navigate('All Plants')} style={{fontSize:26, fontWeight: 'bold'}}>
                All Plants Screen
            </Text>
        </View>
    );
}