import bcryptjs from 'bcryptjs'

interface SeedUser {
    nombre: string
    email: string
    contrasena: string
    rol: 'super_admin' | 'admin_bodega' | 'bodega' | 'admin_mtto' | 'mtto'
}

interface SeedInventario {
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

    //si es tipo repueso

    id_repuesto?: number
    validacionPorGPS?: 'si' | 'no'
    validacionPorIMG?: 'si' | 'no'
    coordenadas_gps?: string

    maquina_id_relacion?: string | string[]
}

interface SeedOT {
    ot_id: number
    slug: string
    repuesto?: string
    tecnico_ing: string
    estado_de_OT: 'pendiente' | 'en_proceso' | 'finalizada'
    numero_de_orden_de_compra?: string
    fecha_expedicion: string
    tiempoDeEjecucion?: number
    fecha_cierre?: string
    imgDeLaMaquina: string
    tareas?: string
    comentario?: string
    maquina: number
}

interface SeedSeguimiento {
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

    createdAt?: string
    updatedAt?: string
}

interface SeedCounterTable {
    idInventarioMaq: String
    seqMaq: Number
    idInventarioRep: String
    seqRep: Number
    idOT: String
    seqOT: Number
    idSeg: String
    seqSeg: Number
}

interface SeedData {
    usuarios: SeedUser[]
    inventarios: SeedInventario[]
    ots: SeedOT[]
    seguimientos: SeedSeguimiento[]
    counterTable: SeedCounterTable[]
}

