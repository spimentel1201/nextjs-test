import { FC, ReactNode, useState } from 'react'
import { FormControl, FormHelperText, InputLabel, OutlinedInput, Select, SelectChangeEvent } from '@mui/material'
import { Controller } from 'react-hook-form'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

interface Props {
    children: ReactNode
    label: string
    name: string
    control: any
}
export const InputMultSelector: FC<Props> = ({ children, label, name, control }) => {
    return (
        <Controller
            shouldUnregister
            control={control}
            name={name}
            render={({ field: { onChange, value = [] }, formState: { errors } }) => {
                const handleChange = (event: SelectChangeEvent<string[]>) => {
                    const {
                        target: { value },
                    } = event

                    onChange(typeof value === 'string' ? value.split(',') : value)
                }

                return (
                    <FormControl fullWidth error={errors[name]?.message ? true : false}>
                        <InputLabel id="demo-multiple-checkbox-error-label">{label}</InputLabel>
                        <Select
                            multiple
                            MenuProps={MenuProps}
                            id="demo-multiple-checkbox-error"
                            input={<OutlinedInput label={label} />}
                            label={label}
                            labelId="demo-multiple-checkbox-error-label"
                            renderValue={(selected) => selected.join(', ')}
                            value={value}
                            onChange={handleChange}
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
