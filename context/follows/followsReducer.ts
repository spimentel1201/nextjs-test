import { ISeguimiento } from '../../interface'

import { FollowsState } from './FollowsProvider'

type FollowsActionsType =
    | { type: '[Follows] Get follows data'; payload: ISeguimiento[] }
    | { type: '[Follows] Change is loading follows' }
    | { type: '[Follows] Change is updated follow'; payload: boolean }
    | { type: '[Follows] Get follow for update'; payload: ISeguimiento | undefined }
    | { type: '[Follows] Change msm text for delete follow'; payload: string }
    | { type: '[Follows] Change msm text for update follow'; payload: string }

export const followsReducer = (state: FollowsState, action: FollowsActionsType): FollowsState => {
    switch (action.type) {
        case '[Follows] Get follows data':
            return {
                ...state,
                dataFollows: action.payload,
            }
        case '[Follows] Change is loading follows':
            return {
                ...state,
                isLoading: !state.isLoading,
            }
        case '[Follows] Change is updated follow':
            return {
                ...state,
                isUpdateFollow: action.payload,
            }
        case '[Follows] Get follow for update':
            return {
                ...state,
                followForUpdate: action.payload,
            }
        case '[Follows] Change msm text for delete follow':
            return {
                ...state,
                msmTextDelete: action.payload,
            }
        case '[Follows] Change msm text for update follow':
            return {
                ...state,
                msmTextUpdate: action.payload,
            }
        default:
            return state
    }
}
