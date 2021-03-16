import { combineReducers } from "redux";
import destinoReducer from "./destino/destino.reducer";
import NavBarColorReducer from "./navBarColor/navBarColor.reducer";
import pisoReducer from "./piso/piso.reducer";



export default combineReducers({
    destino: destinoReducer,
    piso: pisoReducer,
    navBarColor: NavBarColorReducer
});