import React, {useContext,useState, useEffect} from 'react';
import {
  View,
  Text,Image,Switch, TouchableOpacity,StyleSheet,SafeAreaView
} from 'react-native';
import ItemView from '../components/ItemView';
import UnitContext from '../context/UnitContext';
import AsyncStorage from '@react-native-community/async-storage';

const TempUnits=({navigation})=>{
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
        <SafeAreaView style={theme}>    
    <View style={theme}>
        <TouchableOpacity onPress={()=>{
            selectedUnit.unitDispatch({type:'unit',value:'si'})
            setTimeout(() => {
                navigation.navigate('Home')
            }, 1000);
        }}>
        <ItemView itemName="si" backgroundColor="#f58938"/>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={()=>{
            selectedUnit.unitDispatch({type:'unit',value:'us'})
            setTimeout(() => {
                navigation.navigate('Home')
            }, 1000);
        }}>
        <ItemView itemName="us" backgroundColor="#f58938"/>
        </TouchableOpacity>
    </View>
    </SafeAreaView>
    )
}

export default TempUnits

const Styles=StyleSheet.create({
    light:{
        flex:1,
        backgroundColor:"#e6a893"
    }
  })