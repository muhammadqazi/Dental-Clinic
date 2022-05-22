import { selectedLanguage } from '../../constants'
import * as lanActiontypes from './LanguageActions'

const initialState = {
    appLan: selectedLanguage,
    error: null
}

const languageReducer = (state = initialState, action) => {
    switch (action.type) {
        case lanActiontypes.TOGGLE_LAN_BEGIN:
            return {
                ...state,
                error: null
            }
        case lanActiontypes.TOGGLE_LAN_SUCESS:
            return {
                ...state,
                appLan: action.payload.selectedLanguage
            }
        case lanActiontypes.TOGGLE_LAN_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }

        default:
            return state
    }
}

export default languageReducer