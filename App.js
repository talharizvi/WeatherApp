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
import UnitContext from './app/context/UnitContext';
import langReducer from './app/store/reducers/languageReducer';
import  {initialLang} from './app/store/reducers/languageReducer';
 
const AppNavigator = createStackNavigator({
  Splash:{
    screen:Splash,
    navigationOptions: {
      header: null,
    }
  },
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
  },
  Lang:{
    screen:Language,
    navigationOptions: {
      header: null,
    }
  },
  Unit:{
    screen:TempUnit,
    navigationOptions: {
      header: null,
    }
  }
});

const AppContainer = createAppContainer(AppNavigator)

// const initialLang={
//   defaultLang:"en"
// }

// const reducer = (state, action) => {
// 	switch (action.type) {
    
//     case 'lang':
//       return {
//         defaultLang:action.value
//      }
	
// 		default:
// 			return state
// 	}
// }
 
const App =()=>{ 
  //const [lang,dispatch]=useReducer(reducer,initialLang)
  const [lang,dispatch]=useReducer(langReducer,initialLang) 
  const [unit,unitDispatch]=useReducer(unitReducer,initialUnit)  
  return(
    <LocationProvider>
        <LanguageContext.Provider value={{selectedLang:lang,langDispatch:dispatch}}>
          <UnitContext.Provider value={{selectedUnit:unit,unitDispatch:unitDispatch}}>
              <AppContainer/>
          </UnitContext.Provider>
        </LanguageContext.Provider>
  </LocationProvider>
  )
} 


export default App;
