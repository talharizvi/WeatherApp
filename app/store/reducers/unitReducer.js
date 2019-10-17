
export const initialUnit={
    defaultUnit:'si'
}

const unitReducer = (state, action) => {
	switch (action.type) {
    
    case 'unit':
      return {...state,
        defaultUnit:action.value
     }
	
	default:
        return state
	}
}

export default unitReducer