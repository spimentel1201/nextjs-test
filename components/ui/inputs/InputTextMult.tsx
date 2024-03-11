import { TextField } from '@mui/material'
import { FC, ReactNode } from 'react'
import { Controller } from 'react-hook-form'

interface Props {
    fullWidth?: boolean
    maxRows: number
    label: string
    name: string
    control: any
}
export const InputTextMult: FC<Props> = ({ fullWidth = false, maxRows, label, name, control }) => {
    return (
        <Controller
            shouldUnregister
            control={control}
            name={name}
            render={({ field: { onChange, value = '' }, formState: { errors } }) => {
                return (
                    <TextField
                        multiline
                        error={!!errors[name]}
                        fullWidth={fullWidth}
                        helperText={errors[name]?.message as ReactNode}
                        id="outlined-multiline-flexible"
                        label={label}
                        maxRows={maxRows}
                        value={value}
                        onChange={onChange}
                    />
                )
            }}
        />
    )
}
