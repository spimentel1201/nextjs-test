export interface IOT {
    _id: string

    ot_id: number
    slug: string

    repuesto?: string
    tecnico_ing: string

    estado_de_OT: 'pendiente' | 'en_proceso' | 'finalizada'

    numero_de_orden_de_compra?: string

    fecha_expedicion: Date
    tiempoDeEjecucion?: number
    fecha_cierre?: Date

    imgDeLaMaquina: string

    tareas?: string
    comentario?: string

    maquina: number

    createdAt: string
    updatedAt: string
}

// export interface ITareasOT {
//     nombreDeActividad_o_descripcion_de_la_orden: string
//     cantidad_de_actividad: string
// }
