export interface ISeguimiento {
    _id: string

    id_seguimiento: number
    imgDeVerificacion: string

    comentario: string
    estadoDeLaMaquina: 'bueno' | 'malo' | 'regular'
    nombreDeObservador: string

    tiempoDeFuncionamiento: number
    tiempoDeReparacion: number

    presentaFalla: 'si' | 'no'
    tiempoDeFalla?: number

    maquina_id_relacion: number

    createdAt: string
    updatedAt: string
}
