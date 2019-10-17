import React, {Component,useState,useEffect,useContext} from 'react';
import {
  View,
  Text,Image,FlatList,TextInput,TouchableOpacity,StyleSheet
} from 'react-native';
import LocationContext from '../context/LocationContext';
import AsyncStorage from '@react-native-community/async-storage';

const Search=({navigation})=>{

    const [search,setSearch] = useState('Mumbai')
    const [data,setData]=useState([])
    const [location, setLocation] = useContext(LocationContext)
    const [theme,setTheme]=useState(Styles.light)

    useEffect(()=>{
        getTheme()
        fetch(`https://us1.locationiq.com/v1/search.php?key=573196492ea0cd&q=${search}&format=json`)
        .then((response)=>response.json())
        .then((responseJson)=>{
            console.log(responseJson)
            console.log(responseJson.length)
            setData(responseJson)
        })
    },[search]);

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

    function updateSearch(text)  {
        console.log(text)
        console.log(search)
        setSearch(text)
      };

        return(
        <View style={theme}>
            <Text>Search</Text>
            <TextInput
                placeholder="Search Here..."
                onSubmitEditing={(event)=>updateSearch(event.nativeEvent.text)}
            />
             
             <Text>{location.lat+" "+location.lon}</Text>
            <FlatList
                data = {data}
                renderItem={({item})=>
                <TouchableOpacity onPress={()=>{
                    setLocation(location=>({...location,lat:item.lat,lon:item.lon}))
                   // navigation.navigate('Home')
                }
                   
                }>
                <Text style={{fontSize:20,marginVertical:5}}>{item.display_name}</Text>
                </TouchableOpacity>
                }
            />
           

        </View>)
    
}

export default Search

const Styles=StyleSheet.create({
    light:{
        flex:1,
        backgroundColor:"#e6a893"
    }
  })