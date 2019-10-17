import React, {Fragment,Component,useState, useEffect,useContext} from 'react';
import {
  View,
  Text,Image,FlatList,TouchableOpacity,ScrollView,StyleSheet
} from 'react-native';

const CardView=({navigation,itemName,route})=>{
    return(
       
            <TouchableOpacity onPress={()=>navigation.navigate(route)}>
            <View style={{borderColor:'#75716e',borderWidth: 1,borderRadius:5,margin:5}}>
                <Text style={{fontSize:20}}>{itemName}</Text>
            </View>
            </TouchableOpacity>
       
    )
}

export default CardView;