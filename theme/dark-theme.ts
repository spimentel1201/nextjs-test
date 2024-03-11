import { createTheme } from '@mui/material/styles'

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ff8600',
        },
        secondary: {
            main: '#1565c0',
        },
        info: {
            main: '#7209b7',
        },
        success: {
            main: '#55a630',
        },
        warning: {
            main: '#ffc300',
        },
        error: {
            main: '#d62828',
        },
    },
    components: {
        MuiLink: {
            defaultProps: {
                underline: 'none',
            },
        },
    },
})
