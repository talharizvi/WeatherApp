import React, {Component, useEffect,useState} from 'react';
import {
  View,
  Text,Image,FlatList,StyleSheet
} from 'react-native';
import images from '../res/images';
import AsyncStorage from '@react-native-community/async-storage';

 const Splash=(props)=>{

    const [theme,setTheme]=useState(Styles.light)

    useEffect(()=>{
        getData()
        setTimeout(() => {
            props.navigation.navigate('Home')
        }, 2000);
        
    },[])


    const getData=async()=>{
        
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

    
        return(<View style={theme}>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Image style={{height:20,width:20}} source={images.pour_rain}/>
            <Text>WeatherApp</Text>
            </View>
        </View>)
    
}

export default Splash

const Styles=StyleSheet.create({
    
    light:{
        flex:1,
        backgroundColor:"#e6a893"
    }
})