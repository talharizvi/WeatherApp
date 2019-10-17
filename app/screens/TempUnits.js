import React, {useContext,useState, useEffect} from 'react';
import {
  View,
  Text,Image,Switch, TouchableOpacity,StyleSheet
} from 'react-native';
import ItemView from '../components/ItemView';
import UnitContext from '../context/UnitContext';
import AsyncStorage from '@react-native-community/async-storage';

const TempUnits=()=>{
    const selectedUnit=useContext(UnitContext)
    const [theme,setTheme]=useState(Styles.light)
    useEffect(()=>{
        getTheme()
    },[])
    
    const getTheme=async()=>{
        
        try{
           var value = await AsyncStorage.getItem('theme_key')
           var obj = JSON.parse(value)
            if(obj!=null){
               setTheme(obj) 
            }else{
                console.log|('async value initial:'+obj)
            }
        }catch(e){
            console.log(e.message)
        }
    }
    return(
    <View style={theme}>
        <TouchableOpacity onPress={()=>{
            selectedUnit.unitDispatch({type:'unit',value:'si'})
        }}>
        <ItemView itemName="SI" backgroundColor="#f58938"/>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={()=>{
            selectedUnit.unitDispatch({type:'unit',value:'us'})
        }}>
        <ItemView itemName="US" backgroundColor="#f58938"/>
        </TouchableOpacity>
    </View>)
}

export default TempUnits

const Styles=StyleSheet.create({
    light:{
        flex:1,
        backgroundColor:"#e6a893"
    }
  })