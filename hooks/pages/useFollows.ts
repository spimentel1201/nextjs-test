import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { FollowsContext, UIContext } from '../../context'
import { ISeguimiento } from '../../interface'
import { managementApi } from '../../services'
import { yupValidations } from '../../utils'

export const useFollows = () => {
    const { toggleSnackBarError, toggleSnackBarSuccess, toggleModalFollows, toggleModalWarringDeleted } =
        useContext(UIContext)
    const {
        dataFollows,
        followForUpdate,
        isUpdateFollow,
        getFollowsData,
        changeMsmTextDelete,
        changeMsmTextUpdate,
        changeIsUpdateFollow,
        changeIsLoading,
        changeFollowForUpdate,
        handleCreateFollow,
        handleUpdateFollow,
        handleDeleteFollow,
    } = useContext(FollowsContext)
    const [idForDelete, setIdForDelete] = useState('')
    const [idxIdRelationMaq, setIdxIdRelationMaq] = useState<Array<{ _id: string; id_maquina: number }>>([])

    const handlerIndexOfIdMaq = async () => {
        await managementApi
            .get('/admin/inventorysMaq')
            .then(({ data }) => {
                setIdxIdRelationMaq(data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        handlerIndexOfIdMaq()
    }, [])

    useEffect(() => {
        changeIsLoading()
        getFollowsData()
        changeIsLoading()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const formMethodsCreate = useForm<ISeguimiento>({
        resolver: yupResolver(yupValidations.validationCreateFollow),
    })

    const formMethodsUpdate = useForm<ISeguimiento>({
        resolver: yupResolver(yupValidations.validationUpdateFollow),
    })

    const changeModalCreate = () => {
        changeIsUpdateFollow(false)
        toggleModalFollows()
    }

    const changeModalUpdate = (singleSeguimiento: ISeguimiento) => {
        changeIsUpdateFollow(true)
        changeFollowForUpdate(singleSeguimiento)
        toggleModalFollows()
    }

    useEffect(() => {
        if (followForUpdate?._id) {
            formMethodsCreate.reset()
            formMethodsUpdate.reset({ ...followForUpdate })
        }

        return () => {
            formMethodsUpdate.reset()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [followForUpdate])

    const handleCreateOrUpdateFollow = (data: ISeguimiento) => {
        if (isUpdateFollow) {
            changeMsmTextUpdate(data._id)
            //TODO: hacer funcionalidad correspondiente al clg
            changeIsLoading()
            handleUpdateFollow(data)
            changeIsLoading()
            //console.log('actualizando:', data)
        } else {
            changeMsmTextUpdate('')
            //TODO: hacer funcionalidad correspondiente al clg
            changeIsLoading()
            handleCreateFollow(data)
            getFollowsData()
            changeIsLoading()
            // console.log('creando', data)
        }
        toggleModalFollows()
        toggleSnackBarSuccess()
    }

    const warningDeletedFollow = (ot_id: string, _id: string) => {
        setIdForDelete(_id)
        changeMsmTextDelete(ot_id)
        toggleModalWarringDeleted()
    }

    const handleDeletedFollow = () => {
        changeIsLoading()
        handleDeleteFollow(idForDelete)
        changeIsLoading()
        toggleModalWarringDeleted()
        toggleSnackBarError()
    }

    return {
        //states
        idxIdRelationMaq,
        //methods
        formMethodsCreate,
        formMethodsUpdate,
        //functions
        changeModalCreate,
        changeModalUpdate,
        handleCreateOrUpdateFollow,
        handleDeletedFollow,
        warningDeletedFollow,
    }
}
