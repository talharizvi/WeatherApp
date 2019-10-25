import React, {Fragment,Component, useReducer} from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './app/screens/Home';
import Setting from './app/screens/Setting';
import Search from './app/screens/Search';
import Splash from './app/screens/Splash';
import {LocationProvider} from './app/context/LocationProvider';
import LocationContext from './app/context/LocationContext';
import LanguageContext from './app/context/LanguageContext';
import Language from './app/screens/Language';
import TempUnit from './app/screens/TempUnits';
import unitReducer from './app/store/reducers/unitReducer';
import {initialUnit} from './app/store/reducers/unitReducer';
import langReducer from './app/store/reducers/languageReducer';
import  {initialLang} from './app/store/reducers/languageReducer';
import {Provider} from 'react-redux';
import store from './app/store/store';
import test from './app/screens/Test';
  
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
  const [lang,dispatch]=useReducer(langReducer,initialLang) 
 // const [unit,unitDispatch]=useReducer(unitReducer,initialUnit)  
  return(
    <Provider store={store}>
    <LocationProvider>
        {/* <LanguageContext.Provider value={{selectedLang:lang,langDispatch:dispatch}}> */}
              <AppContainer/>
        {/* </LanguageContext.Provider> */}
  </LocationProvider>
  </Provider>
  )
} 


export default App;
