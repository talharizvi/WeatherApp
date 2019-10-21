import React, {Fragment,Component,useState, useEffect,useContext,useReducer} from 'react';
import {
  View,
  Text,Image,FlatList,TouchableOpacity,ScrollView,StyleSheet,ActivityIndicator,SafeAreaView
} from 'react-native';
import images from '../res/images';
import LocationContext from '../context/LocationContext';
import AsyncStorage from '@react-native-community/async-storage';
import LanguageContext from '../context/LanguageContext';
import UnitContext from '../context/UnitContext';
import NetInfo from "@react-native-community/netinfo";



const hourlyData=[]
var advanceData=[]

const initialState={
    summary:'',
    city:'',
    temp:'',
    iconTop:'',
    weatherData:[],
    weatherAdvanceData:[]
}

const reducer=(state,action)=>{
    switch(action.type){
        case 'FETCH_SUCCESS':
                console.log("payload",action.payload)
        return{
            summary:action.payload.summary,
            city:action.payload.city,
            temp:action.payload.temp,
            iconTop:action.payload.iconTop,
            weatherData:action.payload.weatherData,
            weatherAdvanceData:action.payload.weatherAdvanceData
        }
        default:
             return state         
    }
}

const Home2=({navigation})=>{
     
//  const [state,setState]=useState({})
  const [location, setLocation] = useContext(LocationContext)
  const [theme,setTheme]=useState(Styles.light)
  const languageContext=useContext(LanguageContext)
  const unitContext=useContext(UnitContext)  
//
  const [state,dispatch] = useReducer(reducer,initialState)  
//
  useEffect(()=>{
   const subscription = navigation.addListener('didFocus',()=>{
     console.log('didFocus home')
    //  NetInfo.fetch().then(state => {
    //   console.log("Connection type", state.type);
    //   console.log("Is connected?", state.isConnected);
    //   alert(state.type)
    //   alert(state.isConnected)
    // });
     getTheme()
     fetchData() 
    })
    subscription
    return()=>subscription.remove()
   
  },[Object.values(location)]);

  const fetchData=()=>{
   console.log(location) 
   console.log(languageContext)
   console.log(unitContext.selectedUnit)
    fetch(`https://api.darksky.net/forecast/71cc1e8d001a106197699f73a2b45b05/${location.lat},${location.lon}?lang=${languageContext.selectedLang.defaultLang}&units=${unitContext.selectedUnit.defaultUnit}`)
    .then((response)=>response.json())
    .then((responseJson)=>{
      console.log(responseJson)
      const data = responseJson.hourly.data
      const dailyData = responseJson.daily.data     
      
      if(hourlyData.length>0){
        hourlyData.length=0
      }

      if(advanceData.length>0){
        advanceData=[]
      }
      
      for (i=0;i<=data.length;i+=3){
       if(data[i]!=null){
        var hourlyTemp = data[i].temperature
        var iconType = data[i].icon
        var time = data[i].time
        var dateObj = new Date(0)
        dateObj.setUTCSeconds(time)
        var timeSlice = dateObj.toString().slice(16,21) 
        hourlyData.push({temp:hourlyTemp,icon:iconType,time:timeSlice})
       } 
      }

      for(i=0;i<dailyData.length;i++){
        var d = dailyData[i].temperatureHigh
        var iconType=dailyData[i].icon
        var time = dailyData[i].time
        var dateObj = new Date(0)
        dateObj.setUTCSeconds(time)
       
        var day = dateObj.toString().slice(0,3)
        var fullDay = day+"day"
        if(day=="Tue"){
          fullDay = "Tuesday"
        }else if(day=="Wed"){
          fullDay = "Wednesday"
        }else if(day=="Thu"){
          fullDay = "Thursday"
        }else if(day=="Sat"){
          fullDay="Saturday"
        }
        
       advanceData.push({temp:d,icon:iconType,day:fullDay})
       
       }
       dispatch({type:'FETCH_SUCCESS',payload:{summary:responseJson.currently.summary,city:responseJson.timezone,temp:responseJson.currently.temperature,iconTop:responseJson.currently.icon,weatherData:hourlyData,weatherAdvanceData:advanceData}})
       //setState({...state,summary:responseJson.currently.summary,city:responseJson.timezone,temp:responseJson.currently.temperature,iconTop:responseJson.currently.icon,weatherData:hourlyData,weatherAdvanceData:advanceData,})
       
    }).catch((error)=>{
      console.log(error)
    })
  }

  const getTheme=async()=>{
    
    try{
        const value = await AsyncStorage.getItem('theme_key')
        console.log(value)
        console.log("inside getteheme HOME")
        if(value!=null){
          const test = JSON.parse(value)
          console.log(test)
          setTheme(test)
        }
    }catch(e){
        console.log(e.message)
    }
}
  

 function selectIcon(iconType){
    switch(iconType){
      case "clear-day":
      return  <Image style={{width: 45, height: 45}} source={images.overcast_day}/>
      
      case "clear-night":
      return  <Image style={{width: 45, height: 45}} source={images.night}/>

      case "rain":
      return  <Image style={{width: 45, height: 45}} source={images.rainy_day}/>

      case "snow":
      return  <Image style={{width: 45, height: 45}} source={images.snow_cloud}/>

      case "sleet":
      return  <Image style={{width: 45, height: 45}} source={images.sleet}/>

      case "wind":
      return  <Image style={{width: 45, height: 45}} source={images.windy_day}/>          

      case "partly-cloudy-day":
      return  <Image style={{width: 45, height: 45}} source={images.partialy_cloudy}/>
      
      case "fog":
      return  <Image style={{width: 45, height: 45}} source={images.foggy}/>
      
      case "cloudy":  
      return  <Image style={{width: 45, height: 45}} source={images.cloudy_day}/>
      
      case "partly-cloudy-night":
      return <Image style={{width: 45, height: 45}} source={images.partialy_cloudy}/>
      
      default:
      return  <Image style={{width: 45, height: 45}} source={images.night}/>
    }
  }

  function displayTemperature(temp){
     
      return(
      (unitContext.selectedUnit.defaultUnit=="si")? 
      <Text style={{fontSize:20}}>{temp} &deg;C</Text> :
      <Text style={{fontSize:20}}>{temp} K</Text>
      )}

  if(advanceData.length==0){
    return(<View style={theme}>
        <ActivityIndicator style={{flex:1}} size="large" color="#0000ff" alignSelf='center' />
    </View>) 
  }

    return(
      console.log(state),  
    <SafeAreaView style={theme}>  
    <ScrollView style={theme}>
    
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <TouchableOpacity onPress={()=>navigation.navigate('Search')}>  
      <Text>SEARCH</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>navigation.navigate('Setting')}>
      <Text>SETTING</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>alert("dfds")}>
      <Image source={images.menu_verticle_icon} style={{width:30,height:30}}/>
      </TouchableOpacity>

      </View>
    
      <View style={{flexDirection:'row',justifyContent:'space-between',}}>
        <View style={{marginLeft:10}} >
          {displayTemperature(state.temp)}
          <Text style={{fontSize:15}}>{state.city}</Text> 
          <Text style={{fontSize:25}}>{state.summary}</Text> 
          
       </View>
       
       <View>
        {selectIcon(state.iconTop)}
       </View>
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={state.weatherData}
        renderItem={({item})=><View style={{marginHorizontal:5}}>
          {selectIcon(item.icon)}
          {displayTemperature(item.temp)}
          <Text style={{marginHorizontal:5}}>{item.time}</Text>
          </View>
          }
        style={{marginVertical:40}}
        keyExtractor={(item, index) => index.toString()}
      />

      <FlatList
        data={state.weatherAdvanceData}
        renderItem={({item})=><View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
            <Text style={{fontSize:20}}>{item.day}</Text>
            {displayTemperature(item.temp)} 
            {selectIcon(item.icon)}
          </View>}
          keyExtractor={(item, index) => index.toString()}
      />

    
    </ScrollView>
    </SafeAreaView>
    )
}

export default Home2


const Styles=StyleSheet.create({
  light:{
      flex:1,
      backgroundColor:"#e6a893"
  }
})