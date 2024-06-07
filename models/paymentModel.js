import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    
    orderId: {
        type:String,
        required:true
    },
    entity: {
        type: String,
        required:true
    },
    amount: {
        type:Number,
        default:0
    },
    amountPaid:{
        type:Number,
        default:0
    },
    amountDue: {
        type:Number,
        required:true
    },
    currency: {
        type:String,
        required:true
    },
    receipt:{
        type:String,
        required:true
    },
    status: {
        type:String,
        required:true
    },
    attempts: {
        type: Number,
        required:true
    },
    notes: {
        type: [String],
        default: []
    },
    createdAt: {
        type:Date,
        default:Date.now
    }
},
{
    timestamps:true
}
);

const Payment = mongoose.model('Payment', paymentSchema)

export default Payment;