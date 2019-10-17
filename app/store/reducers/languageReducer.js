export const initialLang={
    defaultLang:"en"
  }

const languageReducer = (state, action) => {
	switch (action.type) {
    
    case 'lang':
      return {
        defaultLang:action.value
     }
	
		default:
			return state
	}
}
 
export default languageReducer