export const initialData: SeedData = {
    usuarios: [
        {
            nombre: 'Daniel Felipe Polo Garcia',
            email: 'superadmin@superadmin.com',
            contrasena: bcryptjs.hashSync('secret'),
            rol: 'super_admin',
        },
        {
            nombre: 'Lupita Olmos',
            email: 'adminbodega@adminbodega.com',
            contrasena: bcryptjs.hashSync('secret'),
            rol: 'admin_bodega',
        },
        {
            nombre: 'Beatriz Salto',
            email: 'bodega@bodega.com',
            contrasena: bcryptjs.hashSync('secret'),
            rol: 'bodega',
        },
        {
            nombre: 'Carlos Andrés Roa Escorcia',
            email: 'adminmtto@adminmtto.com',
            contrasena: bcryptjs.hashSync('secret'),
            rol: 'admin_mtto',
        },
        {
            nombre: 'Vasco Castano',
            email: 'mtto@mtto.com',
            contrasena: bcryptjs.hashSync('secret'),
            rol: 'mtto',
        },
        {
            nombre: 'Vasco Castano1',
            email: 'mtto1@mtto.com',
            contrasena: bcryptjs.hashSync('secret'),
            rol: 'mtto',
        },
        {
            nombre: 'Beatriz Salto1',
            email: 'bodega1@bodega.com',
            contrasena: bcryptjs.hashSync('secret'),
            rol: 'bodega',
        },
        {
            nombre: 'Vasco Castano2',
            email: 'mtto2@mtto.com',
            contrasena: bcryptjs.hashSync('secret'),
            rol: 'mtto',
        },
        {
            nombre: 'Beatriz Salto2',
            email: 'bodega2@bodega.com',
            contrasena: bcryptjs.hashSync('secret'),
            rol: 'bodega',
        },
        {
            nombre: 'Vasco Castano3',
            email: 'mtto3@mtto.com',
            contrasena: bcryptjs.hashSync('secret'),
            rol: 'mtto',
        },
        {
            nombre: 'Beatriz Salto3',
            email: 'bodega3@bodega.com',
            contrasena: bcryptjs.hashSync('secret'),
            rol: 'bodega',
        },
        {
            nombre: 'Vasco Castano4',
            email: 'mtto4@mtto.com',
            contrasena: bcryptjs.hashSync('secret'),
            rol: 'mtto',
        },
        {
            nombre: 'Beatriz Salto4',
            email: 'bodega4@bodega.com',
            contrasena: bcryptjs.hashSync('secret'),
            rol: 'bodega',
        },
        {
            nombre: 'Vasco Castano5',
            email: 'mtto5@mtto.com',
            contrasena: bcryptjs.hashSync('secret'),
            rol: 'mtto',
        },
        {
            nombre: 'Beatriz Salto5',
            email: 'bodega5@bodega.com',
            contrasena: bcryptjs.hashSync('secret'),
            rol: 'bodega',
        },
        {
            nombre: 'Vasco Castano6',
            email: 'mtto6@mtto.com',
            contrasena: bcryptjs.hashSync('secret'),
            rol: 'mtto',
        },
        {
            nombre: 'Beatriz Salto6',
            email: 'bodega6@bodega.com',
            contrasena: bcryptjs.hashSync('secret'),
            rol: 'bodega',
        },
        {
            nombre: 'Vasco Castano7',
            email: 'mtto7@mtto.com',
            contrasena: bcryptjs.hashSync('secret'),
            rol: 'mtto',
        },
        {
            nombre: 'Beatriz Salto7',
            email: 'bodega7@bodega.com',
            contrasena: bcryptjs.hashSync('secret'),
            rol: 'bodega',
        },
        {
            nombre: 'Vasco Castano8',
            email: 'mtto8@mtto.com',
            contrasena: bcryptjs.hashSync('secret'),
            rol: 'mtto',
        },
        {
            nombre: 'Beatriz Salto8',
            email: 'bodega8@bodega.com',
            contrasena: bcryptjs.hashSync('secret'),
            rol: 'bodega',
        },
        {
            nombre: 'Vasco Castano9',
            email: 'mtto9@mtto.com',
            contrasena: bcryptjs.hashSync('secret'),
            rol: 'mtto',
        },
        {
            nombre: 'Beatriz Salto9',
            email: 'bodega9@bodega.com',
            contrasena: bcryptjs.hashSync('secret'),
            rol: 'bodega',
        },
        {
            nombre: 'Vasco Castano10',
            email: 'mtto10@mtto.com',
            contrasena: bcryptjs.hashSync('secret'),
            rol: 'mtto',
        },
        {
            nombre: 'Beatriz Salto10',
            email: 'bodega10@bodega.com',
            contrasena: bcryptjs.hashSync('secret'),
            rol: 'bodega',
        },
    ],
    inventarios: [
        {
            tipoInventario: 'maquina',
            nombre: 'ADDV-123-LT',
            imgQR: '',
            estado: 'bueno',
            imagenes: [
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221646/ciyutnojwz7i4gzyco1w.jpg',
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221644/r3mxilkxm7gdnot4z2vv.jpg',
            ],
            fechaDeEntrada: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            fechaDeActualizacion: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            existencia: 1,
            locacion: 'produccion',
            subLocacion: 3,
            id_maquina: 1,
            capacidadNominal: '12ASN212',
            serie: 'serie 1',
            marca: 'yamaha',
            voltaje: 120,
            corriente: 80,
            observacionGeneral: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        },
        {
            tipoInventario: 'maquina',
            nombre: 'MACHINE-OO0-2022',
            imgQR: '',
            estado: 'regular',
            imagenes: [
                'https://res.cloudinary.com/danfelogar/image/upload/v1661061321/fhy5cffvk4rrwzjbnco9.jpg',
                'https://res.cloudinary.com/danfelogar/image/upload/v1661062286/mllrlbwmsdkumpoq02om.jpg',
            ],
            fechaDeEntrada: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            fechaDeActualizacion: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            existencia: 1,
            locacion: 'taller',
            subLocacion: 14,
            id_maquina: 2,
            capacidadNominal: '12ASN212',
            serie: 'serie 2',
            marca: 'marca generica',
            voltaje: 1000,
            corriente: 90,
            observacionGeneral: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        },
        {
            tipoInventario: 'maquina',
            nombre: 'MACHINE-GEARS',
            imgQR: '',
            estado: 'regular',
            imagenes: [
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221647/z9sdd4qa7wforgfgg35g.jpg',
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221648/eficuc2drfodcssdulzh.jpg',
            ],
            fechaDeEntrada: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            fechaDeActualizacion: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            existencia: 1,
            locacion: 'oficina_administrativa',
            subLocacion: 8,
            id_maquina: 3,
            capacidadNominal: '1TDO13',
            serie: 'serie 3',
            marca: 'LubriRock',
            voltaje: 75,
            corriente: 40,
            observacionGeneral: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        },
        {
            tipoInventario: 'maquina',
            nombre: 'MACHINE-TEST',
            imgQR: '',
            estado: 'bueno',
            imagenes: [
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221647/z9sdd4qa7wforgfgg35g.jpg',
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221648/eficuc2drfodcssdulzh.jpg',
            ],
            fechaDeEntrada: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            fechaDeActualizacion: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            existencia: 1,
            locacion: 'taller',
            subLocacion: 10,
            id_maquina: 4,
            capacidadNominal: 'ANY/DDD',
            serie: 'serie 4',
            marca: 'LubriRock',
            voltaje: 583,
            corriente: 450,
            observacionGeneral: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        },
        {
            tipoInventario: 'maquina',
            nombre: 'MACHINE-TEST1',
            imgQR: '',
            estado: 'malo',
            imagenes: [
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221649/fwuqrw3y6tzyifpi5szz.jpg',
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221650/osbj7ngu04dj4zwfxfha.jpg',
            ],
            fechaDeEntrada: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            fechaDeActualizacion: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            existencia: 1,
            locacion: 'bodega',
            subLocacion: 11,
            id_maquina: 5,
            capacidadNominal: '2AB-00043',
            serie: 'serie 5',
            marca: 'MARCKGEN',
            voltaje: 45,
            corriente: 687,
            observacionGeneral: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        },
        {
            tipoInventario: 'maquina',
            nombre: 'MACHINE-TEST2',
            imgQR: '',
            estado: 'regular',
            imagenes: [
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221652/z3z6dibsmnzdxemfjym0.jpg',
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221653/mlexkaqkzbhgyhp3f2oh.jpg',
            ],
            fechaDeEntrada: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            fechaDeActualizacion: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            existencia: 1,
            locacion: 'bodega',
            subLocacion: 3,
            id_maquina: 6,
            capacidadNominal: '2AB-0243-43',
            serie: 'serie 6',
            marca: 'MARCKGEN 1',
            voltaje: 66,
            corriente: 7687,
            observacionGeneral: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        },
        {
            tipoInventario: 'maquina',
            nombre: 'MACHINE-TEST4',
            imgQR: '',
            estado: 'regular',
            imagenes: [
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221654/purztyobxwihxpth5qr8.jpg',
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221656/hw42n8xcndzg6tzvapmc.jpg',
            ],
            fechaDeEntrada: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            fechaDeActualizacion: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            existencia: 1,
            locacion: 'oficina_administrativa',
            subLocacion: 5,
            id_maquina: 7,
            capacidadNominal: '214-MARC-1-LANC',
            serie: 'serie 7',
            marca: 'MARCKGEN 7',
            voltaje: 77,
            corriente: 119,
            observacionGeneral: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        },
        {
            tipoInventario: 'maquina',
            nombre: 'MACHINE-TEST5',
            imgQR: '',
            estado: 'malo',
            imagenes: [
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221656/viuccu6hbxgsioejjxha.jpg',
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221658/c4iu5cztnkuliivktoov.jpg',
            ],
            fechaDeEntrada: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            fechaDeActualizacion: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            existencia: 1,
            locacion: 'taller',
            subLocacion: 7,
            id_maquina: 8,
            capacidadNominal: '214-MARC-2-LANC',
            serie: 'serie 8',
            marca: 'MARCKGEN 8',
            voltaje: 54,
            corriente: 19,
            observacionGeneral: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        },
        {
            tipoInventario: 'repuesto',
            nombre: 'chumacera',
            imgQR: '',
            estado: 'regular',
            imagenes: [
                'https://res.cloudinary.com/danfelogar/image/upload/v1661222083/nvr3aq8riluv4ld22qxl.jpg',
                'https://res.cloudinary.com/danfelogar/image/upload/v1661222084/pclfd2l5jpkaryfnzchy.jpg',
            ],
            fechaDeEntrada: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            fechaDeActualizacion: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            existencia: 20,
            locacion: 'taller',
            subLocacion: 7,
            id_repuesto: 1,
            validacionPorGPS: 'si',
            coordenadas_gps: '10.978126, -74.815058',
            validacionPorIMG: 'si',
            maquina_id_relacion: ['1', '4', '8'],
        },
        {
            tipoInventario: 'repuesto',
            nombre: 'engranaje',
            imgQR: '',
            estado: 'malo',
            imagenes: [
                'https://res.cloudinary.com/danfelogar/image/upload/v1661222085/qi2z8elcmelxksbtwtht.webp',
                'https://res.cloudinary.com/danfelogar/image/upload/v1661222090/yjt77ydtvb46alrlpozm.jpg',
            ],
            fechaDeEntrada: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            fechaDeActualizacion: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            existencia: 6,
            locacion: 'taller',
            subLocacion: 3,
            id_repuesto: 2,
            validacionPorGPS: 'si',
            coordenadas_gps: '10.978126, -74.815058',
            validacionPorIMG: 'si',
            maquina_id_relacion: ['2', '7'],
        },
        {
            tipoInventario: 'repuesto',
            nombre: 'bomba hidraulica',
            imgQR: '',
            estado: 'regular',
            imagenes: [
                'https://res.cloudinary.com/danfelogar/image/upload/v1661222086/p9xbhqu8o9tl5d22ouzo.jpg',
                'https://res.cloudinary.com/danfelogar/image/upload/v1661222089/go7uxojdwqpv0qof1arj.jpg',
            ],
            fechaDeEntrada: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            fechaDeActualizacion: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            existencia: 0,
            locacion: 'taller',
            subLocacion: 3,
            id_repuesto: 3,
            validacionPorGPS: 'si',
            coordenadas_gps: '10.978126, -74.815058',
            validacionPorIMG: 'si',
            maquina_id_relacion: ['3', '5', '6'],
        },
        {
            tipoInventario: 'repuesto',
            nombre: 'eje',
            imgQR: '',
            estado: 'bueno',
            imagenes: [
                'https://res.cloudinary.com/danfelogar/image/upload/v1661222087/rrq8vwsjmseu8khs8apr.jpg',
                'https://res.cloudinary.com/danfelogar/image/upload/v1661222088/avnq3zbovkvfftwaphcl.jpg',
            ],
            fechaDeEntrada: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            fechaDeActualizacion: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            existencia: 5,
            locacion: 'taller',
            subLocacion: 3,
            id_repuesto: 4,
            validacionPorGPS: 'si',
            coordenadas_gps: '10.978126, -74.815058',
            validacionPorIMG: 'si',
            maquina_id_relacion: ['3', '6', '2'],
        },
        {
            tipoInventario: 'repuesto',
            nombre: 'rodamiento',
            imgQR: '',
            estado: 'bueno',
            imagenes: [
                'https://res.cloudinary.com/danfelogar/image/upload/v1661222087/lmmuizbkx4johorkvttg.jpg',
                'https://res.cloudinary.com/danfelogar/image/upload/v1661222091/uhqqrvkgpficzc2vpv40.jpg',
            ],
            fechaDeEntrada: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            fechaDeActualizacion: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            existencia: 34,
            locacion: 'taller',
            subLocacion: 3,
            id_repuesto: 5,
            validacionPorGPS: 'si',
            coordenadas_gps: '10.978126, -74.815058',
            validacionPorIMG: 'si',
            maquina_id_relacion: ['7'],
        },
    ],
    ots: [
        {
            ot_id: 1,
            slug: 'OT0001',
            repuesto: 'eje',
            tecnico_ing: 'Carlos Andrés Roa Escorcia',
            estado_de_OT: 'pendiente',
            numero_de_orden_de_compra: 'ABV000121',
            fecha_expedicion: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            tiempoDeEjecucion: 2,
            fecha_cierre: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            imgDeLaMaquina: 'https://res.cloudinary.com/danfelogar/image/upload/v1661221644/r3mxilkxm7gdnot4z2vv.jpg',
            tareas: 'Existen muchos tipos de clasificaciones del reino fungi pero generalmente se clasifican por su alimentación y se consideran algunos grupos destacados que se describen a continuación.',
            comentario:
                'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que',
            maquina: 1,
        },
        {
            ot_id: 2,
            slug: 'OT0002',
            repuesto: 'eje',
            tecnico_ing: 'Carlos Andrés Roa Escorcia',
            estado_de_OT: 'en_proceso',
            numero_de_orden_de_compra: '',
            fecha_expedicion: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            tiempoDeEjecucion: 4,
            fecha_cierre: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            imgDeLaMaquina: 'https://res.cloudinary.com/danfelogar/image/upload/v1661062286/mllrlbwmsdkumpoq02om.jpg',
            tareas: 'Existen muchos tipos de clasificaciones del reino fungi pero generalmente se clasifican por su alimentación y se consideran algunos grupos destacados que se describen a continuación.',
            comentario:
                'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que',
            maquina: 2,
        },
        {
            ot_id: 3,
            slug: 'OT0003',
            repuesto: 'eje',
            tecnico_ing: 'Carlos Andrés Roa Escorcia',
            estado_de_OT: 'finalizada',
            numero_de_orden_de_compra: 'ABV12777',
            fecha_expedicion: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            tiempoDeEjecucion: 1,
            fecha_cierre: 'Mon Aug 22 2022 00:00:00 GMT-0500',
            imgDeLaMaquina: 'https://res.cloudinary.com/danfelogar/image/upload/v1661221648/eficuc2drfodcssdulzh.jpg',
            tareas: 'Existen muchos tipos de clasificaciones del reino fungi pero generalmente se clasifican por su alimentación y se consideran algunos grupos destacados que se describen a continuación.',
            comentario:
                'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que',
            maquina: 3,
        },
    ],
    seguimientos: [
        {
            id_seguimiento: 1,
            imgDeVerificacion:
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221644/r3mxilkxm7gdnot4z2vv.jpg',
            comentario: 'sin ninguna novedad al respecto que sea trasendente ',
            estadoDeLaMaquina: 'bueno',
            nombreDeObservador: 'Matias',
            tiempoDeFuncionamiento: 120,
            tiempoDeReparacion: 4,
            maquina_id_relacion: 1,
            presentaFalla: 'no',
            createdAt: '2022-01-20T01:06:40.332Z',
            //updatedAt: '2022-01-20T01:06:40.332Z',
        },
        {
            id_seguimiento: 2,
            imgDeVerificacion:
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221644/r3mxilkxm7gdnot4z2vv.jpg',
            comentario: 'sin ninguna novedad al respecto que sea trasendente ',
            estadoDeLaMaquina: 'bueno',
            nombreDeObservador: 'Matias',
            tiempoDeFuncionamiento: 110,
            tiempoDeReparacion: 5,
            maquina_id_relacion: 1,
            presentaFalla: 'si',
            tiempoDeFalla: 9,
            createdAt: '2022-01-20T01:06:40.333Z',
            //updatedAt: '2022-01-20T01:06:40.333Z',
        },
        {
            id_seguimiento: 3,
            imgDeVerificacion:
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221644/r3mxilkxm7gdnot4z2vv.jpg',
            comentario: 'sin ninguna novedad al respecto que sea trasendente ',
            estadoDeLaMaquina: 'regular',
            nombreDeObservador: 'Matias',
            tiempoDeFuncionamiento: 220,
            tiempoDeReparacion: 3,
            maquina_id_relacion: 1,
            presentaFalla: 'no',
            createdAt: '2022-02-01T01:06:40.333Z',
            //updatedAt: '2022-02-01T01:06:40.333Z',
        },
        {
            id_seguimiento: 4,
            imgDeVerificacion:
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221644/r3mxilkxm7gdnot4z2vv.jpg',
            comentario: 'sin ninguna novedad al respecto que sea trasendente ',
            estadoDeLaMaquina: 'malo',
            nombreDeObservador: 'Matias',
            tiempoDeFuncionamiento: 520,
            tiempoDeReparacion: 5,
            maquina_id_relacion: 1,
            presentaFalla: 'no',
            createdAt: '2022-03-29T01:06:40.333Z',
            //updatedAt: '2022-03-29T01:06:40.333Z',
        },
        {
            id_seguimiento: 5,
            imgDeVerificacion:
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221644/r3mxilkxm7gdnot4z2vv.jpg',
            comentario: 'sin ninguna novedad al respecto que sea trasendente ',
            estadoDeLaMaquina: 'regular',
            nombreDeObservador: 'Matias',
            tiempoDeFuncionamiento: 620,
            tiempoDeReparacion: 7,
            maquina_id_relacion: 1,
            presentaFalla: 'si',
            tiempoDeFalla: 5,
            createdAt: '2022-04-29T01:06:40.333Z',
            //updatedAt: '2022-04-29T01:06:40.333Z',
        },
        {
            id_seguimiento: 6,
            imgDeVerificacion:
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221644/r3mxilkxm7gdnot4z2vv.jpg',
            comentario: 'sin ninguna novedad al respecto que sea trasendente ',
            estadoDeLaMaquina: 'bueno',
            nombreDeObservador: 'Matias',
            tiempoDeFuncionamiento: 300,
            tiempoDeReparacion: 8,
            maquina_id_relacion: 1,
            presentaFalla: 'si',
            tiempoDeFalla: 3,
            createdAt: '2022-05-29T01:06:40.333Z',
            //updatedAt: '2022-05-29T01:06:40.333Z',
        },
        {
            id_seguimiento: 7,
            imgDeVerificacion:
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221644/r3mxilkxm7gdnot4z2vv.jpg',
            comentario: 'sin ninguna novedad al respecto que sea trasendente ',
            estadoDeLaMaquina: 'regular',
            nombreDeObservador: 'Matias',
            tiempoDeFuncionamiento: 400,
            tiempoDeReparacion: 7,
            maquina_id_relacion: 1,
            presentaFalla: 'si',
            tiempoDeFalla: 1,
            createdAt: '2022-06-29T01:06:40.334Z',
            //updatedAt: '2022-06-29T01:06:40.334Z',
        },
        {
            id_seguimiento: 8,
            imgDeVerificacion:
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221644/r3mxilkxm7gdnot4z2vv.jpg',
            comentario: 'sin ninguna novedad al respecto que sea trasendente ',
            estadoDeLaMaquina: 'bueno',
            nombreDeObservador: 'Matias',
            tiempoDeFuncionamiento: 400,
            tiempoDeReparacion: 3,
            maquina_id_relacion: 1,
            presentaFalla: 'no',
            createdAt: '2022-07-29T01:06:40.334Z',
            //updatedAt: '2022-07-29T01:06:40.334Z',
        },
        {
            id_seguimiento: 9,
            imgDeVerificacion:
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221644/r3mxilkxm7gdnot4z2vv.jpg',
            comentario: 'sin ninguna novedad al respecto que sea trasendente ',
            estadoDeLaMaquina: 'bueno',
            nombreDeObservador: 'Matias',
            tiempoDeFuncionamiento: 780,
            tiempoDeReparacion: 10,
            maquina_id_relacion: 1,
            presentaFalla: 'si',
            tiempoDeFalla: 6,
            createdAt: '2022-08-29T01:06:40.334Z',
            //updatedAt: '2022-08-29T01:06:40.334Z',
        },
        {
            id_seguimiento: 10,
            imgDeVerificacion:
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221644/r3mxilkxm7gdnot4z2vv.jpg',
            comentario: 'sin ninguna novedad al respecto que sea trasendente ',
            estadoDeLaMaquina: 'bueno',
            nombreDeObservador: 'Matias',
            tiempoDeFuncionamiento: 320,
            tiempoDeReparacion: 36,
            maquina_id_relacion: 1,
            presentaFalla: 'no',
            createdAt: '2022-09-29T01:06:40.334Z',
            //updatedAt: '2022-09-29T01:06:40.334Z',
        },
        {
            id_seguimiento: 11,
            imgDeVerificacion:
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221644/r3mxilkxm7gdnot4z2vv.jpg',
            comentario: 'sin ninguna novedad al respecto que sea trasendente ',
            estadoDeLaMaquina: 'malo',
            nombreDeObservador: 'Matias',
            tiempoDeFuncionamiento: 210,
            tiempoDeReparacion: 123,
            maquina_id_relacion: 1,
            presentaFalla: 'no',
            createdAt: '2022-10-29T01:06:40.334Z',
            //updatedAt: '2022-10-29T01:06:40.334Z',
        },
        {
            id_seguimiento: 12,
            imgDeVerificacion:
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221644/r3mxilkxm7gdnot4z2vv.jpg',
            comentario: 'sin ninguna novedad al respecto que sea trasendente ',
            estadoDeLaMaquina: 'regular',
            nombreDeObservador: 'Matias',
            tiempoDeFuncionamiento: 240,
            tiempoDeReparacion: 4,
            maquina_id_relacion: 1,
            presentaFalla: 'si',
            tiempoDeFalla: 2,
            createdAt: '2022-11-29T01:06:40.335Z',
            //updatedAt: '2022-11-29T01:06:40.335Z',
        },
        {
            id_seguimiento: 13,
            imgDeVerificacion:
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221644/r3mxilkxm7gdnot4z2vv.jpg',
            comentario: 'sin ninguna novedad al respecto que sea trasendente ',
            estadoDeLaMaquina: 'bueno',
            nombreDeObservador: 'Matias',
            tiempoDeFuncionamiento: 304,
            tiempoDeReparacion: 48,
            maquina_id_relacion: 1,
            presentaFalla: 'si',
            tiempoDeFalla: 10,
            createdAt: '2022-12-29T01:06:40.335Z',
            //updatedAt: '2022-12-29T01:06:40.335Z',
        },
        {
            id_seguimiento: 14,
            imgDeVerificacion:
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221644/r3mxilkxm7gdnot4z2vv.jpg',
            comentario: 'sin ninguna novedad al respecto que sea trasendente ',
            estadoDeLaMaquina: 'bueno',
            nombreDeObservador: 'Matias',
            tiempoDeFuncionamiento: 598,
            tiempoDeReparacion: 70,
            maquina_id_relacion: 1,
            presentaFalla: 'si',
            tiempoDeFalla: 5,
            createdAt: '2022-12-29T01:06:40.335Z',
            //updatedAt: '2022-12-29T01:06:40.335Z',
        },
        {
            id_seguimiento: 15,
            imgDeVerificacion:
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221644/r3mxilkxm7gdnot4z2vv.jpg',
            comentario: 'sin ninguna novedad al respecto que sea trasendente ',
            estadoDeLaMaquina: 'bueno',
            nombreDeObservador: 'Matias',
            tiempoDeFuncionamiento: 110,
            tiempoDeReparacion: 5,
            maquina_id_relacion: 1,
            presentaFalla: 'si',
            tiempoDeFalla: 2,
            createdAt: '2022-12-29T01:06:40.335Z',
            //updatedAt: '2022-12-29T01:06:40.335Z',
        },
        {
            id_seguimiento: 16,
            imgDeVerificacion:
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221644/r3mxilkxm7gdnot4z2vv.jpg',
            comentario: 'sin ninguna novedad al respecto que sea trasendente ',
            estadoDeLaMaquina: 'regular',
            nombreDeObservador: 'Matias',
            tiempoDeFuncionamiento: 500,
            tiempoDeReparacion: 8,
            maquina_id_relacion: 1,
            presentaFalla: 'si',
            tiempoDeFalla: 6,
            createdAt: '2022-12-20T01:06:40.335Z',
            //updatedAt: '2022-12-20T01:06:40.335Z',
        },
        {
            id_seguimiento: 17,
            imgDeVerificacion:
                'https://res.cloudinary.com/danfelogar/image/upload/v1661221644/r3mxilkxm7gdnot4z2vv.jpg',
            comentario: 'sin ninguna novedad al respecto que sea trasendente ',
            estadoDeLaMaquina: 'bueno',
            nombreDeObservador: 'Matias',
            tiempoDeFuncionamiento: 20,
            tiempoDeReparacion: 9,
            maquina_id_relacion: 1,
            presentaFalla: 'si',
            tiempoDeFalla: 8,
            createdAt: '2022-12-29T01:06:40.335Z',
            //updatedAt: '2022-12-29T01:06:40.335Z',
        },
    ],
    counterTable: [
        {
            idInventarioMaq: 'autoIDMaq',
            seqMaq: 8,
            idInventarioRep: 'autoIDRep',
            seqRep: 5,
            idOT: 'autoIDOT',
            seqOT: 3,
            idSeg: 'autoIDSeg',
            seqSeg: 17,
        },
    ],
}
