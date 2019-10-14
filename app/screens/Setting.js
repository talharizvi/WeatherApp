import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,Image,Switch, TouchableOpacity,StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Setting=({navigation})=>{

        // var[switchValue,setSwitchValue]=useState(()=>{
        //     const initialSwitch=getSwitchFromAsync()
        //     return initialSwitch
        // })
        var [switchValue,setSwitchValue]=useState(false)
        var [theme,setTheme]=useState(Styles.light)
        
        useEffect(()=>{
            getAsyncData()
        },[switchValue])
       

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

        function testFun(){
            console.log('adasdad')
            return true
        }

        async function getSwitchFromAsync(){
            console.log('getSwitchFromAsyncdasdas')
            try{
                console.log('getSwitchFromAsync')
               // var values = await AsyncStorage.multiGet(['theme_key','switch_key'])
               const value = await AsyncStorage.getItem('switch_key')  
               console.log("getSwitchFromAsync",value)
               const switchTest=value 
            
                if(switchTest!=null){
                    console.log('inside if')
                    return switchTest
                }else{
                    console.log('inside else')
                    return true
                }
                
            }catch(e){
                console.log(e.message)
            }
        }
       

        const getAsyncData=async()=>{
            console.log("inside async data")
            try{
               var values = await AsyncStorage.multiGet(['theme_key','switch_key'])
               console.log(values)
               const theme = JSON.parse(values[0])
               const switchTest = JSON.parse(values[1])
               console.log(theme,switchTest)
               setTheme(theme)
            }catch(e){
                console.log(e.message)
            }
        }

        function toggleSwitch(){
            console.log("before",switchValue)
            setSwitchValue(!switchValue)
            console.log("after",theme)
           
            if(theme==Styles.light){
                setTheme(Styles.dark)
                storeTheme(Styles.dark,true)
            }else{
                setTheme(Styles.light)
                storeTheme(Styles.light,false)
            }
        }

    
        return(
        console.log("inside return"),
        console.log(switchValue),
        
        <View style={theme}>
            <Text>Setting</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <Text style={{fontSize:20}}>Theme</Text>    
            <Switch 
            onValueChange={toggleSwitch}
            value={switchValue}/>
            </View>
        </View>)
    
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
