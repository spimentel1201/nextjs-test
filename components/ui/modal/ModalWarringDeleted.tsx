import { FC, useContext } from 'react'
import { Backdrop, Box, Button, Grid, Modal, Typography } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check'

import { UIContext } from '../../../context'
import { WrapperModalHeaderWarningDeleted, WrapperModalWarningDeleted } from '../styles'

interface Props {
    idDeleted: string
    genericTextDeleted: string
    actionDeleted: () => void
}

export const ModalWarringDeleted: FC<Props> = ({ idDeleted, genericTextDeleted, actionDeleted }) => {
    const { isModalWarringDeleted, toggleModalWarringDeleted } = useContext(UIContext)

    return (
        <Modal
            closeAfterTransition
            keepMounted
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            aria-describedby="keep-mounted-modal-description"
            aria-labelledby="keep-mounted-modal-title"
            open={isModalWarringDeleted}
            onClose={toggleModalWarringDeleted}
        >
            <Box sx={WrapperModalWarningDeleted}>
                <WrapperModalHeaderWarningDeleted sx={{ borderBottom: 1, borderColor: 'primary.main', flexGrow: 1 }}>
                    <Typography color="error" fontWeight="bold" sx={{ textJustify: 'auto' }} variant="h5">
                        Estas apunto de borrar algo que puede ser importante
                    </Typography>
                    {/* <Box sx={{ flexGrow: 1 }} /> */}
                </WrapperModalHeaderWarningDeleted>
                <Grid container>
                    <Grid item sx={{ m: 2 }} xs={12}>
                        <Typography color="text.primary" variant="body1">
                            {genericTextDeleted}
                        </Typography>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItem: 'center',
                                alignItems: 'center',
                                m: 1,
                            }}
                        >
                            <Button
                                color="success"
                                startIcon={<ClearIcon />}
                                variant="contained"
                                onClick={toggleModalWarringDeleted}
                            >
                                Cancelar
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItem: 'center',
                                alignItems: 'center',
                                m: 1,
                            }}
                        >
                            <Button color="error" startIcon={<CheckIcon />} variant="contained" onClick={actionDeleted}>
                                Aceptar
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}
