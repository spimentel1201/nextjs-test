import { Seguimiento } from '../models'
import { ISeguimiento } from '../interface'

import { db } from '.'

export const getFollowByMachineId = async (id: string): Promise<ISeguimiento[] | []> => {
    await db.connect()

    const followsByMachine = await Seguimiento.find({ maquina_id_relacion: id })
        .select(
            ' -id_seguimiento -imgDeVerificacion -comentario -estadoDeLaMaquina -nombreDeObservador -maquina_id_relacion -__v',
        )
        .lean()

    await db.disconnect()

    if (!followsByMachine) {
        return []
    }

    //con esto forzamos al objeto a que sea serealizado como un string
    return followsByMachine
}

// let auxArr: Props[] = []

//     const mappingGraphics = async (dataFollows: ISeguimiento[]): Promise<Props[] | []> => {
//         let graphics: Props[] = []

//         graphics = dataFollows.flatMap((item) => [
//             {
//                 // ...item,
//                 frecuencia_de_reparacion: Math.round((1 / item.tiempoDeReparacion) * 1000) / 1000,
//                 porcentaje_de_disponibilidad:
//                     Math.round(
//                         (item.tiempoDeFuncionamiento +
//                             item.tiempoDeReparacion +
//                             5 -
//                             item.tiempoDeReparacion / (item.tiempoDeFuncionamiento + item.tiempoDeReparacion + 5)) *
//                             1000,
//                     ) / 1000,
//                 createdAt: moment(item.createdAt).utcOffset('+0500').format('DD/MM/YYYY').split('/')[1],
//             },
//         ])

//         return graphics
//     }

//     const iterationGraphics = (
//         mapData: {
//             frecuencia_de_reparacion: number
//             porcentaje_de_disponibilidad: number
//             createdAt: string
//         }[],
//     ) => {
//         for (let i = 0; i < mapData.length; i++) {
//             const fdr = mapData[i].frecuencia_de_reparacion
//             const pdd = mapData[i].porcentaje_de_disponibilidad

//             auxArr[mapData[i].createdAt] ??= []
//             auxArr[mapData[i].createdAt] = {
//                 frecuencia_de_reparacion: (auxArr[mapData[i].createdAt].frecuencia_de_reparacion || 0) + fdr,
//                 frecuencia_de_falla: (auxArr[mapData[i].createdAt].frecuencia_de_falla || 0) + 1,
//                 porcentaje_de_disponibilidad: (auxArr[mapData[i].createdAt].porcentaje_de_disponibilidad || 0) + pdd,
//             }
//         }
//     }

//     mappingGraphics(followsByMachine)
//         .then((res) => iterationGraphics(res))
//         .catch((err) => console.log(err.message))

//     return auxArr
