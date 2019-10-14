import React,{useState} from 'react';
import LocationContext from '../context/LocationContext';


const LocationProvider =(props)=>{
    const [location, setLocation] = useState({lat:'37.8267',lon:'-122.4233'});
    
    return( 
        <LocationContext.Provider value={[location, setLocation]}>
            {props.children}
        </LocationContext.Provider>
    )
}

export {LocationProvider};