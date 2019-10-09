
import React, {Fragment,Component} from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './app/screens/Home';
import Setting from './app/screens/Setting';
import Search from './app/screens/Search';
import Splash from './app/screens/Splash';
import {LocationProvider} from './app/context/LocationProvider';
import LocationContext from './app/context/LocationContext';

const AppNavigator = createStackNavigator({
  // Splash:{
  //   screen:Splash,
  //   navigationOptions: {
  //     header: null,
  //   }
  // },
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    }
  },
  Setting:{
    screen:Setting,
    navigationOptions: {
      header: null,
    }
  },
  Search:{
    screen:Search,
    navigationOptions: {
      header: null,
    }
  }
});

const AppContainer = createAppContainer(AppNavigator)

 
const App =()=>{
  return(
    <LocationProvider >
        <AppContainer/>
  </LocationProvider>
  )
} 


export default App;
