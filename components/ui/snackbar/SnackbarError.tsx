import { FC, forwardRef } from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert ref={ref} elevation={6} variant="filled" {...props} />
})

interface Props {
    msmText: string
    isOpen: boolean
    handleChangeSnackbar: () => void
}

export const SnackbarError: FC<Props> = ({ msmText, isOpen, handleChangeSnackbar }) => {
    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar autoHideDuration={6000} open={isOpen} onClose={handleChangeSnackbar}>
                <Alert severity="error" sx={{ width: '100%' }} onClose={handleChangeSnackbar}>
                    {msmText}
                </Alert>
            </Snackbar>
        </Stack>
    )
}
