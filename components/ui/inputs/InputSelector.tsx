import { FormControl, FormHelperText, InputLabel, Select } from '@mui/material'
import { FC, ReactNode } from 'react'
import { Controller } from 'react-hook-form'

interface Props {
    children: ReactNode
    label: string
    name: string
    control: any
}

export const InputSelector: FC<Props> = ({ children, label, name, control }) => {
    return (
        <Controller
            shouldUnregister
            control={control}
            name={name}
            render={({ field: { onChange, value = '' }, formState: { errors } }) => {
                return (
                    <FormControl fullWidth error={errors[name]?.message ? true : false}>
                        <InputLabel id="demo-simple-select-error-label">{label}</InputLabel>
                        <Select
                            id="demo-simple-select-error"
                            label={label}
                            labelId="demo-simple-select-error-label"
                            value={value}
                            onChange={onChange}
                        >
                            {children}
                        </Select>
                        <FormHelperText>{errors[name]?.message as ReactNode}</FormHelperText>
                    </FormControl>
                )
            }}
        />
    )
}
