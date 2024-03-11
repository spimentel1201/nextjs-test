import NextLink from 'next/link'
import { AppBar, Link, Toolbar, CardMedia } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { Box } from '@mui/system'
import Image from 'next/image'
import DehazeOutlinedIcon from '@mui/icons-material/DehazeOutlined'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import { FC, useContext } from 'react'

import logoMtto from '../../../public/mtto.png'
import { UIContext } from '../../../context/ui/UIContext'

interface Props {
    toggleTheme: (theme: 'light' | 'dark') => void
}

export const Navbar: FC<Props> = ({ toggleTheme }) => {
    const { theme, toggleSideMenu, changeTheme } = useContext(UIContext)

    const handleChangeTheme = (theme: 'light' | 'dark') => {
        toggleTheme(theme)
        changeTheme(theme)
    }

    return (
        <AppBar color="inherit">
            <Toolbar>
                <NextLink passHref href="/">
                    <Link alignItems="center" display="flex">
                        <Box sx={{ width: '100px', paddingTop: '0.1px' }}>
                            <CardMedia
                                alt="logoMtto"
                                component="img"
                                image={`https://res.cloudinary.com/danfelogar/image/upload/v1662003403/o89ye5acl2h3ejvnry3q.png`}
                            />
                        </Box>
                    </Link>
                </NextLink>
                <IconButton color="primary" onClick={toggleSideMenu}>
                    <DehazeOutlinedIcon />
                </IconButton>

                <Box flex={1} />
                {theme === 'dark' ? (
                    <IconButton color="secondary" sx={{ ml: 1 }} onClick={() => handleChangeTheme('light')}>
                        <Brightness7Icon />
                    </IconButton>
                ) : (
                    <IconButton color="secondary" sx={{ ml: 1 }} onClick={() => handleChangeTheme('dark')}>
                        <Brightness4Icon />
                    </IconButton>
                )}
            </Toolbar>
        </AppBar>
    )
}
