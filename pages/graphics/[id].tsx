import { NextPage } from 'next'
import { EngineeringOutlined } from '@mui/icons-material'
import { GetServerSideProps } from 'next'
import moment from 'moment'

import { AdminLayout, CustomBar, Loading } from '../../components'
import { ITheme, ISeguimiento } from '../../interface'
import { WrapperGraphicsBar } from '../../components/ui/styles/styledGraphicsBar'
import { useGraphics } from '../../hooks'
import { dbGraphics } from '../../database'

interface PropsGraphics {
    frecuencia_de_reparacion: number
    porcentaje_de_disponibilidad: number
    frecuencia_de_falla: number
    createdAt: number
}
export interface PropsAuxArrData {
    frecuencia_de_reparacion: number
    porcentaje_de_disponibilidad: number
    frecuencia_de_falla: number
    contador: number
}
interface Props extends ITheme {
    graphicsData: PropsAuxArrData[]
    id_maquina: string
}

const BarGraphicPage: NextPage<Props> = ({ toggleTheme, id_maquina, graphicsData }) => {
    const { isLoading } = useGraphics(graphicsData)

    if (isLoading) {
        return <Loading size={'70px'} title={`Cargando Gráficos, por favor espere...`} toggleTheme={toggleTheme} />
    }

    return (
        <AdminLayout
            icon={<EngineeringOutlined color="secondary" />}
            subTitle={'Visor de IND'}
            title={`Inventario No.${id_maquina}`}
            toggleTheme={toggleTheme}
        >
            <WrapperGraphicsBar>{graphicsData && <CustomBar graphicsData={graphicsData} />}</WrapperGraphicsBar>
        </AdminLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // console.log(ctx.query?.id!)
    // const graphicsByMachine: ISeguimiento[] = await dbGraphics.getFollowByMachineId(ctx.query?.id!.toString())
    return await dbGraphics.getFollowByMachineId(ctx.query?.id!.toString())
    .then((res:ISeguimiento[])=>{
        if (res.length === 0) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            }
        }

        //console.log('graphicsByMachine:', graphicsByMachine.length)
        let graphics: PropsGraphics[] | [] = []
        let auxArrData: PropsAuxArrData[] = [
            {
                frecuencia_de_reparacion: 0,
                porcentaje_de_disponibilidad: 0,
                frecuencia_de_falla: 0,
                contador: 0,
            },
            {
                frecuencia_de_reparacion: 0,
                porcentaje_de_disponibilidad: 0,
                frecuencia_de_falla: 0,
                contador: 0,
            },
            {
                frecuencia_de_reparacion: 0,
                porcentaje_de_disponibilidad: 0,
                frecuencia_de_falla: 0,
                contador: 0,
            },
            {
                frecuencia_de_reparacion: 0,
                porcentaje_de_disponibilidad: 0,
                frecuencia_de_falla: 0,
                contador: 0,
            },
            {
                frecuencia_de_reparacion: 0,
                porcentaje_de_disponibilidad: 0,
                frecuencia_de_falla: 0,
                contador: 0,
            },
            {
                frecuencia_de_reparacion: 0,
                porcentaje_de_disponibilidad: 0,
                frecuencia_de_falla: 0,
                contador: 0,
            },
            {
                frecuencia_de_reparacion: 0,
                porcentaje_de_disponibilidad: 0,
                frecuencia_de_falla: 0,
                contador: 0,
            },
            {
                frecuencia_de_reparacion: 0,
                porcentaje_de_disponibilidad: 0,
                frecuencia_de_falla: 0,
                contador: 0,
            },
            {
                frecuencia_de_reparacion: 0,
                porcentaje_de_disponibilidad: 0,
                frecuencia_de_falla: 0,
                contador: 0,
            },
            {
                frecuencia_de_reparacion: 0,
                porcentaje_de_disponibilidad: 0,
                frecuencia_de_falla: 0,
                contador: 0,
            },
            {
                frecuencia_de_reparacion: 0,
                porcentaje_de_disponibilidad: 0,
                frecuencia_de_falla: 0,
                contador: 0,
            },
            {
                frecuencia_de_reparacion: 0,
                porcentaje_de_disponibilidad: 0,
                frecuencia_de_falla: 0,
                contador: 0,
            },
        ]

        graphics = res.reduce((acc: any, currentValue: any) => {
            let auxObj = {}

            auxObj = {
                frecuencia_de_reparacion: Math.round((1 / currentValue.tiempoDeReparacion) * 1000) / 1000,
                porcentaje_de_disponibilidad:
                    (Math.round(
                        (currentValue.tiempoDeFuncionamiento /
                            (currentValue.tiempoDeFuncionamiento +
                                currentValue.tiempoDeReparacion +
                                currentValue.tiempoDeFalla)) *
                            1000,
                    ) /
                        1000) *
                    100,
                frecuencia_de_falla:
                    currentValue.tiempoDeFalla === 0 ? 0 : Math.round((1 / currentValue.tiempoDeFalla) * 1000) / 1000,
                createdAt: Number(
                    moment(currentValue.createdAt).utcOffset('+0500').format('DD/MM/YYYY').split('/')[1].replace(/^0+/, ''),
                ),
            }

            return [...acc, auxObj]
        }, [])
        //console.log('graphics:', graphics)
        for (let i = 0; i < graphics.length; i++) {
            const fdr = graphics[i].frecuencia_de_reparacion
            const pdd = graphics[i].porcentaje_de_disponibilidad
            const fdf = graphics[i].frecuencia_de_falla
            const position = graphics[i].createdAt

            auxArrData[position - 1] = {
                frecuencia_de_reparacion: (auxArrData[position - 1].frecuencia_de_reparacion || 0) + fdr,
                porcentaje_de_disponibilidad: (auxArrData[position - 1].porcentaje_de_disponibilidad || 0) + pdd,
                frecuencia_de_falla: (auxArrData[position - 1].frecuencia_de_falla || 0) + fdf,
                contador: (auxArrData[position - 1].contador || 0) + 1,
            }
        }
        //console.log('RESULT:', auxArrData)

        return {
            props: { graphicsData: auxArrData, id_maquina: ctx.query?.id!.toString() },
        }
    })
    .catch((err) => {
        console.log(err.message)

        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    })
    // if (graphicsByMachine.length === 0) {
    //     return {
    //         redirect: {
    //             destination: '/',
    //             permanent: false,
    //         },
    //     }
    // }

    // //console.log('graphicsByMachine:', graphicsByMachine.length)
    // let graphics: PropsGraphics[] | [] = []
    // let auxArrData: PropsAuxArrData[] = [
    //     {
    //         frecuencia_de_reparacion: 0,
    //         porcentaje_de_disponibilidad: 0,
    //         frecuencia_de_falla: 0,
    //         contador: 0,
    //     },
    //     {
    //         frecuencia_de_reparacion: 0,
    //         porcentaje_de_disponibilidad: 0,
    //         frecuencia_de_falla: 0,
    //         contador: 0,
    //     },
    //     {
    //         frecuencia_de_reparacion: 0,
    //         porcentaje_de_disponibilidad: 0,
    //         frecuencia_de_falla: 0,
    //         contador: 0,
    //     },
    //     {
    //         frecuencia_de_reparacion: 0,
    //         porcentaje_de_disponibilidad: 0,
    //         frecuencia_de_falla: 0,
    //         contador: 0,
    //     },
    //     {
    //         frecuencia_de_reparacion: 0,
    //         porcentaje_de_disponibilidad: 0,
    //         frecuencia_de_falla: 0,
    //         contador: 0,
    //     },
    //     {
    //         frecuencia_de_reparacion: 0,
    //         porcentaje_de_disponibilidad: 0,
    //         frecuencia_de_falla: 0,
    //         contador: 0,
    //     },
    //     {
    //         frecuencia_de_reparacion: 0,
    //         porcentaje_de_disponibilidad: 0,
    //         frecuencia_de_falla: 0,
    //         contador: 0,
    //     },
    //     {
    //         frecuencia_de_reparacion: 0,
    //         porcentaje_de_disponibilidad: 0,
    //         frecuencia_de_falla: 0,
    //         contador: 0,
    //     },
    //     {
    //         frecuencia_de_reparacion: 0,
    //         porcentaje_de_disponibilidad: 0,
    //         frecuencia_de_falla: 0,
    //         contador: 0,
    //     },
    //     {
    //         frecuencia_de_reparacion: 0,
    //         porcentaje_de_disponibilidad: 0,
    //         frecuencia_de_falla: 0,
    //         contador: 0,
    //     },
    //     {
    //         frecuencia_de_reparacion: 0,
    //         porcentaje_de_disponibilidad: 0,
    //         frecuencia_de_falla: 0,
    //         contador: 0,
    //     },
    //     {
    //         frecuencia_de_reparacion: 0,
    //         porcentaje_de_disponibilidad: 0,
    //         frecuencia_de_falla: 0,
    //         contador: 0,
    //     },
    // ]

    // graphics = graphicsByMachine.reduce((acc: any, currentValue: any) => {
    //     let auxObj = {}

    //     auxObj = {
    //         frecuencia_de_reparacion: Math.round((1 / currentValue.tiempoDeReparacion) * 1000) / 1000,
    //         porcentaje_de_disponibilidad:
    //             (Math.round(
    //                 (currentValue.tiempoDeFuncionamiento /
    //                     (currentValue.tiempoDeFuncionamiento +
    //                         currentValue.tiempoDeReparacion +
    //                         currentValue.tiempoDeFalla)) *
    //                     1000,
    //             ) /
    //                 1000) *
    //             100,
    //         frecuencia_de_falla:
    //             currentValue.tiempoDeFalla === 0 ? 0 : Math.round((1 / currentValue.tiempoDeFalla) * 1000) / 1000,
    //         createdAt: Number(
    //             moment(currentValue.createdAt).utcOffset('+0500').format('DD/MM/YYYY').split('/')[1].replace(/^0+/, ''),
    //         ),
    //     }

    //     return [...acc, auxObj]
    // }, [])
    // //console.log('graphics:', graphics)
    // for (let i = 0; i < graphics.length; i++) {
    //     const fdr = graphics[i].frecuencia_de_reparacion
    //     const pdd = graphics[i].porcentaje_de_disponibilidad
    //     const fdf = graphics[i].frecuencia_de_falla
    //     const position = graphics[i].createdAt

    //     auxArrData[position - 1] = {
    //         frecuencia_de_reparacion: (auxArrData[position - 1].frecuencia_de_reparacion || 0) + fdr,
    //         porcentaje_de_disponibilidad: (auxArrData[position - 1].porcentaje_de_disponibilidad || 0) + pdd,
    //         frecuencia_de_falla: (auxArrData[position - 1].frecuencia_de_falla || 0) + fdf,
    //         contador: (auxArrData[position - 1].contador || 0) + 1,
    //     }
    // }
    // //console.log('RESULT:', auxArrData)

    // return {
    //     props: { graphicsData: auxArrData, id_maquina: ctx.query?.id!.toString() },
    // }
}

export default BarGraphicPage
