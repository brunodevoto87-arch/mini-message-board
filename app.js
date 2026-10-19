const express = require("express");
const path = require("path");
const indexRouter = require("./routes/indexRouter")

const app = express();
const PORT = 3000;

//Configuracion
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//Middleware
app.use(express.urlencoded({extended: true})); //<= importante (parsea forms)
app.use(express.static(path.join(__dirname, "public")));
//Rutas
app.use("/", indexRouter);
//Server
app.listen(PORT, ()=>{
    console.log(`Servidor en http://localhost:${PORT}`);
});