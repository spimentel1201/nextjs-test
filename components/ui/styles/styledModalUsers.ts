import { Container } from '@mui/material'
import { styled } from '@mui/material/styles'

export const WrapperModalUser = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '72%',
    maxWidth: '1200px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    pb: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

export const WrapperModalHeaderUser = styled(Container)(() => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: '10px',
}))
