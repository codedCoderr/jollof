const express = require("express");

const app = express();

const cors = require("cors");


// Database


app.use(cors());


const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => console.log(`App running on ${PORT}`));
