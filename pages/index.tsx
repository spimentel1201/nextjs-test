import { GetServerSideProps } from 'next'
import {
    BackspaceOutlined,
    ConfirmationNumberOutlined,
    DashboardOutlined,
    EngineeringOutlined,
    GroupOutlined,
    PrecisionManufacturingOutlined,
    TimelapseOutlined,
    WarningAmberOutlined,
} from '@mui/icons-material'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'
import { Grid } from '@mui/material'
import { NextPage } from 'next'
import { getSession } from 'next-auth/react'

import { AdminLayout, Loading, SummaryTile } from '../components'
import { ITheme } from '../interface'
import { IDataDashboard, useDashboard } from '../hooks'

const HomePage: NextPage<ITheme> = ({ toggleTheme }) => {
    const { dataDashboard, refreshIn, isLoading } = useDashboard()

    if (isLoading || !dataDashboard) {
        return <Loading size={'70px'} title={'Cargando Home, por favor espere...'} toggleTheme={toggleTheme} />
    }
    const {
        numberOts,
        numberMachines,
        numberReplacements,
        numberUsers,
        numberOutStock,
        numberLowStocks,
        numberFollows,
    } = dataDashboard! as IDataDashboard

    return (
        <AdminLayout
            icon={<DashboardOutlined color="secondary" />}
            subTitle="Estadísticas generales"
            title="Dashboard"
            toggleTheme={toggleTheme}
        >
            <Grid container spacing={2}>
                <SummaryTile
                    icon={<ConfirmationNumberOutlined color="primary" sx={{ fontSize: 65 }} />}
                    navigation={'/ots'}
                    subTitle="OTs generadas"
                    title={numberOts}
                />
                <SummaryTile
                    icon={<PrecisionManufacturingOutlined color="secondary" sx={{ fontSize: 65 }} />}
                    subTitle="Maquinas"
                    title={numberMachines}
                />

                <SummaryTile
                    icon={<SettingsSuggestIcon color="success" sx={{ fontSize: 65 }} />}
                    subTitle="Repuestos"
                    title={numberReplacements}
                />

                <SummaryTile
                    icon={<GroupOutlined color="action" sx={{ fontSize: 65 }} />}
                    navigation={'/users'}
                    subTitle="Usuarios"
                    title={numberUsers}
                />

                <SummaryTile
                    icon={<BackspaceOutlined color="error" sx={{ fontSize: 65 }} />}
                    subTitle={`Fuera de Stock en repuestos`}
                    title={numberOutStock}
                />

                <SummaryTile
                    icon={<WarningAmberOutlined color="warning" sx={{ fontSize: 65 }} />}
                    subTitle={`Existencias bajas en repuesto`}
                    title={numberLowStocks}
                />

                <SummaryTile
                    icon={<EngineeringOutlined color="info" sx={{ fontSize: 65 }} />}
                    navigation={'/follows'}
                    subTitle="Seguimiento"
                    title={numberFollows}
                />

                <SummaryTile
                    icon={<TimelapseOutlined color="disabled" sx={{ fontSize: 65 }} />}
                    subTitle="Tiempo para la actualización"
                    title={refreshIn}
                />
            </Grid>
        </AdminLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })

    // console.log({ session })
    if (!session) {
        return {
            redirect: {
                destination: '/auth/login?p=/',
                permanent: false,
            },
        }
    }

    return {
        props: {},
    }
}

export default HomePage
