import { Container } from '@mui/material'
import { styled } from '@mui/material/styles'

export const WrapperModalOT = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    maxWidth: '1200px',
    overflow: { xs: 'auto' },
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    pb: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

export const WrapperModalHeaderOT = styled(Container)(() => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: '10px',
}))
