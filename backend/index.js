const express = require("express");
const bodyParser = require("body-parser");
const users = require("./routes/users");

const app = express();

app.use(bodyParser.json());

// Rotas de usuário
app.use("/users", users);

app.listen(3000, () => console.log("API listening on port 3000"));
