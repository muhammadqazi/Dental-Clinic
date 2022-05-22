import { en , gr } from "../../constants"

export const TOGGLE_LAN_BEGIN = 'TOGGLE_LAN_BEGIN'
export const TOGGLE_LAN_SUCESS = 'TOGGLE_LAN_SUCESS'
export const TOGGLE_LAN_FAILURE = 'TOGGLE_LAN_FAILURE'


export const toggleLanBegin = () => ({
    type: TOGGLE_LAN_BEGIN
})

export const toggleLanSucess = (selectedTheme) => ({
    type: TOGGLE_LAN_SUCESS,
    payload: { selectedTheme }
})

export const toggleLanFailure = error => ({
    type: TOGGLE_LAN_FAILURE,
    payload: { error }
})

export function toggleTheme(themeType) {
    return dispatch => {
        dispatch(toggleLanBegin())

        switch (themeType) {

            case "en":
                dispatch(toggleLanSucess(en))
                break;
            case "gr":
                dispatch(toggleLanSucess(gr))
                break;


            default:
                dispatch(toggleLanFailure({ error: "Invalid theme type" }))
                break;

        }
    }
}