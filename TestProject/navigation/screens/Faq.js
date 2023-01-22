import * as React from 'react';
import { Text, StyleSheet, FlatList, PixelRatio, TouchableOpacity, SafeAreaView } from 'react-native';
import {useNavigation} from "@react-navigation/native";
import * as globalStyles from '../../styles/globalStyles';
import AccordionItem from '../../components/AccordionItem';

export default function Faq({navigation}){
    const navigator = useNavigation();

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

    return(
        <SafeAreaView style={styles.container}>
            <FlatList
                data = {data}
                keyExtractor = {(item) => item.id.toString()}
                renderItem = {({item}) => (<AccordionItem title= {item.title} bodyText = {item.body}/>
                )}
            />
            <TouchableOpacity style={{alignItems: 'center', backgroundColor: globalStyles.primary, paddingVertical: "3%", marginHorizontal:10, borderRadius: 10, elevation: 10, shadowColor: 'black', marginBottom: "5%"}} onPress={navigator.goBack}>
                <Text style={{color: 'white', fontSize: PixelRatio.getPixelSizeForLayoutSize(7)}}>
                    Close
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        paddingHorizontal: 10,
        marginTop: 20,
    }
});