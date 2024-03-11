import type { AppProps } from 'next/app'

import { useEffect, useState } from 'react'
import { SessionProvider } from 'next-auth/react'
import Cookies from 'js-cookie'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { AuthProvider, FollowsProvider, InventoriesProvider, OTsProvider, UIProvider, UsersProvider } from '../context'
import '../styles/globals.css'
import { darkTheme, lightTheme } from '../theme'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    const [currentTheme, setCurrentTheme] = useState(lightTheme)

    useEffect(() => {
        const themeByCookies = Cookies.get('theme') || 'light'

        if (themeByCookies === 'light') {
            return setCurrentTheme(lightTheme)
        } else if (themeByCookies === 'dark') {
            return setCurrentTheme(darkTheme)
        }
    }, [])

    const toggleTheme = (theme: 'light' | 'dark') => {
        Cookies.set('theme', theme)
        if (theme === 'light') {
            return setCurrentTheme(lightTheme)
        } else if (theme === 'dark') {
            return setCurrentTheme(darkTheme)
        }
    }

    return (
        <SessionProvider session={session}>
            <AuthProvider>
                <UIProvider>
                    <UsersProvider>
                        <InventoriesProvider>
                            <OTsProvider>
                                <FollowsProvider>
                                    <ThemeProvider theme={currentTheme}>
                                        <CssBaseline />
                                        <Component {...pageProps} toggleTheme={toggleTheme} />
                                    </ThemeProvider>
                                </FollowsProvider>
                            </OTsProvider>
                        </InventoriesProvider>
                    </UsersProvider>
                </UIProvider>
            </AuthProvider>
        </SessionProvider>
    )
}

export default MyApp
