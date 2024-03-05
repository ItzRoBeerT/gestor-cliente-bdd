const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Client",
    },
    invoice: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    iva: {
        type: Number,
        required: true,
    },
    base: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: false,
        default: 0,
    },
});
billSchema.pre('remove', async function(next) {
    try {
        // Elimina las facturas asociadas a este cliente
        await Bill.deleteMany({ client: this._id });
        next();
    } catch (error) {
        next(error);
    }
});

const Bill = mongoose.model("Bill", billSchema);
module.exports = Bill;