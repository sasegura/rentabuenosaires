const INITIAL_STATE ={
    currentNavBarColor: true
}

const NavBarColorReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_CURRENT_NAVBARCOLOR':
            return{
                
                ...state,
                currentNavBarColor: action.payload
            }

        default:
            return state;
    }
}

export default NavBarColorReducer;