const express = require("express");
const Bill = require("../models/Bill");
const router = new express.Router();

//create bill
router.post("/bill/add", async (req, res) => {
    const bill = new Bill(req.body);
    try {
        await bill.save();
        res.status(201).send(bill);
    } catch (e) {
        res.status(400).send(e);
    }
});

//get all bills by client id
router.get("/bill/all/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const bills = await Bill.find({
            client: id,
        });
        res.send(bills);
    } catch (e) {
        res.status(500).send();
    }
});

//update bill by id
router.patch("/bill/update/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["invoice", "date", "amount", "iva", "base", "total"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates!" });
    }
    try {
        const bill = await Bill.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!bill) {
            return res.status(404).send();
        }
        res.send(bill);
    } catch (e) {
        res.status(400).send(e);
    }
});

//delete bill by id
router.delete("/bill/remove/:id", async (req, res) => {
    const id = req.params.id;

    try {
        // Busca y elimina la factura por su ID
        const deletedBill = await Bill.findByIdAndDelete(id);

        if (!deletedBill) {
            return res.status(404).json({ error: "La factura no fue encontrada" });
        }

        res.status(200).json({ message: "La factura fue eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Hubo un error al intentar eliminar la factura" });
    }
});

module.exports = router;
