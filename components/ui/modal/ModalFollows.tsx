import { useContext } from 'react'
import { Modal, Backdrop, Box, Typography, IconButton, Grid, MenuItem } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import SaveIcon from '@mui/icons-material/Save'
import { useFormContext, useWatch } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'

import { WrapperModalHeaderFollow, WrapperModalFollow } from '../styles'
import { AuthContext, FollowsContext, UIContext } from '../../../context'
import { useFollows } from '../../../hooks'
import { ISeguimiento } from '../../../interface'
import { InputSelector, InputSingleImg, InputText, InputTextMult } from '../inputs'

export const ModalFollows = () => {
    const { user } = useContext(AuthContext)
    const { toggleModalFollows, isModalFollowsOpen } = useContext(UIContext)
    const { isLoading, isUpdateFollow, followForUpdate } = useContext(FollowsContext)
    const { idxIdRelationMaq, handleCreateOrUpdateFollow } = useFollows()
    const { control, handleSubmit: onSubmit } = useFormContext<ISeguimiento>()
    const changeTypeWatcher = useWatch({
        control,
        name: 'presentaFalla', // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    })

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
            open={isModalFollowsOpen}
            onClose={toggleModalFollows}
        >
            <Box sx={WrapperModalFollow}>
                <WrapperModalHeaderFollow sx={{ borderBottom: 1, borderColor: 'primary.main' }}>
                    <Typography variant="h5">
                        {isUpdateFollow
                            ? `Editando Seguimiento: ${followForUpdate?.id_seguimiento}`
                            : `Creando Seguimiento`}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton color="error" sx={{ border: 1, ml: 1 }} onClick={toggleModalFollows}>
                        <CloseIcon />
                    </IconButton>
                </WrapperModalHeaderFollow>
                <Grid container>
                    <Grid item md={5.5} sx={{ m: 2, display: 'flex', flexDirection: 'row' }} xs={11}>
                        <InputSingleImg control={control} label="Image de verificación" name="imgDeVerificacion" />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <InputTextMult fullWidth control={control} label="Comentario" maxRows={7} name="comentario" />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <InputSelector control={control} label="Estado de la maquina" name="estadoDeLaMaquina">
                            <MenuItem value={'bueno'}>Bueno</MenuItem>
                            <MenuItem value={'regular'}>Regular</MenuItem>
                            <MenuItem value={'malo'}>Malo</MenuItem>
                        </InputSelector>
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <InputText
                            fullWidth
                            control={control}
                            label="Nombre completo del observador"
                            name="nombreDeObservador"
                            type="text"
                        />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <InputText
                            fullWidth
                            control={control}
                            label="Tiempo de Funcionamiento (en Horas)"
                            name="tiempoDeFuncionamiento"
                            type="number"
                        />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <InputText
                            fullWidth
                            control={control}
                            label="Tiempo de Reaparición (en Horas)"
                            name="tiempoDeReparacion"
                            type="number"
                        />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <InputSelector control={control} label="Presenta falla?" name="presentaFalla">
                            <MenuItem value={'si'}>Si</MenuItem>
                            <MenuItem value={'no'}>No</MenuItem>
                        </InputSelector>
                    </Grid>
                    {changeTypeWatcher === 'si' && (
                        <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                            <InputText
                                fullWidth
                                control={control}
                                label="Tiempo de Falla (en Horas)"
                                name="tiempoDeFalla"
                                type="number"
                            />
                        </Grid>
                    )}
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <InputSelector control={control} label="Maquina de Relación" name="maquina_id_relacion">
                            {idxIdRelationMaq.map((item) => (
                                <MenuItem key={item._id} value={item.id_maquina}>
                                    MAQ_{item.id_maquina}
                                </MenuItem>
                            ))}
                        </InputSelector>
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
                                onClick={onSubmit(handleCreateOrUpdateFollow)}
                            >
                                Guardar cambios
                            </LoadingButton>
                        )}
                    </Box>
                </Grid>
            </Box>
        </Modal>
    )
}
