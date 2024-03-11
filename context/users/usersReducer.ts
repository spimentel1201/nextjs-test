import { IUser } from '../../interface'

import { UsersState } from './UsersProvider'

type UsersActionsType =
    | { type: '[USERS] Get users data'; payload: IUser[] }
    | { type: '[USERS] Change is loading users' }
    | { type: '[USERS] Change is updated user'; payload: boolean }
    | { type: '[USERS] Get user for update'; payload: IUser | undefined }
    | { type: '[USERS] Change msm text for delete user'; payload: string }
    | { type: '[USERS] Change msm text for update user'; payload: string }

export const usersReducer = (state: UsersState, action: UsersActionsType): UsersState => {
    switch (action.type) {
        case '[USERS] Get users data':
            return {
                ...state,
                dataUsers: action.payload,
            }
        case '[USERS] Change is loading users':
            return {
                ...state,
                isLoading: !state.isLoading,
            }
        case '[USERS] Change is updated user':
            return {
                ...state,
                isUpdateUser: action.payload,
            }
        case '[USERS] Get user for update':
            return {
                ...state,
                userForUpdate: action.payload,
            }
        case '[USERS] Change msm text for delete user':
            return {
                ...state,
                msmTextDelete: action.payload,
            }
        case '[USERS] Change msm text for update user':
            return {
                ...state,
                msmTextUpdate: action.payload,
            }
        default:
            return state
    }
}
