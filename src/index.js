const express = require("express");
const cors = require("cors");
require("./db/mongoose");

// routers
const clientRouter = require("./routers/Client");
const billRouter = require("./routers/Bill");

// settings
const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(clientRouter);
app.use(billRouter);


app.listen(port, () => {
    console.log("Server is up on port " + port );
});