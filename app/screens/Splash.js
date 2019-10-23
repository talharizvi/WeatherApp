import React, {Component, useEffect,useState} from 'react';
import {
  View,
  Text,Image,FlatList,StyleSheet
} from 'react-native';
import images from '../res/images';
import AsyncStorage from '@react-native-community/async-storage';
import {themes} from '../res/Themes';
//import Animation from 'lottie-react-native';

 const Splash=(props)=>{

    const [theme,setTheme]=useState(themes.light)

    useEffect(()=>{
     //  this.animation.play()
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

    
        return(<View style={[theme,{flex:1}]}>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Image style={{height:20,width:20}} source={images.pour_rain}/>
            {/* <Animation
                ref={animation=>{
                    this.animation=animation
                }}
                style={{
                    width:180,
                    height:180
                  }}
                  loop={true}
                  source="2106-suns-out.json"  
            /> */}
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