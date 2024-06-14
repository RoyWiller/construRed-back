const express = require("express");
const cors = require("cors");
const app = express();
const moongose = require("mongoose");

require("dotenv").config();

const port = process.env.PORT || 3100;

app.use(cors());
app.use(express.json())


// * Conexion a MongoDb
async function main(){
    await moongose.connect(process.env.DB_CONNECTION_STRING)
    .then(()=> console.log("Connected to MongoDB"))
    .catch((error) => console.error(error))
}

main().catch(console.error)

app.use("/api/signup", require("./routes/signup"));
app.use("/api/login", require("./routes/login"));
app.use("/api/signout", require("./routes/signout"));

app.get("/", (req, res) =>{
    res.send('Hello mate')
});

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;