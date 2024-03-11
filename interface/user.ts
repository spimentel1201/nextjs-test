export interface IUser {
    _id: string
    nombre: string
    email: string
    contrasena: string
    rol: 'super_admin' | 'admin_bodega' | 'bodega' | 'admin_mtto' | 'mtto'

    createdAt: string
    updatedAt: string
}

export interface IUserRes {
    users: IUser[]
    page: number
    limit: number
    last_page: number
    previous_page: null | boolean
    next_page: null | boolean
    total: number
}
