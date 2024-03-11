import { Box, Button, CardMedia, Chip, Container, Grid, IconButton, Typography } from '@mui/material'
import { useContext } from 'react'
import CreateIcon from '@mui/icons-material/Create'
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { GetServerSideProps, NextPage } from 'next'
import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { getSession } from 'next-auth/react'
import { FormProvider } from 'react-hook-form'
import moment from 'moment'
import { string } from 'yup'

import { ITheme } from '../interface'
import { UIContext, OTsContext, AuthContext } from '../context'
import { AdminLayout, Loading, ModalOTs, ModalWarringDeleted, SnackbarError, SnackbarSuccess } from '../components'
import { useOTs } from '../hooks'

const OtsPage: NextPage<ITheme> = ({ toggleTheme }) => {
    const { user } = useContext(AuthContext)
    const { toggleSnackBarError, toggleSnackBarSuccess, isSnackbarError, isSnackbarSuccess, isModalOTsOpen } =
        useContext(UIContext)

    const { isLoading, dataOTs, msmTextDelete, msmTextUpdate, isUpdateOT } = useContext(OTsContext)
    const {
        formMethodsCreate,
        formMethodsUpdate,
        changeModalCreate,
        changeModalUpdate,
        handleDeletedOT,
        warningDeletedOT,
        idxIdRelationMaq,
        idxIdRelationRep,
        idxUsersMttos,
        handleCreateOrUpdateOT,
    } = useOTs()

    const columns: GridColDef[] = [
        {
            field: 'slug',
            headerName: 'Numero de la Orden',
            width: 150,
            renderCell: ({ row }: GridRenderCellParams) => {
                return (
                    <Box
                        sx={{
                            overflow: 'hidden',
                            maxWidth: '100%',
                            whiteSpace: 'normal !important',
                        }}
                    >
                        {row.slug}
                    </Box>
                )
            },
        },
        {
            field: 'maquina',
            headerName: 'Maquina a realizar mantenimiento',
            width: 240,
            renderCell: ({ row }: GridRenderCellParams) => {
                return (
                    <Box
                        sx={{
                            overflow: 'hidden',
                            maxWidth: '100%',
                            display: 'flex',
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                        }}
                    >
                        <Typography align="justify" variant="body2">
                            Maq_{row.maquina}
                        </Typography>
                    </Box>
                )
            },
        },
        {
            field: 'repuesto',
            headerName: 'Repuesto a necesitar',
            width: 160,
        },
        {
            field: 'tecnico_ing',
            headerName: 'Encargado del mantenimiento',
            width: 210,
        },
        {
            field: 'estado_de_OT',
            headerName: 'Estado de la OT',
            width: 140,
            renderCell: ({ row }: GridValueGetterParams) => {
                return row.estado_de_OT === 'pendiente' ? (
                    <Chip color="default" label="Pendiente" variant="outlined" />
                ) : row.estado_de_OT === 'en_proceso' ? (
                    <Chip color="warning" label="en proceso" variant="outlined" />
                ) : (
                    <Chip color="success" label="finalizada" variant="outlined" />
                )
            },
        },
        {
            field: 'numero_de_orden_de_compra',
            headerName: 'Numero de orden de compra',
            width: 200,
        },
        {
            field: 'fecha_expedicion',
            headerName: 'Fecha de expedición',
            width: 160,
            renderCell: ({ row }: GridRenderCellParams) => {
                return (
                    <Box
                        sx={{
                            overflow: 'hidden',
                            maxWidth: '100%',
                            whiteSpace: 'normal !important',
                        }}
                    >
                        {moment(row.fecha_expedicion).format('DD/MM/YYYY')}
                    </Box>
                )
            },
        },
        {
            field: 'tiempoDeEjecucion',
            headerName: 'Tiempo de Ejecución',
            width: 160,
            renderCell: ({ row }: GridRenderCellParams) => {
                return (
                    <Box
                        sx={{
                            overflow: 'hidden',
                            maxWidth: '100%',
                            display: 'flex',
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                        }}
                    >
                        <Typography align="justify" variant="body2">
                            {row.tiempoDeEjecucion} Horas
                        </Typography>
                    </Box>
                )
            },
        },
        {
            field: 'fecha_cierre',
            headerName: 'Fecha de cierre',
            width: 130,
            renderCell: ({ row }: GridRenderCellParams) => {
                return (
                    <Box
                        sx={{
                            overflow: 'hidden',
                            maxWidth: '100%',
                            whiteSpace: 'normal !important',
                        }}
                    >
                        {moment(row.fecha_cierre).format('DD/MM/YYYY')}
                    </Box>
                )
            },
        },
        {
            field: 'imgDeMaquina',
            headerName: 'Imagen De Maquina',
            width: 230,
            renderCell: ({ row }: GridValueGetterParams) => {
                return (
                    <Box sx={{ displey: 'flex', flexGrow: 1 }}>
                        <CardMedia alt={row.id} component="img" image={`${row.imgDeLaMaquina}`} />
                    </Box>
                )
            },
        },
        {
            field: 'tareas',
            headerName: 'Tareas',
            width: 230,
            renderCell: ({ row }: GridRenderCellParams) => {
                return (
                    <Box
                        sx={{
                            overflow: 'hidden',
                            maxWidth: '100%',
                            whiteSpace: 'normal !important',
                        }}
                    >
                        {row.tareas ? row.tareas.substring(0, 160) + '...' : null}
                    </Box>
                )
            },
        },
        {
            field: 'comentario',
            headerName: 'Comentario',
            width: 250,
            renderCell: ({ row }: GridRenderCellParams) => {
                return (
                    <Box
                        sx={{
                            overflow: 'hidden',
                            maxWidth: '100%',
                            whiteSpace: 'normal !important',
                        }}
                    >
                        {row.comentario ? row.comentario.substring(0, 160) + '...' : null}
                    </Box>
                )
            },
        },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 150,
            renderCell: ({ row }: GridValueGetterParams) => {
                return (
                    <Container>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <IconButton color="secondary" onClick={() => changeModalUpdate(row)}>
                                <EditIcon />
                            </IconButton>
                            {!['bodega', 'mtto'].includes(user?.rol!) && (
                                <IconButton color="error" onClick={() => warningDeletedOT(row.ot_id, row._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </Box>
                    </Container>
                )
            },
        },
    ]

    if (isLoading || dataOTs.length === 0) {
        return <Loading size={'70px'} title={'Cargando OTs, por favor espere...'} toggleTheme={toggleTheme} />
    }

    return (
        <AdminLayout
            icon={<ConfirmationNumberOutlined color="secondary" />}
            subTitle={'Gestión de OTs'}
            title={'OTS'}
            toggleTheme={toggleTheme}
        >
            <Grid container className="fadeIn">
                <Grid
                    item
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        mb: 1,
                        mt: 1,
                    }}
                    xs={12}
                >
                    {!['bodega', 'mtto'].includes(user?.rol!) && (
                        <Button
                            color="secondary"
                            startIcon={<CreateIcon />}
                            variant="outlined"
                            onClick={changeModalCreate}
                        >
                            Crear nueva OT
                        </Button>
                    )}
                </Grid>
                <Grid item sx={{ height: 650, width: '100%' }} xs={12}>
                    <DataGrid
                        columns={columns}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        getEstimatedRowHeight={() => 80}
                        getRowHeight={() => 130}
                        getRowId={(row) => row._id}
                        pageSize={10}
                        rows={dataOTs}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>
            {/* condicional para evitar que se queden guardados los datos de los inputs */}
            {isModalOTsOpen && isUpdateOT && (
                <FormProvider {...formMethodsUpdate}>
                    <ModalOTs
                        handleCreateOrUpdateOT={handleCreateOrUpdateOT}
                        idxIdRelationMaq={idxIdRelationMaq}
                        idxIdRelationRep={idxIdRelationRep}
                        idxUsersMttos={idxUsersMttos}
                    />
                </FormProvider>
            )}
            {isModalOTsOpen && !isUpdateOT && (
                <FormProvider {...formMethodsCreate}>
                    <ModalOTs
                        handleCreateOrUpdateOT={handleCreateOrUpdateOT}
                        idxIdRelationMaq={idxIdRelationMaq}
                        idxIdRelationRep={idxIdRelationRep}
                        idxUsersMttos={idxUsersMttos}
                    />
                </FormProvider>
            )}
            <ModalWarringDeleted
                actionDeleted={handleDeletedOT}
                genericTextDeleted={`Estas apunto de borrar la "${msmTextDelete}"
                ,si deseas seguir oprime el botón de "Aceptar", sino oprime en "Cancelar" o fuera de la pantalla.`}
                idDeleted={msmTextDelete}
            />
            <SnackbarError
                handleChangeSnackbar={toggleSnackBarError}
                isOpen={isSnackbarError}
                msmText={`Se ha borrando exitosamente la OT con identificador "${msmTextDelete}"`}
            />
            <SnackbarSuccess
                handleChangeSnackbar={toggleSnackBarSuccess}
                isOpen={isSnackbarSuccess}
                msmText={
                    msmTextUpdate !== ''
                        ? `se ha actualizado exitosamente la OT: ${msmTextUpdate}`
                        : `se ha creado exitosamente la OT`
                }
            />
        </AdminLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })

    //console.log({ session })
    if (!session) {
        return {
            redirect: {
                destination: '/auth/login?p=/ots',
                permanent: false,
            },
        }
    }

    if (!['super_admin', 'admin_mtto', 'mtto'].includes(session?.user?.rol)) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {},
    }
}

export default OtsPage
