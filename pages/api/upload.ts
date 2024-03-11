import type { NextApiRequest, NextApiResponse } from 'next'

import formidable from 'formidable'
import { v2 as cloudinary } from 'cloudinary'

//configuracion de la variable de entorno que tenemos
cloudinary.config(process.env.CLOUDINARY_URL || '')

type Data = {
    message: string
}
// hacemos 'yarn add formidable' que es una libreria que me ayuda a trabajar con imagenes mas que todo
//necesito manejar img por lo que necesito que next no parse el body eso se logra de esta manera
export const config = {
    api: {
        bodyParser: false,
    },
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return uploadFile(req, res)
        default:
            res.status(404).json({ message: 'Bad request' })
    }
}

const saveFile = async (file: formidable.File): Promise<string> => {
    //seleccionar img de la carpeta temporal
    const { secure_url } = await cloudinary.uploader.upload(file.filepath)

    return secure_url
}

const parseFile = async (req: NextApiRequest): Promise<string> => {
    return new Promise((resolve, reject) => {
        //esto es solo preparar el objeto en formidable para comenzar a analizar
        const form = new formidable.IncomingForm()

        form.parse(req, async (err, fields, files) => {
            // console.log({err, fields, files})
            console.log({ files })
            if (err) return reject(err)
            const filePath = await saveFile(files.file as formidable.File)

            resolve(filePath)
        })
    })
}
const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    //tendremos una sola img asi mandemos varias puesto que la promesa resuelve una por una no todas al tiempo
    console.log({ req })
    const imageUrl = await parseFile(req)

    // console.log({ imageUrl })

    return res.status(200).json({ message: imageUrl })
}
