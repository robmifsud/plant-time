import * as React from 'react';
import { Text, StyleSheet, PixelRatio, TouchableOpacity, ScrollView, View } from 'react-native';
import {useNavigation} from "@react-navigation/native";
import * as globalStyles from '../../styles/globalStyles';
import AccordionItem from '../../components/AccordionItem';

export default function Faq({navigation}){
    // Fetches FAQ data and relays to relevant components
    const navigator = useNavigation();

    const data = [
        {
            id: 0,
            title: 'How do you add a plant?',
            body: "To add a plant, go to the 'Add Plants' page and add an image, name, species and sensor of your new plant. Press the 'Submit Plant' button to create the new Plant. ",
        },
        {
            id: 1,
            title: 'How do I edit plant details?',
            body: "To edit plant details, go to the 'All Plants' page or the 'Home Screen' page. Press the 'pencil' icon for the plant that you want to edit. Edit the plant as needed and press 'Update Plant' button.",
        },
        {
            id: 2,
            title: 'How do I view all the plants?',
            body: "To view all the plants, go to the 'All Plants' page or the 'Home Screen' page and press the 'View All' button. ",
        },
        {
            id: 3,
            title: 'How do I view the status of a plant?',
            body: "To view the status of the plant, locate a plant either from the 'Home Screen' page or the 'All Plants' page. Press the 'list' icon for the plant that you want to view. The status of the plant will be displayed.",
        },
        {
            id: 4,
            title: 'How do I irrigate a plant?',
            body: "To irrigate a plant, locate a plant and press the 'details' icon. A screen will appear, press the 'irrigate' button to irrigate a plant.",
        },
        {
            id: 5,
            title: 'How do I log out from the app?',
            body: "To log out, go to the 'Settings' page and press the 'Log out' button. A screen will appear, press the 'Log out' button to log out.",
        },
    ];

    return(
        <ScrollView style={styles.container}>
            {data.map((item) =>(
                <View key={item.id}>
                    <AccordionItem title= {item.title} bodyText = {item.body}/>
                </View>
            ))}
            <TouchableOpacity style={{alignItems: 'center', backgroundColor: globalStyles.primary, paddingVertical: "3%", marginHorizontal:10, borderRadius: 4, elevation: globalStyles.elevation, shadowColor: 'black', marginBottom: 40, marginTop:10}} onPress={navigator.goBack}>
                <Text style={{color: 'white', fontSize: PixelRatio.getPixelSizeForLayoutSize(7)}}>
                    Close
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        paddingHorizontal: 10,
        paddingTop: 20,
    }
});
