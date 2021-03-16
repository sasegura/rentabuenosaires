const INITIAL_STATE ={
    currentPiso: null
}

const pisoReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_CURRENT_PISO':
            return{
                
                ...state,
                currentPiso: action.payload
            }

        default:
            return state;
    }
}

export default pisoReducer;