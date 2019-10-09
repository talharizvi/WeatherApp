import React, {Component,useState,useEffect,useContext} from 'react';
import {
  View,
  Text,Image,FlatList,TextInput,TouchableOpacity
} from 'react-native';
import LocationContext from '../context/LocationContext';


const Search=()=>{

    const [search,setSearch] = useState('Mumbai')
    const [data,setData]=useState([])
    const [state, setState] = useContext(LocationContext)

    useEffect(()=>{
        fetch(`https://us1.locationiq.com/v1/search.php?key=573196492ea0cd&q=${search}&format=json`)
        .then((response)=>response.json())
        .then((responseJson)=>{
            console.log(responseJson)
            console.log(responseJson.length)
            setData(responseJson)
            console.log(data)
        })
    },[search]);

    function updateSearch(text)  {
        console.log(text)
        console.log(search)
        setSearch(text)
      };

        return(
        <View>
            <Text>Search</Text>
            <TextInput
                placeholder="Search Here..."
                onSubmitEditing={(event)=>updateSearch(event.nativeEvent.text)}
            />
             
             <Text>{state.lat+" "+state.lon}</Text>
            <FlatList
                data = {data}
                renderItem={({item})=>
                <TouchableOpacity onPress={()=>
                    setState(state=>({...state,lat:item.lat,lon:item.lon}))     
                }>
                <Text style={{fontSize:20,marginVertical:5}}>{item.display_name}</Text>
                </TouchableOpacity>
                }
            />
           

        </View>)
    
}

export default Search