const express = require("express");
const router = express.Router();

//Array de mensajes (en memoria)
const messages = [
    { 
        id: 1,
        text: "Hi There!",
        user: "Amando",
        added: new Date(),
    },
    {
        id: 2,
        text: "Hi World!",
        user: "Charles",
        added: new Date(),
    },
];
let nextId = 3;
//GET / > Lista de mensajes
router.get("/", (req, res)=>{
    res.render("index", {
        title: "Mini MessageBoard",
        messages: messages,
    });
});
//GET / new > formulario
router.get("/new", (req, res)=>{
    res.render("form");
});
//Post /new > agregar mensaje
router.post("/new", (req,res)=>{
    const {messageText, messageUser} = req.body;
    if(messageText && messageUser){
        messages.push({
            id: nextId++,
            text: messageText,
            user: messageUser,
            added: new Date(),
        });
    }
    res.redirect("/");
});
//GET / message /:id > detalle
router.get("/message/:id", (req, res)=>{
    const id = Number(req.params.id);
    const message = messages.find((m) => m.id === id);
    if(!message){
        return res.status(404).send("Mensaje no encontrado");
    }
    res.render("message", {message});
});
//POST /message/:id/delete > eliminar mensaje
router.post("/message/:id/delete", (req, res)=>{
    const id = Number(req.params.id);
    const messageIndex = messages.findIndex((m) => m.id === id);
    if(messageIndex === -1){
        return res.status(404).send("Mensaje no encontrado");
    }
    messages.splice(messageIndex, 1);
    res.redirect("/");
});
module.exports = router;