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
export const InputMultImgs: FC<Props> = ({ label, name, control }) => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <Controller
            shouldUnregister
            control={control}
            name={name}
            render={({ field: { onChange, value = [] }, formState: { errors } }) => {
                const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
                    if (isLoading) return
                    setIsLoading(true)
                    if (!target.files || target.files.length === 0) {
                        return
                    }

                    try {
                        let auxArr = [...value]

                        //aqui salta un error por no tener --downlevelIteration en el tsconfig
                        for (const file of target.files) {
                            const formData = new FormData()

                            formData.append('file', file)
                            //el 'file' es el nombre que resive la propiedad podia ser el nombre que quisieras
                            const { data } = await managementApi.post<{ message: string }>('/upload', formData)

                            // console.log(data.message );
                            //seteamos la nueva imagen traida del backend con cloudinary en el formulario con useForm y renderizamos de una
                            auxArr.push(data.message)
                        }
                        onChange(auxArr)
                        setIsLoading(false)
                    } catch (error) {
                        console.log({ error })
                        setIsLoading(false)
                    }
                }

                const onDelete = (img: string) => {
                    let arrAux = [...value]

                    arrAux = arrAux.filter((item) => item !== img)
                    onChange(arrAux)
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
                        {value &&
                            value.map((item: string, idx: number) => (
                                <Box key={idx} display="flex" flexDirection="column" sx={{ width: '50%', p: 1, pr: 2 }}>
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
                                            image={item}
                                            sx={{ objectFit: 'fill', maxHeight: '80%' }}
                                        />
                                        <CardActions sx={{ display: 'flex' }}>
                                            <Button fullWidth color="error" onClick={() => onDelete(item)}>
                                                BORRAR
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Box>
                            ))}
                    </>
                )
            }}
        />
    )
}
