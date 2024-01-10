const mongoose = require('mongoose');
require("dotenv").config()
const express = require("express")
const bookRoutes = require("./routes/bookRoutes")
const cors = require("cors")

const app = express()
const port= process.env.PORT
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
  res.send("Bienvenidos a mi Servidor")
})
app.use("/books",bookRoutes)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Base de datos conectada'));
app.listen(port,()=>{
  console.log(`servidor encendido en puerto ${port}`)
})