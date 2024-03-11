import { FC, ReactNode } from 'react'
import { Controller } from 'react-hook-form'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { Chip, TextField, TextFieldProps } from '@mui/material'
interface Props {
    label: string
    name: string
    control: any
    disablePast?: boolean
}

export const InputDateDesktop: FC<Props> = ({ label, name, control, disablePast = false }) => {
    return (
        <Controller
            shouldUnregister
            control={control}
            name={name}
            render={({ field: { onChange, value }, formState: { errors } }) => {
                //console.log({ value })

                return (
                    <>
                        <DesktopDatePicker
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
