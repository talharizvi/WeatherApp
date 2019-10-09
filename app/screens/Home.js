import React, {Fragment,Component} from 'react';
import {
  View,
  Text,Image,FlatList,TouchableOpacity
} from 'react-native';
import images from '../res/images';



const hourlyData=[]
const advanceData=[]
export default class Home extends Component{

  constructor(){
    super()
    this.state={
      weatherData:[],city:'',temp:'0',weatherAdvanceData:[],iconTop:''
    }
  }

  componentDidMount(){
    fetch('https://api.darksky.net/forecast/71cc1e8d001a106197699f73a2b45b05/37.8267,-122.4233')
    .then((response)=>response.json())
    .then((responseJson)=>{
      console.log(responseJson)
      this.setState({city:responseJson.timezone,temp:responseJson.currently.temperature,iconTop:responseJson.currently.icon})
      const data = responseJson.hourly.data
      const dailyData = responseJson.daily.data     
      console.log(dailyData)
     
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
        this.setState({weatherAdvanceData:advanceData})
       }

      for (i=0;i<=data.length;i++){
        var hourlyTemp = data[i].temperature
        var iconType = data[i].icon
        var time = data[i].time
        var dateObj = new Date(0)
        dateObj.setUTCSeconds(time)
        var timeSlice = dateObj.toString().slice(16,21) 
        hourlyData.push({temp:hourlyTemp,icon:iconType,time:timeSlice})
        this.setState({weatherData:hourlyData})
       }

    }).catch((error)=>{
      console.log(error)
    })
  }


  selectIcon(iconType){
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

 

 
  render(){
   
    return(<View style={{flex:1,backgroundColor:'#73daff'}}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      
      <TouchableOpacity onPress={()=>this.props.navigation.navigate('Search')}>  
      <Text>SEARCH</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>this.props.navigation.navigate('Setting')}>
      <Text>SETTING</Text>
      </TouchableOpacity>
      </View>

      <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:40}}>
        <View style={{marginLeft:10}} >
          <Text style={{fontSize:20}}>{this.state.temp}</Text>
          <Text style={{fontSize:15}}>{this.state.city}</Text> 
       </View>
       
       <View>
        {this.selectIcon(this.state.iconTop)}
       </View>
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={this.state.weatherData}
        renderItem={({item})=><View style={{marginHorizontal:5}}>
          {this.selectIcon(item.icon)}
          <Text style={{marginHorizontal:5}}>{item.temp}</Text>
          <Text style={{marginHorizontal:5}}>{item.time}</Text>
          </View>
          }
        style={{marginVertical:40}}
      />

      <FlatList
        data={this.state.weatherAdvanceData}
        renderItem={({item})=><View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
            <Text style={{fontSize:20}}>{item.day}</Text>
            <Text style={{fontSize:20}}>{item.temp}</Text>
            {this.selectIcon(item.icon)}
          </View>}
      />

    </View>)
  }
}