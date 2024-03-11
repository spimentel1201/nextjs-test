import { FC, ReactNode, useReducer } from 'react'

import { ISeguimiento } from '../../interface'
import { managementApi } from '../../services'

import { FollowsContext } from './FollowsContext'
import { followsReducer } from './followsReducer'

export interface FollowsState {
    msmTextDelete: string
    msmTextUpdate: string
    isLoading: boolean
    dataFollows: ISeguimiento[] | []
    isUpdateFollow: boolean
    followForUpdate: ISeguimiento | undefined
}

const FOLLOWS_INITIAL_STATE: FollowsState = {
    msmTextDelete: '',
    msmTextUpdate: '',
    isLoading: false,
    dataFollows: [],
    isUpdateFollow: false,
    followForUpdate: undefined,
}

interface Props {
    children: ReactNode
}

export const FollowsProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(followsReducer, FOLLOWS_INITIAL_STATE)

    const getFollowsData = async (searchParamsReq?: string): Promise<ISeguimiento[]> => {
        return await managementApi
            .get('/admin/follows', {
                params: { searchParams: searchParamsReq || '' },
            })
            .then(({ data }) => {
                dispatch({ type: '[Follows] Get follows data', payload: data })

                return data
            })
            .catch((err) => {
                console.error(err.message)
                let arr: [] = []

                dispatch({ type: '[Follows] Get follows data', payload: arr })

                return arr
            })
    }

    const handleCreateFollow = async (data: ISeguimiento) => {
        await managementApi
            .post('/admin/follows', { ...data })
            .then(() => {
                setTimeout(() => {
                    getFollowsData()
                }, 60)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    const handleUpdateFollow = async (data: Partial<ISeguimiento>) => {
        await managementApi
            .put('/admin/follows', { ...data })
            .then(() => {
                getFollowsData()
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    const handleDeleteFollow = async (_id: string) => {
        await managementApi
            .delete('/admin/follows', { data: { _id } })
            .then(() => {
                getFollowsData()
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    const changeIsLoading = () => {
        dispatch({ type: '[Follows] Change is loading follows' })
    }

    const changeIsUpdateFollow = (val: boolean) => {
        dispatch({ type: '[Follows] Change is updated follow', payload: val })
    }

    const changeFollowForUpdate = (singleSeguimiento: ISeguimiento | undefined) => {
        dispatch({ type: '[Follows] Get follow for update', payload: singleSeguimiento })
    }

    const changeMsmTextDelete = (id: string) => {
        dispatch({ type: '[Follows] Change msm text for delete follow', payload: id })
    }

    const changeMsmTextUpdate = (_id: string) => {
        dispatch({ type: '[Follows] Change msm text for update follow', payload: _id })
    }

    return (
        <FollowsContext.Provider
            value={{
                ...state,
                //functions
                getFollowsData,
                changeIsLoading,
                changeIsUpdateFollow,
                changeFollowForUpdate,
                changeMsmTextDelete,
                changeMsmTextUpdate,
                //TODO:
                handleCreateFollow,
                handleUpdateFollow,
                handleDeleteFollow,
            }}
        >
            {children}
        </FollowsContext.Provider>
    )
}
