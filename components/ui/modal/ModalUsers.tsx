import { useContext } from 'react'
import { Modal, Backdrop, Box, Typography, IconButton, Grid, MenuItem, Button } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import CloseIcon from '@mui/icons-material/Close'
import SaveIcon from '@mui/icons-material/Save'
import { useFormContext } from 'react-hook-form'

import { WrapperModalHeaderUser, WrapperModalUser } from '../styles'
import { UIContext } from '../../../context'
import { useUsers } from '../../../hooks'
import { IUser } from '../../../interface'
import { InputPassword, InputSelector, InputText } from '../inputs'
import { UsersContext } from '../../../context/users/UsersContext'

export const ModalUsers = () => {
    const { toggleModalUsers, isModalUsersOpen } = useContext(UIContext)
    const { userForUpdate, isUpdateUser, isLoading } = useContext(UsersContext)
    const { handleCreateOrUpdateUser } = useUsers()

    const { control, handleSubmit: onSubmit } = useFormContext<IUser>()

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
            open={isModalUsersOpen}
            onClose={toggleModalUsers}
        >
            <Box sx={WrapperModalUser}>
                <WrapperModalHeaderUser sx={{ borderBottom: 1, borderColor: 'primary.main' }}>
                    <Typography variant="h5">
                        {isUpdateUser ? `Editando usuario: ${userForUpdate?.email}` : `Creando Usuario`}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton color="error" sx={{ border: 1, ml: 1 }} onClick={toggleModalUsers}>
                        <CloseIcon />
                    </IconButton>
                </WrapperModalHeaderUser>
                <Grid container>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <InputText fullWidth control={control} label="Nombre Completo" name="nombre" type="text" />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <InputText fullWidth control={control} label="Email" name="email" type="email" />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <InputPassword fullWidth control={control} label="Contraseña" name="contrasena" />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <InputSelector control={control} label="Rol" name="rol">
                            <MenuItem value="super_admin">Super Admin</MenuItem>
                            <MenuItem value="admin_bodega">Admin Bodega</MenuItem>
                            <MenuItem value="admin_mtto">Admin Mantenimiento</MenuItem>
                            <MenuItem value="bodega">Bodega</MenuItem>
                            <MenuItem value="mtto">Mantenimiento</MenuItem>
                        </InputSelector>
                    </Grid>
                </Grid>
                <Grid container sx={{ p: 2 }}>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <LoadingButton
                            color="secondary"
                            loading={isLoading}
                            startIcon={<SaveIcon />}
                            variant="outlined"
                            onClick={onSubmit(handleCreateOrUpdateUser)}
                        >
                            Guardar cambios
                        </LoadingButton>
                    </Box>
                </Grid>
            </Box>
        </Modal>
    )
}
