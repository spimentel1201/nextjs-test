import { GetServerSideProps, NextPage } from 'next'
import { useContext } from 'react'
import { Button, Grid, Box } from '@mui/material'
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid'
import { PeopleOutline } from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CreateIcon from '@mui/icons-material/Create'
import IconButton from '@mui/material/IconButton'
import { getSession } from 'next-auth/react'
import { FormProvider } from 'react-hook-form'

import { ITheme } from '../interface'
import { AdminLayout, Loading, ModalUsers, ModalWarringDeleted, SnackbarError, SnackbarSuccess } from '../components'
import { UIContext, UsersContext } from '../context'
import { useUsers } from '../hooks'

const UsersPage: NextPage<ITheme> = ({ toggleTheme }) => {
    const { toggleSnackBarError, toggleSnackBarSuccess, isSnackbarError, isSnackbarSuccess, isModalUsersOpen } =
        useContext(UIContext)

    const { msmTextDelete, msmTextUpdate, isLoading, dataUsers, isUpdateUser } = useContext(UsersContext)
    const {
        formMethodsCreate,
        formMethodsUpdate,
        changeModalCreate,
        changeModalUpdate,
        handleDeletedUser,
        warringDeletedUser,
    } = useUsers()
    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'nombre', headerName: 'Nombre Completo', width: 300 },
        { field: 'rol', headerName: 'Rol', width: 150 },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 150,
            renderCell: ({ row }: GridValueGetterParams) => {
                return (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            p: 0,
                        }}
                    >
                        <IconButton color="secondary" onClick={() => changeModalUpdate(row)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => warringDeletedUser(row.email, row._id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                )
            },
        },
    ]

    if (isLoading || dataUsers.length === 0) {
        return <Loading size={'70px'} title={'Cargando Usuarios, por favor espere...'} toggleTheme={toggleTheme} />
    }

    return (
        <AdminLayout
            icon={<PeopleOutline color="secondary" />}
            subTitle={'Gestión de Usuarios'}
            title={'Usuarios'}
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
                    <Button color="secondary" startIcon={<CreateIcon />} variant="outlined" onClick={changeModalCreate}>
                        Crear nuevo usuario
                    </Button>
                </Grid>
                <Grid item sx={{ height: 650, width: '100%' }} xs={12}>
                    <DataGrid
                        columns={columns}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        getRowId={(row) => row._id}
                        pageSize={10}
                        rows={dataUsers}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>
            {/* condicional para evitar que se queden guardados los datos de los inputs */}
            {isModalUsersOpen && isUpdateUser && (
                <FormProvider {...formMethodsUpdate}>
                    <ModalUsers />
                </FormProvider>
            )}
            {isModalUsersOpen && !isUpdateUser && (
                <FormProvider {...formMethodsCreate}>
                    <ModalUsers />
                </FormProvider>
            )}
            <ModalWarringDeleted
                actionDeleted={handleDeletedUser}
                genericTextDeleted={`Estas apunto de borrar al usuario "${msmTextDelete}"
            ,si deseas seguir oprime el botón de "Aceptar", sino oprime en "Cancelar" o fuera de la pantalla.`}
                idDeleted={msmTextDelete}
            />
            <SnackbarError
                handleChangeSnackbar={toggleSnackBarError}
                isOpen={isSnackbarError}
                msmText={`Se ha borrando exitosamente el usuario: ${msmTextDelete}`}
            />
            <SnackbarSuccess
                handleChangeSnackbar={toggleSnackBarSuccess}
                isOpen={isSnackbarSuccess}
                msmText={
                    msmTextUpdate !== ''
                        ? `se ha actualizado exitosamente el usuario: ${msmTextUpdate}`
                        : 'se ha creado exitosamente el usuario'
                }
            />
        </AdminLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session: any = await getSession({ req })

    // console.log({ session, req })
    if (!session) {
        return {
            redirect: {
                destination: '/auth/login?p=/users',
                permanent: false,
            },
        }
    }

    if (session?.user?.rol! !== 'super_admin') {
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

export default UsersPage
