import { createContext } from 'react'
import { AxiosResponse } from 'axios'

import { IOT } from '../../interface'
interface ContextProps {
    //state
    msmTextDelete: string
    msmTextUpdate: string
    isLoading: boolean
    dataOTs: IOT[] | []
    isUpdateOT: Boolean
    oTForUpdate: IOT | undefined

    //functions
    getOTsData: (searchParamsReq?: string) => Promise<IOT[]>
    changeIsLoading: () => void
    changeIsUpdateOT: (val: boolean) => void
    changeOTForUpdate: (singleOT: IOT) => void
    changeMsmTextDelete: (email: string) => void
    changeMsmTextUpdate: (_id: string) => void
    //TODO:
    handleCreateOT: (data: Partial<IOT>) => Promise<AxiosResponse>
    handleUpdateOT: (data: Partial<IOT>) => Promise<AxiosResponse>
    handleDeleteOT: (_id: string) => void
}

export const OTsContext = createContext({} as ContextProps)
