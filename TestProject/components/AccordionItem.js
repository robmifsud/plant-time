import React from 'react';
import {View, StyleSheet, Text, Pressable, PixelRatio} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AccordionItem = ({title, bodyText}) => {
    const[showContent, setShowContent] = React.useState(false);

    let iconName;
    if(showContent==false){
        iconName = 'chevron-down-circle-outline'
    }else if(showContent==true){
        iconName = 'chevron-up-circle'
    }

    return (
        <View style={{padding: 8}}>
            <View style={{backgroundColor: 'white', borderRadius: 10, elevation: 10, shadowColor: 'black', marginBottom: 10, overflow: 'hidden'}}>
            <Pressable onPress={()=> setShowContent(!showContent)}>
                <View style={{flexDirection: 'row', alignItems: 'center', display: 'flex', overflow:'hidden', justifyContent: "space-between",}}>
                    <Text style={{padding: "4%", fontWeight: 'bold', fontSize: PixelRatio.getPixelSizeForLayoutSize(7)}}>{title}</Text>
                    <Icon style={{paddingLeft:"2%", paddingRight: "2%"}} name= {iconName} size={30}/>
                </View>
            </Pressable>
            {showContent && (
                <View style={styles.bodycontainer}>
                    <Text style={{padding: "4%"}}>{bodyText}</Text>
                </View>
            )}
        </View>
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 12,
        borderColor: 'black',
        marginBottom: 10,
        borderColor: "#000000",
        borderWidth: 1,
        overflow: 'hidden',
    },
    title: {
        fontSize: 20,
        color: '#2d2d2d',
        fontWeight: 'bold',
    },
    bodycontainer: {
        borderTopWidth: 1,
        marginTop: 5,
        borderColor: '#E3E3E3',
    },
    body: {
        paddingTop:5,
        fontSize: 16,
        color: '#2d2d2d',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

export default AccordionItem;


// import React from 'react';
// import {View, StyleSheet, Text, Pressable, PixelRatio} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const AccordionItem = ({title, bodyText}) => {
//     const[showContent, setShowContent] = React.useState(false);

//     let iconName;
//     if(showContent==false){
//         iconName = 'chevron-down-circle-outline'
//     }else if(showContent==true){
//         iconName = 'chevron-up-circle'
//     }

//     return (
//         <View>
//             <View style={styles.container}>
//                 <Text style={styles.red}>
//                     text bla bla bla bla bla bla bla bla bla bla bla bla bla bla
//                 </Text>
//                 <Text style={styles.red}>
//                     icon
//                 </Text>
//             </View>
//         </View>
//         // <View style={{padding: 10, borderRadius: 10, elevation: 7, shadowColor: '#52006A', marginBottom: 20, overflow: 'hidden', backgroundColor: 'white'}}>
//         //     <Pressable onPress={()=> setShowContent(!showContent)}>
//         //         <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', display: 'flex', overflow:'hidden'}}>
//         //             <Text style={{fontSize: PixelRatio.getPixelSizeForLayoutSize(6), color: '#17200F', fontWeight: 'bold',}}>{title}</Text>
//         //             <Text style={{fontSize: PixelRatio.getPixelSizeForLayoutSize(6), color: '#17200F', fontWeight: 'bold',}}>{title}</Text>
//         //             <Icon style={{marginLeft: 20,}} name= {iconName} size={PixelRatio.getPixelSizeForLayoutSize(10)}/>
//         //         </View>
//         //     </Pressable>
//         //     {showContent && (
//         //         <View style={styles.bodycontainer}>
//         //             <Text style={styles.body}>{bodyText}</Text>
//         //         </View>
//         //     )}
//         // </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#000000',
//         flexDirection: 'row', 
//         alignItems: 'center', 
//         display: 'flex', 
//         overflow:'hidden',
//         justifyContent: "space-around",
//       },
//       red: {
//         padding: 10,
//         color: 'red',
//       },

//     // container: {
//     //     padding: 10,
//     //     borderRadius: 10,
//     //     elevation: 7,
//     //     shadowColor: '#52006A',
//     //     marginBottom: 20,
//     //     overflow: 'hidden',
//     //     backgroundColor: 'white',
//     // },
//     // title: {
//     //     fontSize: 20,
//     //     color: '#17200F',
//     //     fontWeight: 'bold',
//     // },
//     // bodycontainer: {
//     //     borderTopWidth: 1,
//     //     marginTop: 5,
//     //     borderColor: '#E3E3E3',
//     // },
//     // body: {
//     //     paddingTop:5,
//     //     fontSize: 16,
//     //     color: '#2d2d2d',
//     // },
//     // titleContainer: {
//     //     flexDirection: 'row',
//     //     alignItems: 'center',
//     //     justifyContent: 'space-between',
//     // },
// });

// export default AccordionItem;