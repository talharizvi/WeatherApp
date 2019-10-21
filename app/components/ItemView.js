import React, {Fragment,Component,useState, useEffect,useContext} from 'react';
import {
  View,
  Text,Image,FlatList,TouchableOpacity,ScrollView,StyleSheet
} from 'react-native';
import images from '../res/images';
import UnitContext from '../context/UnitContext';
import Icon from 'react-native-vector-icons/Fontisto';

const ItemView=({itemName,backgroundColor})=>{
  const unitContext=useContext(UnitContext)
    return(
          console.log(unitContext.selectedUnit.defaultUnit),
            <View style={{flexDirection:'row', backgroundColor:backgroundColor,margin:5,borderColor:'#75716e',borderWidth: 1,borderRadius:5,alignItems:'center',justifyContent:'space-between'}}>
                <Text style={{fontSize:25}}>{itemName}</Text>
              
                {chooseImage(itemName,unitContext.selectedUnit.defaultUnit)}
            </View>
         
    )
}

const chooseImage=(itemName,value)=>{
  return(itemName==value?   <Icon name="radio-btn-active" size={20}/> : <Icon name="radio-btn-passive" size={20}/>)
}
 
   
 


export default ItemView;