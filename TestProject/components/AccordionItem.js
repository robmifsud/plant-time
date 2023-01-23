import React from 'react';
import {View, StyleSheet, Text, Pressable, PixelRatio} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as globalStyles from '../styles/globalStyles';

const AccordionItem = ({title, bodyText}) => {
    const[showContent, setShowContent] = React.useState(false);

    let iconName;
    if(showContent==false){
        iconName = 'chevron-down-circle-outline'
    }else if(showContent==true){
        iconName = 'chevron-up-circle'
    }

    return (
        <View style={styles.card}>
            <Pressable onPress={()=> setShowContent(!showContent)}>
                <View style={styles.row}>
                    <Text style={styles.text}>{title}</Text>
                    <Icon style={styles.icon} name= {iconName} size={30}/>
                </View>
            </Pressable>
            {showContent && (
                <View style={styles.bodycontainer}>
                    <Text style={{padding: "4%"}}>{bodyText}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card:{
        backgroundColor: 'white', 
        borderRadius: 4, 
        elevation: globalStyles.elevation, 
        marginTop:5,
        marginBottom: 15, 
        overflow: 'hidden',
        marginHorizontal: 10,
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text:{
        flex: 8,
        padding: 14, 
        fontWeight: 'bold', 
        fontSize: PixelRatio.getPixelSizeForLayoutSize(7),
    },
    icon: {
        flex: 1,
        paddingLeft:"2%",
        paddingRight: "2%", 
    },
    bodycontainer: {
        borderTopWidth: 1,
        marginTop: 5,
        borderColor: '#E3E3E3',
    },
});

export default AccordionItem;