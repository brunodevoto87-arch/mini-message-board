const express = require("express");
const {body,validationResult} = require("express-validator");
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
    res.render("form", {
        errors: [],
        oldData: null,
    });
});
//Post /new > agregar mensaje
router.post(
    "/new",
    body("messageUser")
        .trim()
        .isLength({min: 1, max: 50})
        .withMessage("El nombre es obligatorio(1-50 caracteres)"),
    body("messageText")
        .trim()
        .isLength({min: 1, max: 500})
        .withMessage("El mensaje es obligatorio(1-500 caracteres)"),
    (req, res) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).render("form", {
                errors: errors.array(),
                oldData: req.body,
            });
        }
        const {messageUser, messageText} = req.body;
        messages.push({
            id: nextId++,
            text: messageText,
            user: messageUser,
            added: new Date(),
        });
        res.redirect("/");
    } 
);
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