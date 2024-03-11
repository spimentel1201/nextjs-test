import { CardMedia, Chip, Grid, IconButton, Box, Container, Link, Typography, Button } from '@mui/material'
import { GetServerSideProps, NextPage } from 'next'
import { useContext } from 'react'
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid'
import CreateIcon from '@mui/icons-material/Create'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'
import EditIcon from '@mui/icons-material/Edit'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
import DeleteIcon from '@mui/icons-material/Delete'
import NextLink from 'next/link'
import { getSession } from 'next-auth/react'
import moment from 'moment'

import { AdminLayout, Loading, ModalWarringDeleted, SnackbarError, SnackbarSuccess } from '../../components'
import { ITheme } from '../../interface'
import { AuthContext, InventoriesContext, UIContext } from '../../context'
import { useInventory } from '../../hooks'
const InventariosPage: NextPage<ITheme> = ({ toggleTheme }) => {
    const { user } = useContext(AuthContext)
    const { toggleSnackBarError, toggleSnackBarSuccess, isSnackbarError, isSnackbarSuccess } = useContext(UIContext)
    const { msmTextDelete, msmTextUpdate, isLoading, dataInventories } = useContext(InventoriesContext)
    const { handleDeletedInventario, warningDeletedInventario, navigateToUpdate, downloadFile } = useInventory()

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Identificación',
            width: 228,
            renderCell: ({ row }: GridRenderCellParams) => {
                return (
                    <Box
                        sx={{
                            overflow: 'hidden',
                            maxWidth: '100%',
                            whiteSpace: 'normal !important',
                        }}
                    >
                        {row._id}
                    </Box>
                )
            },
        },
        {
            field: 'tipoInventario',
            headerName: 'Tipo de Inventario',
            width: 170,
        },
        {
            field: 'nombre',
            headerName: 'Nombre',
            width: 180,
        },
        {
            field: 'imgQR',
            headerName: 'Código QR',
            width: 230,
            renderCell: ({ row }: GridValueGetterParams) => {
                return (
                    <Box sx={{ display: 'flex', width: '100%', height: '100%', position: 'relative' }}>
                        <CardMedia
                            alt={row.id}
                            component="img"
                            image={`${row.imgQR}`}
                            sx={{ width: '100%', height: '100%', objectFit: 'fill' }}
                        />
                        {row.imgQR && (
                            <IconButton
                                aria-label="add to shopping cart"
                                color="primary"
                                sx={{ position: 'absolute', top: '0', left: '0' }}
                                onClick={() => downloadFile(row.imgQR)}
                            >
                                <DownloadForOfflineIcon />
                            </IconButton>
                        )}
                    </Box>
                )
            },
        },
        {
            field: 'estado',
            headerName: 'Estado',
            width: 140,
            renderCell: ({ row }: GridValueGetterParams) => {
                return row.estado === 'malo' ? (
                    <Chip color="default" label="Malo" variant="outlined" />
                ) : row.estado === 'regular' ? (
                    <Chip color="warning" label="Regular" variant="outlined" />
                ) : (
                    <Chip color="success" label="Bueno" variant="outlined" />
                )
            },
        },
        {
            field: 'imagenes',
            headerName: 'Imagen',
            width: 230,
            renderCell: ({ row }: GridValueGetterParams) => {
                return (
                    <Box sx={{ displey: 'flex', flexGrow: 1 }}>
                        <CardMedia alt={row.id} component="img" image={`${row.imagenes[0]}`} />
                    </Box>
                )
            },
        },
        {
            field: 'fechaDeEntrada',
            headerName: 'Fecha De Entrada',
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
                        {moment(row.fechaDeEntrada).format('DD/MM/YYYY')}
                    </Box>
                )
            },
        },
        {
            field: 'fechaDeActualizacion',
            headerName: 'Fecha De Actualización',
            width: 170,
            renderCell: ({ row }: GridRenderCellParams) => {
                return (
                    <Box
                        sx={{
                            overflow: 'hidden',
                            maxWidth: '100%',
                            whiteSpace: 'normal !important',
                        }}
                    >
                        {moment(row.fechaDeActualizacion).format('DD/MM/YYYY')}
                    </Box>
                )
            },
        },
        {
            field: 'existencia',
            headerName: 'Existencia',
            width: 110,
        },
        {
            field: 'locacion',
            headerName: 'Locación',
            width: 140,
        },
        {
            field: 'subLocacion',
            headerName: 'Sublocación',
            width: 110,
        },
        //maquina
        {
            field: 'id_maquina',
            headerName: 'Identificador de maquina',
            width: 180,
            renderCell: ({ row }: GridRenderCellParams) => {
                return (
                    <Box
                        sx={{
                            overflow: 'hidden',
                            maxWidth: '100%',
                            whiteSpace: 'normal !important',
                        }}
                    >
                        {row.id_maquina && `Maq_${row.id_maquina}`}
                    </Box>
                )
            },
        },
        {
            field: 'capacidadNominal',
            headerName: 'Capacidad Nominal',
            width: 150,
        },
        {
            field: 'serie',
            headerName: 'Serie',
            width: 110,
        },
        {
            field: 'marca',
            headerName: 'Marca',
            width: 110,
        },
        {
            field: 'voltaje',
            headerName: 'Voltaje',
            width: 110,
        },
        {
            field: 'corriente',
            headerName: 'Corriente',
            width: 110,
        },
        {
            field: 'observacionGeneral',
            headerName: 'Observaciones General',
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
                        {row.observacionGeneral ? row.observacionGeneral.substring(0, 160) + '...' : null}
                    </Box>
                )
            },
        },
        {
            field: 'ind',
            headerName: 'IND',
            width: 270,
            renderCell: ({ row }: GridRenderCellParams) => {
                if (row.tipoInventario !== 'maquina') {
                    return <></>
                }

                return (
                    <NextLink passHref href={`/graphics/${row.id_maquina}`}>
                        <Link underline="always">Ver gráfica IND</Link>
                    </NextLink>
                )
            },
        },
        //repuesto
        {
            field: 'id_repuesto',
            headerName: 'Identificador de repuesto',
            width: 180,
            renderCell: ({ row }: GridRenderCellParams) => {
                return (
                    <Box
                        sx={{
                            overflow: 'hidden',
                            maxWidth: '100%',
                            whiteSpace: 'normal !important',
                        }}
                    >
                        {row.id_repuesto && `Rep_${row.id_repuesto}`}
                    </Box>
                )
            },
        },
        {
            field: 'validacionPorGPS',
            headerName: 'Validar por GPS ?',
            width: 150,
            renderCell: ({ row }: GridValueGetterParams) => {
                return row.validacionPorGPS === 'no' ? (
                    <Chip color="error" label="No" variant="outlined" />
                ) : row.validacionPorGPS === 'si' ? (
                    <Chip color="success" label="Si" variant="outlined" />
                ) : (
                    <></>
                )
            },
        },
        {
            field: 'coordenadas_gps',
            headerName: 'Coordenadas GPS',
            width: 150,
        },
        {
            field: 'validacionPorIMG',
            headerName: 'Validar por IMG ?',
            width: 150,
            renderCell: ({ row }: GridValueGetterParams) => {
                return row.validacionPorIMG === 'no' ? (
                    <Chip color="error" label="No" variant="outlined" />
                ) : row.validacionPorIMG === 'si' ? (
                    <Chip color="success" label="Si" variant="outlined" />
                ) : (
                    <></>
                )
            },
        },
        {
            field: 'maquina_id_relacion',
            headerName: 'Maquina de Relación',
            width: 150,
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
                        {row.maquina_id_relacion &&
                            row.maquina_id_relacion.map((item: string, idx: number) => {
                                return (
                                    <>
                                        {idx === 0 ? (
                                            <Typography key={idx} align="justify" variant="body2">
                                                Maq_{item}&nbsp;
                                            </Typography>
                                        ) : (
                                            <Typography key={idx} align="justify" variant="body2">
                                                - Maq_{item}&nbsp;
                                            </Typography>
                                        )}
                                    </>
                                )
                            })}
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
                            <IconButton color="secondary" onClick={() => navigateToUpdate(`/inventory/${row._id}`)}>
                                <EditIcon />
                            </IconButton>
                            {!['bodega', 'mtto'].includes(user?.rol!) && (
                                <IconButton color="error" onClick={() => warningDeletedInventario(row.nombre, row._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </Box>
                    </Container>
                )
            },
        },
    ]

    if (isLoading || dataInventories.length === 0) {
        return <Loading size={'70px'} title={'Cargando Inventarios, por favor espere...'} toggleTheme={toggleTheme} />
    }

    return (
        <AdminLayout
            icon={<SettingsSuggestIcon color="secondary" />}
            subTitle={'Gestión de Inventarios'}
            title={'Inventario'}
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
                            onClick={() => navigateToUpdate(`/inventory/new`)}
                        >
                            Crear nuevo inventario
                        </Button>
                    )}
                </Grid>
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
                        rows={dataInventories}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>
            <ModalWarringDeleted
                actionDeleted={handleDeletedInventario}
                genericTextDeleted={`Estas apunto de borrar el Inventario "${msmTextDelete}"
                ,si deseas seguir oprime el botón de "Aceptar", sino oprime en "Cancelar" o fuera de la pantalla.`}
                idDeleted={msmTextDelete}
            />
            <SnackbarError
                handleChangeSnackbar={toggleSnackBarError}
                isOpen={isSnackbarError}
                msmText={`Se ha borrando exitosamente el Inventario ${msmTextDelete}`}
            />
            <SnackbarSuccess
                handleChangeSnackbar={toggleSnackBarSuccess}
                isOpen={isSnackbarSuccess}
                msmText={
                    msmTextUpdate !== ''
                        ? `se ha actualizado exitosamente el inventario: ${msmTextUpdate}`
                        : 'se ha creado exitosamente el inventario'
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
                destination: '/auth/login?p=/inventory',
                permanent: false,
            },
        }
    }

    return {
        props: {},
    }
}

export default InventariosPage
