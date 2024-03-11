import { Box, Card, CardContent, Container } from '@mui/material'
import { styled } from '@mui/material/styles'

export const WrapperAuth = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',

    '@media(min-height: 901px)': {
        height: '100vh',
    },
}))

export const WrapperAuthHeader = styled(Box)(() => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'inherit',
}))

export const WrapperAuthBody = styled(Box)(() => ({
    flexGrow: 1,
    width: '100%',
    maxWidth: '740px',
    padding: '60px 0',
    display: 'flex',
    justifyContent: 'center',
}))

export const ContainerBodyAuth = styled(Container)(() => ({
    display: 'flex',
    width: '80%',
    height: '82%',
}))

export const WrapperCardAuth = styled(Card)(() => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    // height: '90vh',
    borderRadius: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px -4px 20px 0px rgba(0,0,0,0.3)',
}))

export const CardContentAuth = styled(CardContent)(() => ({
    width: '90%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    '@media(max-height: 947px)': {
        height: '70vh',
    },
    '@media(max-height: 901px)': {
        height: '100%',
    },
}))
