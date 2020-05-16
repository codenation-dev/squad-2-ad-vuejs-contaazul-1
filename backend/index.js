const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const users = require("./routes/users");
const errors = require("./routes/errors");

const app = express();

app.use(cors());

app.use(bodyParser.json());

// Rotas de usuário
app.use("/users", users);
app.use("/errors", errors);

app.listen(3000, () => console.log("API listening on port 3000"));
