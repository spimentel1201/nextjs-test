import { FC, ReactNode } from 'react'
import Head from 'next/head'
import { Box } from '@mui/material'

interface Props {
    children: ReactNode
    title: string
}

export const AuthLayout: FC<Props> = ({ title, children }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <main>{children}</main>
        </>
    )
}
