import { GetServerSideProps, NextPage } from 'next'
import { useContext } from 'react'
import { getSession } from 'next-auth/react'
import { FormProvider } from 'react-hook-form'

import { SingleInventory } from '../../components'
import { IInventario, ITheme } from '../../interface'
import { Inventario } from '../../models'
import { dbInventories } from '../../database'
import { useInventory } from '../../hooks'
import { InventoriesContext } from '../../context'

interface Props extends ITheme {
    inventory: IInventario
}

const SingeInventoryPage: NextPage<Props> = ({ toggleTheme, inventory }) => {
    const { isUpdateInventory } = useContext(InventoriesContext)
    const { formMethodsCreate, formMethodsUpdate } = useInventory(inventory)

    // console.log({ inventory })

    return (
        <FormProvider {...(inventory?._id ? formMethodsUpdate : formMethodsCreate)}>
            <SingleInventory inventory={inventory} toggleTheme={toggleTheme} />
        </FormProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const session = await getSession({ req })

    // console.log('catch ===>', query)
    if (!session) {
        return {
            redirect: {
                destination: `/auth/login?p=${req.url}`,
                permanent: false,
            },
        }
    }

    const { id = '' } = query

    //console.log('id ===>', id)

    let inventory: IInventario | null

    if (id === 'new') {
        //crear inventario
        //al crearme un nuevo objeto crea con sus valores por defecto y crea los arreglos sin necesidad de colocar valores erroneos
        const tempInventory = JSON.parse(JSON.stringify(new Inventario()))

        //console.log('catch ===>', tempInventory)
        delete tempInventory._id
        // tempInventory.imagenes = ['img1.jpg', 'img2.jpg']
        inventory = tempInventory
    } else {
        return await dbInventories.getProductById(id.toString())
        .then((res: any)=>{
            return {
                props: {
                    inventory: res,
                },
            }
        })
        .catch((err) => {
            console.log(err.message)
            return {
                redirect: {
                    destination: '/admin/inventory',
                    permanent: false,
                },
            }
        })

    }
    //console.log('inventory ===>', inventory)
    if (!inventory) {
        return {
            redirect: {
                destination: '/admin/inventory',
                permanent: false,
            },
        }
    }
    //console.log({inventory});
    return {
        props: {
            inventory,
        },
    }
}

export default SingeInventoryPage
