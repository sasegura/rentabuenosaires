
const INITIAL_STATE ={
    currentDestino: null
}

const destinoReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_CURRENT_DESTINO':
            return{
                
                ...state,
                currentDestino: action.payload
            }

        default:
            return state;
    }
}

export default destinoReducer;