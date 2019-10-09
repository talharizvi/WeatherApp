import React,{useState} from 'react';
import LocationContext from '../context/LocationContext';


const LocationProvider =(props)=>{
    const [state, setState] = useState({});

    return( 
        <LocationContext.Provider value={[state, setState]}>
            {props.children}
        </LocationContext.Provider>
    )
}

export {LocationProvider};