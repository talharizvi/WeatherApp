import React, {Fragment,Component,useState, useEffect,useContext} from 'react';
import {
  View,
  Text,Image,FlatList,TouchableOpacity,ScrollView,StyleSheet, ActivityIndicator,SafeAreaView
} from 'react-native';
import Lang from '../res/Languages.json';
import AsyncStorage from '@react-native-community/async-storage';
import LangItemView from '../components/LangItemView';
import {themes} from '../res/Themes';
import { connect } from 'react-redux';
import {languageChange} from '../store/actions/languageAction';

 const Language=({lang,changeLang,navigation})=>{

   const [theme,setTheme]=useState(themes.light)
   const [list,setList]=useState([])
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

          console.log(lang),
        <SafeAreaView style={[theme,{flex:1}]}>
        <View>
            <Text>Choose Languages</Text>
            <FlatList
             data={list}
             renderItem={({item})=>
             <TouchableOpacity onPress={()=>{
               //selectedLang.langDispatch({type:'lang',value:item.code})
               changeLang(item.code)
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

const mapStateToProps=(state)=>{
  console.log(state.languageReducer)
 
  return{
    lang:state.languageReducer.defaultLang
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    changeLang:(language)=>{
      console.log(language)
      dispatch(languageChange(language))
    }
  }
  
}

export default connect(mapStateToProps,mapDispatchToProps)(Language)

