import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,Image,Switch, TouchableOpacity,StyleSheet,SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import CardView from '../components/CardView';
import ItemView from '../components/ItemView';

const Setting=({navigation})=>{

        var [switchValue,setSwitchValue]=useState(false)
        var [theme,setTheme]=useState(Styles.light)
        
        useEffect(()=>{
           navigation.addListener ('didFocus', () =>{
            getAsyncData()
        });
        },[])
       

        const storeTheme=async(value,switchState)=>{
                var themeKey = ['theme_key',JSON.stringify(value)]
                var switchKey = ['switch_key',JSON.stringify(switchState)]
                console.log(value,switchState)
            try{
                await AsyncStorage.multiSet([themeKey,switchKey])
                console.log("success")
            }catch(e){
                console.log(e.message)
            }
        }
       
       

        const getAsyncData=async()=>{
            console.log("inside async data")
            try{
               const value = await AsyncStorage.getItem('theme_key')
               const switchValue = await AsyncStorage.getItem('switch_key')
               const theme=JSON.parse(value)
               const switchParsed=JSON.parse(switchValue)
               console.log(theme)
               if(theme!=null){
                   setTheme(theme)
               }
               console.log(theme)
               console.log("SWITCH",switchParsed)
               if(switchParsed!=null){
                   setSwitchValue(switchParsed)     
               }
               
            }catch(e){
                console.log(e.message)
            }
        }

        function toggleSwitch(){
            console.log("before",switchValue)
           // setSwitchValue(!switchValue)
            console.log("after",theme)
           
            if(theme==Styles.light){
                setTheme(Styles.dark)
                setSwitchValue(true)
                storeTheme(Styles.dark,true)
            }else{
                setTheme(Styles.light)
                setSwitchValue(false)
                storeTheme(Styles.light,false)
            }
        }

    
        return(
        console.log("inside return"),
        console.log(switchValue,theme),
        <SafeAreaView style={theme}>
        <View style={theme}>
            <Text>Setting</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <Text style={{fontSize:20}}>Theme</Text>    
            <Switch 
            onValueChange={toggleSwitch}
            value={switchValue}/> 
            </View>
           
            <CardView navigation={navigation} itemName="Language" route='Lang'/>
            <CardView navigation={navigation} itemName="ChangeUnit" route='Unit'/>
            <CardView navigation={navigation} itemName="Search" route='Search'/>
            {/* <ItemView itemName="ChangeUnit" backgroundColor="#f58938"/> */}
        </View>
        </SafeAreaView>
        )
    
}

export default Setting

const Styles=StyleSheet.create({
    dark:{
        flex: 1,
        backgroundColor: "#632009",
    },
    light:{
        flex:1,
        backgroundColor:"#e6a893"
    }
})
