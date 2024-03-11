import { Card } from '@mui/material'
import { styled } from '@mui/material/styles'

export const WrapperCard = styled(Card)(() => ({
    display: 'flex',
    maxWidth: '450px',

    '&:hover': {
        cursor: 'pointer',
    },
}))
