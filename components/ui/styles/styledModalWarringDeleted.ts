import { Container } from '@mui/material'
import { styled } from '@mui/material/styles'

export const WrapperModalWarningDeleted = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '82%',
    maxWidth: '694px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    pb: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

export const WrapperModalHeaderWarningDeleted = styled(Container)(() => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: '10px',
}))
