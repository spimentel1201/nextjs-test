import jwt from 'jsonwebtoken'

export const signToken = (_id: string, email: string) => {
    //recuerda que el jsonwebtoken no trabaja async sino con callbacks por lo que toca hacerlo de esta manera

    if (!process.env.JWT_SECRET_SEED) {
        //recuerda que si modificas los .env tienes que bajar y subir de nuevo la app
        throw new Error(`No JWT seed - mira las variables de entorno en(.env)`)
    }

    return jwt.sign(
        //payload primera parte para guardar se guarda info no sencible sea name de usuario o email
        { _id, email },

        //seed
        process.env.JWT_SECRET_SEED,

        //optional parameters
        { expiresIn: '30d' },
    )
}

export const isValidationToken = (token: string): Promise<string> => {
    if (!process.env.JWT_SECRET_SEED) {
        throw new Error(`No JWT seed - mira las variables de entorno en(.env)`)
    }

    if (token.length <= 10) {
        return Promise.reject('JWT no valido')
    }

    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
                if (err) return reject('JWT no valido')

                const { _id } = payload as { _id: string }

                resolve(_id)
            })
        } catch (error) {
            reject('JWT no valido')
        }
    })
}
