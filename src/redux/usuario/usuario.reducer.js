const INITIAL_STATE ={
    currentUsuario:""
}

const usuarioReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_CURRENT_USUARIO':
            return{
                
                ...state,
                currentUsuario: action.payload
            }

        default:
            return state;
    }
}

export default usuarioReducer;