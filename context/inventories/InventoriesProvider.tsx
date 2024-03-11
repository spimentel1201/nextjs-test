import { AxiosResponse } from 'axios'
import { FC, ReactNode, useReducer } from 'react'

import { IInventario } from '../../interface'
import { managementApi } from '../../services'

import { InventoriesContext } from './InventoriesContext'
import { inventoriesReducer } from './inventoriesReducer'

export interface InventoriesState {
    msmTextDelete: string
    msmTextUpdate: string
    isLoading: boolean
    isUpdateInventory: Boolean
    dataInventories: IInventario[] | []
}

const INVENTORIES_INITIAL_STATE: InventoriesState = {
    msmTextDelete: '',
    msmTextUpdate: '',
    isUpdateInventory: false,
    isLoading: false,
    dataInventories: [],
}

interface Props {
    children: ReactNode
}

export const InventoriesProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(inventoriesReducer, INVENTORIES_INITIAL_STATE)

    const getInventoriesData = async (searchParamsReq?: string): Promise<IInventario[]> => {
        return await managementApi
            .get('/admin/inventorys', {
                params: { searchParams: searchParamsReq || '' },
            })
            .then(({ data }) => {
                dispatch({ type: '[INVENTORIES] Get inventories data', payload: data })

                return data
            })
            .catch((err) => {
                console.log(err.message)
                let arr: [] = []

                dispatch({ type: '[INVENTORIES] Get inventories data', payload: arr })

                return arr
            })
    }

    const handleCreateInventory = async (data: IInventario): Promise<AxiosResponse> => {
        return await managementApi
            .post('/admin/inventorys', { ...data })
            .then((res) => {
                getInventoriesData()

                return res
            })
            .catch((err) => {
                console.log(err.message)

                return err.message
            })
    }

    const handleUpdateInventory = async (data: Partial<IInventario>): Promise<AxiosResponse> => {
        return await managementApi
            .put('/admin/inventorys', { ...data })
            .then((res) => {
                getInventoriesData()

                return res
            })
            .catch((err) => {
                console.log(err.message)

                return err.message
            })
    }

    const handleDeleteInventory = async (_id: string) => {
        await managementApi
            .delete('/admin/inventorys', { data: { _id } })
            .then(() => {
                getInventoriesData()
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    const changeIsLoading = () => {
        dispatch({ type: '[INVENTORIES] Change is loading inventories' })
    }

    const changeIsUpdateInventory = (val: boolean) => {
        dispatch({
            type: '[INVENTORIES] Change is updated inventories',
            payload: val,
        })
    }

    // const changeInvetoryForUpdate = (singleInventory: IInventario | undefined) => {
    //     dispatch({ type: '[INVENTORIES] Get inventory for update', payload: singleInventory })
    // }

    const changeMsmTextDelete = (email: string) => {
        dispatch({
            type: '[INVENTORIES] Change msm text for delete inventories',
            payload: email,
        })
    }
    const changeMsmTextUpdate = (_id: string) => {
        dispatch({
            type: '[INVENTORIES] Change msm text for update inventories',
            payload: _id,
        })
    }

    return (
        <InventoriesContext.Provider
            value={{
                ...state,

                //functions
                getInventoriesData,
                changeIsLoading,
                changeMsmTextDelete,
                changeMsmTextUpdate,
                changeIsUpdateInventory,
                handleCreateInventory,
                handleUpdateInventory,
                handleDeleteInventory,
            }}
        >
            {children}
        </InventoriesContext.Provider>
    )
}
