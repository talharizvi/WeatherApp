import React, {Component, useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

// export default class Test extends React.Component{

//     constructor(){
//         super();
//         this.state={
//           connection_Status : ""
//         }
//       }

//     componentDidMount(){
//         NetInfo.isConnected.addEventListener(
//             'connectionChange',
//             this._handleConnectivityChange
//         );
       
//         NetInfo.isConnected.fetch().done((isConnected) => {
     
//           if(isConnected == true)
//           {
//             this.setState({connection_Status : "Online"})
//           }
//           else
//           {
//             this.setState({connection_Status : "Offline"})
//           }
     
//         });
//     }

//     componentWillUnmount(){
//         NetInfo.isConnected.removeEventListener(
//             'connectionChange',
//             this._handleConnectivityChange
//         );
//     }

//     _handleConnectivityChange = (isConnected) => {

//         if(isConnected == true)
//           {
//             this.setState({connection_Status : "Online"})
//           }
//           else
//           {
//             this.setState({connection_Status : "Offline"})
//           }
//       };

//     render(){
//         return(<View>
//             <Text>DFSDFS</Text>
//  <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 20}}> You are { this.state.connection_Status } </Text>
//         </View>)
//     }
// }



const test=()=>{
    const [connection_Status,setConnectionState]=useState("")

    useEffect(()=>{
        console.log("use effect")
        NetInfo.isConnected.addEventListener(
            'connectionChange',
           // handleConnectivityChange()
          //  state=>{
          //   console.log("addEventListener isConnected", state.isConnected);
          //   handleConnectivityChange(state.isConnected)
          //  } 
         
        );
        NetInfo.fetch().then(state => {
          console.log("Is connectedadasda?", state.isConnected);
          if(state.isConnected==true){
            setConnectionState("Online")
          }else{
            setConnectionState("Offline")
          }
        });

        return NetInfo.isConnected.removeEventListener(
          state=>{
          alert(state.type,state.isConnected)
          handleConnectivityChange(state.isConnected)
        })
    
    },[])

    const handleConnectivityChange = (isConnected) => {
        console.log("inside handleConnectivityChange")
      if(isConnected == true)
        {
         setConnectionState("Online")
        }
        else
        {
         setConnectionState("Offline")
        }
    };
    return(<View>
        <Text>afafda</Text>
        <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 20}}> You are { connection_Status } </Text>
    </View>)
}

export default test