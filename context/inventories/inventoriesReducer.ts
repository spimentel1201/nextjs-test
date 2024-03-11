import { IInventario } from '../../interface'

import { InventoriesState } from './InventoriesProvider'

type InventoriesActionsType =
    | { type: '[INVENTORIES] Get inventories data'; payload: IInventario[] }
    | { type: '[INVENTORIES] Change is loading inventories' }
    | { type: '[INVENTORIES] Change is updated inventories'; payload: boolean }
    // | { type: '[INVENTORIES] Get inventories for update'; payload: IInventario | undefined }
    | { type: '[INVENTORIES] Change msm text for delete inventories'; payload: string }
    | { type: '[INVENTORIES] Change msm text for update inventories'; payload: string }

export const inventoriesReducer = (state: InventoriesState, action: InventoriesActionsType) => {
    switch (action.type) {
        case '[INVENTORIES] Get inventories data':
            return {
                ...state,
                dataInventories: action.payload,
            }
        case '[INVENTORIES] Change is loading inventories':
            return {
                ...state,
                isLoading: !state.isLoading,
            }
        case '[INVENTORIES] Change is updated inventories':
            return {
                ...state,
                isUpdateInventory: action.payload,
            }
        // case '[INVENTORIES] Get inventories for update':
        //     return {
        //         ...state,
        //         inventoryForUpdate: action.payload,
        //     }
        case '[INVENTORIES] Change msm text for delete inventories':
            return {
                ...state,
                msmTextDelete: action.payload,
            }
        case '[INVENTORIES] Change msm text for update inventories':
            return {
                ...state,
                msmTextUpdate: action.payload,
            }
        default:
            return state
    }
}
