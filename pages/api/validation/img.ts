import type { NextApiRequest, NextApiResponse } from 'next'

import Jimp from 'jimp'

type Data = { message: string } | { message: string; response: boolean }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return getImgDiff(req, res)
        default:
            res.status(400).json({ message: 'Bad Request' })
    }
}

const getImgDiff = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { imgReference, imgDemo } = req.query as { imgReference: string; imgDemo: string }
    let img1
    let img2

    console.log(req.query)

    await Jimp.read(imgReference)
        .then((image) => {
            img1 = image
        })
        .catch((err) => {
            console.log({ err })

            return res.status(400).json({
                message: `Something went wrong when converting the "imgReference" make sure it is in these formats (jpeg ,png ,bmp ,tiff ,gif)`,
            })
        })

    await Jimp.read(imgDemo)
        .then((image) => {
            img2 = image
        })
        .catch((err) => {
            console.log({ err })

            return res.status(400).json({
                message: `Something went wrong when converting the "imgDemo" make sure it is in these formats (jpeg ,png ,bmp ,tiff ,gif)`,
            })
        })
    if (img1 && img2) {
        const diff = Jimp.diff(img1, img2, 0.1)

        console.log({ diff })
        if (diff.percent < 0.31) {
            return res.status(200).json({ message: 'Passes validation', response: true })
        } else if (diff.percent > 0.3) {
            return res.status(200).json({ message: 'Validation fails', response: false })
        }
        // console.log('distance===>', Jimp.distance(img1, img2))
    }

    return res.status(200).json({ message: 'logrado' })
}
