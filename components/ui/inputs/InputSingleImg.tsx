import { FC, ReactNode, useState } from 'react'
import { Controller } from 'react-hook-form'
import { Box, Button, Card, CardActions, CardMedia, Chip, FormLabel } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { ChangeEvent } from 'react'
import { LoadingButton } from '@mui/lab'

import { managementApi } from '../../../services'

interface Props {
    label: string
    name: string
    control: any
}

export const InputSingleImg: FC<Props> = ({ label, name, control }) => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <Controller
            shouldUnregister
            control={control}
            name={name}
            render={({ field: { onChange, value = '' }, formState: { errors } }) => {
                const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
                    if (isLoading) return
                    setIsLoading(true)
                    if (!target.files || target.files.length === 0) {
                        return
                    }
                    console.log(target.files[0])
                    try {
                        //investigar mas sobre FormData
                        const formData = new FormData()

                        formData.append('file', target.files[0])
                        //el 'file' es el nombre que resive la propiedad podia ser el nombre que quisieras
                        const { data } = await managementApi.post<{ message: string }>('/upload', formData)

                        // console.log(data.message );
                        //seteamos la nueva imagen traida del backend con cloudinary en el formulario con useForm y renderizamos de una
                        onChange(data.message)
                        setIsLoading(false)
                    } catch (error) {
                        console.log({ error })
                        setIsLoading(false)
                    }
                }

                return (
                    <>
                        <Box display="flex" flexDirection="column" sx={{ width: '50%', pr: 2 }}>
                            <FormLabel sx={{ mb: 1 }}>{label}</FormLabel>
                            <LoadingButton
                                fullWidth
                                color="secondary"
                                component="label"
                                loading={isLoading}
                                startIcon={<CloudUploadIcon />}
                                sx={{ mb: 3 }}
                                variant="contained"
                            >
                                Actualizar
                                <input hidden multiple accept="image/*" type="file" onChange={onFilesSelected} />
                            </LoadingButton>
                            {errors[name] && (
                                <Chip
                                    color="error"
                                    label={errors[name]?.message as ReactNode}
                                    sx={{ display: 'flex', mt: 1 }}
                                    variant="outlined"
                                />
                            )}
                        </Box>
                        {value !== '' && (
                            <Box display="flex" flexDirection="column" sx={{ width: '50%', p: 1, pr: 2 }}>
                                <Card
                                    sx={{
                                        width: '100%',
                                        maxWidth: '200px',
                                        maxHeight: '262px',
                                    }}
                                >
                                    <CardMedia
                                        alt="img demo"
                                        className="fadeIn"
                                        component="img"
                                        image={value}
                                        sx={{ objectFit: 'fill', maxHeight: '80%' }}
                                    />
                                    <CardActions sx={{ display: 'flex' }}>
                                        <Button fullWidth color="error" onClick={() => onChange('')}>
                                            BORRAR
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Box>
                        )}
                    </>
                )
            }}
        />
    )
}
