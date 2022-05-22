import { combineReducers } from "redux";
import themeReducer from "./theme/themeReducer";
import languageReducer from "./language/LanguageReducer";
import tabReducer from "./drawer/tabReducer";

export default combineReducers({
    themeReducer,
    languageReducer,
    tabReducer
})