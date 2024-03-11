import { yupResolver } from '@hookform/resolvers/yup'
import { saveAs } from 'file-saver'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { InventoriesContext, UIContext } from '../../context'
import { IInventario } from '../../interface'
import { yupValidations } from '../../utils'

export const useInventory = (sendDataInv?: IInventario) => {
    const { toggleSnackBarError, toggleSnackBarSuccess, toggleModalWarringDeleted } = useContext(UIContext)
    const {
        isUpdateInventory,
        getInventoriesData,
        changeMsmTextDelete,
        changeMsmTextUpdate,
        changeIsLoading,
        changeIsUpdateInventory,
        handleCreateInventory,
        handleUpdateInventory,
        handleDeleteInventory,
    } = useContext(InventoriesContext)
    const [idForDelete, setIdForDelete] = useState('')

    const { push } = useRouter()

    useEffect(() => {
        changeIsLoading()
        getInventoriesData()
        changeIsLoading()
    }, [])

    const formMethodsCreate = useForm<IInventario>({
        resolver: yupResolver(yupValidations.validationCreateInventory),
    })

    const formMethodsUpdate = useForm<IInventario>({
        resolver: yupResolver(yupValidations.validationUpdateInventory),
    })

    const navigateToUpdate = (url: string) => {
        if (url === '/inventory/new') {
            changeIsUpdateInventory(false)
        } else {
            changeIsUpdateInventory(true)
        }
        push(url)
    }

    useEffect(() => {
        // console.log({ sendDataInv })
        if (sendDataInv?._id!) {
            formMethodsCreate.reset()
            formMethodsUpdate.reset({ ...sendDataInv })
            changeIsUpdateInventory(true)
        } else {
            changeIsUpdateInventory(false)
        }

        return () => {
            formMethodsUpdate.reset()
            // formMethodsCreate.reset({ ...sendDataInv })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sendDataInv])

    const handleCreateOrUpdateInventory = (data: IInventario) => {
        // console.log({ sendDataInv })
        if (isUpdateInventory) {
            changeMsmTextUpdate(data._id)
            //TODO: hacer funcionalidad correspondiente al clg
            changeIsLoading()
            handleUpdateInventory(data)
                .then((res) => {
                    // console.log({ res })
                    if (res.status === 201) {
                        setTimeout(() => {
                            navigateToUpdate('/inventory')
                            changeIsLoading()
                            toggleSnackBarSuccess()
                        }, 170)
                    }
                })
                .catch((res) => {
                    changeIsLoading()
                    // console.log({ res })
                    alert(res)
                })
            // console.log('actualizando:', data)
        } else {
            changeMsmTextUpdate('')
            //TODO: hacer funcionalidad correspondiente al clg
            changeIsLoading()
            handleCreateInventory(data)
                .then((res) => {
                    // console.log({ res })
                    if (res.status === 201) {
                        setTimeout(() => {
                            navigateToUpdate('/inventory')
                            changeIsLoading()
                            toggleSnackBarSuccess()
                        }, 170)
                    }
                })
                .catch((res) => {
                    changeIsLoading()
                    // console.log({ res })
                    alert(res)
                })
            //console.log('creando', data)
        }
    }

    const handleUpdateInventario = () => {
        toggleSnackBarSuccess()
    }

    const warningDeletedInventario = (nombre: string, _id: string) => {
        setIdForDelete(_id)
        changeMsmTextDelete(nombre)
        toggleModalWarringDeleted()
    }

    const handleDeletedInventario = () => {
        changeIsLoading()
        handleDeleteInventory(idForDelete)
        changeIsLoading()
        toggleModalWarringDeleted()
        toggleSnackBarError()
    }

    const downloadFile = (urlString: string) => {
        saveAs(urlString)
    }

    return {
        //states
        //methods
        formMethodsCreate,
        formMethodsUpdate,
        //functions
        navigateToUpdate,
        handleCreateOrUpdateInventory,
        handleUpdateInventario,
        handleDeletedInventario,
        warningDeletedInventario,
        downloadFile,
    }
}
