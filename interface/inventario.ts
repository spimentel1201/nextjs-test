export interface IInventario {
    _id: string
    tipoInventario: 'maquina' | 'repuesto'
    nombre: string
    imgQR?: string
    estado: 'bueno' | 'malo' | 'regular'
    imagenes: string[]
    fechaDeEntrada: string
    fechaDeActualizacion: string
    existencia: number
    locacion: 'produccion' | 'taller' | 'bodega' | 'oficina_administrativa'
    subLocacion: number

    //si es tipo maquina

    id_maquina?: number
    capacidadNominal?: string //ALPHAnumerico
    serie?: string
    marca?: string
    voltaje?: number //V
    corriente?: number //A
    observacionGeneral?: string
    // ind?: IInd[]

    //si es tipo repueso

    id_repuesto?: number
    validacionPorGPS?: 'si' | 'no'
    coordenadas_gps?: string
    validacionPorIMG?: 'si' | 'no'
    maquina_id_relacion?: string | string[]

    createdAt: string
    updatedAt: string
}

// export interface IInd {
//     frecuencia_de_reparacion: number
//     frecuencia_de_falla: number
//     porcentaje_de_disponibilidad: number
// }
// ind
// frecuencia de reparacion = 1/tiempode reparaciaon
// frecuencia de falla = numero de fallas por mes
// disponibilidad...              horas totales= H.operacion + H.reparacion + H.deInactividad(tiempo entre falla y reparacion)
