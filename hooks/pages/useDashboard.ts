import { useEffect, useState } from 'react'

import { managementApi } from '../../services'

export interface IDataDashboard {
    numberOts: number
    numberMachines: number
    numberReplacements: number
    numberUsers: number
    numberOutStock: number
    numberLowStocks: number
    numberFollows: number
}

export const useDashboard = () => {
    const [dataDashboard, setDataDashboard] = useState<IDataDashboard | {}>({})
    const [isLoading, setIsLoading] = useState(false)
    const [refreshIn, setRefreshIn] = useState(30)

    const getDashboardData = async () => {
        setIsLoading(true)
        await managementApi
            .get<IDataDashboard>('/admin/dashboard')
            .then(({ data }) => {
                setDataDashboard(data)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err.message)
                setDataDashboard({})
                setIsLoading(false)
            })
    }

    useEffect(() => {
        let interval: any

        interval = setTimeout(() => {
            setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30))
        }, 1000)

        return () => clearInterval(interval)
    }, [refreshIn])

    useEffect(() => {
        if (refreshIn === 0) {
            getDashboardData()
        }
    }, [refreshIn])
    useEffect(() => {
        getDashboardData()
    }, [])

    return {
        //state
        dataDashboard,
        refreshIn,
        isLoading,
        //methods
        //functions
    }
}
