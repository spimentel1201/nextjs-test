import { TextField } from '@mui/material'
import { FC, ReactNode } from 'react'
import { Controller } from 'react-hook-form'

interface Props {
    fullWidth?: boolean
    label: string
    type: string
    name: string
    control: any
}

export const InputText: FC<Props> = ({ fullWidth = false, label, type, name, control }) => {
    return (
        <Controller
            shouldUnregister
            control={control}
            name={name}
            render={({ field: { onChange, value = '' }, formState: { errors } }) => {
                return (
                    <TextField
                        error={!!errors[name]}
                        fullWidth={fullWidth}
                        helperText={errors[name]?.message as ReactNode}
                        label={label}
                        type={type}
                        value={value}
                        onChange={onChange}
                    />
                )
            }}
        />
    )
}
