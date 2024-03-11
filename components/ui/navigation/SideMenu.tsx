import Image from 'next/image'
import { MouseEvent, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import {
    AccountCircleOutlined,
    AdminPanelSettings,
    ConfirmationNumberOutlined,
    DashboardOutlined,
    LoginOutlined,
} from '@mui/icons-material'
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined'
import EngineeringIcon from '@mui/icons-material/Engineering'
import GitHubIcon from '@mui/icons-material/GitHub'
import {
    CardMedia,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    ListSubheader,
    Popover,
    Typography,
    Box,
} from '@mui/material'

import { AuthContext, UIContext } from '../../../context'
import logoMtto from '../../../public/mtto.png'

export const SideMenu = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
    const { toggleSideMenu, isMenuOpen } = useContext(UIContext)
    const { logout, isLoggedIn, user } = useContext(AuthContext)
    const { push } = useRouter()
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const navigateTo = (url: string) => {
        toggleSideMenu()
        push(url)
    }

    return (
        <Drawer
            anchor="left"
            open={isMenuOpen}
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
            onClose={toggleSideMenu}
        >
            <Box sx={{ width: 250, paddingTop: 5, height: '100%' }}>
                <List sx={{ display: 'flex', flexFlow: 'column', pb: 2, height: '100%' }}>
                    <ListItem>
                        <CardMedia
                            alt="logoMtto"
                            component="img"
                            image={`https://res.cloudinary.com/danfelogar/image/upload/v1662003403/o89ye5acl2h3ejvnry3q.png`}
                        />
                    </ListItem>
                    <Divider variant="middle" />
                    {isLoggedIn && (
                        <ListItem button aria-describedby={id} onClick={(e: any) => handleClick(e)}>
                            <ListItemIcon>
                                <AccountCircleOutlined />
                            </ListItemIcon>
                            <ListItemText primary={'Perfil'} />
                        </ListItem>
                    )}
                    <Popover
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        id={id}
                        open={open}
                        sx={{ ml: 1 }}
                        onClose={handleClose}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'row', p: 1 }}>
                            <Typography color="text.primary" component="p" sx={{ fontWeight: 'bold' }} variant="body1">
                                Nombre:&nbsp;
                            </Typography>
                            <Typography color="text.secondary" component="p" sx={{ fontWeight: '400' }} variant="body1">
                                {user?.nombre}
                            </Typography>
                        </Box>
                        <Divider variant="middle" />
                        <Box sx={{ display: 'flex', flexDirection: 'row', p: 1 }}>
                            <Typography color="text.primary" component="p" sx={{ fontWeight: 'bold' }} variant="body1">
                                Email:&nbsp;
                            </Typography>
                            <Typography color="text.secondary" component="p" sx={{ fontWeight: '400' }} variant="body1">
                                {user?.email}
                            </Typography>
                        </Box>
                        <Divider variant="middle" />
                        <Box sx={{ display: 'flex', flexDirection: 'row', p: 1 }}>
                            <Typography color="text.primary" component="p" sx={{ fontWeight: 'bold' }} variant="body1">
                                Rol:&nbsp;
                            </Typography>
                            <Typography color="text.secondary" component="p" sx={{ fontWeight: '400' }} variant="body1">
                                {user?.rol}
                            </Typography>
                        </Box>
                    </Popover>
                    {isLoggedIn && (
                        <ListItem button onClick={() => navigateTo('/')}>
                            <ListItemIcon>
                                <DashboardOutlined />
                            </ListItemIcon>
                            <ListItemText primary={'Dashboard'} />
                        </ListItem>
                    )}

                    {['super_admin', 'admin_bodega', 'bodega', 'admin_mtto', 'mtto'].includes(user?.rol!) && (
                        <ListItem button onClick={() => navigateTo('/inventory')}>
                            <ListItemIcon>
                                <InventoryOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Inventario'} />
                        </ListItem>
                    )}
                    {['super_admin', 'admin_mtto', 'mtto'].includes(user?.rol!) && (
                        <ListItem button onClick={() => navigateTo('/ots')}>
                            <ListItemIcon>
                                <ConfirmationNumberOutlined />
                            </ListItemIcon>
                            <ListItemText primary={'OTs'} />
                        </ListItem>
                    )}
                    {['super_admin', 'admin_mtto', 'mtto'].includes(user?.rol!) && (
                        <ListItem button onClick={() => navigateTo('/follows')}>
                            <ListItemIcon>
                                <EngineeringIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Seguimiento'} />
                        </ListItem>
                    )}

                    {/* {isLoggedIn ? ( */}
                    {user?.rol! === 'super_admin' && (
                        <ListItem button onClick={() => navigateTo('/users')}>
                            <ListItemIcon>
                                <AdminPanelSettings />
                            </ListItemIcon>
                            <ListItemText primary={'Usuarios'} />
                        </ListItem>
                    )}
                    {/* ) : ( */}
                    {/* //atento que si enviamos este query parameter "?q=...." podemos mandarlo en un middleware para poder surftear automaticamente la ultima pagina que visitamos cuando hagamos el login exitoso

                        //esto se hace con la finalidad de tener guardado cual fue la ultima page navegada */}
                    {isLoggedIn && (
                        <ListItem button onClick={() => logout()}>
                            <ListItemIcon>
                                <LoginOutlined />
                            </ListItemIcon>
                            <ListItemText primary={'cerrar Sesión'} />
                        </ListItem>
                    )}
                    <Box flexShrink={2} sx={{ flex: '1 1 auto' }} />
                    <Divider />
                    <ListSubheader>Sección de contacto</ListSubheader>

                    <ListItem component="a" href="https://github.com/Danfelogar" sx={{ color: 'inherit' }}>
                        <ListItemIcon>
                            <GitHubIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Created by Danfelogar'} />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}
