const express = require("express");

const Client = require("../models/Client");
const Bill = require("../models/Bill");
const router = new express.Router();

router.get("/hello", (req, res) => {
    res.send("Hello World");
});

//add client
router.post("/client/add", async (req, res) => {
    const client = new Client(req.body);
    try {
        await client.save();
        res.status(201).send(client);
    } catch (e) {
        res.status(400).send(e);
    }
});

//get all clients
router.get("/client/all", async (req, res) => {
    try {
        const clients = await Client.find({});
        res.send(clients);
    } catch (e) {
        res.status(500).send();
    }
});

//get client by name
router.get("/client/:name", async (req, res) => {
    const name = req.params.name;
    try {
        const client = await Client.findOne({
            name,
        });
        if (!client) {
            return res.status(404).send();
        }
        res.send(client);
    } catch (e) {
        res.status(500).send();
    }
});

//delete client by id - cascade 
router.delete("/client/remove/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const deletedClient = await Client.findByIdAndDelete(id);
        if(!deletedClient) {
            return res.status(404).json({error: 'Cliente no encontrado'});
        }
        await Bill.deleteMany({client: id});
        res.status(200).json({message: 'Cliente y facturas asociadas eliminadas correctamente'});
        
    } catch (error) {
        console.error("Error al eliminar el cliente y sus facturas:", error);
        res.status(500).json({ error: 'Error al eliminar el cliente y sus facturas' });
    }
})

module.exports = router;
