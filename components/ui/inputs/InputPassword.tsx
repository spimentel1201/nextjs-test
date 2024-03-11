import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import { ReactNode } from 'react'

import { useLogin } from '../../../hooks'

interface Props {
    fullWidth?: boolean
    label: string
    name: string
    control: any
}

export const InputPassword: FC<Props> = ({ fullWidth = false, label, name, control }) => {
    const { showPassword, handleOnChangeShowPassword } = useLogin()

    return (
        <Controller
            shouldUnregister
            control={control}
            name={name}
            render={({ field: { onChange, value = '' }, formState: { errors } }) => {
                return (
                    <FormControl sx={{ width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
                        <OutlinedInput
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                        onClick={handleOnChangeShowPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            error={!!errors[name]}
                            fullWidth={fullWidth}
                            id="outlined-adornment-password"
                            label={label}
                            type={showPassword ? 'text' : 'password'}
                            value={value}
                            onChange={onChange}
                        />
                        {!!errors[name] && (
                            <FormHelperText error id="accountId-error">
                                {errors[name]?.message as ReactNode}
                            </FormHelperText>
                        )}
                    </FormControl>
                )
            }}
        />
    )
}
