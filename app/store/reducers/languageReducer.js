// export const initialLang={
//     defaultLang:"en"
//   }

// const languageReducer = (state, action) => {
// 	switch (action.type) {
    
//     case 'lang':
//       return {
//         defaultLang:action.value
//      }
	
// 		default:
// 			return state
// 	}
// }
 
// export default languageReducer

 const initialLang={
  defaultLang:"en"
}

const languageReducer = (state=initialLang, action) => {
  console.log("test",action.payload)
switch (action.type) {
  
  case 'change_language':
    return {
      ...state,
      defaultLang:action.payload
   }

  default:
    return state
}
}

export default languageReducer