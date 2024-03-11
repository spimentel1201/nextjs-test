import { FC, ReactNode } from 'react'
import { Controller } from 'react-hook-form'
import { Chip, TextField, TextFieldProps } from '@mui/material'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'

interface Props {
    label: string
    name: string
    control: any
    disablePast?: boolean
}

export const InputDateMobile: FC<Props> = ({ label, name, control, disablePast = false }) => {
    return (
        <Controller
            shouldUnregister
            control={control}
            name={name}
            render={({ field: { onChange, value }, formState: { errors } }) => {
                return (
                    <>
                        <MobileDatePicker
                            disableMaskedInput
                            disablePast={disablePast}
                            inputFormat="DD/MM/YYYY"
                            label={label}
                            renderInput={(params: TextFieldProps) => <TextField {...params} sx={{ width: '100%' }} />}
                            value={value}
                            onChange={onChange}
                        />
                        {errors[name] && (
                            <Chip
                                color="error"
                                label={errors[name]?.message as ReactNode}
                                sx={{ display: 'flex', mt: 1 }}
                                variant="outlined"
                            />
                        )}
                    </>
                )
            }}
        />
    )
}
