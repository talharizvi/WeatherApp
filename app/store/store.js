import {createStore, combineReducers} from 'redux';
import unitReducer from './reducers/unitReducer';
import languageReducer from './reducers/languageReducer';

const AppReducers=combineReducers({
    unitReducer,languageReducer
})

const rootReducer=(state,action)=>{
    return AppReducers(state,action);
}

let store = createStore(rootReducer);
export default store;