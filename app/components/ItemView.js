import React, {Fragment,Component,useState, useEffect,useContext} from 'react';
import {
  View,
  Text,Image,FlatList,TouchableOpacity,ScrollView,StyleSheet
} from 'react-native';
import images from '../res/images';
import UnitContext from '../context/UnitContext';
import Icon from 'react-native-vector-icons/Fontisto';
import { connect } from 'react-redux';

const ItemView=({itemName,backgroundColor,unit})=>{
  //const unitContext=useContext(UnitContext)
    return(
          // console.log(unitContext.selectedUnit.defaultUnit),
            <View style={{flexDirection:'row', backgroundColor:backgroundColor,margin:5,borderColor:'#75716e',borderWidth: 1,borderRadius:5,alignItems:'center',justifyContent:'space-between'}}>
                <Text style={{fontSize:25}}>{itemName}</Text>
              
                {/* {chooseImage(itemName,unitContext.selectedUnit.defaultUnit)} */}
                {chooseImage(itemName,unit)}
            </View>
         
    )
}

const chooseImage=(itemName,value)=>{
  console.log(itemName,value)
  return(itemName==value?   <Icon name="radio-btn-active" size={20}/> : <Icon name="radio-btn-passive" size={20}/>)
}

const mapStateToProps=(state)=>{
  console.log(state.unitReducer.defaultUnit)
  return{
      //unit:state.defaultUnit
      unit:state.unitReducer.defaultUnit
    }
}
 
   
 


export default connect(mapStateToProps)(ItemView);