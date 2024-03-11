import { FC, useContext, useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import EditIcon from '@mui/icons-material/Edit'
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { Grid, MenuItem, Button, Typography, Box, FormHelperText, Link } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { useInventory } from '../../hooks'
import { IInventario } from '../../interface'
import { AdminLayout } from '../layouts'
import { AuthContext, InventoriesContext } from '../../context'
import { managementApi } from '../../services'

import {
    InputDateDesktop,
    InputDateMobile,
    InputMultImgs,
    InputMultSelector,
    InputSelector,
    InputSingleImg,
    InputText,
    InputTextMult,
} from './inputs'

interface Props {
    toggleTheme: (theme: 'light' | 'dark') => void
    inventory: IInventario
}

export const SingleInventory: FC<Props> = ({ toggleTheme, inventory }) => {
    const { user } = useContext(AuthContext)
    const { isLoading } = useContext(InventoriesContext)
    const { handleCreateOrUpdateInventory } = useInventory()
    const { control, handleSubmit: onSubmit } = useFormContext<IInventario>()
    const changeTypeWatcher = useWatch({
        control,
        name: 'tipoInventario', // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    })
    const changeValGPSWatcher = useWatch({
        control,
        name: 'validacionPorGPS', // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    })
    const [idxIdRelationMaq, setIdxIdRelationMaq] = useState<Array<{ _id: string; id_maquina: number }>>([])
    const handlerIndexOfIdMaq = async () => {
        await managementApi
            .get('/admin/inventorysMaq')
            .then(({ data }) => {
                setIdxIdRelationMaq(data)
            })
            .catch((err) => console.log(err))
    }

    //console.log({ inventory })
    useEffect(() => {
        if (changeTypeWatcher === 'repuesto') {
            handlerIndexOfIdMaq()
        }
    }, [changeTypeWatcher])

    return (
        <AdminLayout
            icon={<EditIcon color="secondary" />}
            subTitle={inventory._id ? `Edicion de Inventario: ${inventory._id}` : 'Creación de nuevo inventario'}
            title={'Inventario'}
            toggleTheme={toggleTheme}
        >
            <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
                {!['bodega', 'mtto'].includes(user?.rol!) && (
                    <LoadingButton
                        color="primary"
                        loading={isLoading}
                        startIcon={<SaveAsOutlinedIcon />}
                        sx={{ width: '150px' }}
                        variant="contained"
                        onClick={onSubmit(handleCreateOrUpdateInventory)}
                    >
                        Guardar
                    </LoadingButton>
                )}
            </Box>
            <Grid container spacing={2}>
                {/* importante para que sirvan los datePicker */}
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <InputSelector control={control} label="Tipo de inventario" name="tipoInventario">
                            <MenuItem value={'maquina'}>Maquina</MenuItem>
                            <MenuItem value={'repuesto'}>Repuesto</MenuItem>
                        </InputSelector>
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <InputText fullWidth control={control} label="Nombre" name="nombre" type="text" />
                    </Grid>
                    {inventory?._id && (
                        <Grid item md={5.5} sx={{ m: 2, display: 'flex', flexDirection: 'column' }} xs={12}>
                            <InputSingleImg control={control} label="Image del código QR" name="imgQR" />
                            <FormHelperText>
                                Necesitas crear un codigo QR en este link:{' '}
                                <Link href="https://es.qr-code-generator.com/" target="_blank">
                                    Generador de codigos QR
                                </Link>{' '}
                                y debe de tener este codigo: {`"/${inventory._id}"`}
                            </FormHelperText>
                        </Grid>
                    )}
                    <Grid item md={5.5} sx={{ m: 2, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }} xs={12}>
                        <InputMultImgs control={control} label="Imágenes" name="imagenes" />
                    </Grid>
                    <Grid
                        item
                        md={5.5}
                        sx={{ m: 2, display: { xs: 'none', md: 'flex' }, flexDirection: 'column' }}
                        xs={12}
                    >
                        <InputDateDesktop control={control} label="Fecha de Entrada" name="fechaDeEntrada" />
                    </Grid>
                    <Grid
                        item
                        md={5.5}
                        sx={{ m: 2, flexDirection: 'column', display: { xs: 'flex', md: 'none' } }}
                        xs={12}
                    >
                        <InputDateMobile control={control} label="Fecha de Entrada" name="fechaDeEntrada" />
                    </Grid>
                    <Grid
                        item
                        md={5.5}
                        sx={{ m: 2, display: { xs: 'none', md: 'flex' }, flexDirection: 'column' }}
                        xs={12}
                    >
                        <InputDateDesktop
                            control={control}
                            label="Fecha de Actualización"
                            name="fechaDeActualizacion"
                        />
                    </Grid>
                    <Grid
                        item
                        md={5.5}
                        sx={{ m: 2, flexDirection: 'column', display: { xs: 'flex', md: 'none' } }}
                        xs={12}
                    >
                        <InputDateMobile control={control} label="Fecha de Actualización" name="fechaDeActualizacion" />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <InputSelector control={control} label="Estado" name="estado">
                            <MenuItem value={'malo'}>Malo</MenuItem>
                            <MenuItem value={'regular'}>Regular</MenuItem>
                            <MenuItem value={'bueno'}>Bueno</MenuItem>
                        </InputSelector>
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <InputText fullWidth control={control} label="Existencia" name="existencia" type="number" />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <InputSelector control={control} label="Locación" name="locacion">
                            <MenuItem value={'produccion'}>Producción</MenuItem>
                            <MenuItem value={'taller'}>Taller</MenuItem>
                            <MenuItem value={'bodega'}>Bodega</MenuItem>
                            <MenuItem value={'oficina_administrativa'}>Oficina Administrativa</MenuItem>
                        </InputSelector>
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <InputText fullWidth control={control} label="Sublocación" name="subLocacion" type="number" />
                    </Grid>
                    {changeTypeWatcher === 'maquina' && (
                        <>
                            <Grid item sx={{ pl: 0, pt: 0 }} xs={12}>
                                <Typography
                                    sx={{ fontWeight: '700', display: 'flex', alignItems: 'center' }}
                                    variant="h5"
                                >
                                    Maquina
                                </Typography>
                            </Grid>
                            <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                                <InputText
                                    fullWidth
                                    control={control}
                                    label="Capacidad nominal"
                                    name="capacidadNominal"
                                    type="text"
                                />
                            </Grid>
                            <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                                <InputText fullWidth control={control} label="Serie" name="serie" type="text" />
                            </Grid>
                            <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                                <InputText fullWidth control={control} label="Marca" name="marca" type="text" />
                            </Grid>
                            <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                                <InputText fullWidth control={control} label="Voltaje" name="voltaje" type="number" />
                            </Grid>
                            <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                                <InputText
                                    fullWidth
                                    control={control}
                                    label="Corriente"
                                    name="corriente"
                                    type="number"
                                />
                            </Grid>
                            <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                                <InputTextMult
                                    fullWidth
                                    control={control}
                                    label="Observaciones Generales"
                                    maxRows={7}
                                    name="observacionGeneral"
                                />
                            </Grid>
                        </>
                    )}

                    {changeTypeWatcher === 'repuesto' && (
                        <>
                            <Grid item sx={{ pl: 0, pt: 0 }} xs={12}>
                                <Typography
                                    sx={{ fontWeight: '700', display: 'flex', alignItems: 'center' }}
                                    variant="h5"
                                >
                                    Repuesto
                                </Typography>
                            </Grid>
                            <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                                <InputSelector control={control} label="Validar por GPS?" name="validacionPorGPS">
                                    <MenuItem value={'si'}>Si</MenuItem>
                                    <MenuItem value={'no'}>No</MenuItem>
                                </InputSelector>
                            </Grid>
                            {changeValGPSWatcher === 'si' && (
                                <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                                    <InputText
                                        fullWidth
                                        control={control}
                                        label="Coordenadas GPS"
                                        name="coordenadas_gps"
                                        type="text"
                                    />
                                    <FormHelperText>
                                        Necesitas buscar en este link:{' '}
                                        <Link href="https://www.google.com/maps" target="_blank">
                                            GoogelMaps
                                        </Link>{' '}
                                        las coordenadas de tu ubicación para copiar y pegar como en este ejemplo:{' '}
                                        {`"38.160566, -92.614842"`}
                                    </FormHelperText>
                                </Grid>
                            )}
                            <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                                <InputSelector control={control} label="Validar por IMG?" name="validacionPorIMG">
                                    <MenuItem value={'si'}>Si</MenuItem>
                                    <MenuItem value={'no'}>No</MenuItem>
                                </InputSelector>
                            </Grid>
                            <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                                <InputMultSelector
                                    control={control}
                                    label="Maquina de relación"
                                    name="maquina_id_relacion"
                                >
                                    {idxIdRelationMaq.map((item) => (
                                        <MenuItem
                                            key={item._id}
                                            value={item.id_maquina}
                                        >{`Maq: ${item.id_maquina}`}</MenuItem>
                                    ))}
                                </InputMultSelector>
                            </Grid>
                        </>
                    )}
                </LocalizationProvider>
            </Grid>
        </AdminLayout>
    )
}
