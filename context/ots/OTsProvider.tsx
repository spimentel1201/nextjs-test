import { AxiosResponse } from 'axios'
import moment from 'moment'
import { FC, ReactNode, useReducer } from 'react'

import { IOT } from '../../interface'
import { managementApi } from '../../services'

import { OTsContext } from './OTsContext'
import { oTsReducer } from './oTsReducer'

export interface OTsState {
    msmTextDelete: string
    msmTextUpdate: string
    isLoading: boolean
    dataOTs: IOT[] | []
    isUpdateOT: Boolean
    oTForUpdate: IOT | undefined
}

const OTS_INITIAL_STATE: OTsState = {
    msmTextDelete: '',
    msmTextUpdate: '',
    isLoading: false,
    dataOTs: [],
    isUpdateOT: false,
    oTForUpdate: undefined,
}

interface Props {
    children: ReactNode
}

export const OTsProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(oTsReducer, OTS_INITIAL_STATE)

    const getOTsData = async (searchParamsReq?: string): Promise<IOT[]> => {
        return await managementApi
            .get('/admin/ots', {
                params: { searchParams: searchParamsReq || '' },
            })
            .then(({ data }) => {
                dispatch({ type: '[OTS] Get ots data', payload: data })
                // console.log({ data })

                return data
            })
            .catch((err) => {
                console.log(err.message)
                let arr: [] = []

                dispatch({ type: '[OTS] Get ots data', payload: arr })

                return arr
            })
    }

    const handleCreateOT = async (data: Partial<IOT>): Promise<AxiosResponse> => {
        return await managementApi
            .post('/admin/ots', {
                ...data,
                fecha_expedicion: new Date(
                    data?.fecha_expedicion!.getTime() - data?.fecha_expedicion!.getTimezoneOffset() * 60000,
                ).toISOString(),
                fecha_cierre: new Date(
                    data?.fecha_cierre!.getTime() - data?.fecha_cierre!.getTimezoneOffset() * 60000,
                ).toISOString(),
            })
            .then((x) => {
                return x
            })
            .catch((err) => {
                console.log(err.message)

                return err.message
            })
    }

    const handleUpdateOT = async (data: Partial<IOT>): Promise<AxiosResponse> => {
        console.log({ data })

        return await managementApi
            .put('/admin/ots', {
                ...data,
                fecha_expedicion: new Date(
                    data?.fecha_expedicion!.getTime() - data?.fecha_expedicion!.getTimezoneOffset() * 60000,
                ).toISOString(),
                fecha_cierre: new Date(
                    data?.fecha_cierre!.getTime() - data?.fecha_cierre!.getTimezoneOffset() * 60000,
                ).toISOString(),
            })
            .then((res) => {
                getOTsData()

                return res
            })
            .catch((err) => {
                console.log(err.message)

                return err.message
            })
    }

    const handleDeleteOT = async (_id: string) => {
        await managementApi
            .delete('/admin/ots', { data: { _id } })
            .then(() => {
                getOTsData()
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    const changeIsLoading = () => {
        dispatch({ type: '[OTS] Change is loading ots' })
    }

    const changeIsUpdateOT = (val: boolean) => {
        dispatch({ type: '[OTS] Change is updated ot', payload: val })
    }

    const changeOTForUpdate = (singleOT: IOT | undefined) => {
        dispatch({ type: '[OTS] Get ot for update', payload: singleOT })
    }

    const changeMsmTextDelete = (slug: string) => {
        dispatch({ type: '[OTS] Change msm text for delete ot', payload: slug })
    }

    const changeMsmTextUpdate = (_id: string) => {
        dispatch({ type: '[OTS] Change msm text for update ot', payload: _id })
    }

    return (
        <OTsContext.Provider
            value={{
                ...state,

                //functions
                getOTsData,
                changeIsLoading,
                changeIsUpdateOT,
                changeOTForUpdate,
                changeMsmTextDelete,
                changeMsmTextUpdate,
                //TODO:
                handleCreateOT,
                handleUpdateOT,
                handleDeleteOT,
            }}
        >
            {children}
        </OTsContext.Provider>
    )
}
