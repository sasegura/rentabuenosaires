import { combineReducers } from "redux";
import destinoReducer from "./destino/destino.reducer";
import NavBarColorReducer from "./navBarColor/navBarColor.reducer";
import pisoReducer from "./piso/piso.reducer";
import usuarioReducer from "./usuario/usuario.reducer";


export default combineReducers({
    destino: destinoReducer,
    piso: pisoReducer,
    usuario:usuarioReducer,
    navBarColor: NavBarColorReducer
});