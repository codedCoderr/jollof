const express = require("express");

const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");


// Database


app.use(cors());
app.use(bodyParser.json());

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => console.log(`App running on ${PORT}`));
