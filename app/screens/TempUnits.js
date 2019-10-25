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
import {themes} from '../res/Themes';

const TempUnits=({unit,changeUnit,switchUnit,navigation})=>{
 //   const selectedUnit=useContext(UnitContext)
    const [theme,setTheme]=useState(themes.light)
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
                console.log('async value initial:'+obj)
            }
        }catch(e){
            console.log(e.message)
        }
    }
    return(
        console.log(unit),
        <SafeAreaView style={[theme,{flex:1}]}>    
    <View>
        <TouchableOpacity onPress={()=>{
            //selectedUnit.unitDispatch({type:'unit',value:'si'})
            // changeUnit('si')
            switchUnit('si')
            setTimeout(() => {
                navigation.navigate('Home')
            }, 1000);
        }}>
        <ItemView itemName="si" backgroundColor="#f58938" unit={unit}/>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={()=>{
            //selectedUnit.unitDispatch({type:'unit',value:'us'})
            //changeUnit('us')
            switchUnit('us')
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
// const mapStateToProps=({langue})=>{
//     const{defaultUnit}=langue
//     return{
//         defaultUnit
//     }
// }

const mapDispatchToProps=dispatch=>{
    return{
         switchUnit:(unit)=>{
            dispatch(changeUnit(unit))
        }
    }
}

// export default TempUnits

// export default connect(mapStateToProps,{changeUnit})(TempUnits)
export default connect(mapStateToProps,mapDispatchToProps)(TempUnits)

