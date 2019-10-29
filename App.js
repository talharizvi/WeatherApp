import React, {Fragment,Component, useReducer} from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './app/screens/Home';
import Setting from './app/screens/Setting';
import Search from './app/screens/Search';
import Splash from './app/screens/Splash';
import {LocationProvider} from './app/context/LocationProvider';
import Language from './app/screens/Language';
import TempUnit from './app/screens/TempUnits';
import langReducer from './app/store/reducers/languageReducer';
import  {initialLang} from './app/store/reducers/languageReducer';
import {Provider} from 'react-redux';
import store from './app/store/store';

  
const AppNavigator = createStackNavigator({
  // Test:{
  //   screen:test
  // },
  Splash:{
    screen:Splash,
  },
  Home: {
    screen: Home,
  },
  Setting:{
    screen:Setting,
  },
  Search:{
    screen:Search,
  },
  Lang:{
    screen:Language,
  },
  Unit:{
    screen:TempUnit,
  }
},{
  defaultNavigationOptions: {
    header: null,
}
});

const AppContainer = createAppContainer(AppNavigator)

 
const App =()=>{ 
  
  return(
    <Provider store={store}>
    <LocationProvider>
              <AppContainer/>
  </LocationProvider>
  </Provider>
  )
} 


export default App;
