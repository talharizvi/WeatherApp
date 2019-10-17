import React, {Fragment,Component,useState, useEffect,useContext} from 'react';
import {
  View,
  Text,Image,FlatList,TouchableOpacity,ScrollView,StyleSheet
} from 'react-native';

const ItemView=({itemName,backgroundColor})=>{
    return(
      
            <View style={{backgroundColor:backgroundColor,margin:5,borderColor:'#75716e',borderWidth: 1,borderRadius:5}}>
                <Text style={{fontSize:25}}>{itemName}</Text>
            </View>
         
    )
}

export default ItemView;