import { GetServerSideProps, NextPage } from 'next'
import { DataGrid, GridToolbar, GridColDef, GridValueGetterParams, GridRenderCellParams } from '@mui/x-data-grid'
import { Box, Button, CardMedia, Chip, Container, Grid, IconButton, Typography } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import { EngineeringOutlined } from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useContext } from 'react'
import { getSession } from 'next-auth/react'
import { FormProvider } from 'react-hook-form'

import { AdminLayout } from '../components/layouts/AdminLayout'
import { ITheme } from '../interface/theme'
import { Loading, ModalFollows, ModalWarringDeleted, SnackbarError, SnackbarSuccess } from '../components'
import { AuthContext, FollowsContext, UIContext } from '../context'
import { useFollows } from '../hooks'

const FollowsPage: NextPage<ITheme> = ({ toggleTheme }) => {
    const {
        toggleModalFollows,
        toggleSnackBarError,
        toggleSnackBarSuccess,
        isSnackbarSuccess,
        isSnackbarError,
        isModalFollowsOpen,
    } = useContext(UIContext)
    const { user } = useContext(AuthContext)
    const { isLoading, dataFollows, msmTextDelete, msmTextUpdate, isUpdateFollow } = useContext(FollowsContext)
    const {
        formMethodsCreate,
        formMethodsUpdate,
        changeModalCreate,
        changeModalUpdate,
        handleDeletedFollow,
        warningDeletedFollow,
    } = useFollows()

    const columns: GridColDef[] = [
        {
            field: 'id_seguimiento',
            headerName: 'Identificación',
            width: 110,
            renderCell: ({ row }: GridRenderCellParams) => {
                return (
                    <Box
                        sx={{
                            overflow: 'hidden',
                            maxWidth: '100%',
                            whiteSpace: 'normal !important',
                        }}
                    >
                        {row.id_seguimiento}
                    </Box>
                )
            },
        },
        {
            field: 'imgDeVerificacion',
            headerName: 'Imagen De Verificación',
            width: 230,
            renderCell: ({ row }: GridValueGetterParams) => {
                return (
                    <Box sx={{ displey: 'flex', flexGrow: 1 }}>
                        <CardMedia alt={row.nombreDeObservador} component="img" image={`${row.imgDeVerificacion}`} />
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
            field: 'estadoDeLaMaquina',
            headerName: 'Estado De La Maquina',
            width: 200,
            renderCell: ({ row }: GridValueGetterParams) => {
                return row.estadoDeLaMaquina === 'malo' ? (
                    <Chip color="error" label="Malo" variant="outlined" />
                ) : row.estadoDeLaMaquina === 'regular' ? (
                    <Chip color="warning" label="Regular" variant="outlined" />
                ) : (
                    <Chip color="success" label="Bueno" variant="outlined" />
                )
            },
        },
        {
            field: 'nombreDeObservador',
            headerName: 'Nombre de Observador',
            width: 200,
        },
        {
            field: 'tiempoDeFuncionamiento',
            headerName: 'Tiempo de Funcionamiento',
            width: 200,
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
                            {row.tiempoDeFuncionamiento} {row.tiempoDeFuncionamiento === 1 ? 'Hora' : 'Horas'}
                        </Typography>
                    </Box>
                )
            },
        },
        {
            field: 'tiempoDeReparacion',
            headerName: 'Tiempo de Reaparición',
            width: 200,
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
                            {row.tiempoDeReparacion} {row.tiempoDeReparacion === 1 ? 'Hora' : 'Horas'}
                        </Typography>
                    </Box>
                )
            },
        },
        {
            field: 'presentaFalla',
            headerName: 'Presenta Falla ?',
            width: 200,
            renderCell: ({ row }: GridValueGetterParams) => {
                return row.presentaFalla === 'no' ? (
                    <Chip color="error" label="No" variant="outlined" />
                ) : (
                    <Chip color="success" label="Si" variant="outlined" />
                )
            },
        },
        {
            field: 'tiempoDeFalla',
            headerName: 'Tiempo De Falla',
            width: 200,
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
                            {row.tiempoDeFalla} {row.tiemposDeFalla === 1 ? 'Hora' : 'Horas'}
                        </Typography>
                    </Box>
                )
            },
        },
        {
            field: 'maquina_id_relacion',
            headerName: 'Maquina de Relación',
            width: 200,
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
                            Maq_{row.maquina_id_relacion}
                        </Typography>
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
                                <IconButton
                                    color="error"
                                    onClick={() => warningDeletedFollow(row.id_seguimiento, row._id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </Box>
                    </Container>
                )
            },
        },
    ]

    if (isLoading || dataFollows.length === 0) {
        return <Loading size={'70px'} title={'Cargando Seguimientos, por favor espere...'} toggleTheme={toggleTheme} />
    }

    return (
        <AdminLayout
            icon={<EngineeringOutlined color="secondary" />}
            subTitle={'Gestión de Seguimientos'}
            title={'Seguimiento'}
            toggleTheme={toggleTheme}
        >
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
                    <Button color="secondary" startIcon={<CreateIcon />} variant="outlined" onClick={changeModalCreate}>
                        Crear nuevo Seguimiento
                    </Button>
                )}
            </Grid>
            <Grid container className="fadeIn">
                <Grid item sx={{ height: 730, width: '100%' }} xs={12}>
                    <DataGrid
                        columns={columns}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        getEstimatedRowHeight={() => 80}
                        getRowHeight={() => 120}
                        getRowId={(row) => row._id}
                        pageSize={10}
                        rows={dataFollows}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>
            {isModalFollowsOpen && isUpdateFollow && (
                <FormProvider {...formMethodsUpdate}>
                    <ModalFollows />
                </FormProvider>
            )}
            {isModalFollowsOpen && !isUpdateFollow && (
                <FormProvider {...formMethodsCreate}>
                    <ModalFollows />
                </FormProvider>
            )}
            <ModalWarringDeleted
                actionDeleted={handleDeletedFollow}
                genericTextDeleted={`Estas apunto de borrar el Seguimiento "${msmTextDelete}"
                ,si deseas seguir oprime el botón de "Aceptar", sino oprime en "Cancelar" o fuera de la pantalla.`}
                idDeleted={msmTextDelete}
            />
            <SnackbarError
                handleChangeSnackbar={toggleSnackBarError}
                isOpen={isSnackbarError}
                msmText={`Se ha borrando exitosamente el seguimiento ${msmTextDelete}`}
            />
            <SnackbarSuccess
                handleChangeSnackbar={toggleSnackBarSuccess}
                isOpen={isSnackbarSuccess}
                msmText={
                    msmTextUpdate !== ''
                        ? `se ha actualizado exitosamente el seguimiento: ${msmTextUpdate}`
                        : `se ha creado exitosamente el seguimiento`
                }
            />
        </AdminLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })

    // console.log({ session })
    if (!session) {
        return {
            redirect: {
                destination: '/auth/login?p=/follows',
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

export default FollowsPage
