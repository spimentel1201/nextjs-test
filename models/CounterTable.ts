import mongoose, { model, Model, Schema } from 'mongoose'

export interface ICounterTable {
    idInventarioMaq: String
    seqMaq: Number
    idInventarioRep: String
    seqRep: Number
    idOT: String
    seqOT: Number
    idSeg: String
    seqSeg: Number
}

const counterTableSchema = new Schema({
    idInventarioMaq: { type: String, unique: false, default: 'autoIDMaq' },
    seqMaq: { type: Number, unique: false, default: 0 },
    idInventarioRep: { type: String, unique: false, default: 'autoIDRep' },
    seqRep: { type: Number, unique: false, default: 0 },
    idOT: { type: String, unique: false, default: 'autoIDOT' },
    seqOT: { type: Number, unique: false, default: 0 },
    idSeg: { type: String, unique: false, default: 'autoIDSeg' },
    seqSeg: { type: Number, unique: false, default: 0 },
})

const CounterTable: Model<ICounterTable> = mongoose.models.CounterTable || model('CounterTable', counterTableSchema)

export default CounterTable
