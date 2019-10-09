import React, {Component} from 'react';
import {
  View,
  Text,Image,FlatList
} from 'react-native';
import images from '../res/images';

export default class Splash extends Component{


    componentDidMount(){
        setTimeout(() => {
            this.props.navigation.navigate('Home')
        }, 1000);
    }

    render(){
        return(<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Image style={{height:20,width:20}} source={images.pour_rain}/>
            <Text>WeatherApp</Text>
        </View>)
    }
}