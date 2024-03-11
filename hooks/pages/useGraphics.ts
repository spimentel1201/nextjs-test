import { useEffect, useState } from 'react'

import { PropsAuxArrData } from '../../pages/graphics/[id]'

export const useGraphics = (graphicsData: PropsAuxArrData[]) => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (graphicsData) {
            setIsLoading(false)
        }
    }, [])

    return {
        //states,
        isLoading,
        //methods
        //functions
    }
}
