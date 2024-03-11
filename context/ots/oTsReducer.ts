import { IOT } from '../../interface'

import { OTsState } from './OTsProvider'

type OTsActionsType =
    | { type: '[OTS] Get ots data'; payload: IOT[] }
    | { type: '[OTS] Change is loading ots' }
    | { type: '[OTS] Change is updated ot'; payload: boolean }
    | { type: '[OTS] Get ot for update'; payload: IOT | undefined }
    | { type: '[OTS] Change msm text for delete ot'; payload: string }
    | { type: '[OTS] Change msm text for update ot'; payload: string }

export const oTsReducer = (state: OTsState, action: OTsActionsType): OTsState => {
    switch (action.type) {
        case '[OTS] Get ots data':
            return {
                ...state,
                dataOTs: action.payload,
            }
        case '[OTS] Change is loading ots':
            return {
                ...state,
                isLoading: !state.isLoading,
            }
        case '[OTS] Change is updated ot':
            return {
                ...state,
                isUpdateOT: action.payload,
            }
        case '[OTS] Get ot for update':
            return {
                ...state,
                oTForUpdate: action.payload,
            }
        case '[OTS] Change msm text for delete ot':
            return {
                ...state,
                msmTextDelete: action.payload,
            }
        case '[OTS] Change msm text for update ot':
            return {
                ...state,
                msmTextUpdate: action.payload,
            }
        default:
            return state
    }
}
