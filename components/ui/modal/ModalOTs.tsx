import { useContext } from 'react'
import { Modal, Backdrop, Box, Typography, IconButton, Grid, MenuItem } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import CloseIcon from '@mui/icons-material/Close'
import { useFormContext } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'
import { NextPage } from 'next'

import { AuthContext, OTsContext, UIContext } from '../../../context'
import { useOTs } from '../../../hooks'
import { WrapperModalHeaderOT, WrapperModalOT } from '../styles'
import { IOT } from '../../../interface'
import { InputDateDesktop, InputDateMobile, InputSelector, InputSingleImg, InputText, InputTextMult } from '../inputs'

interface Props {
    idxIdRelationMaq: {
        _id: string
        id_maquina: number
    }[]
    idxIdRelationRep: {
        _id: string
        nombre: string
        existencia: number
    }[]
    idxUsersMttos: {
        nombre: string
        rol: string
    }[]
    handleCreateOrUpdateOT: (data: IOT) => void
}

export const ModalOTs: NextPage<Props> = ({
    idxIdRelationMaq,
    idxIdRelationRep,
    idxUsersMttos,
    handleCreateOrUpdateOT,
}) => {
    const { user } = useContext(AuthContext)
    const { toggleModalOTs, isModalOTsOpen } = useContext(UIContext)
    const { isLoading, isUpdateOT, oTForUpdate } = useContext(OTsContext)

    const { control, handleSubmit: onSubmit } = useFormContext<IOT>()

    return (
        <Modal
            closeAfterTransition
            keepMounted
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            aria-describedby="keep-mounted-modal-description"
            aria-labelledby="keep-mounted-modal-title"
            open={isModalOTsOpen}
            onClose={toggleModalOTs}
        >
            <Box sx={WrapperModalOT}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <WrapperModalHeaderOT sx={{ borderBottom: 1, borderColor: 'primary.main' }}>
                        <Typography variant="h5">
                            {isUpdateOT ? `Editando OT: ${oTForUpdate?.slug}` : `Creando OT`}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <IconButton color="error" sx={{ border: 1, ml: 1 }} onClick={toggleModalOTs}>
                            <CloseIcon />
                        </IconButton>
                    </WrapperModalHeaderOT>
                    <Grid container>
                        <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                            <InputSelector control={control} label="Maquina a realizar mantenimiento" name="maquina">
                                {idxIdRelationMaq.map((item) => (
                                    <MenuItem key={item._id} value={item.id_maquina}>
                                        MAQ_{item.id_maquina}
                                    </MenuItem>
                                ))}
                            </InputSelector>
                        </Grid>
                        <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                            <InputText fullWidth control={control} label="Slug" name="slug" type="text" />
                        </Grid>
                        <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                            <InputSelector control={control} label="Repuesto a necesitar" name="repuesto">
                                {idxIdRelationRep.map((item) => (
                                    <MenuItem
                                        key={item._id}
                                        disabled={item.existencia === 0 ? true : false}
                                        value={item.nombre}
                                    >
                                        {item.nombre} Existencias: {item.existencia}
                                    </MenuItem>
                                ))}
                            </InputSelector>
                        </Grid>
                        <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                            <InputSelector control={control} label="Encargado del mantenimiento" name="tecnico_ing">
                                {idxUsersMttos.map((item, idx) => (
                                    <MenuItem key={idx} value={item.nombre}>
                                        {item.nombre}
                                    </MenuItem>
                                ))}
                            </InputSelector>
                        </Grid>
                        <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                            <InputSelector control={control} label="Estado de la OT" name="estado_de_OT">
                                <MenuItem value={'pendiente'}>Pendiente</MenuItem>
                                <MenuItem value={'en_proceso'}>En Progreso</MenuItem>
                                <MenuItem value={'finalizada'}>Finalizada</MenuItem>
                            </InputSelector>
                        </Grid>
                        <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                            <InputText
                                fullWidth
                                control={control}
                                label="Numero de orden de compra"
                                name="numero_de_orden_de_compra"
                                type="text"
                            />
                        </Grid>
                        <Grid
                            item
                            md={5.5}
                            sx={{ m: 2, display: { xs: 'none', md: 'flex' }, flexDirection: 'column' }}
                            xs={12}
                        >
                            <InputDateDesktop control={control} label="Fecha de expedición" name="fecha_expedicion" />
                        </Grid>
                        <Grid
                            item
                            md={5.5}
                            sx={{ m: 2, flexDirection: 'column', display: { xs: 'flex', md: 'none' } }}
                            xs={12}
                        >
                            <InputDateMobile control={control} label="Fecha de expedición" name="fecha_expedicion" />
                        </Grid>
                        <Grid
                            item
                            md={5.5}
                            sx={{ m: 2, display: { xs: 'none', md: 'flex' }, flexDirection: 'column' }}
                            xs={12}
                        >
                            <InputDateDesktop
                                disablePast
                                control={control}
                                label="Fecha de cierre"
                                name="fecha_cierre"
                            />
                        </Grid>
                        <Grid
                            item
                            md={5.5}
                            sx={{ m: 2, flexDirection: 'column', display: { xs: 'flex', md: 'none' } }}
                            xs={12}
                        >
                            <InputDateMobile
                                disablePast
                                control={control}
                                label="Fecha de cierre"
                                name="fecha_cierre"
                            />
                        </Grid>

                        <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                            <InputText
                                fullWidth
                                control={control}
                                label="Tiempo de Ejecución"
                                name="tiempoDeEjecucion"
                                type="number"
                            />
                        </Grid>
                        <Grid item md={5.5} sx={{ m: 2, display: 'flex', flexDirection: 'row' }} xs={11}>
                            <InputSingleImg control={control} label="Image" name="imgDeLaMaquina" />
                        </Grid>
                        <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                            <InputTextMult fullWidth control={control} label="Tareas" maxRows={7} name="tareas" />
                        </Grid>
                        <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                            <InputTextMult
                                fullWidth
                                control={control}
                                label="Comentario"
                                maxRows={7}
                                name="comentario"
                            />
                        </Grid>
                    </Grid>
                    <Grid container sx={{ p: 2 }}>
                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            {!['bodega', 'mtto'].includes(user?.rol!) && (
                                <LoadingButton
                                    color="secondary"
                                    loading={isLoading}
                                    startIcon={<SaveIcon />}
                                    variant="outlined"
                                    onClick={onSubmit(handleCreateOrUpdateOT)}
                                >
                                    Guardar cambios
                                </LoadingButton>
                            )}
                        </Box>
                    </Grid>
                </LocalizationProvider>
            </Box>
        </Modal>
    )
}
