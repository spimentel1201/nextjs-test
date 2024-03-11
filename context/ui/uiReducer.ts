import { UIState } from './UIProvider'

type UIActionType =
    | { type: '[UI] Change theme'; payload: 'light' | 'dark' }
    | { type: '[UI] Toggle Menu' }
    | { type: '[UI] Toggle Modal Warring Deleted' }
    | { type: '[UI] Toggle Modal Users' }
    | { type: '[UI] Toggle Modal Follows' }
    | { type: '[UI] Toggle Modal OTs' }
    | { type: '[UI] Toggle Snackbar Success' }
    | { type: '[UI] Toggle Snackbar Error' }

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
    switch (action.type) {
        case '[UI] Change theme':
            return {
                ...state,
                theme: action.payload,
            }
        case '[UI] Toggle Menu':
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen,
            }
        case '[UI] Toggle Modal Warring Deleted':
            return {
                ...state,
                isModalWarringDeleted: !state.isModalWarringDeleted,
            }
        case '[UI] Toggle Modal Users':
            return {
                ...state,
                isModalUsersOpen: !state.isModalUsersOpen,
            }
        case '[UI] Toggle Modal Follows':
            return {
                ...state,
                isModalFollowsOpen: !state.isModalFollowsOpen,
            }
        case '[UI] Toggle Modal OTs':
            return {
                ...state,
                isModalOTsOpen: !state.isModalOTsOpen,
            }
        case '[UI] Toggle Snackbar Success':
            return {
                ...state,
                isSnackbarSuccess: !state.isSnackbarSuccess,
            }
        case '[UI] Toggle Snackbar Error':
            return {
                ...state,
                isSnackbarError: !state.isSnackbarError,
            }
        default:
            return state
    }
}
