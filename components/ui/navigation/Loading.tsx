import { HourglassBottom } from '@mui/icons-material'
import { Box, CircularProgress, Container, Typography } from '@mui/material'
import { FC } from 'react'

import { AdminLayout } from '../../layouts'

interface Props {
    toggleTheme: (theme: 'light' | 'dark') => void
    title: string
    size?: string
    color?: string
}

export const Loading: FC<Props> = ({ toggleTheme, title, size, color = 'text.primary' }) => {
    return (
        <AdminLayout
            icon={<HourglassBottom color="secondary" />}
            subTitle={'Espere un momento'}
            title={'Loading...'}
            toggleTheme={toggleTheme}
        >
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '70vh',
                }}
            >
                <Box
                    alignItems="center"
                    display="flex"
                    justifyContent="center"
                    sx={{
                        flexDirection: 'column',
                    }}
                >
                    <CircularProgress color="primary" size={size || '40px'} sx={{ mb: 3 }} />
                    <Typography
                        component="h1"
                        sx={{
                            fontWeight: '700',
                            display: 'flex',
                            textAlign: 'center',
                            alignItems: 'center',
                            color: { color },
                        }}
                        variant="h6"
                    >
                        {title}
                    </Typography>
                </Box>
            </Container>
        </AdminLayout>
    )
}
