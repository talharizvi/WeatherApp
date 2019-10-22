import React, {useContext,useState, useEffect} from 'react';
import {
  View,
  Text,Image,Switch, TouchableOpacity,StyleSheet,SafeAreaView
} from 'react-native';
import ItemView from '../components/ItemView';
//import UnitContext from '../context/UnitContext';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import {changeUnit} from '../store/actions/unitAction';

const TempUnits=({unit,changeUnit,navigation})=>{
 //   const selectedUnit=useContext(UnitContext)
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
        console.log(unit),
        <SafeAreaView style={theme}>    
    <View style={theme}>
        <TouchableOpacity onPress={()=>{
            //selectedUnit.unitDispatch({type:'unit',value:'si'})
            changeUnit('si')
            setTimeout(() => {
                navigation.navigate('Home')
            }, 1000);
        }}>
        <ItemView itemName="si" backgroundColor="#f58938" unit={unit}/>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={()=>{
            //selectedUnit.unitDispatch({type:'unit',value:'us'})
            changeUnit('us')
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

const mapStateToProps=(state)=>{
    console.log(state.unitReducer.defaultUnit)
    return{
        unit:state.unitReducer.defaultUnit
    }
}

// const mapDispatchToProps=dispatch=>{
//     return{
//         switchUnit:(unit)=>{
//             dispatch(changeUnit(unit))
//         }
//     }
// }

// export default TempUnits

export default connect(mapStateToProps,{changeUnit})(TempUnits)

const Styles=StyleSheet.create({
    light:{
        flex:1,
        backgroundColor:"#e6a893"
    }
  })