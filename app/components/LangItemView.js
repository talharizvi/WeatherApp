import React, {Fragment,Component,useState, useEffect,useContext} from 'react';
import {
  View,
  Text,Image,FlatList,TouchableOpacity,ScrollView,StyleSheet
} from 'react-native';
import images from '../res/images';
import LanguageContext from '../context/LanguageContext';
import Icon from 'react-native-vector-icons/Fontisto';

const LangItemView=({itemName,backgroundColor,code})=>{
  const languageContext=useContext(LanguageContext)
    return(
          //console.log(languageContext.selectedLang.defaultLang,code),
            <View style={{flexDirection:'row', backgroundColor:backgroundColor,margin:5,borderColor:'#75716e',borderWidth: 1,borderRadius:5,alignItems:'center',justifyContent:'space-between'}}>
                <Text style={{fontSize:25}}>{itemName}</Text>
                {chooseImage(languageContext.selectedLang.defaultLang,code)}
            </View>
    )
}

const chooseImage=(itemName,value)=>{
  return(itemName==value?  <Icon name="radio-btn-active" size={20}/> : <Icon name="radio-btn-passive" size={20}  />)
  
}
 
   
 


export default LangItemView;