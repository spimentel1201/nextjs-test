import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { dbUsers } from '../../../database'

export default NextAuth({
    // Configure one or more authentication providers
    //si no te gusta el orden puedes mover provider de primero o de segundo para modificar el mismo orden
    providers: [
        //... creamos el login personalizado aqui

        Credentials({
            name: 'Custom Login',
            credentials: {
                email: { label: 'email', type: 'email', placeholder: 'example@example.com' },
                contrasena: { label: 'contraseña', type: 'password', placeholder: '********' },
            },
            async authorize(credentials) {
                //console.log({ credentials })
                //return { name: 'dummy', email: 'dummy@dummy.com', rol: 'mtto' };
                //Validar contra base de datos retornara null si falla y un objeto legible en caso tal pase
                return await dbUsers.checkUserEmailContrasena(credentials!.email, credentials!.contrasena)
            },
        }),
    ],
    //custom pages
    pages: {
        //login
        signIn: '/auth/login',
    },

    jwt: {
        // secret: process.env.JWT_SECRET_SEED, //deprecated
    },
    //especificar la duracion de la session
    session: {
        maxAge: 2592000, // 30d
        strategy: 'jwt',
        updateAge: 86400, //cada dia
    },
    //callbacks
    // sino espesificamos jwt por defecto esto trabaja con JWT
    callbacks: {
        //callback cuando se genera un jwt
        async jwt({ token, account, user }) {
            //console.log({ token, account, user})
            //hay una cuenta si lo hay procesamos la infg
            if (account) {
                //igualamos
                token.accessToken = account.access_token

                switch (account.type) {
                    //si se loguea con credenciales sus credenciales pasan al token de nextAuth
                    case 'credentials':
                        token.user = user
                        break
                }
            }

            return token
        },

        //callback cuando se genera una nueva session
        async session({ session, token }) {
            //console.log({ session, token, user })
            // cuando se use el token para crear una session el token se lee y luego pasa a ser usado o transcrito en la session
            session.accessToken = token.accessToken
            session.user = token.user as any

            return session
        },
    },
})
