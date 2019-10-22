export const initialUnit={
    defaultUnit:'si'
}

const unitReducer = (state = initialUnit , action) => {
	switch (action.type) {
    case 'change_unit':
      return {...state,
        defaultUnit:action.payload
     }
	
	default:
        return state
	}
}

export default unitReducer