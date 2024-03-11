import { FC, ReactNode } from 'react'
import Head from 'next/head'
import { Box, Typography } from '@mui/material'

import { Navbar, SideMenu } from '../ui'

interface Props {
    children: ReactNode
    title: string
    subTitle: string
    icon?: JSX.Element
    toggleTheme: (theme: 'light' | 'dark') => void
}

export const AdminLayout: FC<Props> = ({ children, title, subTitle, icon, toggleTheme }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta content="Admin Layout" name="description" />

                <meta content={title} name="og:title" />
                <meta content="Admin Layout" name="og:description" />
            </Head>

            <nav>
                <Navbar toggleTheme={toggleTheme} />
            </nav>

            <SideMenu />

            <main
                style={{
                    margin: '80px auto',
                    maxWidth: '1440px',
                    padding: '0px 30px',
                }}
            >
                <Box display="flex" flexDirection="column">
                    <Typography
                        component="h1"
                        sx={{ fontWeight: '700', display: 'flex', alignItems: 'center' }}
                        variant="h6"
                    >
                        {icon}&nbsp;{title}
                    </Typography>
                    <Typography align="justify" sx={{ mb: 1 }} variant="body2">
                        {subTitle}
                    </Typography>
                </Box>
                <Box className="fadeIn">{children}</Box>
            </main>
        </>
    )
}
