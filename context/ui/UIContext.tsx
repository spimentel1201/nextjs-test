import { createContext } from 'react'

interface ContextProps {
    //state
    theme: 'light' | 'dark'
    isMenuOpen: boolean
    isModalWarringDeleted: boolean
    isModalUsersOpen: boolean
    isModalFollowsOpen: boolean
    isModalOTsOpen: boolean
    isSnackbarSuccess: boolean
    isSnackbarError: boolean

    //functions
    changeTheme: (theme: 'light' | 'dark') => void
    toggleSideMenu: () => void
    toggleModalWarringDeleted: () => void
    toggleModalUsers: () => void
    toggleModalFollows: () => void
    toggleModalOTs: () => void
    toggleSnackBarSuccess: () => void
    toggleSnackBarError: () => void
}

export const UIContext = createContext({} as ContextProps)
