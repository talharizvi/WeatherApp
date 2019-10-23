import React, {Fragment,Component,useState, useEffect,useContext} from 'react';
import {
  View,
  Text,Image,FlatList,TouchableOpacity,ScrollView,StyleSheet, ActivityIndicator,SafeAreaView
} from 'react-native';
import Lang from '../res/Languages.json';
import LanguageContext from '../context/LanguageContext';
import AsyncStorage from '@react-native-community/async-storage';
import LangItemView from '../components/LangItemView';
import {themes} from '../res/Themes';

 const Language=({navigation})=>{

   const [theme,setTheme]=useState(themes.light)
   const [list,setList]=useState([])
   const selectedLang=useContext(LanguageContext) 
   useEffect(()=>{
    console.log("data",Lang.data)
    getTheme()
    setList(Lang.data)
    },[])

    const getTheme=async()=>{
    
      try{
          const value = await AsyncStorage.getItem('theme_key')
          console.log(value)
          console.log("inside getteheme")
          if(value!=null){
            const test = JSON.parse(value)
            console.log(test)
            setTheme(test)
          }
      }catch(e){
          console.log(e.message)
      }
  }

      if(list.length==0){
        return(<View style={[theme,{flex:1}]}>
            <ActivityIndicator style={{flex:1}} size="large" color="#0000ff" />
        </View>) 
      }
        return(
        <SafeAreaView style={[theme,{flex:1}]}>
        <View>
            <Text>Choose Languages</Text>
            <FlatList
             data={list}
             renderItem={({item})=>
             <TouchableOpacity onPress={()=>{selectedLang.langDispatch({type:'lang',value:item.code})
             setTimeout(() => {
              navigation.navigate('Home')
          }, 1000);
             }}>
            
             <LangItemView itemName={item.lang} backgroundColor="#f58938" code={item.code}></LangItemView>
             </TouchableOpacity>
             }   
            />

            
        </View>
        </SafeAreaView>
        )
    
}

export default Language

const Styles=StyleSheet.create({
  light:{
      flex:1,
      backgroundColor:"#e6a893"
  }
})