import { createContext } from 'react'

import { ISeguimiento } from '../../interface'

interface ContextProps {
    //state
    msmTextDelete: string
    msmTextUpdate: string
    isLoading: boolean
    dataFollows: ISeguimiento[] | []
    isUpdateFollow: Boolean
    followForUpdate: ISeguimiento | undefined

    //functions
    getFollowsData: (searchParamsReq?: string) => Promise<ISeguimiento[]>
    changeIsLoading: () => void
    changeIsUpdateFollow: (val: boolean) => void
    changeFollowForUpdate: (singleFollow: ISeguimiento) => void
    changeMsmTextDelete: (_id: string) => void
    changeMsmTextUpdate: (_id: string) => void
    //TODO:
    handleCreateFollow: (data: ISeguimiento) => void
    handleUpdateFollow: (data: Partial<ISeguimiento>) => void
    handleDeleteFollow: (_id: string) => void
}

export const FollowsContext = createContext({} as ContextProps)
