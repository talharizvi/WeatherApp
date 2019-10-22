import {createStore, combineReducers} from 'redux';
import unitReducer from './reducers/unitReducer';

const AppReducers=combineReducers({
    unitReducer,
})

const rootReducer=(state,action)=>{
    return AppReducers(state,action);
   // return unitReducer(state,action)
}

let store = createStore(rootReducer);
//let store = createStore(unitReducer)
export default store;